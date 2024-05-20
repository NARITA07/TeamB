<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>아이디 찾기</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        $(document).ready(function(){
            $("#findIdForm").submit(function(event){
                event.preventDefault();
                var formData = $(this).serialize();
                $.post("findId.do", formData, function(data) {
                    if(data !== "not found") {
                        $("#userId").text("ID: " + data);
                        $("#userIdModal").show();
                    } else {
                        alert("일치하는 정보의 ID가 없습니다.");
                    }
                });
            });
        });
    </script>
    <style>
        #userIdModal {
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
    <h1>아이디 찾기</h1>
    <form id="findIdForm" method="post">
        <label for="user_name">이름:</label>
        <input type="text" id="user_name" name="user_name"><br>
        <label for="user_tel">전화번호:</label>
        <input type="text" id="user_tel" name="user_tel"><br>
        <input type="submit" value="아이디 찾기">
    </form>

    <div id="userIdModal">
        <h2>찾으신 아이디</h2>
        <p id="userId"></p>
        <button class="close-modal">닫기</button>
    </div>

    <script>
        $(".close-modal").click(function() {
            $("#userIdModal").hide();
            window.location.href = "login.do";
        });
    </script>
</body>
</html>
