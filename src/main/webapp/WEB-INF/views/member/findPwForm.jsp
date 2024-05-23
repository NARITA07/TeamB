<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>비밀번호 찾기</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        $(document).ready(function() {
        	// 이메일 인증 버튼 클릭 시
        	$("#btn_sendEmail").click(function() {
        	    var user_email = $("#user_email").val().trim();
        	    var user_id = $("#user_id").val().trim();
        	    var user_name = $("#user_name").val().trim();
        	    var user_tel = $("#user_tel").val().trim();

        	    // 모든 필드가 입력되었는지 확인
        	    if (user_id === "" || user_name === "" || user_tel === "" || user_email === "") {
        	        alert("모든 필드를 입력해주세요.");
        	        return false;
        	    }

        	    // 사용자 정보 확인 요청
        	    $.ajax({
        	        type: "POST",
        	        data: { 
        	            user_id: user_id,
        	            user_name: user_name,
        	            user_tel: user_tel,
        	            user_email: user_email 
        	        },
        	        url: "checkUserInfo.do", // 사용자 정보 확인하는 컨트롤러 경로
        	        dataType: "text",
        	        success: function(result) {
        	            if (result === "valid") { // 사용자 정보가 일치하는 경우에만 이메일 발송
        	                $.ajax({
        	                    type: "POST",
        	                    data: { send: user_email },
        	                    url: "send.do", // 이메일 발송 컨트롤러 경로
        	                    dataType: "text",
        	                    success: function(result){
        	                        alert("이메일 전송완료");
        	                    },
        	                    error: function(){
        	                        alert("이메일 전송 중 에러가 발생하였습니다");
        	                    }
        	                });
        	            } else {
        	                alert("사용자 정보가 일치하지 않습니다. 다시 확인해주세요.");
        	            }
        	        },
        	        error: function(){
        	            alert("사용자 정보 확인 중 에러가 발생하였습니다.");
        	        }
        	    });
        	});
        	
        	
        	$("#findPwForm").submit(function(event) {
        	    event.preventDefault(); 

        	    var formData = {
        	        user_id: $("#user_id").val(),
        	        user_name: $("#user_name").val(),
        	        user_tel: $("#user_tel").val(),
        	        user_email: $("#user_email").val(),
        	        emailAuthCode: $("#emailAuthCode").val()
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
        	                alert("정보가 맞지 않습니다. 다시 확인 해주세요.");
        	            }
        	        },
        	        error: function(xhr, status, error) {
        	            alert("Error: " + error);
        	        }
        	    });
        	});

        	$("#resetPwForm").submit(function(event) {
        	    event.preventDefault();

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
        	                    new_password: $("#new_password").val()
        	                };

        	                $.ajax({
        	                    type: "POST",
        	                    url: "resetPassword.do",
        	                    data: formData,
        	                    success: function(response) {
        	                        if (response === "success") {
        	                            $("#resetPwModal").hide();
        	                            alert("비밀번호 변경완료");
        	                            window.location.href = "login.do";
        	                        } else {
        	                            alert("비밀번호 재설정에 실패했습니다.");
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

        #resetPwModal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid #ccc;
            padding: 20px;
            background: white;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        }
        .close-modal {
            cursor: pointer;
        }
    </style>
</head>
<body>
	<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
    <h1>비밀번호 찾기</h1>
    <form id="findPwForm" method="post">
        <label for="user_id">아이디:</label>
        <input type="text" id="user_id" name="user_id"><br>
        <label for="user_name">이름:</label>
        <input type="text" id="user_name" name="user_name"><br>
        <label for="user_tel">전화번호:</label>
        <input type="text" id="user_tel" name="user_tel"><br>
        <label for="user_email">이메일</label>
		<input type="email" name="user_email" id="user_email" placeholder="이메일">
		<button type="button" id="btn_sendEmail">인증메일 전송</button><br>
		<label for="emailAuthCode">인증코드</label>
		<input type="text" name="emailAuthCode" id="emailAuthCode" placeholder="인증코드"><br>
        <input type="submit" value="비밀번호 찾기">
    </form>

    <!-- 비밀번호 재설정 모달 -->
    <div id="resetPwModal" style="display: none;">
        <h2>새로운 비밀번호를 입력하세요:</h2>
        <form id="resetPwForm" method="post">
            <input type="hidden" id="modal_user_id" name="user_id">
            <label for="new_password">새 비밀번호:</label>
            <input type="password" id="new_password" name="new_password"><br>
            <input type="submit" value="비밀번호 재설정">
        </form>
        <button class="close-modal">닫기</button>
    </div>
</body>
</html>
