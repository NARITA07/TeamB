<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
   	<meta name="description" content="" />
    <meta name="author" content="" />
	<title>foodList</title>
	<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
    <!-- Bootstrap icons-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/food.css" rel="stylesheet" />
</head>
<body>
	
 	<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
 	
		<div class="food_list">
			<img alt="mainimg" src="images/food_main4.jpg" class="header-image">
	   		<img alt="mainimg" src="images/food_main5.jpg" class="header-image">
		</div>
		
		<section class="py-5">
			<div class="container px-4 px-lg-5 mt-5">
        		<h1 style="text-align:center; margin-bottom:50px;">커피</h1>
        		<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            		<c:forEach items="${coffees}" var="coffee">
                		<div class="col mb-5">
           					<div class="card h-100">
		                       	<!-- Product image-->
		                       	<img class="card-img-top" src="${coffee.product_img}" alt="..." />
		                       	<!-- Product details-->
		                       	<div class="card-body p-4">
                         			<div class="text-center">
		                               	<!-- Product name-->
		                               	<h5 class="fw-bolder">${coffee.product_name}</h5>
	                           			<!-- Product price-->
	                           			<span class="text-muted">${coffee.product_price}</span>
                         			</div>
                         			<button type="button" class="btn btn-light" data-cartId="${ci.cartId}">Light</button>
                     			</div>
                 			</div>
                		</div>
            		</c:forEach>
        		</div>
    		</div>
    		<div class="container px-4 px-lg-5 mt-5">
        		<h1 style="text-align:center; margin-bottom:50px;">음식</h1>
        		<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            		<c:forEach items="${foodess}" var="food">
                		<div class="col mb-5">
                    		<div class="card h-100">
		                        Product image
		                        <img class="card-img-top" src="${food.product_img}" alt="..." />
		                        Product details
		                        <div class="card-body p-4">
                            		<div class="text-center">
		                                Product name
		                                <h5 class="fw-bolder">${food.product_name}</h5>
                                		Product price
                                		<span class="text-muted">${food.product_price}</span>
                            		</div>
                        		</div>
                    		</div>
                		</div>
            		</c:forEach>
        		</div>
    		</div>
		</section>
		

	<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
	<script>
// 	    function foodDetail(product_code) {
// 	        var url = 'foodDetail.do?product_code=' + product_code;
	        
// 	        window.location.href = url;
// 	    }
	</script>
</body>
</html>