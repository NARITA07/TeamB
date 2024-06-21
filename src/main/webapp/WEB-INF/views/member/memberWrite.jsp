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
    function showError(elementId, message) {
        $("#" + elementId + "_error").text(message).show();
        $("#" + elementId).css("border", "2px solid red");
    }

    function hideError(elementId) {
        $("#" + elementId + "_error").hide();
        $("#" + elementId).css("border", "");
    }
	
    function validateField(field) {
        var isValid = true;
        var fieldId = $(field).attr('id');
        var value = $(field).val().trim();

        var patterns = {
            user_id: /^[a-zA-Z0-9]{2,}$/,
            user_pass: /^[^\s]{2,16}$/,
            user_name: /^[가-힣]{2,}$/,
            user_tel: /^\d{3}-\d{3,4}-\d{4}$/,
            user_email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            emailAuthCode: /.+/,
            user_address: /.+/,
            user_pass_check: /^[^\s]{2,16}$/
        };

        var messages = {
            user_id: "아이디는 영문자와 숫자로 2자리 이상이어야 합니다.",
            user_pass: "비밀번호는 공백 문자를 제외한 모든 문자로 이루어진 2~16자입니다.",
            user_name: "이름은 한글로 2글자 이상이어야 합니다.",
            user_tel: "연락처 예):010-0000-0000",
            user_email: "이메일 형식이 올바르지 않습니다.",
            emailAuthCode: "이메일 인증코드를 받고 입력해주세요",
            user_address: "주소를 입력해주세요.",
            user_pass_check: "비밀번호가 일치하지 않습니다."
        };

        if (!patterns[fieldId].test(value)) {
            showError(fieldId, messages[fieldId]);
            isValid = false;
        } else {
            hideError(fieldId);
        }

        if (fieldId === "user_pass_check") {
            var user_pass = $("#user_pass").val().trim();
            if (value !== user_pass) {
                showError("user_pass_check", "비밀번호가 일치하지 않습니다.");
                isValid = false;
            } else {
                hideError("user_pass_check");
            }
        }

        return isValid;
    }

    function validateInput() {
        var isValid = true;
        var user_id = $("#user_id").val().trim();
        var user_pass = $("#user_pass").val().trim();
        var user_pass_check = $("#user_pass_check").val().trim();
        var user_name = $("#user_name").val().trim();
        var user_tel = $("#user_tel").val().trim();
        var user_email = $("#user_email").val().trim();
        var emailAuthCode = $("#emailAuthCode").val().trim();
        var user_address = $("#user_address").val().trim();
        var termsChecked = $("#terms").is(":checked");

        var idPattern = /^[a-zA-Z0-9]{2,}$/;
        var passPattern = /^[^\s]{2,16}$/;
        var namePattern = /^[가-힣]{2,}$/;
        var telPattern = /^\d{3}-\d{3,4}-\d{4}$/;
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!idPattern.test(user_id)) {
            showError("user_id", "아이디는 영문자와 숫자로 2자리 이상이어야 합니다.");
            isValid = false;
        } else {
            hideError("user_id");
        }
        if (!passPattern.test(user_pass)) {
            showError("user_pass", "비밀번호는 공백 문자를 제외한 모든 문자로 이루어진 2~16자입니다.");
            isValid = false;
        } else {
            hideError("user_pass");
        }
        if (user_pass != user_pass_check) {
            showError("user_pass_check", "비밀번호가 일치하지 않습니다.");
            isValid = false;
        } else {
            hideError("user_pass_check");
        }
        if (!namePattern.test(user_name)) {
            showError("user_name", "이름은 한글로 2글자 이상이어야 합니다.");
            isValid = false;
        } else {
            hideError("user_name");
        }
        if (!telPattern.test(user_tel)) {
            showError("user_tel", "연락처 예):010-0000-0000 ");
            isValid = false;
        } else {
            hideError("user_tel");
        }
        if (!emailPattern.test(user_email)) {
            showError("user_email", "이메일 형식이 올바르지 않습니다.");
            isValid = false;
        } else {
            hideError("user_email");
        }
        if (emailAuthCode == "") {
            showError("emailAuthCode", "이메일 인증코드를 받고 입력해주세요");
            isValid = false;
        } else {
            hideError("emailAuthCode");
        }
        if (user_address == "") {
            showError("user_address", "주소를 입력해주세요.");
            isValid = false;
            $("#sample2_postcode, #sample2_address").css("border", "2px solid red");
        } else {
            hideError("user_address");
            $("#sample2_postcode, #sample2_address").css("border", "");
        }
        if (!termsChecked) {
            showError("terms", "약관에 동의하셔야 합니다.");
            isValid = false;
        } else {
            hideError("terms");
        }

        return isValid;
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
                    showError("user_id", "중복된 아이디입니다.");
                } else if (response.telExists) {
                    showError("user_tel", "중복된 전화번호입니다.");
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

        $.ajax({
            type: "POST",
            data: { emailAuthCode: emailAuthCode },
            url: "checkEmailAuthCode.do",
            dataType: "text",
            success: function(result){
                if(result == "ok"){
                    var formData = $("#frm").serializeArray();

                    $.ajax({
                        type: "POST",
                        data: $.param(formData),
                        url: "memberWriteSave.do",
                        dataType: "text",
                        success: function(result){
                            if(result == "ok"){
                                alert("회원가입이 완료 되었습니다.");
                                $("#frm")[0].reset();
                                location.href = "/login.do";
                            } else {
                                alert("회원가입에 실패하였습니다.");
                            }
                        },
                        error: function(){
                            alert("회원가입 중 오류가 발생하였습니다.");
                        }
                    });
                } else {
                    showError("emailAuthCode", "인증 코드가 맞지 않습니다.");
                }
            },
            error: function(){
                alert("인증 코드 확인 중 오류가 발생하였습니다.");
            }
        });
    }

    $("#user_tel").blur(function() {
        var tel = $("#user_tel").val().trim();
        if(tel.substr(3,1) == "-" || tel.length < 10 || tel == ""){ 
        } else {
            var fir_tel = tel.substring(0,3);
            var sec_tel = tel.substring(3,7);
            var thi_tel = tel.substring(7,11);
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
            showError("user_id", "아이디를 입력해주세요");
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
                    showError("user_id", "이미 등록된 아이디입니다.");
                }
            },
            error: function(){
                alert("아이디 중복 확인 중 오류가 발생하였습니다.");
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
            showError("user_email", "이메일을 입력해주세요");
            return false;
        }
        $.ajax({
            type: "POST",
            data: { send: user_email },
            url: "send.do",
            dataType: "text",
            success: function(result){
                alert("이메일 전송완료 되었습니다.");
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

	$("#terms").change(function() {
        if ($(this).is(":checked")) {
            hideError("terms");
        }
    });
	
    $("#user_id, #user_pass, #user_pass_check, #user_name, #user_tel, #user_email, #emailAuthCode").blur(function() {
        validateField(this);
    });

    $("#sample2_postcode, #sample2_address").change(function() {
        hideError("user_address");
        $("#sample2_postcode, #sample2_address").css("border", "");
    });
    
});

function sample2_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            var addr = ''; 
            var extraAddr = ''; 

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
			
		$("#sample2_postcode, #sample2_address").change();
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
        margin-bottom: 30px;
        text-align: center;
        font-size: 28px;
    }

    .form-group {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
    }
    .form-group label {
        width: 150px;
        padding-left:20px;
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
        background-color:  #c19f76;
        color: white;
        border: none;
        cursor: pointer;
        margin-left: 10px;
    }
    .form-group button:hover{
        background-color:  #c19f76;
    }

    .div_btn {
        display: flex;
        justify-content: center;
        gap: 20px;
    }
    .div_btn button {
        padding: 10px 20px;
        background-color: #766650;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 4px;
    }

    #user_agree_checkbox{
        margin-left: 130px;
    }

    .address-group {
        display: flex;
        align-items: center;
        gap: 10px;
        width: calc(100% - 149px);
        margin-left: 150px;
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
    .error-message {
        color: red;
        display: none;
        margin-left: 150px;
        font-size:15px;
    }
    .mg-bt{
    	margin-bottom:10px;
    }
</style>
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>

<div class="container1">
    <div class="form-container">
        <h2>회원등록</h2>
        <form name="frm" id="frm" >
            <div class="form-group">
                <label for="user_id">아이디</label>
                <input type="text" name="user_id" id="user_id" placeholder="아이디">
                <button type="button" id="btn_idChk">중복체크</button>
            </div>
            <div id="user_id_error" class="error-message mg-bt"></div>
            <div class="form-group">
                <label for="user_pass">비밀번호</label>
                <input type="password" name="user_pass" id="user_pass" placeholder="비밀번호">
            </div>
            <div id="user_pass_error" class="error-message mg-bt"></div>
            <div class="form-group">
                <label for="user_pass_check">비밀번호 확인</label>
                <input type="password" name="user_pass_check" id="user_pass_check" placeholder="비밀번호 확인">
            </div>
            <div id="user_pass_check_error" class="error-message mg-bt"></div>
            <div class="form-group">
                <label for="user_name">이름</label>
                <input type="text" name="user_name" id="user_name" placeholder="이름">
            </div>
            <div id="user_name_error" class="error-message mg-bt"></div>
            <div class="form-group">
                <label for="user_tel">연락처</label>
                <input type="text" name="user_tel" id="user_tel" placeholder="예):010-0000-0000" required="required">
            </div>
            <div id="user_tel_error" class="error-message mg-bt"></div>
            <div class="form-group">
                <label for="user_email">이메일</label>
                <input type="email" name="user_email" id="user_email" placeholder="이메일">
                <button type="button" id="btn_sendEmail">인증메일 전송</button>
            </div>
            <div id="user_email_error" class="error-message mg-bt"></div>
            <div class="form-group">
                <label for="emailAuthCode">인증코드</label>
                <input type="text" name="emailAuthCode" id="emailAuthCode" placeholder="인증코드">
            </div>
            <div id="emailAuthCode_error" class="error-message mg-bt"></div>
            <div class="form-group">
                <label for="sample2_postcode">주소</label>
                    <input type="text" id="sample2_postcode" placeholder="우편번호" readonly>
                    <button type="button" onclick="sample2_execDaumPostcode()">우편번호 찾기</button>
            </div>
            <div class="form-group address-group">
            	<input type="text" id="sample2_address" placeholder="주소" readonly>
            </div>
            <div class="form-group address-group">
                <input type="text" id="sample2_detailAddress" placeholder="상세주소">
            </div>
            <div id="user_address_error" class="error-message mg-bt"></div>
            <input type="hidden" id="user_address" name="user_address">
            <div class="form-group" style="display:none;">
                <label for="user_authority">권한</label>
                <input type="text" name="user_authority" id="user_authority" value="1">
            </div>
            <div class="form-group" id="user_agree_checkbox" style="margin-bottom:0px;">
                <label for="terms" ><input type="checkbox" id="terms" name="terms"><span style="margin-left:7px;">약관 동의</span><a href="javascript:void(0);" id="terms-link" style="color:#766650; border:3px solid #766650; padding:1px 7px 1px 7px; margin-left:7px;">보기</a></label>
            </div>
            <div id="terms_error" class="error-message"></div>
        </form>
    </div>
    <div class="div_btn">
        <button type="button" id="btn_submit">저장</button>
        <button type="button" id="btn_cancel" style="background-color:#6c757d;">취소</button>
    </div>
</div>

<div id="terms-modal" title="약관 동의">
    <%@ include file="/WEB-INF/views/include/terms.jsp" %>  
</div>
<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</body>
</html>