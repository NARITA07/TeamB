<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>CartList</title>
	<style>
	   table {
	       border-collapse: collapse;
	       width: 100%;
	       margin: auto;
	   }
	   th, td {
	       border: 1px solid black;
	       padding: 8px;
	       text-align: center;
	       
	   }
	   th {
	       background-color: #f2f2f2;
	   }
	   /*
	   #cartTable {
	       width: 100%;
	       border-collapse: collapse;
	   }
	   #cartTable th, #cartTable td {
	       border: 1px solid black;
	       padding: 8px;
	       text-align: left;
	   }
	   #cartTable th {
	       background-color: #f2f2f2;
	   }
	   */
	   .btn.btn-light.buy_btn {
	    margin-left: 47%;
	    margin-top: 30px;
	    background-color: #AB8212;
	    color: white;
	    font-style: 
	}
	.btn.btn-light.delete_btn{
		background-color: #AB8212;
		color: white;
	}
	.btn.btn-light{
		background-color: #AB8212;
		color: white;
	}
	</style>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
	<meta name="description" content="" />
	<meta name="author" content="" />
	<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
	<!-- Bootstrap icons-->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
	<!-- Core theme CSS (includes Bootstrap)-->
	<link href="css/style.css" rel="stylesheet" />
	<link href="css/food.css" rel="stylesheet" />
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
   <%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
   
	<section class="py-5">
		<div class="container px-4 px-lg-5 mt-5">
			<h1 style="text-align:center; margin-top: 20px; margin-bottom:50px;">장바구니 목록</h1>
			<table>
				<thead>
					<tr style="text-align: center;">
						<th>음식명</th>
						<th>가격</th>
						<th>수량</th>
						<th>계산금액</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					<c:if test="${empty cartList}">
						<tr>
							<td colspan='5'>장바구니에 담긴 메뉴가 없습니다.</td>
						</tr>
					</c:if>
					<c:if test="${not empty cartList}">
						<c:forEach items="${cartList}" var="cart">
							<tr class="cartData">
								<td>${cart.product_name}</td>
								<td><fmt:formatNumber value="${cart.product_price}" type="number" groupingUsed="true"/>원</td>
								<td>${cart.order_quantity}</td>
								<td><fmt:formatNumber value="${cart.product_price*cart.order_quantity}" type="number" groupingUsed="true"/>원</td>
								<td><button class="btn btn-light delete_btn" onclick="deleteCart('${cart.cart_code}','${cart.product_code}','${cart.user_code}','${cart.order_quantity}')">삭제</button></td>
							</tr>
						</c:forEach>
					</c:if>
				</tbody>
			</table>
			<hr>
			<div style="text-align: right; margin-right: 300px;">
				총 금액 :
				<span id="totalPriceValue">
					<fmt:formatNumber value="${total_price}" type="number" groupingUsed="true"/>원
				</span> 
			</div>
		</div>
	</section>
        
	<!-- Button trigger modal -->
	<div class="cart-item">
		<c:choose>
			<c:when test="${not empty total_price}">
				<button type="button" class="btn btn-light buy_btn" data-cart-code="${cart_code}" data-bs-toggle="modal" data-bs-target="#exampleModal">
					구매
				</button>
			</c:when>
			<c:otherwise>
			</c:otherwise>
		</c:choose>
	</div>
	<!-- End Button trigger modal -->
	
	<!-- Modal -->
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalLabel">장바구니 구매하기</h5>
	        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	      </div>
	      <div class="modal-body">
	      	 <form id="orderForm" action="/submitOrder" method="post">
	             <div class="form-group">
	                 <label for="totalPrice">총 금액</label>
	                 <input type="text" class="form-control" id="totalPrice"  value="${total_price}" readonly>
	             </div>
	             <div class="form-group">
	                 <label for="userPoints">유저 포인트 : </label>
	                 ${loginInfo.user_point}
	             </div>
	             <div class="form-group">
	                 <label for="usePoints">사용 포인트 입력</label>
	                 <input type="text" class="form-control" id="usePoints" name="usePoints" value="0">
	             </div>
	             <div class="form-group">
	                 <label for="amountOfPayment">결제 금액</label>
	                 <input type="text" class="form-control" id="amountOfPayment" name="total_price" value="${total_price}" readonly>
	             </div>
           			<input type="hidden" name="user_code" id="userCodeInput"  value="${loginInfo.user_code}">
					<input type="hidden" name="cart_code" id="cartCodeInput"  value="${cart_code}">
	           </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
	        <button type="submit" form="orderForm" class="btn btn-light">결제</button>
	   			</div>
	    </div>
	  </div>
	</div>
	<!-- End Modal -->
        
	<script>
	    // 포맷팅된 값을 설정하는 함수
	    function setFormattedPrice() {
	        const totalPriceField = document.getElementById('totalPrice');
	        const amountOfPaymentField = document.getElementById('amountOfPayment');
	        const usePointsField = document.getElementById('usePoints');
	
	        totalPriceField.value = formatPrice(parseInt(totalPriceField.value));
	        amountOfPaymentField.value = formatPrice(parseInt(amountOfPaymentField.value));
	        usePointsField.value = formatPrice(parseInt(usePointsField.value));
	    }
	
	    // 가격을 포맷팅하는 함수
	    function formatPrice(price) {
	        return price.toLocaleString();
	    }
	    
	    var myModal = document.getElementById('myModal');
	    var myInput = document.getElementById('myInput');
	    
	    /* 삭제 함수 */
	    function deleteCart(cart_code, product_code, user_code, order_quantity) {
	        alert("삭제되었습니다.");
	        var url = 'deleteCart.do?cart_code=' + encodeURIComponent(cart_code) +
	            '&product_code=' + encodeURIComponent(product_code) +
	            '&user_code=' + encodeURIComponent(user_code) +
	            '&order_quantity=' + encodeURIComponent(order_quantity);
	        window.location.href = url;
	    }
	
	    // 결제 금액 계산 함수
	    function calculateAmountOfPayment() {
	        // 총 금액, 사용 포인트 입력값 가져오기
	        var totalPrice = parseInt(document.getElementById("totalPrice").value);
	        var usePoints = parseInt(document.getElementById("usePoints").value);
	        var userPoints = parseInt(${loginInfo.user_point});
	        
	        // 유효한 숫자인지 확인
	        if (!isNaN(totalPrice) && !isNaN(usePoints)) {
	            // 사용 포인트가 유저 포인트보다 큰 경우 경고 메시지 표시
	            if (usePoints > userPoints) {
	                alert("사용 포인트는 보유 포인트보다 클 수 없습니다.");
	                document.getElementById("usePoints").value = userPoints; // 사용 포인트를 최대 보유 포인트로 설정
	                usePoints = userPoints;
	            }
	            // 결제 금액 계산
	            var amountOfPayment = totalPrice - usePoints;
	            // 결제 금액 필드에 값을 설정
	            document.getElementById("amountOfPayment").value = amountOfPayment;
	        }
	    }
	
	    // 페이지 로드 시 포맷팅된 값을 설정
	    window.onload = setFormattedPrice;
	
	    // 사용 포인트 입력 필드에서 값이 변경될 때마다 결제 금액 계산 함수 호출
		document.getElementById("usePoints").addEventListener("input", calculateAmountOfPayment);
	</script>
<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>