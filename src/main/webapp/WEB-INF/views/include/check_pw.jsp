<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script>

	// 비밀번호 변경 유효성 검사 모듈
	$(function() {
	    // 검사 결과 저장 객체
	    var valid = {
	        newPWValid:false,
	        confirmPWValid:false,
	        isAllValid:function() {
				return this.newPWValid && this.confirmPWValid;
			}
	    }
	
		// 비밀번호 유효성 검사
		$("#newPassword").blur(function() {
			var regex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*?=+_-])[A-Za-z0-9!@#$%^&*?=+_-]{8,16}$/i;
		    var isValid = regex.test($(this).val());
		    valid.newPWValid = isValid;
		    var $invalidMessage1 = $(this).siblings('#invalid-message1');
		    if (!isValid) {
		        $invalidMessage1.text("비밀번호는 영문 대/소문자, 숫자, 특수문자를 1개 이상 포함한 8~16자입니다."); // 유효한 경우 텍스트 설정
		        $invalidMessage1.show(); // 유효하지 않은 경우 메시지 표시
		    } else {
		        $invalidMessage1.text("사용가능한 비밀번호입니다."); // 유효한 경우 텍스트 설정
		        $invalidMessage1.show(); // 유효한 경우 메시지 표시
		    }
		});
		
		// 비밀번호 확인 유효성 검사
		$("#confirmPassword").blur(function() {
		    var newPassword = $("#newPassword").val();
		    var confirmPassword = $(this).val();
		    var isEmpty = !newPassword;
		    var isValid = newPassword == confirmPassword;
		    var $invalidMessage2 = $(this).siblings('#invalid-message2');
		    var $invalidMessage3 = $(this).siblings('#invalid-message3');
		    if (isEmpty) {
		        $invalidMessage2.hide(); // 비밀번호가 비어있을 때 메시지 숨김
		        $invalidMessage3.show(); // 비밀번호가 비어있을 때 메시지 표시
		    } else if (!isValid) {
		        $invalidMessage2.text("비밀번호가 일치하지 않습니다."); // 비밀번호 일치하지 않음 텍스트 설정
		        $invalidMessage2.show(); // 비밀번호 일치하지 않음 메시지 표시
		        $invalidMessage3.hide(); // 비밀번호가 비어있을 때 메시지 숨김
		    } else {
		        $invalidMessage2.text("비밀번호가 일치합니다."); // 유효성 검사 통과한 경우 텍스트 설정
		        $invalidMessage2.show(); // 유효성 검사 통과한 경우 메시지 표시
		        $invalidMessage3.hide(); // 유효성 검사 통과한 경우 메시지 숨김
		    }
		});
	});

	// 비밀번호 변경 폼 제출 전 유효성 검사
	function validatePasswordChangeForm() {
		function sha256(password) {
	    		return CryptoJS.SHA256(password).toString();
			}
	
		var password = $("#mem_pw").val();
	    var password1 = $("#password1").val();
	    var newPassword = $("#newPassword").val();
	    var confirmPassword = $("#confirmPassword").val();
	    
	    var shaPassword1 = sha256(password1);
	    var shaNewPassword = sha256(newPassword);
	    var shaConfirmPassword = sha256(confirmPassword);
	    
	
	    var isFormValid = true;
	
	    if (password1=="" || newPassword=="" || confirmPassword==""){
	        isFormValid = false;
	        alert("비밀번호를 입력하세요");
	    } else if (shaNewPassword != shaConfirmPassword) {
	        isFormValid = false;
	        alert("변경할 비밀번호가 서로 일치하지 않습니다.");
	    } else if (password == shaNewPassword && password == shaConfirmPassword) {
	        isFormValid = false;
	        alert("이전에 사용했던 비밀번호는 사용할 수 없습니다.");
	    } else if (password != shaPassword1) {
	        isFormValid = false;
	        alert("기존 비밀번호와 일치하지 않습니다.");
	    } else if (password == shaPassword1 && password != shaNewPassword && password != shaConfirmPassword) {
	        if(confirm("비밀번호를 변경하시겠습니까?")) {
		        isFormValid = true;
		        console.log("비밀번호 변경 진행");
	        } else {
		        isFormValid = false;
		        console.log("비밀번호 변경 취소");
	        }
	    }
	    
	    if (isFormValid) {
	        // 폼 유효성 검사를 통과한 경우에만 변경 요청을 보냄
	        submitPasswordChangeForm(password, shaNewPassword);
	    }
	}

	// 폼 제출 함수
	function submitPasswordChangeForm(password, shaNewPassword) {
	    console.log("비밀번호 변경 진행");
	
	    // PWchangeDTO 객체 생성
	    var pwChangeDTO = {
	        "mem_id": $("#mem_id").val(),
	        "password": password,
	        "newPassword": shaNewPassword
	    };
	
		// 서버에 PUT 요청 보내기
	    $.ajax({
	        method: "PUT",
	        url: "/myPage/pwdChange",
	        contentType: "application/json",
	        // PWchangeDTO 객체를 JSON 문자열로 변환하여 전송
	        data: JSON.stringify(pwChangeDTO),
	        success: function(rData) {
	            console.log("rData:", rData);
	            console.log("비밀번호 변경 success");
	            if (rData == "success") {
	                alert("비밀번호 변경 완료!");
	                $('#modal-pwdChangeForm').modal('hide');
	                $('#modal-pwdChangeForm').on('hidden.bs.modal', function (e) {
	                    // 페이지 새로고침
	                    location.href="/myPage/myPageInfo_modify";
	                });
	            } else {
	                alert("비밀번호 변경 실패!");
	            }
	        },
	        error: function(xhr, status, error) {
	            alert("비밀번호 변경 실패!");
	            console.error("비밀번호 변경 실패", error);
	        }
	    });
	}
</script>