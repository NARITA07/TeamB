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
	input.order_quantity {
    	width: 40px;
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
			<table id="cartList">
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
						<c:forEach items="${cartList}" var="cart" varStatus="count">
							<tr class="cartData">
								<td id="product_name${count.count}">${cart.product_name}</td>
								<td class="product_price"><fmt:formatNumber value="${cart.product_price}" type="number" groupingUsed="true"/>원</td>
								<td id="order_quantity${count.count}">
                        			<input class="order_quantity" type="number" id="orderQuantity-${cart.product_code}" value="${cart.order_quantity}" min="1" onchange="calculateTotalPrice()">
                    			</td>
								<td class="total_price">
								<fmt:formatNumber value="${cart.product_price*cart.order_quantity}" type="number" groupingUsed="true"/>원
								</td>
								<td><button class="btn btn-light delete_btn" onclick="deleteCart('${cart.cart_code}','${cart.product_code}','${cart.user_code}','${cart.order_quantity}')">삭제</button></td>
								<td>
									<input type="text" class="cartCode" value="${cart.cart_code}">
								</td>
								<td>
									<input type="text" class="productCode" value="${cart.product_code}">
								</td>
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
				<button type="button" class="btn btn-light buy_btn" data-cart-code="${cart_code}"
				data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="direct_buy()">
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
	                <label for="totalPrice">총 금액 : </label>
	                <span id="modalTotalPrice"></span>
                </div>
                <div class="form-group">
	               	<label for="userPoints">유저 포인트 : </label>
             		<fmt:formatNumber value="${loginInfo.user_point}" type="number" groupingUsed="true"/>원
                </div>
                 <div class="form-group">
                     <label for="usePoints">사용 포인트 입력</label>
                     <input type="number" class="form-control" id="usePoints" name="usePoints"
                      oninput="validatePoints(${loginInfo.user_point})" value="${loginInfo.user_point}">
                 </div>
                 <div class="form-group">
                     <label for="amountOfPayment">결제 금액 : </label>
                     <span id="paymentAmount"></span>
                     <input type="hidden" name="total_price" id="totalPriceInput">
                 </div>
                	<input type="hidden" name="user_code" id="userCodeInput" value="${loginInfo.user_code}">
                    <input type="hidden" name="product_code" id="productCodeInput" value="">
                    <input type="hidden" name="order_quantity" id="orderQuantityInput" value="">
                    <input type="hidden" name="cart_code" id="cartCodeInput" value="${cart_code}">
                    <input type="hidden" name="point_change" id="pointChangeInput">
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
		// 주문 수량과 가격을 곱한 값을 계산하고 총 금액을 업데이트하는 함수
	    function calculateTotalPrice() {
	        var totalPrice = 0;
	        // 각 주문 수량과 가격을 곱하여 총 금액을 계산
	        var orderQuantityElements = document.querySelectorAll('.order_quantity');
	        var priceElements = document.querySelectorAll('.product_price');
	        var total_price_elements = document.querySelectorAll('.total_price');
	
	        for (var i = 0; i < orderQuantityElements.length; i++) {
	            var orderQuantity = parseInt(orderQuantityElements[i].value);
	            console.log("테스트 "+orderQuantity)
	            // 수량 form 태그에 보내기
	        	document.getElementById('orderQuantityInput').value=orderQuantity;
	            var price = parseInt(priceElements[i].textContent.replace(/[^0-9]/g, ''));
	            var total_price = orderQuantity * price;
	            total_price_elements[i].innerHTML = new Intl.NumberFormat('ko-KR').format(total_price) + '원';
	            totalPrice += total_price;
	        }
	        
	        // 총 금액을 화면에 표시
	        document.getElementById('totalPriceValue').textContent = totalPrice.toLocaleString() + '원';
	        
	    }
	
		// 구매버튼 클릭시 장바구니 수량 변경
		function direct_buy() {
		    // 테이블의 tbody를 선택합니다.
		    var tbody = document.querySelector('tbody');
		    
		    // tbody 내의 각 행(tr)을 선택합니다.
		    var rows = tbody.querySelectorAll('tr');
		    
		    // 데이터를 담을 배열을 생성합니다.
		    var cartItems = [];
		    
		    // 각 행을 순회하며 데이터를 추출합니다.
		    rows.forEach(function(row) {
		        var cart_code = row.querySelector('.cartCode').value;
		        var product_code = row.querySelector('.productCode').value;
		        var order_quantity = row.querySelector('input.order_quantity').value;
		        console.log("카트코드"+cart_code)
		        console.log("제품코드"+product_code)
		        console.log("수량"+order_quantity)
		        
		        // 데이터를 객체로 저장합니다.
		        var item = {
		            cart_code: cart_code,
		            product_code: product_code,
		            order_quantity: order_quantity
		        };
		        // 배열에 추가합니다.
		        cartItems.push(item);
		    });
		    
		    // AJAX를 사용하여 데이터를 서버로 전송합니다.
		    $.ajax({
		        type: "POST",
		        url: "/updateQuantity",
		        data: {cartItems : cartItems},
		        dataType: 'jason',
		        success: function(response) {
		            console.log(response); // 성공적으로 처리된 경우 서버에서 반환하는 응답을 확인합니다.
		            // 추가로 필요한 동작을 수행할 수 있습니다.
		        },
		        error: function(xhr, status, error) {
		            console.error(xhr.responseText); // 오류 발생 시 서버에서 반환하는 오류 메시지를 확인합니다.
		            // 오류에 대한 처리를 수행할 수 있습니다.
		        }
		    });
		}
	
	    
	
	    // 페이지 로드 시 총 금액을 계산하여 표시
	    window.onload = calculateTotalPrice;
		
		function validatePoints(userPoints) {
	        var usePointsInput = document.getElementById('usePoints');
	        var usePointsValue = usePointsInput.value;
	
	        // 정규식으로 양의 정수인지 확인
	        var isPositiveInteger = /^\d+$/.test(usePointsValue);
	
	        if (!isPositiveInteger) {
	            alert('사용 포인트를 정확히 입력해주세요.');
	            return;
	        }
	
	        var usePoints = parseInt(usePointsInput.value);
	        var modalTotalPriceElement = document.getElementById('modalTotalPrice');
	        var totalPrice = parseInt(modalTotalPriceElement.textContent.replace(/[^0-9]/g, ''));
	
	        if (usePoints > userPoints) {
	            alert('잔여포인트보다 큽니다.');
	            usePointsInput.value = userPoints;
	            usePoints = userPoints;
	        }
	
	        if (usePoints > totalPrice) {
	            alert('총 금액보다 큽니다.');
	            usePointsInput.value = totalPrice;
	            usePoints = totalPrice;
	        }
	        
	        // 결제 금액 계산
	        var paymentAmount = totalPrice - usePoints;
	        
	        // 콘솔에 값 출력
	        console.log('사용 포인트: ' + usePoints + ', 결제 금액: ' + paymentAmount);
	
	        // 숨겨진 입력란에 결제 금액 업데이트
	        document.getElementById('pointChangeInput').value = usePoints;
	        document.getElementById('totalPriceInput').value = paymentAmount;
	
	        calculatePaymentAmount(); // 결제 금액 갱신
	    }
	
	    function calculatePaymentAmount() {
	        var totalPriceText = document.getElementById('modalTotalPrice').textContent;
	        var totalPrice = parseInt(totalPriceText.replace(/[^0-9]/g, ''));
	        var usePointsInput = document.getElementById('usePoints');
	        var usePoints = parseInt(usePointsInput.value);
	        if (isNaN(usePoints) || usePoints < 0) {
	            usePointsInput = 0;
	            usePoints = 0;
	        }
	        var paymentAmount = totalPrice - usePoints;
	        document.getElementById('paymentAmount').textContent = paymentAmount.toLocaleString() + '원';
	    }
		    
		/* 삭제 함수 */
	    function deleteCart(cart_code, product_code, user_code, order_quantity) {
			console.log("카트코드 확인 "+ cart_code)
	        alert("삭제되었습니다.");
	        var url = 'deleteCart.do?cart_code=' + encodeURIComponent(cart_code) +
	            '&product_code=' + encodeURIComponent(product_code) +
	            '&user_code=' + encodeURIComponent(user_code) +
	            '&order_quantity=' + encodeURIComponent(order_quantity);
	        window.location.href = url;
	    }
	</script>
<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>