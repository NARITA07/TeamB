<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html> 
<html>
<head>
<meta charset="UTF-8">
<title>아이디 및 비밀번호 찾기</title>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script>
    $(document).ready(function() {
        function showError(elementId, message) {
            $("#" + elementId + "_error").text(message).show();
            $("#" + elementId).css("border", "2px solid red").focus();
        }

        function hideError(elementId) {
            $("#" + elementId + "_error").hide();
            $("#" + elementId).css("border", "");
        }

        // ID 찾기 폼 제출
        $("#findIdForm").submit(function(event) {
            event.preventDefault();

            var userName = $("#user_name_id").val().trim();
            var userEmail = $("#user_email_id").val().trim();
            var emailAuthCode = $("#emailAuthCode_id").val().trim();

            var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (userName == "") {
                alert("이름을 입력해주세요");
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
                    alert("이메일 전송이 되었습니다.");
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

            var telPattern = /^\d{3}-\d{3,4}-\d{4}$/;
            var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (userId == "") {
                alert("아이디를 입력해주세요");
                $("#user_id_pw").focus();
                return false;
            }
            if (userName == "") {
                alert("이름을 입력해주세요");
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
                    alert("이메일 전송이 완료 되었습니다.");
                },
                error: function() {
                    alert("이메일 전송 중 오류가 발생했습니다.");
                }
            });
        });

        // 전화번호 변환(user_tel)
        $("#user_tel_pw").blur(function() {
            var tel = $("#user_tel_pw").val().trim();
            if (tel.substr(3, 1) == "-" || tel.length < 10 || tel == "") {
                // 변수 tel 문자열 중 4번째 자리에 "-"가 있거나 10자 이하로 작성되면 실행 x
            } else {
                // 실행될때  01012345678 을 010-1234-5678로 변환
                var fir_tel = tel.substring(0, 3); // 010
                var sec_tel = tel.substring(3, 7); // 1234
                var thi_tel = tel.substring(7, 11); // 5678

                $("#user_tel_pw").val(fir_tel + "-" + sec_tel + "-" + thi_tel);
            }
        });

        // 비밀번호 재설정 폼 제출
        $("#resetPwForm").submit(function(event) {
            event.preventDefault();

            var newPassword = $("#new_password").val().trim();
            var newPasswordCheck = $("#new_password_check").val().trim();
            var passPattern = /^[^\s]{2,16}$/;

            if (!passPattern.test(newPassword)) {
                showError("new_password", "비밀번호는 공백을 제외하고 2자리 이상 16자리 이하이어야 합니다.");
                return false;
            } else {
                hideError("new_password");
            }

            if (newPassword !== newPasswordCheck) {
                showError("new_password_check", "비밀번호가 일치하지 않습니다.");
                return false;
            } else {
                hideError("new_password_check");
            }

            var enteredCode = $("#emailAuthCode").val();
            $.ajax({
                type: "POST",
                url: "checkEmailAuthCode.do",
                data: { emailAuthCode: enteredCode },
                success: function(result) {
                    if (result == "ok") {
                        var formData = {
                            user_id: $("#modal_user_id").val(),
                            new_password: newPassword
                        };
                        $.ajax({
                            type: "POST",
                            url: "resetPassword.do",
                            data: formData,
                            success: function(response) {
                                if (response == "success") {
                                    $("#resetPwModal").hide();
                                    alert("비밀번호 변경 완료되었습니다.");
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

        $(".close-modal").click(function(event) {
            event.preventDefault();
            $("#resetPwModal").hide();
        });
        
        $("#new_password, #new_password_check").blur(function() {
            validateField(this);
        });

        function validateField(field) {
            var isValid = true;
            var fieldId = $(field).attr('id');
            var value = $(field).val().trim();

            var patterns = {
                new_password: /^[^\s]{2,16}$/,
                new_password_check: /^[^\s]{2,16}$/
            };

            var messages = {
                new_password: "비밀번호는 공백을 제외하고 2자리 이상 16자리 이하이어야 합니다.",
                new_password_check: "비밀번호가 일치하지 않습니다."
            };

            if (!patterns[fieldId].test(value)) {
                showError(fieldId, messages[fieldId]);
                isValid = false;
            } else {
                hideError(fieldId);
            }

            if (fieldId === "new_password_check") {
                var newPassword = $("#new_password").val().trim();
                if (value !== newPassword) {
                    showError("new_password_check", messages[fieldId]);
                    isValid = false;
                } else {
                    hideError("new_password_check");
                }
            }

            return isValid;
        }

        function showError(fieldId, message) {
            $("#" + fieldId + "_error").text(message).show();
            $("#" + fieldId).css("border", "1px solid red");
        }

        function hideError(fieldId) {
            $("#" + fieldId + "_error").hide();
            $("#" + fieldId).css("border", "1px solid #ccc");
        }
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
            background-color: #766650;
            color: white;
            border: none;
            cursor: pointer;
        }

        #userIdDiv,
        #resetPwModal {
            display: none;
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            background: white;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
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

        .error-message {
            color: red;
            display: none;
        }
    </style>
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
<div class="container" style="margin-top: 50px;">
    <!-- ID 폼 -->
    <div class="form-container">
        <h2>아이디 찾기</h2>
        <form id="findIdForm" method="post">
            <div class="form-group">
                <label for="user_name_id">이름:</label>
                <input type="text" id="user_name_id" name="user_name" placeholder="이름">
                <div id="user_name_id_error" class="error-message"></div>
            </div>
            <div class="form-group">
                <label for="user_email_id">이메일:</label>
                <input type="email" id="user_email_id" name="user_email" placeholder="이메일">
                <div id="user_email_id_error" class="error-message"></div>
            </div>
            <div class="form-group">
                <button type="button" id="btn_sendEmail_id">인증메일 전송</button>
            </div>
            <div class="form-group">
                <label for="emailAuthCode_id">인증코드:</label>
                <input type="text" name="emailAuthCode" id="emailAuthCode_id" placeholder="인증코드">
                <div id="emailAuthCode_id_error" class="error-message"></div>
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
                <input type="text" id="user_id_pw" name="user_id" placeholder="아이디">
                <div id="user_id_pw_error" class="error-message"></div>
            </div>
            <div class="form-group">
                <label for="user_name_pw">이름:</label>
                <input type="text" id="user_name_pw" name="user_name" placeholder="이름">
                <div id="user_name_pw_error" class="error-message"></div>
            </div>
            <div class="form-group">
                <label for="user_tel_pw">전화번호:</label>
                <input type="text" id="user_tel_pw" name="user_tel" placeholder="예):010-0000-0000">
                <div id="user_tel_pw_error" class="error-message"></div>
            </div>
            <div class="form-group">
                <label for="user_email">이메일:</label>
                <input type="email" name="user_email" id="user_email" placeholder="이메일">
                <div id="user_email_error" class="error-message"></div>
            </div>
            <div class="form-group">
                <button type="button" id="btn_sendEmail">인증메일 전송</button>
            </div>
            <div class="form-group">
                <label for="emailAuthCode">인증코드:</label>
                <input type="text" name="emailAuthCode" id="emailAuthCode" placeholder="인증코드">
                <div id="emailAuthCode_error" class="error-message"></div>
            </div>
            <div class="form-group">
                <button type="submit">비밀번호 찾기</button>
            </div>
        </form>
    </div>
</div>

<!-- 비밀번호 재설정 모달 -->
<div id="resetPwModal" style="max-width:50%; margin: auto; width:400px;">
    <h4>새로운 비밀번호를 입력하세요:</h4>
    <form id="resetPwForm" method="post">
        <input type="hidden" id="modal_user_id" name="user_id">
        <div class="form-group">
            <label for="new_password">새 비밀번호:</label>
            <input type="password" id="new_password" name="new_password" placeholder="새 비밀번호">
            <div id="new_password_error" class="error-message"></div>
        </div>
        <div class="form-group">
            <label for="new_password_check">비밀번호 확인:</label>
            <input type="password" id="new_password_check" name="new_password_check" placeholder="비밀번호 확인">
            <div id="new_password_check_error" class="error-message"></div>
        </div>
        <div class="form-group" style="display:flex; justify-content:space-between; gap:10px;">
            <button type="submit">비밀번호 변경</button>
            <button class="close-modal" style="background-color:#6c757d;">닫기</button>
        </div>
    </form>
</div>
<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
<!--!  -->
</body>
</html>