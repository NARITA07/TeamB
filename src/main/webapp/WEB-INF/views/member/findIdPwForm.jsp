<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html> 
<html>
<head>
    <meta charset="UTF-8">
    <title>아이디 및 비밀번호 찾기</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
        <script>
        $(document).ready(function() {
            // ID 찾기 폼 제출
            $("#findIdForm").submit(function(event) {
                event.preventDefault();

                var userName = $("#user_name_id").val().trim();
                var userEmail = $("#user_email_id").val().trim();
                var emailAuthCode = $("#emailAuthCode_id").val().trim();

                var namePattern = /^[가-힣]{2,}$/;
                var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (!namePattern.test(userName)) {
                    alert("이름은 한글로 2글자 이상이어야 합니다.");
                    $("#user_name_id").focus();
                    return false;
                }
                if (!emailPattern.test(userEmail)) {
                    alert("이메일 형식이 올바르지 않습니다.");
                    $("#user_email_id").focus();
                    return false;
                }
                if (emailAuthCode === "") {
                    alert("이메일 인증코드를 입력해주세요.");
                    $("#emailAuthCode_id").focus();
                    return false;
                }

                // Verify the email authentication code before proceeding
                $.ajax({
                    type: "POST",
                    url: "checkEmailAuthCode.do",
                    data: { emailAuthCode: emailAuthCode },
                    success: function(result) {
                        if (result === "ok") {
                            var formData = {
                                user_name: userName,
                                user_email: userEmail,
                                emailAuthCode: emailAuthCode
                            };

                            $.post("findId.do", formData, function(data) {
                                if (data === "not found") {
                                    alert("일치하는 정보의 ID는 없습니다.");
                                } else {
                                    $("#userId").text("찾으신 아이디: " + data);
                                    $("#userIdDiv").show();
                                }
                            });
                        } else {
                            alert("인증번호가 일치하지 않습니다. 다시 시도해주세요.");
                        }
                    },
                    error: function(xhr, status, error) {
                        alert("Error: " + error);
                    }
                });
            });

            // 이메일 인증 버튼 클릭 시
            $("#btn_sendEmail_id").click(function() {
                var userEmail = $("#user_email_id").val().trim();

                if (userEmail === "") {
                    alert("이메일을 입력해주세요.");
                    $("#user_email_id").focus();
                    return false;
                }

                $.ajax({
                    type: "POST",
                    data: { send: userEmail },
                    url: "send.do",
                    dataType: "text",
                    success: function(result) {
                        alert("이메일 전송 완료");
                    },
                    error: function() {
                        alert("이메일 전송 중 오류가 발생했습니다.");
                    }
                });
            });

            // 비밀번호 찾기 폼 제출
            $("#findPwForm").submit(function(event) {
                event.preventDefault();

                var userId = $("#user_id_pw").val().trim();
                var userName = $("#user_name_pw").val().trim();
                var userTel = $("#user_tel_pw").val().trim();
                var userEmail = $("#user_email").val().trim();
                var emailAuthCode = $("#emailAuthCode").val().trim();

                var idPattern = /^[a-zA-Z0-9]{5,}$/;
                var namePattern = /^[가-힣]{2,}$/;
                var telPattern = /^\d{3}-\d{3,4}-\d{4}$/;
                var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (!idPattern.test(userId)) {
                    alert("아이디는 영문자와 숫자로 5자리 이상이어야 합니다.");
                    $("#user_id_pw").focus();
                    return false;
                }
                if (!namePattern.test(userName)) {
                    alert("이름은 한글로 2글자 이상이어야 합니다.");
                    $("#user_name_pw").focus();
                    return false;
                }
                if (!telPattern.test(userTel)) {
                    alert("연락처는 010-0000-0000 형식이어야 합니다.");
                    $("#user_tel_pw").focus();
                    return false;
                }
                if (!emailPattern.test(userEmail)) {
                    alert("이메일 형식이 올바르지 않습니다.");
                    $("#user_email").focus();
                    return false;
                }
                if (emailAuthCode === "") {
                    alert("이메일 인증코드를 입력해주세요.");
                    $("#emailAuthCode").focus();
                    return false;
                }

                var formData = {
                    user_id: userId,
                    user_name: userName,
                    user_tel: userTel,
                    user_email: userEmail,
                    emailAuthCode: emailAuthCode
                };

                $.ajax({
                    type: "POST",
                    url: "findPw.do",
                    data: formData,
                    success: function(response) {
                        if (response === "found") {
                            // Proceed with password reset only if verification code matches
                            var enteredCode = $("#emailAuthCode").val();
                            $.ajax({
                                type: "POST",
                                url: "checkEmailAuthCode.do",
                                data: { emailAuthCode: enteredCode },
                                success: function(result) {
                                    if (result === "ok") {
                                        $("#resetPwModal").show();
                                        $("#modal_user_id").val(formData.user_id);
                                    } else {
                                        alert("인증번호가 일치하지 않습니다. 다시 시도해주세요.");
                                    }
                                },
                                error: function(xhr, status, error) {
                                    alert("Error: " + error);
                                }
                            });
                        } else {
                            alert("일치하는 정보가 없습니다. 다시 확인 해주세요.");
                        }
                    },
                    error: function(xhr, status, error) {
                        alert("Error: " + error);
                    }
                });
            });

            // 비밀번호 찾기 이메일 인증 버튼 클릭 시
            $("#btn_sendEmail").click(function() {
                var userEmail = $("#user_email").val().trim();

                if (userEmail === "") {
                    alert("이메일을 입력해주세요.");
                    $("#user_email").focus();
                    return false;
                }

                $.ajax({
                    type: "POST",
                    data: { send: userEmail },
                    url: "send.do",
                    dataType: "text",
                    success: function(result) {
                        alert("이메일 전송 완료");
                    },
                    error: function() {
                        alert("이메일 전송 중 오류가 발생했습니다.");
                    }
                });
            });
            
        	 // 전화번호 변환(user_tel)
            $("#user_tel_pw").blur(function() {
                var tel = $("#user_tel_pw").val().trim();
                if(tel.substr(3,1) == "-" || tel.length < 10 || tel == ""){ 
                    // 변수 tel 문자열 중 4번째 자리에 "-"가 있거나 10자 이하로 작성되면 실행 x
                } else {
                    // 실행될때  01012345678 을 010-1234-5678로 변환
                    var fir_tel = tel.substring(0,3); // 010
                    var sec_tel = tel.substring(3,7); // 1234
                    var thi_tel = tel.substring(7,11); // 5678
                    
                    $("#user_tel_pw").val(fir_tel + "-" + sec_tel + "-" + thi_tel);
                }
            });

            // 비밀번호 재설정 폼 제출
            $("#resetPwForm").submit(function(event) {
                event.preventDefault();

                var newPassword = $("#new_password").val().trim();
                var passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

                if (!passPattern.test(newPassword)) {
                    alert("비밀번호는 대문자 한 자리 이상, 소문자와 숫자를 포함하여 8자리 이상이어야 합니다.");
                    $("#new_password").focus();
                    return false;
                }

                // Check if verification code is correct before proceeding
                var enteredCode = $("#emailAuthCode").val();
                $.ajax({
                    type: "POST",
                    url: "checkEmailAuthCode.do",
                    data: { emailAuthCode: enteredCode },
                    success: function(result) {
                        if (result === "ok") {
                            // Proceed with password reset
                            var formData = {
                                user_id: $("#modal_user_id").val(),
                                new_password: newPassword
                            };
                            $.ajax({
                                type: "POST",
                                url: "resetPassword.do",
                                data: formData,
                                success: function(response) {
                                    if (response === "success") {
                                        $("#resetPwModal").hide();
                                        alert("비밀번호 변경 완료");
                                        window.location.href = "login.do";
                                    } else {
                                        alert("비밀번호 변경에 실패하였습니다.");
                                    }
                                },
                                error: function(xhr, status, error) {
                                    alert("Error: " + error);
                                }
                            });
                        } else {
                            alert("인증번호가 일치하지 않습니다. 다시 시도해주세요.");
                        }
                    },
                    error: function(xhr, status, error) {
                        alert("Error: " + error);
                    }
                });
            });

            $(".close-modal").click(function() {
                $("#resetPwModal").hide();
            });
        });
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
        .container {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin-top: 50px;
        }
        .form-container {
            width: 45%;
            padding: 20px;
            border: 1px solid #ccc;
            background: white;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            margin: 0 20px;
        }
        .form-container h2 {
            margin-bottom: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
        }
        .form-group input,
        .form-group button {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .form-group button {
            background-color: #AB8212;
            color: white;
            border: none;
            cursor: pointer;
        }
            #userIdDiv, #resetPwModal {
        display: none;
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        background: white;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        width: 18%;
    }

    #resetPwModal {
        position: absolute;
        top: 450px;
        left: 71%;
        transform: translate(-50%, -100%);
    }
        .close-modal {
            cursor: pointer;
            background: #ccc;
            padding: 5px 10px;
            border: none;
            border-radius: 4px;
        }
    </style>
</head>
<body>
        <%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
    <div class="container">
        <!-- ID 폼 -->
        <div class="form-container">
            <h2>아이디 찾기</h2>
            <form id="findIdForm" method="post">
                <div class="form-group">
                    <label for="user_name_id">이름:</label>
                    <input type="text" id="user_name_id" name="user_name">
                </div>
                <div class="form-group">
                    <label for="user_email_id">이메일:</label>
                    <input type="email" id="user_email_id" name="user_email" placeholder="이메일">
                </div>
                <div class="form-group">
                    <button type="button" id="btn_sendEmail_id">인증메일 전송</button>
                </div>
                <div class="form-group">
                    <label for="emailAuthCode_id">인증코드:</label>
                    <input type="text" name="emailAuthCode" id="emailAuthCode_id" placeholder="인증코드">
                </div>
                <div class="form-group">
                    <button type="submit">아이디 찾기</button>
                </div>
            </form>
            <div id="userIdDiv" style="width:98%;">
                <h2>찾으신 아이디</h2>
                <p id="userId"></p>
            </div>
        </div>

            <!-- 비밀번호 찾기 폼 -->
    <div class="form-container">
        <h2>비밀번호 찾기</h2>
        <form id="findPwForm" method="post">
            <div class="form-group">
                <label for="user_id_pw">아이디:</label>
                <input type="text" id="user_id_pw" name="user_id">
            </div>
            <div class="form-group">
                <label for="user_name_pw">이름:</label>
                <input type="text" id="user_name_pw" name="user_name">
            </div>
            <div class="form-group">
                <label for="user_tel_pw">전화번호:</label>
                <input type="text" id="user_tel_pw" name="user_tel">
            </div>
            <div class="form-group">
                <label for="user_email">이메일:</label>
                <input type="email" name="user_email" id="user_email" placeholder="이메일">
            </div>
            <div class="form-group">
                <button type="button" id="btn_sendEmail">인증메일 전송</button>
            </div>
            <div class="form-group">
                <label for="emailAuthCode">인증코드:</label>
                <input type="text" name="emailAuthCode" id="emailAuthCode" placeholder="인증코드">
            </div>
            <div class="form-group">
                <button type="submit">비밀번호 찾기</button>
            </div>
        </form>
    </div>
</div>

<!-- 비밀번호 재설정 모달 -->
<div id="resetPwModal">
    <h4>새로운 비밀번호를 <br> 입력하세요:</h4>
    <form id="resetPwForm" method="post">
        <input type="hidden" id="modal_user_id" name="user_id">
        <div class="form-group">
            <label for="new_password">새 비밀번호:</label>
            <input type="password" id="new_password" name="new_password">
        </div>
        <div class="form-group">
            <button type="submit">비밀번호 변경</button>
        </div>
    </form>
    <button class="close-modal">닫기</button>
</div>
<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
<!--!  -->
</body>
</html>
