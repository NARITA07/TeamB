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
        var telPattern = /^010-\d{4}-\d{4}$/; // 수정된 정규식
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
            alert("연락처는 01012345678 형식이어야 합니다.");
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
            return false;
        }
        if (!passPattern.test(user_pass)) {
            alert("비밀번호는 공백 문자를 제외한 모든 문자로 이루어진 2~16자입니다.");
            return false;
        }
        if (!namePattern.test(user_name)) {
            alert("이름은 한글로 2글자 이상이어야 합니다.");
            return false;
        }
        if (!telPattern.test(user_tel)) {
            alert("연락처 예):01000000000 ");
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
        // 개발중에 쓸 정규식 종료

        return true;
    }

  //전화번호 변환(user_tel)
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
                alert("error가 발생하였습니다");
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
                            alert("error가 발생하였습니다");
                        }
                    });
                } else {
                    alert("인증 코드가 맞지 않습니다.");
                }
            },
            error: function(){
                alert("error가 발생하였습니다");
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
        width: 160px !important; /* Adjust width as needed */
    }
    #terms-modal {
        display: none;
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
    <p>제1장 개인정보수집


책방이 개인정보를 수집하는 목적은 이용자의 신분을 확인하고 이용자 개개인의 특성에 맞추어 보다 다양하고 광범위한 맞춤 서비스를 제공하도록 하기 위한 것입니다. 따라서 '서비스'가 이용자에 대해 알고 있는 정보가 풍부하고 정확할수록 서비스로부터 이용자들에게 더욱 적절하고 유용한 서비스를 제공받으실 수 있습니다.

제 1조: 수집하는 개인 정보의 범위 및 항목


1.개인정보 수집 범위 :  "책방"은 적법하고 공정한 수단에 의하여 본 서비스 계약의 성립 및 이행에 필요한 최소한의 개인정보만을 수집하며, 인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등 이용자의 기본적 인권을 현저하게 침해할 우려가 있는 개인정보는 이용자의 동의가 있거나 법률에 규정한 경우가 아니고는 수집하지 않습니다.

2. 개인정보 수집 항목 : 본 서비스를 위하여 수집하는 정보는 회원 등록시에 요청하는 이름, 주민등록번호, 성별, 생년월일, 우편번호, 주소 등과 같은 것들이 있습니다.
수집 방법은 이용자가 회원으로 가입할 때 본인 여부 확인을 위하여 개인의 이름, 주민등록번호 등의 정보를 제공하도록 요청하게 됩니다.
회원 등록을 하는 경우 이외에도 다음과 같은 경우에는 개인 정보를 요구할 수 있습니다. 이용자가 "책방"에서 개최하는 각종 퀴즈, 경품 이벤트나 공모전 등과 같은 각종 프로모션 행사에 참여할 때, "책방"를 통하여 물건을 구매할 때나 상품을 예약할 때, 게시판에 게시물 게재 등과 같이 서비스 이용을 위하여 정보 공개가 필요한 경우들이 해당됩니다.
이렇게 정보를 필요로 하는 때에는 이용자에게 정보 공개를 위한 허락을 받는 과정을 다시 한번 거치게 됩니다.
또한, 책방과 직접 연락을 취하는 경우에도 신원 확인을 위한 개인 정보를 요구할 수 있습니다. 서비스 개선이나 연구를 위하여 설문조사를 실시하는 경우에도 개인 정보를 수집할 수 있습니다.
이런 경우에는 '개인정보 보호 정책' 페이지를 링크하여 이용자들이 반드시 '서비스'의 개인정보 보호 정책을 이해하고 참여할 수 있도록 하였습니다.

3. 이용자의 동의절차와 그 예외: "책방"은 이용자의 개인정보를 수집하는 경우에 이용자의 서명날인, 전자서명, 전자우편, 동의함에 클릭하는 등의 이용자의 동의를 얻는 절차를 거칩니다.
 단, 다음 각호에 해당하는 경우에는 예외로 합니다.

1). 정보 통신망 이용촉진 등에 관한 법률 또는 기타 다른 법령 등에 특별한 규정이 있는 경우
2). 서비스 이용계약의 이행을 위하여 필요한 경우

제 2조 : 개인정보관련 기술적-관리적대책


1. 이용자들의 개인정보는 비밀번호에 의해 철저히 보호되고 있습니다.
"책방" 회원 아이디(ID)와 비밀번호는 본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를 알고 있는 본인에 의해서만 가능합니다.
따라서 이용자 여러분께서는 비밀번호를 누구에게도 알려주시면 안됩니다.
이를 위해 "책방" 에서는 기본적으로 PC에서의 사용을 마치신 후 온라인상에서 로그아웃 (LOG-OUT)하시고 웹브라우저를 종료하도록 권장합니다.
특히 다른 사람과 PC를 공유하여 사용하거나 공공장소(회사나 학교, 도서관, 인터넷 게임방 등)에서 이용한 경우에는 개인정보가 다른 사람에게 알려지는 것을 막기 위해 위와 같은 절차가 더욱 필요할 것입니다.

2. "책방"은 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.
개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 최신 백신프로그램을 이용하여 이용자들의 개인정보나 자료가 노출되거나 손상되지 않도록 방지하고 있으며, 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며, 기타 시스템적으로 안정성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.


제3조 : 쿠키(cookie)의 운영에 관한 사항


1. "책방"은 이용자들에게 원활한 서비스를 제공하기 위해서 이용자들의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
쿠키는 웹사이트를 운영하는데 이용되는 서버(HTTP)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 컴퓨터내의 하드디스크에 저장되기도 합니다.
이용자들은 "책방"에 접속한 후 로그인(LOG-IN)하여 회원제 서비스를 이용하기 위해서는 쿠키를 허용하셔야 합니다.
"책방"은 이용자들에게 적합하고 보다 유용한 서비스를 제공하기 위해서 쿠키를 이용하여 아이디에 대한 정보를 찾아냅니다.
쿠키를 이용하여 이용자들이 방문한 "책방"의 각 서비스에 대한 방문 및 이용형태, 이용자 규모 등을 파악하여 더욱 더 편리한 서비스를 만들어 제공할 수 있습니다.
이용자들은 쿠키에 대하여 사용여부를 선택할 수 있습니다. 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용할 수도 있고, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수도 있습니다.
다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 "책방"의 일부 서비스는 이용할 수 없습니다.



제2장 개인정보보호정책의 개정


"책방"은 이용자들의 사생활을 적극적, 효과적으로 보호하기 위하여 정보통신망 이용촉진 등에 관한법률 등 모든 관련법규를 준수하고자 본 개인 정보보호 정책을 만들어 실천하고 있으며 이러한 정책은 관련 법률 및 정부지침의 변경과 "책방" 내부의 방침 및 사정에 따라 수시로 개정될 수 있습니다. 변경된 사항은 정기적으로 방문하셔서 내용을 확인하시기 바랍니다.



제3장 개인정보 변경 및 보유 기간


제1조 : 언제든지 이용자 께서는 가입하신 ID와 비밀번호를 사용하여 "책방" 홈페이지에 있는 정보변경을 클릭하면 개인의 정보를 열람 또는 정정(수정)할 수 있습니다.
정보를 열람 및 정정(수정)시에는 항상 기존의 비밀번호나 새로운 비밀번호를 입력하셔야 합니다.


제2조 : 이용자가 "책방"을 방문하여 자신의 개인정보에 대한 열람, 정정 또는 삭제를 요구하는 경우에는 "책방"은 본인여부를 확인하고 지체없이 필요한 조치를 취합니다.
또한, 이용자는 위의 방법을 통하여 자신의 개인정보에 대한 열람, 정정 또는 삭제를 요청할 수 있고 "책방"은 요청의 진위를 확인 후 지체 없이 필요한 조치를 취합니다.
이용자의 요청에 의해 해지 또는 삭제된 개인정보 그리고 개인정보의 수집목적 또는 제공받은 목적이 달성된 개인정보는 지체 없이 파기되고 어떠한 용도로도 열람 또는 이용할 수 없도록 처리됩니다.




제4장  제3자에 대한 정보제공


"책방"은 법령에 근거한 다음의 경우를 제외하고는 제3자에게 개인정보를 제공하지 않습니다.


 제1조 : 금융실명거래및비밀보장에관한법률, 신용정보의이용및보호에관한법률, 전기통신기본법, 전기통신사업법,지방세법, 소비자보호법, 한국은행법, 형사소송법 등 법령에 특별한 규정이   있는 경우 (법령에 따라 행정관청 또는 수사기관이 요구해 온 경우라도 무조건 개인정보를  제공하지 않으며, 법령에 규정된 바에 따라 영장 또는 기관장의 직인이 날인된 서면에 의한 경우 에만 제공합니다.)

 제2조: 서비스 제공에 따른 요금정산을 위하여 필요한 경우

 제3조 : 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로써 특정 개인을 식별할 수 없는 형태로 제공하는 경우(이경우 홈페이지 공고를 통한 의견 수렴후 진행)



 제5장  수집하는 개인정보의 보유기간 및 이용기간


이용자가 "책방"의 회원으로서 "책방"에서 제공하는 서비스를 이용하는 동안 "책방"은
이용자들의 개인정보를 계속적으로 보유하며 서비스 제공 등을 위해 이용합니다.

다만, 다음과 같이 개인정보의 수집 목적 또는 제공받은 목적이 달성되면, 개인정보를 파기합니다.

1. 회원가입정보 : 회원가입을 탈퇴하거나 회원에서 제명된 때

2. 대금지급정보: 대금의 완제일 또는 채권소멸시효기간의 만료된 때

3. 배송정보 : 물품 또는 서비스가 인도되거나 제공된 때 (단, 상법 등 법령의 규정에 의하여 보존할 필요성이 있는 경우에는 예외로 합니다.)



제6장  추가정보


"책방"에서는 개인정보를 고객 지원실에서 관리하며, 연락처는 다음과 같습니다.


고객지원실 : 
E-mail : leejw144@naver.com</p>
</div>

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</body>
</html>