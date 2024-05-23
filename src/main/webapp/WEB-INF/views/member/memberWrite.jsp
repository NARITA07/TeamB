<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원등록</title>
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
        var emailAuthCode = $("#emailAuthCode").val().trim();
        var user_email = $("#user_email").val().trim();

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
        if(user_email == ""){
            alert("이메일을 입력해주세요");
            $("#user_email").focus();
            return false;
        }
        if(emailAuthCode == ""){
            alert("이메일 인증코드를 입력해주세요");
            $("#emailAuthCode").focus();
            return false;
        }

        // 이메일 인증 코드 확인
        $.ajax({
            type: "POST",
            data: { emailAuthCode: emailAuthCode },
            url: "checkEmailAuthCode.do",
            dataType: "text",
            success: function(result){
                if(result == "ok"){
                    // 인증 코드가 맞으면 회원 가입 절차 진행
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
                            alert("1error가 발생하였습니다");
                        }
                    });
                } else {
                    alert("인증 코드가 맞지 않습니다.");
                }
            },
            error: function(){
                alert("2error가 발생하였습니다");
            }
        });
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
                <td>
                    <input type="email" name="user_email" id="user_email" placeholder="이메일">
                    <button type="button" id="btn_sendEmail">인증메일 전송</button>
                </td>
            </tr>
            <tr>
                <th><label for="emailAuthCode">인증코드</label></th>
                <td><input type="text" name="emailAuthCode" id="emailAuthCode" placeholder="인증코드"></td>
            </tr>
            <tr>
                <th><label for="user_address">주소</label></th>
                <td>
			        <input type="text" id="sample2_postcode" placeholder="우편번호">
			        <input type="button" onclick="sample2_execDaumPostcode()" value="우편번호 찾기"><br>
			        <input type="text" id="sample2_address" placeholder="주소"><br>
			        <input type="text" id="sample2_detailAddress" placeholder="상세주소">
			        <input type="hidden" id="user_address" name="user_address" readonly>
			    </td>
            </tr>
            <tr style="display:none;">
                <th><label for="user_authority">권한</label></th>
                <td><input type="text" name="user_authority" id="user_authority" value="1"></td>
            </tr>
        </table>
    </form>
    <div class="div_btn">
        <button type="button" id="btn_submit">저장</button>
        <button type="button" id="reset">취소</button>
    </div>
</div>

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
    // 우편번호 찾기 화면을 넣을 element
    var element_layer = document.getElementById('layer');

    function closeDaumPostcode() {
        // iframe을 넣은 element를 안보이게 한다.
        element_layer.style.display = 'none';
    }

    function sample2_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                }
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample2_postcode').value = data.zonecode;
                document.getElementById("sample2_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("sample2_detailAddress").focus();

                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_layer.style.display = 'none';
            },
            width : '100%',
            height : '100%',
            maxSuggestItems : 5
        }).embed(element_layer);

        // iframe을 넣은 element를 보이게 한다.
        element_layer.style.display = 'block';

        // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
        initLayerPosition();
    }
    
    function initLayerPosition(){
        var width = 300; //우편번호서비스가 들어갈 element의 width
        var height = 400; //우편번호서비스가 들어갈 element의 height
        var borderWidth = 5; //샘플에서 사용하는 border의 두께

        // 위에서 선언한 값들을 실제 element에 넣는다.
        element_layer.style.width = width + 'px';
        element_layer.style.height = height + 'px';
        element_layer.style.border = borderWidth + 'px solid';
        // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
        element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
        element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
    }

    document.getElementById('btn_submit').addEventListener('click', function() {
        var postcode = document.getElementById('sample2_postcode').value;
        var address = document.getElementById('sample2_address').value;
        var detailAddress = document.getElementById('sample2_detailAddress').value;
        var combinedAddress = postcode + '# ' + address + '# ' + detailAddress;
        
        document.getElementById('user_address').value = combinedAddress;
    });
</script>
</body>
</html>
