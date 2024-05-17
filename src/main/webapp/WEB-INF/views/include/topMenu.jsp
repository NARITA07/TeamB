<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<link href="css/style.css" rel="stylesheet" />
</head>
<body>
<%
	String sUID = (String)session.getAttribute("sessionId");
%>
<!-- Navigation-->
<nav class="navbar navbar-expand-lg " style="padding-top:20px;">
    <div class="container px-4 px-lg-5">
        <!-- logo img 넣기 S -->
        <a class="navbar-brand" href="#!"></a>
        <!-- logo img 넣기 E -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="./">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="bookList.do">책</a></li>
                <li class="nav-item"><a class="nav-link" href="#!">음식</a></li>
                <%
				if(sUID == null){
				%>
                <li class="nav-item"><a class="nav-link" href="login.do">로그인</a></li>
                <%
			}else{
			%>
			<li class="nav-item"><a class="nav-link" href="memberModWrite.do?userid=${sessionScope.sessionId}">마이페이지</a></li>
			<li class="nav-item"><a class="nav-link" href="logout.do">로그아웃</a></li>
			<%
			}
			%>
            </ul>
            <form class="d-flex ms-lg-3">
                <button class="btn btn-outline-dark" type="submit">
                    <i class="bi-cart-fill me-1"></i>
                    Cart
                    <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                </button>
            </form>
        </div>
    </div>
</nav>
</body>
</html>
