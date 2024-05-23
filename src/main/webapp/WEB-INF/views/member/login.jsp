<%@ page language="java" pageEncoding="utf-8"%>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인</title>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<link href="css/style.css" rel="stylesheet" />
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

    $("#btn_non_member").click(function(){
        var user_name = $("#non_user_name").val();
        var user_tel = $("#non_user_tel").val();
        var user_email = $("#non_user_email").val();
        var user_address = $("#non_user_address").val();
        if(user_name == "" || user_tel == "" || user_email == "" || user_address == ""){
            alert("모든 필드를 입력해주세요");
            return false;
        }

        $.ajax({
            type:"POST",
            data: { user_name: user_name, user_tel: user_tel, user_email: user_email, user_address: user_address },
            url:"nonMemberLogin.do",
            dataType:"text",
            success:function(result){
                if(result == "inserted" || result == "updated"){
                    alert(user_name + "님 비회원 로그인에 성공하였습니다.");
                    $("#frm_non_member")[0].reset();
                    location.href="./";
                } else {
                    alert("비회원 로그인에 실패하였습니다.");
                }
            },
            error:function(){
                alert("에러가 발생하였습니다.");
            }
        });
    });
});
</script>
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>

<section class="ftco-section contact-section">
    <div class="container">
        <div class="row d-flex mb-5 contact-info">
            <div class="col-md-6 block-9 mb-md-5">
                <form name="frm" id="frm" class="bg-light p-5 contact-form">
                    <div class="form-group">
                        <label for="user_id">아이디</label> 
                        <input type="text" id="user_id" name="user_id" class="form-control" placeholder="아이디를 입력해주세요."> 
                        <input type="hidden" id="user_id" class="idmessage" value="아이디 입력해주세요" readonly>
                    </div>
                    <div class="form-group">
                        <label for="user_pass">비밀번호</label> 
                        <input type="password" name="user_pass" id="user_pass" class="form-control" placeholder="비밀번호를 입력해주세요">
                    </div>
                    <div class="form-group">
                        <input type="button" id="btn_submit" value="로그인" class="btn btn-primary py-3 px-5">
                        <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=71bd349e9c720af296b576faee206eaf&redirect_uri=http://localhost:8082/kakao"><img alt="카카오로그인" src="/images/kakao_login.png"/></a>
                    </div>
                    <div class="row d-flex mb-5 contact-info" style="justify-content: center; align-items: center;">
					<div class="loginBtns" style="display: flex;">
						<a href="memberWrite.do" style="margin-right: 80px;">회원가입</a>
						<a href="findIdForm.do" style="margin-right: 20px;">아이디찾기</a> 
						<a href="findPwForm.do">비밀번호찾기</a>
					</div>
					</div>
                </form>
            </div>

            <div class="col-md-6 block-9 mb-md-5">
                <form name="frm_non_member" id="frm_non_member" class="bg-light p-5 contact-form">
                    <div class="form-group">
                        <label for="non_user_name">이름</label> 
                        <input type="text" id="non_user_name" name="non_user_name" class="form-control" placeholder="이름을 입력해주세요."> 
                    </div>
                    <div class="form-group">
                        <label for="non_user_tel">전화번호</label> 
                        <input type="text" id="non_user_tel" name="non_user_tel" class="form-control" placeholder="전화번호를 입력해주세요."> 
                    </div>
                    <div class="form-group">
                        <label for="non_user_email">이메일</label> 
                        <input type="email" id="non_user_email" name="non_user_email" class="form-control" placeholder="이메일을 입력해주세요.">
                    </div>
                    
                    <div class="form-group">
                        <label for="non_user_address">주소</label> 
                        <input type="text" id="non_user_address" name="non_user_address" class="form-control" placeholder="주소를 입력해주세요.">
                    </div>
                    <div class="form-group" style="display:none;">
                        <label for="user_authority">권한</label> 
                        <input type="text" id="user_authority" name="user_authority" class="form-control" value="0">
                    </div>
                    <div class="form-group">
                        <input type="button" id="btn_non_member" value="비회원 로그인" class="btn btn-primary py-3 px-5">
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>