<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인</title>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet" />
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
$(function() {
    $("#btn_submit").click(function() {
        var user_id = $("#user_id").val();
        var user_pass = $("#user_pass").val();
        if (user_id == "") {
            alert("아이디를 입력해주세요");
            $("#user_id").focus();
            return false;
        }
        if (user_pass == "") {
            alert("패스워드를 입력해주세요");
            $("#user_pass").focus();
            return false;
        }

        $.ajax({
            type: "POST",
            data: { user_id: user_id, user_pass: user_pass },
            url: "loginProc.do",
            dataType: "text",
            success: function(result) {
                if (result == "ok") {
                    alert(user_id + "님 로그인에 성공하였습니다.");
                    $("#frm")[0].reset();
                    location.href = "./";
                } else if (result == "x") {
                    alert(user_id + " 해당 아이디는 없는 아이디입니다.");
                } else if (result == "wrong password") {
                    alert(user_id + "님 패스워드가 틀렸습니다.");
                } else if (result == "withdrawn") {
                    alert(user_id + "님은 탈퇴한 회원입니다.");
                }
            },
            error: function() {
                alert("에러가 발생하였습니다.");
            }
        });
    });

    // 네이버 로그인 버튼 클릭 이벤트
    $("#btn_naver_login").click(function(){
        window.location.href = "naverLogin.do";
    });

    $("#btn_sendEmail").click(function() {
        var user_email = $("#non_user_email").val().trim();
        if(user_email == ""){
            alert("이메일을 입력해주세요");
            $("#non_user_email").focus();
            return false;
        }
        $.ajax({
            type: "POST",
            data: { send: user_email },
            url: "send.do",
            dataType: "text",
            success: function(result){
                alert("이메일 전송 완료");
            },
            error: function(){
                alert("이메일 전송 중 에러가 발생하였습니다");
            }
        });
    });
});
</script>
<style>
body {
    font-size: 9pt;
    color: #333333;
    font-family: '맑은 고딕', Arial, sans-serif;
    background-color: #f8f9fa;
    height: 100%;
    display: flex;
    flex-direction: column;
}

button {
    	font-weight: bold !important;
    	font-size: 18px !important;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.form-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    margin-top: 50px;
}

.form-group button,
.btn {
    background-color: #AB8212;
    color: white;
    border: none;
    cursor: pointer;
    padding: 15px 0;
    border-radius: 4px;
    text-align: center;
    width: 100%;
    margin-top: 15px;
}

.form-group {
    margin-top: 20px;
}

.loginBtns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin-top: 20px;
}

.loginBtns a {
    color: black;
    text-decoration: none;
}

.loginBtns a:hover {
    text-decoration: underline;
}

.button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

.button-container .btn,
.button-container .naver-login-btn {
    width: 48%;
    padding: 15px;
}

.button-container .naver-login-btn img {
    width: 100%;
    height: 100%;
}

</style>
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>

<div class="container">
    <div class="form-container">
        <form name="frm" id="frm" class="bg-light p-3 contact-form">
            <div class="form-group">
                <label for="user_id" class="form-label">아이디</label>
                <input type="text" id="user_id" name="user_id" class="form-control" placeholder="아이디를 입력해주세요.">
            </div>
            <div class="form-group">
                <label for="user_pass" class="form-label">비밀번호</label>
                <input type="password" name="user_pass" id="user_pass" class="form-control" placeholder="비밀번호를 입력해주세요">
            </div>
            <div class="button-container">
                <button type="button" id="btn_submit" class="btn btn-primary" style="width:140px; height:56px; background-color: #AB8212;">로그인</button>
                <div class="naver-login-btn">
                    <a id="naver_login_link" href="naverLogin.do">
                        <img id="btn_naver_login" alt="네이버 로그인" src="/images/NaverBtn.png" style="margin-top:13px; width:140px; height: 56px;">
                    </a>
                </div>
            </div>
            <div class="loginBtns">
                <a href="memberWrite.do">회원가입</a>
                <a href="findIdPwForm.do">아이디/비밀번호 찾기</a>
            </div>
        </form>
    </div>
</div>

<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
<!-- ! -->
</body>
</html>