<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>회원등록</title>
<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
<script>
$(function() {
    function validateInput() {
        var user_id = $("#user_id").val().trim();
        var user_pass = $("#user_pass").val().trim();
        var user_name = $("#user_name").val().trim();
        var user_tel = $("#user_tel").val().trim();
        var user_email = $("#user_email").val().trim();
        var emailAuthCode = $("#emailAuthCode").val().trim();
        var user_address = $("#user_address").val().trim();
        var termsChecked = $("#terms").is(":checked");

        /* 원래 정규식
        var idPattern = /^[a-zA-Z0-9]{5,}$/;
        var passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        var namePattern = /^[가-힣]{2,}$/;
        var telPattern = /^010-\d{4}-\d{4}$/;
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!idPattern.test(user_id)) {
            alert("아이디는 영문자와 숫자로 5자리 이상이어야 합니다.");
            return false;
        }
        if (!passPattern.test(user_pass)) {
            alert("비밀번호는 대문자 한 자리 이상, 소문자와 숫자를 포함하여 8자리 이상이어야 합니다.");
            return false;
        }
        if (!namePattern.test(user_name)) {
            alert("이름은 한글로 2글자 이상이어야 합니다.");
            return false;
        }
        if (!telPattern.test(user_tel)) {
            alert("연락처는 010-0000-0000 형식이어야 합니다.");
            return false;
        }
        if (!emailPattern.test(user_email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            return false;
        }
        if (emailAuthCode == "") {
            alert("이메일 인증코드를 받고 입력해주세요");
            $("#emailAuthCode").focus();
            return false;
        }
        if (user_address == "") {
            alert("주소를 입력해주세요.");
            $("#user_address").focus();
            return false;
        }
        if (!termsChecked) {
            alert("약관에 동의하셔야 합니다.");
            return false;
        }
        */

        /* 개발중에 쓸 정규식 */
        var idPattern = /^[a-zA-Z0-9]{2,}$/;
        var passPattern = /^[^\s]{2,16}$/;
        var namePattern = /^[가-힣]{2,}$/;
        var telPattern = /^\d{3}-\d{3,4}-\d{4}$/;
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!idPattern.test(user_id)) {
            alert("아이디는 영문자와 숫자로 2자리 이상이어야 합니다.");
            $("#user_id").focus();
            return false;
        }
        if (!passPattern.test(user_pass)) {
            alert("비밀번호는 공백 문자를 제외한 모든 문자로 이루어진 2~16자입니다.");
            $("#user_pass").focus();
            return false;
        }
        if (!namePattern.test(user_name)) {
            alert("이름은 한글로 2글자 이상이어야 합니다.");
            $("#user_name").focus();
            return false;
        }
        if (!telPattern.test(user_tel)) {
            alert("연락처 예):010-0000-0000 ");
            $("#user_tel").focus();
            return false;
        }
        if (!emailPattern.test(user_email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            $("#user_email").focus();
            return false;
        }
        if (emailAuthCode == "") {
            alert("이메일 인증코드를 받고 입력해주세요");
            $("#emailAuthCode").focus();
            return false;
        }
        if (user_address == "") {
            alert("주소를 입력해주세요.");
            $("#user_address").focus();
            return false;
        }
        if (!termsChecked) {
            alert("약관에 동의하셔야 합니다.");
            return false;
        }
        // 개발중에 쓸 정규식 종료

        return true;
    }

    function checkDuplicatesAndSubmit() {
        var user_id = $("#user_id").val().trim();
        var user_tel = $("#user_tel").val().trim();

        $.ajax({
            type: "POST",
            url: "checkDuplicates.do",
            data: {
                user_id: user_id,
                user_tel: user_tel
            },
            dataType: "json",
            success: function(response) {
                if (response.idExists) {
                    alert("중복된 아이디입니다.");
                    $("#user_id").focus();
                } else if (response.telExists) {
                    alert("중복된 전화번호입니다.");
                    $("#user_tel").focus();
                } else {
                    submitForm();
                }
            },
            error: function(xhr, status, error) {
                console.error("중복 확인 중 오류가 발생하였습니다.", xhr, status, error);
                alert("중복 확인 중 오류가 발생하였습니다.");
            }
        });
    }

    function submitForm() {
        combineAddress();

        var emailAuthCode = $("#emailAuthCode").val().trim();

        // 이메일 인증 코드 확인
        $.ajax({
            type: "POST",
            data: { emailAuthCode: emailAuthCode },
            url: "checkEmailAuthCode.do",
            dataType: "text",
            success: function(result){
                if(result == "ok"){
                    // 인증 코드가 맞으면 회원 가입 절차 진행
                    var formData = $("#frm").serializeArray();

                    $.ajax({
                        type: "POST",
                        data: $.param(formData),
                        url: "memberWriteSave.do",
                        dataType: "text",
                        success: function(result){
                            if(result == "ok"){
                                alert("저장 완료하였습니다.");
                                $("#frm")[0].reset();
                                location.href = "./";
                            } else {
                                alert("저장 실패하였습니다.");
                            }
                        },
                        error: function(){
                            alert("저장 중 오류가 발생하였습니다.");
                        }
                    });
                } else {
                    alert("인증 코드가 맞지 않습니다.");
                }
            },
            error: function(){
                alert("인증 코드 확인 중 오류가 발생하였습니다.");
            }
        });
    }

    // 전화번호 변환(user_tel)
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

    function combineAddress() {
        var postcode = $("#sample2_postcode").val().trim();
        var address = $("#sample2_address").val().trim();
        var detailAddress = $("#sample2_detailAddress").val().trim();
        var combinedAddress = postcode + '# ' + address + (detailAddress ? '# ' + detailAddress : '');
        $("#user_address").val(combinedAddress);
    }

    $("#btn_idChk").click(function(){
        var user_id = $("#user_id").val().trim();
        if(user_id == ""){
            alert("아이디를 입력해주세요");
            $("#user_id").focus();
            return false;
        }
        $.ajax({
            type: "POST",
            data: { user_id: user_id },
            url: "idChk.do",
            dataType: "text",
            success: function(result){
                if(result == "ok"){
                    alert("사용할 수 있는 아이디입니다.");
                } else {
                    alert("이미 등록된 아이디입니다.");
                }
            },
            error: function(){
                alert("아이디가 중복입니다.");
            }
        });
    });

    $("#btn_cancel").click(function(){
        window.location.href = "login.do";
    });

    $("#btn_submit").click(function(){
        if (!validateInput()) {
            return false;
        }

        checkDuplicatesAndSubmit();
    });

    $("#btn_sendEmail").click(function() {
        var user_email = $("#user_email").val().trim();
        if(user_email == ""){
            alert("이메일을 입력해주세요");
            $("#user_email").focus();
            return false;
        }
        $.ajax({
            type: "POST",
            data: { send: user_email },
            url: "send.do",
            dataType: "text",
            success: function(result){
                alert("이메일 전송완료");
            },
            error: function(){
                alert("이메일 전송 중 에러가 발생하였습니다");
            }
        });
    });

    $("#terms-link").click(function() {
        $("#terms-modal").dialog({
            modal: true,
            width: 600,
            height: 400,
            title: "약관 동의"
        });
    });
});

function sample2_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            if(data.userSelectedType === 'R'){
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
            }

            var combinedAddress = data.zonecode + '# ' + addr + '# ' + extraAddr;

            document.getElementById('sample2_postcode').value = data.zonecode;
            document.getElementById("sample2_address").value = addr;
            document.getElementById('user_address').value = combinedAddress;

            document.getElementById("sample2_detailAddress").focus();
        }
    }).open();
}
</script>
<style>
    body {
        font-size: 9pt;
        color: #333333;
        font-family: '맑은 고딕', Arial, sans-serif;
        background-color: #f8f9fa;
    }
    button {
    	font-weight: bold !important;
    	font-size: 18px !important;
	}
    .container1 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
        flex-direction: column;
    }
    .form-container {
        width: 600px;
        padding: 20px;
        border: 1px solid #ccc;
        background: white;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }
    .form-container h2 {
        margin-bottom: 20px;
        text-align: center;
    }
    .form-group {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
    }
    .form-group label {
        width: 150px;
        margin-right: 10px;
        text-align: left;
    }
    .form-group input,
    .form-group button {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .form-group button {
        background-color: #AB8212;
        color: white;
        border: none;
        cursor: pointer;
        margin-left: 10px;
    }
    .div_btn {
        display: flex;
        justify-content: center;
        gap: 20px;
    }
    .div_btn button {
        padding: 10px 20px;
        background-color: #AB8212;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 4px;
    }
    .address-group {
        display: flex;
        align-items: center;
        gap: 10px;
        width: calc(100% - 160px);
        margin-left: 160px;
    }
    .address-group input,
    .address-group button {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .address-group input {
        flex: 1;
    }
    .address-group button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }
    .address-group button:hover {
        background-color: #0056b3;
    }
    .address-group .fixed-width {
        width: 160px !important;
    }
    #terms-modal {
        display: none;
    }
    .ui-dialog-titlebar-close {
        background: url("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/base/images/ui-icons_777777_256x240.png") -95px -128px no-repeat !important;
        border: none;
    }
    .ui-dialog-titlebar-close:hover {
        background: url("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/base/images/ui-icons_ffffff_256x240.png") -95px -128px no-repeat !important;
    }
</style>
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>

<div class="container1">
    <div class="form-container">
        <h2>회원등록</h2>
        <form name="frm" id="frm">
            <div class="form-group">
                <label for="user_id">아이디</label>
                <input type="text" name="user_id" id="user_id" placeholder="아이디">
                <button type="button" id="btn_idChk">중복체크</button>
            </div>
            <div class="form-group">
                <label for="user_pass">패스워드</label>
                <input type="password" name="user_pass" id="user_pass">
            </div>
            <div class="form-group">
                <label for="user_name">이름</label>
                <input type="text" name="user_name" id="user_name" placeholder="이름">
            </div>
            <div class="form-group">
                <label for="user_tel">연락처</label>
                <input type="text" name="user_tel" id="user_tel" placeholder="예):010-0000-0000" required="required">
            </div>
            <div class="form-group">
                <label for="user_email">이메일</label>
                <input type="email" name="user_email" id="user_email" placeholder="이메일">
                <button type="button" id="btn_sendEmail">인증메일 전송</button>
            </div>
            <div class="form-group">
                <label for="emailAuthCode">인증코드</label>
                <input type="text" name="emailAuthCode" id="emailAuthCode" placeholder="인증코드">
            </div>
            <div class="form-group">
                <label for="sample2_postcode">주소</label>
                    <input type="text" id="sample2_postcode" placeholder="우편번호" readonly>
                    <button type="button" onclick="sample2_execDaumPostcode()">우편번호 찾기</button>
            </div>
                <div class="form-group address-group">
                    <input type="text" id="sample2_address" placeholder="주소" readonly>
                    <input type="text" id="sample2_detailAddress" placeholder="상세주소">
                </div>
                <input type="hidden" id="user_address" name="user_address">
            <div class="form-group" style="display:none;">
                <label for="user_authority">권한</label>
                <input type="text" name="user_authority" id="user_authority" value="1">
            </div>
            <div class="form-group">
                <input type="checkbox" id="terms" name="terms">
                <label for="terms">약관 동의 <a href="javascript:void(0);" id="terms-link">보기</a></label>
            </div>
        </form>
    </div>
    <div class="div_btn">
        <button type="button" id="btn_submit">저장</button>
        <button type="button" id="btn_cancel">취소</button>
    </div>
</div>

<div id="terms-modal" title="약관 동의">
    <%@ include file="/WEB-INF/views/include/terms.jsp" %>  
</div>
<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</body>
</html>