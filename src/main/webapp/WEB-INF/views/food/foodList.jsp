<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
   	<meta name="description" content="" />
    <meta name="author" content="" />
	<title>foodList</title>
	<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
	<style>
	.btn.btn-light.push_cart,.btn.btn-light{
		background-color: #AB8212;
	    color: white;
	    margin-bottom: 5px;
	}
	.count_price{
		margin: 5px;
	}
	.category_btn{
		width: 57%;
		display: flex;
		justify-content: space-between;
		margin-top: 50px;
		margin-left: 21%;
		margin-bottom: 70px;
	}
	button.btn.btn-light.drink,
	button.btn.btn-light.dessert,
	button.btn.btn-light.brunch,
	button.btn.btn-light.all{
		width: 20%;
		font-size: larger;
	}
	input#usePoints {
    	width: 75px;
    	display:inline-block;
	}
	.ui-dialog .ui-dialog-titlebar-close {
    display: none;
  }
	
/* 	.card-img-top{
		width: 204px;
		height: 220px
	} */
	</style>
	<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
    <!-- Bootstrap icons-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/food.css" rel="stylesheet" />
    <script>
	    function showSection(sectionId) {
	        // 모든 섹션 보이게 하기
	        var sections = document.querySelectorAll('.food_section');
	        sections.forEach(function(section) {
	            section.style.display = 'block';
	        });
	        
	        // 선택한 섹션만 표시
	        var selectedSection = document.getElementById(sectionId);
	        if (selectedSection) {
	            sections.forEach(function(section) {
	                if (section.id !== sectionId) {
	                    section.style.display = 'none';
	                }
	            });
	        }
	    }
	    
	    function showAllSections() {
	        // 모든 섹션 보이게 하기
	        var sections = document.querySelectorAll('.food_section');
	        sections.forEach(function(section) {
	            section.style.display = 'block';
	        });
	    }
    </script>
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
	
        	<!-- 도서열람 섹션 -->
	        <h1 id="sec_010" style="text-align:center; margin-bottom:50px;">도서열람권</h1>
	        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
	            <c:forEach items="${foodess}" var="food">
	                <c:if test="${food.product_category == 'sec_010'}">
	                    <div class="col mb-5">
	                        <div class="card h-100">
	                            <!-- Product image-->
	                            <img class="card-img-top" src="${food.product_path}" onerror="this.onerror=null; this.src='/images/no_image.jpg'" />
	                            <!-- Product details-->
	                            <div class="card-body p-4">
	                                <div class="text-center">
	                                    <!-- Product name-->
	                                    <h5 class="fw-bolder" style="margin-bottom: 20px;">${food.product_name}</h5>
							       		<h5><fmt:formatNumber value="${food.product_price}" type="number" groupingUsed="true" /> 원</h5>
	                                </div>
	                            </div>
	                            <div class="card-footer" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                               	    <div style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center;">
                               	    	수량 :<input name="order_quantity" type="number" class="form-control" value="1" id="order_quantity-${food.product_code}" 
                                   	  		   	   oninput="calculateTotalPrice('${food.product_price}', '${food.product_code}')"  min="1" style="width:70px; margin-left: 10px;" readonly>
							    	</div>
								    <div>
                                    	금액 : <span class="total-price-span" id="total_price_${food.product_code}" style="margin-left: 10px;"> 
									    	<fmt:formatNumber value="${food.product_price}" type="number" groupingUsed="true"/> 원
										</span>
								    </div>
	                                <div style="display: flex; justify-content: center; align-items: center; padding:10px;">
	                                    <button type="button" class="btn btn-light push_cart" onclick="isLogin('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)">장바구니</button>
	                                	<button type="button" class="btn btn-light" style="margin-left: 10px;"
	                                	onclick="direct_buy('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)"
	                                	data-bs-toggle="modal" data-bs-target="#exampleModal">바로구매</button>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </c:if>
	            </c:forEach>
	        </div>
			
			<div class="category_btn">
				<button class="btn btn-light all" type="button" onclick="showSection('all')">전체</button>
				<button class="btn btn-light drink" type="button" onclick="showSection('sec_005')">음료</button>
				<button class="btn btn-light dessert" type="button" onclick="showSection('sec_006')">디저트</button>
				<button class="btn btn-light brunch" type="button" onclick="showSection('sec_007')">브런치</button>
			</div>
	        <!-- 음료 섹션 -->
	        <div id="sec_005" class="food_section" style="display: block;">
	        	<h1 id="sec_005" style="text-align:center; margin-bottom:50px;">음료</h1>
	        	<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
	            <c:forEach items="${foodess}" var="food">
	                <c:if test="${food.product_category == 'sec_005'}">
	                    <div class="col mb-5">
	                        <div class="card h-100">
	                            <!-- Product image-->
	                            <img class="card-img-top" src="${food.product_path}" onerror="this.onerror=null; this.src='/images/no_image.jpg'" />
	                            <!-- Product details-->
	                            <div class="card-body p-4">
	                                <div class="text-center">
	                                    <!-- Product name-->
	                                    <h5 class="fw-bolder" style="margin-bottom: 20px;">${food.product_name}</h5>
							       		<h5><fmt:formatNumber value="${food.product_price}" type="number" groupingUsed="true" /> 원</h5>
	                                </div>
	                            </div>
	                            <div class="card-footer" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                               	    <div style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center;">
                               	    	수량 :<input name="order_quantity" type="number" class="form-control" value="1" id="order_quantity-${food.product_code}" 
                                   	  		   	   oninput="calculateTotalPrice('${food.product_price}', '${food.product_code}')"  min="1" style="width:70px; margin-left: 10px;">
							    	</div>
								    <div>
                                    	금액 : <span class="total-price-span" id="total_price_${food.product_code}" style="margin-left: 10px;"> 
									    	<fmt:formatNumber value="${food.product_price}" type="number" groupingUsed="true"/> 원
										</span>
								    </div>
	                                <div style="display: flex; justify-content: center; align-items: center; padding:10px;">
	                                    <button type="button" class="btn btn-light push_cart" onclick="isLogin('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)">장바구니</button>
	                                	<button type="button" class="btn btn-light" style="margin-left: 10px;"
	                                	onclick="direct_buy('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)"
	                                	data-bs-toggle="modal" data-bs-target="#exampleModal">바로구매</button>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </c:if>
	            </c:forEach>
	        	</div>
	        </div>
	        
	
	        <!-- 디저트 섹션 -->
	        <div id="sec_006" class="food_section" style="display: block;">
	        	<h1 id="sec_006" style="text-align:center; margin-bottom:50px;">디저트</h1>
	        	<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
	            <c:forEach items="${foodess}" var="food">
	                <c:if test="${food.product_category == 'sec_006'}">
	                    <div class="col mb-5">
	                        <div class="card h-100">
	                            <!-- Product image-->
	                            <img class="card-img-top" src="${food.product_path}" onerror="this.onerror=null; this.src='/images/no_image.jpg'" />
	                            <!-- Product details-->
	                            <div class="card-body p-4">
	                                <div class="text-center">
	                                    <!-- Product name-->
	                                    <h5 class="fw-bolder" style="margin-bottom: 20px;">${food.product_name}</h5>
							       		<h5><fmt:formatNumber value="${food.product_price}" type="number" groupingUsed="true" /> 원</h5>
	                                </div>
	                            </div>
	                            <div class="card-footer" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                               	    <div style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center;">
                               	    	수량 :<input name="order_quantity" type="number" class="form-control" value="1" id="order_quantity-${food.product_code}" 
                                   	  		   	   oninput="calculateTotalPrice('${food.product_price}', '${food.product_code}')"  min="1" style="width:70px; margin-left: 10px;">
							    	</div>
								    <div>
                                    	금액 : <span class="total-price-span" id="total_price_${food.product_code}" style="margin-left: 10px;"> 
									    	<fmt:formatNumber value="${food.product_price}" type="number" groupingUsed="true"/> 원
										</span>
								    </div>
	                                <div style="display: flex; justify-content: center; align-items: center; padding:10px;">
	                                    <button type="button" class="btn btn-light push_cart" onclick="isLogin('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)">장바구니</button>
	                                	<button type="button" class="btn btn-light" style="margin-left: 10px;"
	                                	onclick="direct_buy('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)"
	                                	data-bs-toggle="modal" data-bs-target="#exampleModal">바로구매</button>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </c:if>
	            </c:forEach>
	        	</div>
	        </div>
	        
	
	        <!-- 브런치 섹션 -->
	        <div id="sec_007" class="food_section" style="display: block;">
	        	<h1 id="sec_007" style="text-align:center; margin-bottom:50px;">브런치</h1>
	        	<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
	            <c:forEach items="${foodess}" var="food">
	                <c:if test="${food.product_category == 'sec_007'}">
	                    <div class="col mb-5">
	                        <div class="card h-100">
	                            <!-- Product image-->
	                            <img class="card-img-top" src="${food.product_path}" onerror="this.onerror=null; this.src='/images/no_image.jpg'" />
	                            <!-- Product details-->
	                            <div class="card-body p-4">
	                                <div class="text-center">
	                                    <!-- Product name-->
	                                    <h5 class="fw-bolder" style="margin-bottom: 20px;">${food.product_name}</h5>
							       		<h5><fmt:formatNumber value="${food.product_price}" type="number" groupingUsed="true" /> 원</h5>
	                                </div>
	                            </div>
	                            <div class="card-footer" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                               	    <div style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center;">
                               	    	수량 :<input name="order_quantity" type="number" class="form-control" value="1" id="order_quantity-${food.product_code}" 
                                   	  		   	   oninput="calculateTotalPrice('${food.product_price}', '${food.product_code}')"  min="1" style="width:70px; margin-left: 10px;">
							    	</div>
								    <div>
                                    	금액 : <span class="total-price-span" id="total_price_${food.product_code}" style="margin-left: 10px;"> 
									    	<fmt:formatNumber value="${food.product_price}" type="number" groupingUsed="true"/> 원
										</span>
								    </div>
	                                <div style="display: flex; justify-content: center; align-items: center; padding:10px;">
	                                    <button type="button" class="btn btn-light push_cart" onclick="isLogin('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)">장바구니</button>
	                                	<button type="button" class="btn btn-light" style="margin-left: 10px;"
	                                	onclick="direct_buy('${loginInfo.user_code}', '${food.product_code}', document.getElementById('order_quantity-${food.product_code}').value)"
	                                	data-bs-toggle="modal" data-bs-target="#exampleModal">바로구매</button>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </c:if>
	            </c:forEach>
	        	</div>
	        </div>
	        
	    </div>
	</section>
    
    <!-- Modal -->
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalLabel">바로 구매하기</h5>
	        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	      </div>
	      <div class="modal-body">
	      	<form id="orderForm" action="/submitOrderDirect" method="post">
    			<div class="form-group">
	                <label for="totalPrice">총 금액 : </label>
	                <span id="modalTotalPrice"></span>
                </div>
                <div class="form-group">
	               	<label for="userPoints">유저 포인트 : </label>
             		<fmt:formatNumber value="${loginInfo.user_point}" type="number" groupingUsed="true"/>원
                </div>
                 <div class="form-group">
                     <label for="usePoints">사용 포인트 입력 : </label>
                     <input type="text" class="form-control usePoints" id="usePoints" name="usePoints" value=""
                      oninput="validatePoints(${loginInfo.user_point})">   원
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
		        <button type="submit" form="orderForm" class="btn btn-light">
		        	결제
		        </button>
	      </div>
	    </div>
	  </div>
	</div>
    <script>
    	// 이미지 사이즈 조정
	    function adjustImageSize() {
	        var images = document.querySelectorAll('.card-img-top');
	        images.forEach(function(image) {
	            image.style.height = '250px'; // 원하는 높이 설정
	            image.style.objectFit = 'cover'; // 이미지 비율 유지하며 자르기
	        });
	    }
	    window.addEventListener('load', adjustImageSize);
    
	    
	    
	 	// 페이지 로드 시 실행되는 함수
	    window.onload = function() {
	        // 사용 포인트 입력란
	        var usePointsInput = document.getElementById('usePoints');
	        // loginInfo.user_point에서 초기값 설정
	        usePointsInput.value = ${loginInfo.user_point};
	    }

	    // 모달 창 열기 함수
	    function openModal() {
	        // 모달 열기 코드
	        // 모달 열 때마다 사용 포인트 입력란의 값을 업데이트할 필요가 없습니다.
	    }
	    
	    var myModal = document.getElementById('myModal')
		var myInput = document.getElementById('myInput')
		// 장바구니 담기
        /* function isLogin(user_code, product_code, order_quantity) {
		    console.log("isLogin function called with sUID:", sUID);
		    if (sUID == null) {
		        alert('로그인 후 이용해 하세요.');
		        var url = 'login.do';
		        window.location.href = url;
		    } else if("${loginInfo.user_leadbook}" == 'Y') {
        		alert("이미 구매한 도서열람권이 있습니다.");
        		return;
		    } else {
		        $.ajax({
		            type: "POST",
		            url: "insertCart.do",
		            data: {
		                user_code: user_code,
		                product_code: product_code,
		                order_quantity: order_quantity
		            },
		            success: function(response) {
		                if (response === "success") {
		                    alert('장바구니에 담겼습니다.');
		                } else {
		                    alert('장바구니 담기 실패.');
		                }
		            },
		            error: function() {
		                alert('서버와의 통신 중 오류가 발생했습니다.');
		            }
		        });
		    }
		} */
		function isLogin(user_code, product_code, order_quantity) {
	        console.log("isLogin function called with sUID:", sUID);
	        if (sUID == "null") {
	            alert('로그인 후 이용해 하세요.');
	            var url = 'login.do';
	            window.location.href = url;
	        } else {
	            $.ajax({
	                type: "POST",
	                url: "insertCart.do",
	                data: {
	                    user_code: user_code,
	                    product_code: product_code,
	                    order_quantity: order_quantity
	                },
	                success: function(response) {
	                    var jsonResponse = JSON.parse(response);
	                    if (jsonResponse.status === "success") {
	                        alert('장바구니에 담겼습니다.');
	                        // 장바구니 숫자 업데이트
	                        $('#cartSize').text(jsonResponse.cartSize);
	                    } else {
	                        alert('장바구니 담기 실패.');
	                    }
	                },
	                error: function() {
	                    alert('서버와의 통신 중 오류가 발생했습니다.');
	                }
	            });
	        }
	    }

	    // 상품갯수 표시
        function calculateTotalPrice(price, productCode){
            var quantity = document.getElementById('order_quantity-' + productCode).value;
            var totalPrice = parseInt(price) * parseInt(quantity);
            document.getElementById('total_price_' + productCode).textContent = totalPrice.toLocaleString() + ' 원';
        }
        
	    // 바로구매 모달창 열기
        function direct_buy(user_code, product_code, order_quantity){
        	console.log("isLogin function called with sUID:", sUID);
        	if(sUID == "null"){
                alert('로그인 후 이용해 하세요.');
                var url = 'login.do';
                window.location.href = url;
        	} else if("${loginInfo.user_leadbook}" == 'Y') {
        		alert("이미 구매한 도서열람권이 있습니다.");
        		return;
            } else {
            	var totalPriceElement = document.getElementById('total_price_' + product_code);
                var modalTotalPrice = document.getElementById('modalTotalPrice');
                modalTotalPrice.textContent = totalPriceElement.textContent;
                calculatePaymentAmount();
                
             	// 선택된 제품 코드와 주문 수량을 폼에 설정
                document.getElementById('productCodeInput').value = product_code;
                document.getElementById('orderQuantityInput').value = order_quantity;
                
             	// 사용 포인트 입력값 가져오기
                var usePoints = document.getElementById('usePoints').value;
             	
             	// 빈 문자열을 0으로 변환
                if (usePoints === "") {
                    usePoints = "0";
                }
                var pointChangeInput = document.getElementById('pointChangeInput');
                pointChangeInput.value = usePoints; // 사용 포인트를 point_change에 설정
                
             	// 결제 금액을 hidden input에 설정하여 폼으로 전송
                var paymentAmountText  = document.getElementById('paymentAmount').textContent;
                var paymentAmount  = parseInt(paymentAmountText.replace(/[^0-9]/g, '')); // 숫자만 추출
                console.log('총금액'+paymentAmount);
                document.getElementById('totalPriceInput').value = paymentAmount;
                
             	// point_change 값도 함께 전송
             	console.log('사용포인트'+usePoints);
                document.getElementById('pointChangeInput').value = usePoints;
                
//              	// 모달 열기
//                 var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
//                 modal.show();
            }
		}
	    
     	// 사용 포인트 유효성 검사 및 결제 금액 계산
        function validatePoints(userPoints) {
            var usePointsInput = document.getElementById('usePoints');
            var usePointsValue = usePointsInput.value;
			var totalPointsValue = document.getElementById('modalTotalPrice').textContent;
			var paymentAmount = document.getElementById('paymentAmount')
			
			// 빈 문자열을 0으로 변환
		    if (usePointsValue === "") {
		        usePointsInput.value = 0;
		        usePointsValue = 0; // 값이 숫자가 아니므로 문자열로 처리
		    }
			console.log("테스트1"+usePointsValue)
			
            // 정규식으로 양의 정수인지 확인
            var isPositiveInteger = /^\d+$/.test(usePointsValue);
            
            if (!isPositiveInteger) {
                //alert('사용 포인트를 정확히 입력해주세요.');
                usePointsInput.value = null;
                console.log("확인1"+totalPointsValue);
                paymentAmount.textContent=totalPointsValue;
                console.log("확인2"+paymentAmount.textContent);
                return;
            }

            var usePoints = parseInt(usePointsInput.value);
            var modalTotalPriceElement = document.getElementById('modalTotalPrice');
            var totalPrice = parseInt(modalTotalPriceElement.textContent.replace(/[^0-9]/g, ''));
			
         	// 입력 포인트가 음수이면 0으로 설정
            if (usePoints < 0) {
                usePointsInput.value = 0;
                usePoints = 0;
            }
            
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
			
            var paymentAmount = totalPrice - usePoints;
            console.log('사용포인트'+usePoints); // 입력된 사용 포인트의 값을 콘솔에 출력
            console.log('사용 포인트: ' + usePoints + ', 결제 금액: ' + paymentAmount);
            
            var usePoints = document.getElementById('usePoints').value;
            var parUsePoints = parseInt(usePoints);
            var fusePoints = parUsePoints.toLocaleString('ko-KR');
            document.getElementById('usePoints').value = fusePoints;
            
            console.log("검증"+fusePoints);
            console.log(typeof(usePoints))
            
            document.getElementById('pointChangeInput').value = usePoints;
            document.getElementById('totalPriceInput').value = paymentAmount;
            
            calculatePaymentAmount();
        }
		// 포인트 사용 후 결제 금액 계산기
        function calculatePaymentAmount() {
            var totalPriceText = document.getElementById('modalTotalPrice').textContent;
            var totalPrice = parseInt(totalPriceText.replace(/[^0-9]/g, ''));
            var usePointsInput = document.getElementById('usePoints').value;
            var usePoints = parseInt(usePointsInput.replace(/[^0-9]/g, ''));
            if (isNaN(usePoints) || usePoints < 0) {
                usePointsInput = 0;
                usePoints = 0;
            }
            var paymentAmount = totalPrice - usePoints;
            document.getElementById('paymentAmount').textContent = paymentAmount.toLocaleString() + ' 원';
        }
        
    </script>

    <%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>