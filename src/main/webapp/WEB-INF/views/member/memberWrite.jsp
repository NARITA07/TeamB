<%@ page language="java" pageEncoding="utf-8"%>  
  <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원등록</title>
<!-- Add the required jQuery UI CSS and JavaScript links -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
<script>
$(function() {
    // 중복 확인
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
                alert("error가 발생하였습니다");
            }
        });
    });
    
    $("#reset").click(function(){
        $("#frm")[0].reset();
    });
    
    $("#btn_submit").click(function(){
        var user_id = $("#user_id").val().trim();
        var user_pass = $("#user_pass").val().trim();
        var user_name = $("#user_name").val().trim();
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
        if(user_name == ""){
            alert("이름을 입력해주세요");
            $("#user_name").focus();
            return false;
        }
        $("#user_id").val(user_id);
        $("#user_pass").val(user_pass);
        $("#user_name").val(user_name);
        
        var formData = $("#frm").serialize();
        $.ajax({
            type: "POST",
            data: formData,
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
                alert("error가 발생하였습니다");
            }
        });
    });
});
</script>
<style>
.header { text-align: right; }
.margin-right { margin-right: 20px; }
body { font-size: 9pt; color: #333333; font-family: 맑은 고딕; }
a { text-decoration: none; }
table {
    width: 600px;
    margin: auto;
    border-collapse: collapse;
}
th, td {
    border: 1px solid #cccccc;
    padding: 3px;
    line-height: 2;
}
.div_btn {
    width: 600px;
    text-align: center;
    margin: auto;
}
caption {
    font-size: 15px;
    font-weight: bold;
    margin-top: 10px;
    padding-bottom: 5px;
}
</style>
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
<div class="container">
    <form name="frm" id="frm">
        <table>
            <tr>
                <th><label for="user_id">아이디</label></th>
                <td><input type="text" name="user_id" id="user_id" placeholder="아이디">
                <button type="button" id="btn_idChk">중복체크</button>
                </td>
            </tr>
            <tr>
                <th><label for="user_pass">패스워드</label></th>
                <td><input type="password" name="user_pass" id="user_pass"></td>
            </tr>
            <tr>
                <th><label for="user_name">이름</label></th>
                <td><input type="text" name="user_name" id="user_name" placeholder="이름"></td>
            </tr>
            <tr>
                <th><label for="user_tel">연락처</label></th>
                <td><input type="text" name="user_tel" id="user_tel" placeholder="예):010-0000-0000"></td>
            </tr>
            <tr>
                <th><label for="user_email">이메일</label></th>
                <td><input type="text" name="user_email" id="user_email" placeholder="이메일"></td>
            </tr>
            <tr>
                <th><label for="user_address">주소</label></th>
                <td><input type="text" name="user_address" id="user_address"></td>
            </tr>
            <tr style="display:none;">
                <th><label for="user_authority">권한</label></th>
                <td><input type="text" name="user_authority" id="user_authority" value="1"></td>
            </tr>
        </table>
        <div class="div_btn">
            <button type="button" name="btn_submit" id="btn_submit">저장</button>
            <button type="reset">초기화</button>
        </div>
    </form>
</div>
</body>
</html>
  