<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
    <head>
<!--         <meta charset="utf-8" /> -->
<!--         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> -->
<!--         <meta name="description" content="" /> -->
<!--         <meta name="author" content="" /> -->
<!--         <title>BookCafe</title> -->
<!--         Favicon -->
<!--         <link rel="icon" type="image/x-icon" href="assets/favicon.ico" /> -->
<!--         Bootstrap icons -->
<!--         <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" /> -->
<!--         Core theme CSS (includes Bootstrap) -->
<!--         <link href="css/style.css" rel="stylesheet" /> -->
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>

<!-- Header-->
<header class="py-5">
<img alt="mainimg" src="images/0.png" class="header-image">
</header>
        
<section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
    	<h1 style="text-align:center; margin-bottom:50px;">도서대여 Top3</h1>
			<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
    			<c:forEach items="${books}" var="book">
					<div class="col mb-5">
    					<div class="card h-100">
        					<img class="card-img-top" src="${book.book_path}" onerror="this.onerror=null; this.src='/images/no_image1.jpg'" />
								<div class="card-body p-4">
									<div class="text-center">
										<h5 class="fw-bolder">${book.book_name }</h5>
                							<span class="text-muted text-decoration-line-through"></span>
            						</div>
        						</div>
    					</div>
					</div>
				</c:forEach>
			</div>
	</div>
</section>
<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %> 
</body>
</html>
