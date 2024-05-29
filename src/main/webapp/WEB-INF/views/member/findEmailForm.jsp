<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>이메일 찾기</title>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script>
$(function() {
    // 비회원 이메일 찾기 버튼 클릭 이벤트
    $("#btn_non_member_find_email").click(function(){
        var user_name = $("#non_find_name").val();
        var user_tel = $("#non_find_tel").val();

        if(user_name == ""){
            alert("이름을 입력해주세요");
            $("#non_find_name").focus();
            return false;
        }
        if(user_tel == ""){
            alert("전화번호를 입력해주세요");
            $("#non_find_tel").focus();
            return false;
        }

        $.ajax({
            type: "POST",
            data: { user_name: user_name, user_tel: user_tel },
            url: "findNonMemberEmail.do",
            dataType: "text",
            success: function(result){
                if(result != "not found") {
                    $("#result_email").text("비회원님의 이메일은 " + result + " 입니다.");
                } else {
                    $("#result_email").text("입력하신 정보와 일치하는 이메일이 없습니다.");
                }
                $("#result_div").show();
            },
            error: function(){
                alert("에러가 발생하였습니다.");
            }
        });
    });
});
</script>
<style>
    .form-group {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .form-group label {
        width: 100px;
    }

    .form-group input {
        flex: 1;
    }

    .btn {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

    .btn-primary {
        background-color: #007bff;
    }

    .btn:hover {
        background-color: #0056b3;
    }

    #result_div {
        display: none;
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        background: white;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    }

    .contact-section {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .contact-info {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .block-9 {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 500px;
    }

    .contact-form {
        width: 100%;
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
    }
</style>
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>

<section class="ftco-section contact-section">
    <div class="container">
        <div class="row d-flex mb-5 contact-info">
            <div class="col-md-6 block-9 mb-md-5">
                <form name="frm_non_member_find" id="frm_non_member_find" class="bg-light p-5 contact-form">
                    <h2>이메일 찾기</h2>
                    <div class="form-group">
                        <label for="non_find_name">이름</label> 
                        <input type="text" id="non_find_name" name="non_find_name" class="form-control" placeholder="이름을 입력해주세요."> 
                    </div>
                    <div class="form-group">
                        <label for="non_find_tel">전화번호</label> 
                        <input type="text" id="non_find_tel" name="non_find_tel" class="form-control" placeholder="전화번호를 입력해주세요."> 
                    </div>
                    <div class="form-group">
                        <input type="button" id="btn_non_member_find_email" value="이메일 찾기" class="btn btn-primary py-3 px-5" style=" margin-left: 150px; margin-right: 150px;">
                    </div>
                </form>
                <div id="result_div">
                    <p id="result_email"></p>
                </div>
            </div>
        </div>
    </div>
</section>

<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>