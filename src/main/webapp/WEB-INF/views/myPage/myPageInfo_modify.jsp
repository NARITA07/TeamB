<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>마이페이지-내정보관리</title>
    <meta charset="UTF-8">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
<!-- 카카오 주소 API -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<script>
// 카카오 주소 api
function openZipSearch() {
    var width = 500;
    var height = 600;
    var themeObj = { bgColor: "#FFFF00" };
    new daum.Postcode({
        width: width,
        height: height,
        theme: themeObj,
        oncomplete: function(data) {
            var addr = (data.userSelectedType == 'R') ? data.roadAddress : data.jibunAddress;
            $("#postcode").val(data.zonecode);
            $("#address").val(addr);
            $("#detailAddress").focus();
        }
    }).open({
        left: (window.screen.width / 2) - (width / 2),
        top: (window.screen.height / 2) - (height / 2),
        popupTitle: '주소 검색'
    });
}

$(function() {
    // 주소 split
    var str = "${loginInfo.user_address}";
    var addr = str.split("# ");
    $("#postcode").val(addr[0]);
    $("#address").val(addr[1]);
    $("#detailAddress").val(addr[2]);
    
    // 비밀번호 변경 모달 열기
    $("#pwdChange").click(function() {
        $("#password1").val("");
        $("#newPassword").val("");
        $("#confirmPassword").val("");
        $("#invalid-message1").text("비밀번호는 공백 문자를 제외한 모든 문자로 이루어진 2~16자입니다.");
        $("#invalid-message2").hide();
        $("#modal-pwdChangeForm").modal("show");
    });

    // 비밀번호 유효성 객체
    var valid = {
        newPWValid:false,
        confirmPWValid:false,
        isAllValid:function() {
			return this.newPWValid && this.confirmPWValid;
		}
    }

	// 비밀번호 유효성 검사
	$("#newPassword").blur(function() {
// 		var pattern = /^[A-Za-z0-9!@#$%^&*?=+_-]{2,16}$/i; //"비밀번호는 영문 대/소문자, 숫자, 특수문자를 1개 이상 포함한 8~16자입니다."
		var pattern = /^[^\s]{2,16}$/;	//비밀번호 정규화 간략버전
		
	    if (pattern.test($(this).val())) {
	    	$("#invalid-message1").text("사용가능한 비밀번호입니다."); // 유효한 경우 텍스트 설정
	    	$("#invalid-message1").css("color", "green");
	        valid.newPWValid = true;
	    } else {
	    	$("#invalid-message1").text("비밀번호는 공백 문자를 제외한 모든 문자로 이루어진 2~16자입니다."); // 유효하지 않은 경우 텍스트 설정
	    	$("#invalid-message1").css("color", "red");
	        valid.newPWValid = false;
	    }
	});
	
	// 비밀번호 확인 일치 여부 검사
	$("#confirmPassword").blur(function() {
	    var newPassword = $("#newPassword").val();
	    var confirmPassword = $(this).val();

	    if (!newPassword) {
	    	$("#invalid-message2").hide(); // 비밀번호가 비어있을 때 메시지 숨김
	    } else if (newPassword == confirmPassword) {
	    	$("#invalid-message2").hide(); // 비밀번호 일치한 경우 메시지 표시
	    	valid.confirmPWValid = true;
	    } else {
	    	$("#invalid-message2").text("비밀번호가 일치하지 않습니다."); // 비밀번호 일치하지 않음 텍스트 설정
	    	$("#invalid-message2").css("color", "red");
	    	$("#invalid-message2").show(); // 비밀번호 일치하지 않음 메시지 표시
	    	valid.confirmPWValid = false;
	    }
	});

	// 비밀번호 변경 버튼 클릭 시 폼 유효성 검사
	$("#btn-pwdChange-save").click(function(e) {
		e.preventDefault();
	    var password1 = $("#password1").val();				//비밀번호 변경 폼 현재비밀번호
	    var newPassword = $("#newPassword").val();			//새 비밀번호
	    var confirmPassword = $("#confirmPassword").val();	//새 비밀번호 확인
	    
	    if (password1=="" || newPassword=="" || confirmPassword==""){
	        alert("비밀번호를 입력하세요");
	        return;
	    } else if (newPassword != confirmPassword) {
	        alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
	        return;
	    }
	    
	    // 유효성 검사 모두 통과시 컨트롤러 전송
	    if(valid.isAllValid()) {
		    $.ajax({
		        method: "POST",
		        url: "/myPage/pwdChange",
		        data: {
		        	password1: password1,
		            newPassword: newPassword
		        },
		        success: function(rData) {
		            console.log("rData:", rData);
		            console.log("비밀번호 변경 응답받음");
		            if (rData == "success") {
		                alert("비밀번호가 성공적으로 변경되었습니다.");
		                $('#modal-pwdChangeForm').modal('hide');
		                $('#modal-pwdChangeForm').on('hidden.bs.modal', function (e) {
		                    // 페이지 새로고침
		                    location.href="/myPage/myPageInfo_modify";
		                });
		            } else if (rData == "mismatch") {
		            	alert("현재 비밀번호가 틀렸습니다.");
		            } else {
		                alert("비밀번호 변경에 실패했습니다.");
		        	}
				},
		        error: function(xhr, status, error) {
		            alert("비밀번호 변경 중 오류가 발생했습니다.");
		            console.error("비밀번호 변경 오류", error);
		        }
		    });
	    }
	});
	
    //전화번호 변환
    $("#user_tel").blur(function() {
        var tel = $("#user_tel").val().trim();
        if(tel.substr(3,1) == "-" || tel.length < 10 || tel == ""){ 
            // 변수 tel 문자열 중 4번째 자리에 "-"가 있거나 10자 이하로 작성되면 실행 x
        } else {
            // 실행될때  01012345678 을 010-1234-5678로 변환
            var fir_tel = tel.substring(0,3); // 010
            var sec_tel = tel.substring(3,7); // 1234
            var thi_tel = tel.substring(7,11); // 5678
            
            $("#user_tel").val(fir_tel + "-" + sec_tel + "-" + thi_tel);
        }
    });
    
	// 메일인증코드 입력란 숨김
	$("#divAuthCode").hide();
	// 기존 이메일 저장
    var originalEmail = "${loginInfo.user_email}".trim();
	
	// 인증메일 전송하기
    $("#btn_sendEmail").click(function() {
        var user_email = $("#user_email").val().trim();
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailPattern.test(user_email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            return false;
        }
        
        if(user_email == ""){
            alert("이메일을 입력해주세요");
            $("#user_email").focus();
            return false;
        }
        
        $.ajax({
            type: "POST",
            data: { send: user_email },
            url: "/send.do",
            dataType: "text",
            success: function(result){
                alert("이메일 전송완료");
                $("#divAuthCode").show();
            },
            error: function(){
                alert("이메일 전송 중 에러가 발생하였습니다");
            }
        });
    });
	
	// 메일인증확인
    $("#btn_checkCode").click(function(){
        var emailAuthCode = $("#emailAuthCode").val().trim();

        // 이메일 인증 코드 확인
        $.ajax({
            type: "POST",
            data: { emailAuthCode: emailAuthCode },
            url: "/checkEmailAuthCode.do",
            dataType: "text",
            success: function(result){
                if(result == "ok"){
                	alert("메일인증 완료되었습니다.");
                	$("#divAuthCode").hide();
                	originalEmail = $("#user_email").val().trim();
                } else {
                    alert("인증 코드가 맞지 않습니다.");
                }
            },
            error: function(){
                alert("error가 발생했습니다");
            }
        });
    });
	
    // 유효성 검사(전화번호, 주소, 이메일)
    function validateInput() {
    	var user_tel = $("#user_tel").val().trim();
        var user_address = $("#user_address").val().trim();
        var emailAuthCodeVisible = $("#divAuthCode").is(":visible");
        var newEmail = $("#user_email").val().trim();
        
        // 정규식
        var telPattern = /^\d{3}-\d{3,4}-\d{4}$/;
		
        if (user_tel == "") {
            alert("전화번호를 입력해주세요.");
            return false;
        }
        
        if (!telPattern.test(user_tel)) {
            alert("전화번호 형식을 맞춰주세요 예):010-0000-0000 ");
            return false;
        }
        
        if (user_address == "") {
            alert("주소를 입력해주세요.");
            $("#user_address").focus();
            return false;
        }
        
        if (emailAuthCodeVisible || originalEmail != newEmail ) {
            alert("메일 인증을 완료해주세요.");
            return false;
        }
        
        return true;
    }
    
	// 전화번호 중복 체크
    function checkDuplicateUserTel() {
    	var originalTel = "${loginInfo.user_tel}".trim();
    	var user_tel = $("#user_tel").val().trim();
    	
    	if (originalTel == user_tel) {
    		return true;
    	} else {
	        $.ajax({
	            type: "POST",
	            data: { user_tel: user_tel },
	            url: "/myPage/checkDupUserTel",
	            success: function(rData){
	            	console.log("rData:", rData);
	                if (rData == "duplicate") {
	                	alert("중복된 전화번호가 있습니다. 다시 확인해주세요.");
	                	return false;
	                } else {
	                	return true;
	                }
	            },
	            error: function(){
	                alert("전화번호 중복확인 중 에러가 발생하였습니다");
	                return false;
	            }
	        });
    	}
    }

    // 수정완료버튼 클릭
    $("#btn_submit").click(function(e) {
    	e.preventDefault();
    	
        if(!validateInput()){
        	return false;
        } 
        
        if(!checkDuplicateUserTel()) {
        	return false;
        }
    	
        var combinedAddress = $("#postcode").val() + '# ' + $("#address").val() + '# ' + $("#detailAddress").val();
        $("#user_address").val(combinedAddress);
    	// 폼 제출
        $("#formModify").submit();
    });
    
});
</script>

<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
<section class="ftco-section">
    <div class="container">
        <div class="row" style="margin-top: 50px;">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <h3>내 정보 수정</h3>
                <br>
                <div class="container">
                    <form id="formModify" action="/myPage/memberModify_submit" method="post">
                        <div class="form-group">
                            <label for="id">아이디</label>
                            <input type="text" class="form-control" id="user_id" name="user_id" value="${loginInfo.user_id}" readonly>
                        </div>
                        <div class="form-group">
                            <label for="pwd">비밀번호</label>
                            <div style="display: flex; align-items: center;">
                                <input type="password" class="form-control" id="user_pass" name="user_pass" value="${loginInfo.user_pass}" style="margin-right: 10px;" readonly>
                                <button type="button" id="pwdChange" class="btn btn-primary" style="flex-shrink: 0;">변경</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="name">이름</label>
                            <input type="text" class="form-control" id="user_name" name="user_name" value="${loginInfo.user_name}" readonly>
                        </div>
                        <div class="form-group">
                            <label for="phoneNumber">휴대폰 번호</label>
                            <input type="text" class="form-control" id="user_tel" name="user_tel" value="${loginInfo.user_tel}" required>
                        </div>
                        <div class="form-group">
                            <label for="email">이메일</label>
                            <div class="input-group" style="display: flex; align-items: center;">
	                            <input type="email" class="form-control" id="user_email" name="user_email" value="${loginInfo.user_email}" style="margin-right: 10px;" required>
	                        	<button type="button" class="btn btn-primary" id="btn_sendEmail">인증메일 전송</button>
                        	</div>
                        </div>
                        <div class="form-group" id="divAuthCode" style="display: flex; align-items: center;">
			                <label for="emailAuthCode" >인증코드 </label>
			                <input type="text" name="emailAuthCode" id="emailAuthCode" style="margin: 10px; width: 180px;">
                        	<button type="button" class="btn btn-primary" id="btn_checkCode">인증코드 확인</button>
			            </div>
                        <div class="form-group">
                            <label for="email">주소</label>
                            <div class="input-group" style="display: flex; align-items: center;">
                                <input type="text" class="form-control" id="postcode" style="margin-right: 10px;" required>
                                <span class="input-group-btn">
                                    <input type="button" onclick="openZipSearch()" value="우편번호 찾기" class="btn btn-primary">
                                </span>
                            </div>
                            <input type="text" class="form-control" id="address" required>
                            <input type="text" class="form-control" id="detailAddress" required>
                            <input type="hidden" id="user_address" name="user_address" value="${loginInfo.user_address}">
                        </div>
                        <hr>
                        <button type="submit" id="btn_submit" class="btn btn-primary">수정완료</button>
                    </form>
                </div>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
</section>

<!-- 비밀번호 변경 모달창 -->
<div class="modal fade" id="modal-pwdChangeForm" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="myModalLabel">비밀번호 변경</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <label for="pwd">현재 비밀번호</label>
                <input type="password" class="form-control" id="password1">
            </div>
            <div class="modal-body">
                <label for="pwd">새 비밀번호</label>
                <input type="password" class="form-control" id="newPassword">
                <div id="invalid-message1"></div>
            </div>
            <div class="modal-body">
                <label for="pwd">새 비밀번호 확인</label>
                <input type="password" class="form-control" id="confirmPassword">
                <div id="invalid-message2">비밀번호가 일치하지 않습니다.</div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" id="btn-pwdChange-save">저장</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            </div>
        </div>
    </div>
</div>
<!-- // 비밀번호 변경 모달창 -->

<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>
