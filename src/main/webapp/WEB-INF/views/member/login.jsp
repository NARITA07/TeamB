<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인</title>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<link href="css/style.css" rel="stylesheet" />
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
$(function() {
    $("#btn_submit").click(function(){
        var user_id = $("#user_id").val();
        var user_pass = $("#user_pass").val();
        if(user_id == ""){
            alert("아이디를 입력해주세요");
            $("#user_id").focus();
            return false;
        }
        if(user_pass == ""){
            alert("패스워드를 입력해주세요");
            $("#user_pass").focus();
            return false;
        }

        $.ajax({
            type:"POST",
            data:"user_id="+user_id+"&user_pass="+user_pass,
            url:"loginProc.do",
            dataType:"text",
            success:function(result){
                if(result == "ok"){
                    alert(user_id + "님 로그인에 성공하였습니다.");
                    $("#frm")[0].reset();
                    location.href="./";
                }else if(result == "x"){
                    alert(user_id + " 해당아이디는 없는 아이디입니다");
                }else{
                    alert(user_id + "님 패스워드가 틀렸습니다");
                }
            },
            error:function(){
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

    document.getElementById('sample2_execDaumPostcode').addEventListener('click', function() {
        new daum.Postcode({
            oncomplete: function(data) {
                var addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                var extraAddr = '';

                if (data.userSelectedType === 'R') {
                    if (data.bname && /[동|로|가]$/g.test(data.bname)) extraAddr += data.bname;
                    if (data.buildingName && data.apartment === 'Y') extraAddr += (extraAddr ? ', ' + data.buildingName : data.buildingName);
                    if (extraAddr) extraAddr = ' (' + extraAddr + ')';
                }

                var combinedAddress = data.zonecode + '# ' + addr + '# ' + extraAddr + (extraAddr ? ', ' : '') + document.getElementById("sample2_detailAddress").value;

                document.getElementById('sample2_postcode').value = data.zonecode;
                document.getElementById('sample2_address').value = addr;
                document.getElementById('non_user_address').value = combinedAddress;
                document.getElementById('sample2_detailAddress').focus();
            }
        }).open();
    });
});
</script>
<style>
.naver-login-img {
    display: inline-block;
    height: 56px;
    padding: 0;
    margin-left: 10px;
    margin-top: 15px;
}

.form-group {
    display: flex;
    align-items: center;
    justify-content: center;
}

#userIdDiv, #resetPwModal {
    display: none;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    width: 40%;
}

#resetPwModal {
    position: fixed;
    top: 178px;
    left: 68%;
    transform: translate(-50%, -50%);
}

.close-modal {
    cursor: pointer;
}

.form-group button,
.btn {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 4px;
    text-align: center;
    width: auto;
    margin-top: 15px;
}

.form-group {
    margin-top: 20px;
}

.contact-info {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loginBtns {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loginBtns a {
    margin: 0 20px;
}

.contact-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.contact-form .form-group {
    width: 100%;
}
</style>
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>

<section class="ftco-section contact-section">
    <div class="container">
        <div class="row d-flex mb-5 contact-info">
            <div class="col-md-6 block-9 mb-md-5" style="margin:auto;">
                <form name="frm" id="frm" class="bg-light p-5 contact-form">
                    <div class="form-group">
                        <label for="user_id" style="width:100px;">아이디</label> 
                        <input type="text" id="user_id" name="user_id" class="form-control" placeholder="아이디를 입력해주세요."> 
                        <input type="hidden" id="user_id" class="idmessage" value="아이디 입력해주세요" readonly>
                    </div>
                    <div class="form-group">
                        <label for="user_pass" style="width:100px;">비밀번호</label> 
                        <input type="password" name="user_pass" id="user_pass" class="form-control" placeholder="비밀번호를 입력해주세요">
                    </div>
                    <div class="form-group">
                        <input type="button" id="btn_submit" value="로그인" class="btn btn-primary py-3 px-5">
                        <a id="naver_login_link" href="naverLogin.do">
                            <img id="btn_naver_login" alt="logo" src="/images/NaverBtn.png" class="naver-login-img">
                        </a>
                    </div>
                    <div class="loginBtns" style="margin-top:20px;">
                        <a href="memberWrite.do">회원가입</a>
                        <a href="findIdPwForm.do">아이디/비밀번호 찾기</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>