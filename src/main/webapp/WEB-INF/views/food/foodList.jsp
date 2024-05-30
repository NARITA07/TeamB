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
	<style>
	.btn.btn-light.push_cart,.btn.btn-light{
		background-color: #AB8212;
	    color: white;
	}
	</style>
	<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
    <!-- Bootstrap icons-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/food.css" rel="stylesheet" />
</head>
	<body>
    
    <%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
    <script>
        var sUID = '<%= sUID %>';
        console.log("sUID value:", sUID);
    </script>
    
    <div class="food_list">
        <img alt="mainimg" src="images/food_main4.jpg" class="header-image">
        <img alt="mainimg" src="images/food_main5.jpg" class="header-image">
    </div>
    
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <h1 style="text-align:center; margin-bottom:50px;">커피</h1>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <c:forEach items="${foodess}" var="food">
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="${food.product_img}" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${food.product_name}</h5>
                                </div>
                                <div class="cart_btn_box">
                                    <div>
                                        <input name="order_quantity" type="number" class="form-control" value="1" id="order_quantity-${food.product_code}" oninput="calculateTotalPrice('${food.product_price}', '${food.product_code}')"  min="1">
                                    </div>
                                    <button type="button" class="btn btn-light push_cart" onclick="isLogin('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)">장바구니 담기</button>
                                	<span class="total-price-span" id="total_price_${food.product_code}">${food.product_price}원</span>
                                </div>
                                <div class="direct_buy">
                                	<button type="button" class="btn btn-light" 
                                	onclick="direct_buy('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)"
                                	data-bs-toggle="modal" data-bs-target="#exampleModal">바로구매</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </div>
<%--         <div class="container px-4 px-lg-5 mt-5">
            <h1 style="text-align:center; margin-bottom:50px;">음식</h1>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <c:forEach items="${foodess}" var="food">
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="${food.product_img}" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${food.product_name}</h5>
                                    <!-- Product price-->
                                    <span class="text-muted">${food.product_price}</span>
                                </div>
                                <div class="cart_btn_box">
                                    <div>
                                        <input name="order_quantity" type="number" class="form-control" value="1" id="order_quantity-${food.product_code}" oninput="calculateTotalPrice('${food.product_price}', '${food.product_code}')"  min="1">
                                    </div>
                                    <button type="button" class="btn btn-light push_cart" onclick="isLogin('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)">담기</button>
                                	<span class="total-price-span" id="total_price_${food.product_code}"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </div> --%>
    </section>
    <!-- Modal -->
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalLabel">구매하기</h5>
	        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	      </div>
	      <div class="modal-body">
	      	<form>
	      		<div class="form-group">
	      		
			    </div>
	      	</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
	        <button type="button" class="btn btn-primary">결제</button>
	      </div>
	    </div>
	  </div>
	</div>
    <script>
	    var myModal = document.getElementById('myModal')
		var myInput = document.getElementById('myInput')
		
        function isLogin(user_code, product_code, order_quantity){
            console.log("isLogin function called with sUID:", sUID);
            if(sUID == "null"){
                alert('로그인 후 이용해 하세요.');
                var url = 'login.do';
                window.location.href = url;
            } else {
                alert('장바구니에 담겼습니다.');
                alert('사용자 코드.'+user_code +'제품 코드.'+product_code);
                var form = document.createElement("form");
                form.setAttribute("method", "post");
                form.setAttribute("action", "insertCart.do");
                
                var inputs = [
                    { name: "user_code", value: user_code },
                    { name: "product_code", value: product_code },
                    { name: "order_quantity", value: order_quantity }
                ];
                
                inputs.forEach(function(input) {
                    var element = document.createElement("input");
                    element.setAttribute("type", "hidden");
                    element.setAttribute("name", input.name);
                    element.setAttribute("value", input.value);
                    form.appendChild(element);
                });
                
                document.body.appendChild(form);
                form.submit();
            }
        }
        function calculateTotalPrice(price, productCode){
            var quantity = document.getElementById('order_quantity-' + productCode).value;
            var totalPrice = parseInt(price) * parseInt(quantity);
            document.getElementById('total_price_' + productCode).textContent = totalPrice + '원';
        }
        
        function direct_buy(user_code, product_code, order_quantity){
			alert("카트코드."+user_code+product_code+order_quantity)
			
			if(sUID == "null"){
                alert('로그인 후 이용해 하세요.');
                var url = 'login.do';
                window.location.href = url;
            } else{
            	var url = 'selectTotalPrice.do?cart_code=' +cart_code;
    			window.location.href = url;
            }
			
		}
    </script>

    <%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>