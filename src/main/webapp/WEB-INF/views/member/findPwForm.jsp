<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>비밀번호 찾기</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        $(document).ready(function() {
            $("#findPwForm").submit(function(event) {
                event.preventDefault(); 

                var formData = {
                    user_id: $("#user_id").val(),
                    user_name: $("#user_name").val(),
                    user_tel: $("#user_tel").val()
                };

                $.ajax({
                    type: "POST",
                    url: "findPw.do",
                    data: formData,
                    success: function(response) {
                        if (response === "found") {
                            $("#resetPwModal").show();
                            $("#modal_user_id").val(formData.user_id);
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
