<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="bookcafe.member.service.MemberVO"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>BookCafe</title>
    <link href="/css/style.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<%
    String sUID = (String)session.getAttribute("sessionId");
	MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
	Integer cartSize = (Integer)session.getAttribute("cartSize");
    if (cartSize == null) {
        cartSize = 0;
    }
%>

	<!-- Navigation-->
	<nav class="navbar navbar-expand-lg " style="padding-top:20px;">
    	<div class="container px-4 px-lg-5">
	    <a class="navbar-brand" href="/">
	    <img alt="logo" src="/images/bookCafe_logo.png">
	    <img alt="logo" src="/images/책빵1.png"></a>
	    <button class="navbar-toggler" type="button" onclick="toggleNavbar()" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
	    <div class="collapse navbar-collapse" id="navbarSupportedContent">
	      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
			<li class="nav-item"><a class="nav-link active" aria-current="page" href="/">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/foodList.do">음식</a></li>
            <li class="nav-item"><a class="nav-link" href="/bookList.do">도서</a></li>
				<%
					if(sUID == null || loginInfo == null){
				%>
			<li class="nav-item"><a class="nav-link" href="/login.do">로그인</a></li>
				<%
					}else{
				%>
			<li class="nav-item"><a class="nav-link" href="/myPage/myPage">마이페이지</a></li>
			<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#logoutmodal">로그아웃</a></li>
	      </ul>
			<form class="d-flex ms-lg-3">
                <button class="btn btn-outline-dark" type="button" onclick="goCart()">
                    <i class="bi-cart-fill me-1"></i>
                    Cart
                    <span class="badge bg-dark text-white ms-1 rounded-pill"></span>
                </button>
            </form>
				<%
					}
				%>
	    </div>
	 </div>
	</nav>
	<!-- END Navigation -->
	
	<!-- 로그아웃 모달 -->
	<div class="modal fade" id="logoutmodal" role="dialog"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-sm" role="document">
			<div class="modal-content" style="text-align: center;">
				<div class="modal-header" style="justify-content: center;">
					<h5 class="modal-title" id="logoutModalLabel" style="width: 100%;">로그아웃 하시겠습니까?</h5> 
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-footer justify-content-center" style="justify-content: center;">
					<a class="btn btn-primary"	href="/logout.do">로그아웃</a>
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button> 
				</div>
			</div>
		</div>
	</div>
	
	<script>
		/* var user_code = "${loginInfo.user_code}";
		console.log("유저코드:"+user_code); */
		
		function goCart(){
			var url = '/cartList.do';
			window.location.href = url;
		}
		
		function toggleNavbar() {
            var navbarContent = document.getElementById('navbarSupportedContent');
            if (navbarContent.classList.contains('show')) {
                navbarContent.classList.remove('show');
            } else {
                navbarContent.classList.add('show');
            }
        }
	</script>
	<!-- End 로그아웃 모달 -->
</body>
</html>