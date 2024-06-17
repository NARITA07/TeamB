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
		background-color: #766650;
	    color: white;
	    margin-bottom: 5px;
	}
	.category_btn{
		display: flex;
		justify-content: center;
		gap: 30px;
		margin-bottom: 100px;
	}
	.category_btn .btn {
		padding: 15px 20px;
		font-size: 20px;
		font-weight: bold;
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
  	.card-img-top {
        height: 100%;
        object-fit: cover; /* 이미지 비율 유지하며 자르기 */
        width: 100%; /* 가로 비율을 div의 크기로 맞춤 */
    }
    .table {
	    width: 100%;
	    border-collapse: collapse;
    }

    .table th, .table td {
        border: 1px solid #dee2e6;
        padding: 8px;
        text-align: left;
    }

    .table th {
        background-color: #f8f9fa;
    }
	</style>
	<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
    <!-- Bootstrap icons-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/style.css" rel="stylesheet" />
<!--     <link href="css/food.css" rel="stylesheet" /> -->
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
	
<!-- 	<div class="food_list h-100"> -->
<!-- 	    <img alt="mainimg" src="images/food_main4.jpg" class="header-image"> -->
<!-- 	    <img alt="mainimg" src="images/food_main5.jpg" class="header-image"> -->
<!-- 	</div> -->
	
	<section class="py-5">
		<div class="container px-5 px-lg-5">
		
			<!-- 카테고리 -->
			<h1 style="text-align:center; margin-bottom:50px;">MENU</h1>
			<div class="category_btn">
				<button class="btn btn-light" type="button" onclick="showSection('all')">전체</button>
				<c:forEach items="${category}" var="category">
					<button class="btn btn-light" type="button" onclick="showSection('${category.sec_code}')">${category.sec_name}</button>
				</c:forEach>
			</div>
			
			<!-- 메뉴 출력 -->
			<c:forEach items="${category}" var="category">
				<div id="${category.sec_code}" class="food_section" style="display: block; margin-bottom : 100px;">
					<h1 style="text-align:center; margin-bottom:50px;">${category.sec_name}</h1>
					<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
						<c:forEach items="${foodess}" var="food">
							<c:if test="${food.product_category == category.sec_code}">
								<div class="col mb-5">
									<div class="card h-100">
										<img class="card-img-top" src="${food.product_path}" onerror="this.onerror=null; this.src='/images/no_image.jpg'" />
										<div class="card-body p-4">
											<div class="text-center">
												<h5 class="fw-bolder" style="margin-bottom: 20px;">${food.product_name}</h5>
												<h5><fmt:formatNumber value="${food.product_price}" type="number" groupingUsed="true" /> 원</h5>
											</div>
										</div>
										<div class="card-footer" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
											<div style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center;">
												수량 :
												<input name="order_quantity" type="number" class="form-control" value="1" id="order_quantity-${food.product_code}" 
												oninput="calculateTotalPrice('${food.product_price}', '${food.product_code}')"  min="1" style="width:70px; margin-left: 10px;">
											</div>
											<div>
					                        	금액 : 
					                        	<span class="total-price-span" id="total_price_${food.product_code}" style="margin-left: 10px;"> 
												<fmt:formatNumber value="${food.product_price}" type="number" groupingUsed="true"/> 원
												</span>
											</div>
											<div style="display: flex; justify-content: center; align-items: center; padding:10px;">
												<button type="button" class="btn btn-light push_cart" 
														onclick="addCart('${loginInfo.user_code}', '${food.product_code}', $('#order_quantity-${food.product_code}').val(), '${food.product_quantity}')">장바구니</button>
												<button type="button" class="btn btn-light" style="margin-left: 10px;"
														onclick="direct_buy('${loginInfo.user_code}', '${food.product_code}', $('#order_quantity-${food.product_code}').val(), '${food.product_quantity}')">바로구매</button>
											</div>
										</div>
									</div>
								</div>
							</c:if>
						</c:forEach>
					</div>
				</div>
			</c:forEach>
			
	    </div>
	</section>
   
	<!-- Modal -->
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-sm modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">바로구매 결제창</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form id="orderForm" action="/submitOrderDirect" method="post">
						<table class="table">
	                        <tbody>
	                            <tr>
	                                <th><label for="totalPrice">총 금액</label></th>
	                                <td><span id="modalTotalPrice"></span></td>
	                            </tr>
	                            <tr>
	                                <th><label for="userPoints">유저 포인트</label></th>
	                                <td>
	                                    <fmt:formatNumber value="${loginInfo.user_point}" type="number" groupingUsed="true"/> 원
	                                </td>
	                            </tr>
	                            <tr>
	                                <th style="padding-top: 15px"><label for="usePoints">사용 포인트</label></th>
	                                <td>
	                                    <input type="text" class="form-control usePoints" id="usePoints" name="usePoints" value="" oninput="validatePoints(${loginInfo.user_point})"> 원
	                                </td>
	                            </tr>
	                            <tr>
	                                <th><label for="amountOfPayment">결제 금액</label></th>
	                                <td>
	                                    <span id="paymentAmount"></span>
	                                    <input type="hidden" name="total_price" id="totalPriceInput">
	                                </td>
	                            </tr>
	                        </tbody>
	                    </table>
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
	<!-- Modal -->
	
<script>
$(document).ready(function() {
	// 도서열람권 수량 수정불가
	var targetProductCode = 'food_014';
	$('#order_quantity-' + targetProductCode).prop('readonly',true);
	
});

	// 카테고리 선택시
	function showSection(sectionId) {
     	// 모든 섹션 보이게 하기
        if (sectionId == 'all') {
            $('.food_section').show();
        }
     	// 선택한 섹션만 표시
        else {
            $('.food_section').hide();
            $('#' + sectionId).show();
        }
    }
	
	// 상품갯수 표시
	function calculateTotalPrice(price, productCode){
	    var quantity = document.getElementById('order_quantity-' + productCode).value;
	    var totalPrice = parseInt(price) * parseInt(quantity);
	    document.getElementById('total_price_' + productCode).textContent = totalPrice.toLocaleString() + ' 원';
	}
	
	// 로그인 상태 판별
    function isLogin(user_code) {
        if (!user_code) {
            alert("로그인 후 이용해주세요.");
            location.href = "/login.do";
            return false;
        }
        return true;
    }
	
	// 도서열람권 구매 판별
	function isReadbook(product_code) {
    	if(product_code == 'food_014' && "${loginInfo.user_leadbook}" == 'Y') {
      		alert("이미 구매한 도서열람권이 있습니다.");
      		return false;
    	}
    	return true;
	}
	
	// 재고수량 확인
	function isQuantity(product_code, order_quantity, product_quantity) {
		if (product_code == 'food_014') {
			return true;
		} else {
			// 문자열을 숫자로 변환
		    order_quantity = parseInt(order_quantity, 10);
		    product_quantity = parseInt(product_quantity, 10);
		    
			console.log("order_quantity: " + order_quantity);
		    console.log("product_quantity: " + product_quantity);
			var productName = $(event.currentTarget).closest('.card').find('.fw-bolder').text();
			if (product_quantity <= 0) {
			    alert(productName + "의 재고가 부족합니다.");
			    return false;
			}
			
			if (order_quantity > product_quantity) {
			    alert(productName + "의 주문가능 수량은 " + product_quantity + "개 입니다.");
			    return false;
			}
		}
		return true;
	}
	
	
	// 장바구니 담기
    function addCart(user_code, product_code, order_quantity, product_quantity) {
    	// 로그인 상태 확인
    	if(!isLogin(user_code)) {
    		return;
    	}
    	// 도서열람권 확인
    	if(!isReadbook(product_code)) {
    		return;
    	}
    	// 재고수량 확인
    	if(!isQuantity(product_code, order_quantity, product_quantity)) {
    		return;
    	}
    	
    	console.log("user_code:"+ user_code +", product_code:"+ product_code + ", order_quantity:"+ order_quantity);
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
                 	//장바구니 숫자 업데이트
	                $('#cartSize').text(jsonResponse.cartSize);
                } else {
                    alert('장바구니 담기 실패.');
                }
            },
            error: function() {
                alert('장바구니 담기 중에 오류가 발생했습니다.');
            }
        });
    }
	
	// 바로구매 모달창 열기
	function direct_buy(user_code, product_code, order_quantity, product_quantity) {
    	// 로그인 상태 확인
    	if(!isLogin(user_code)) {
    		return;
    	}
    	// 도서열람권 확인
    	if(!isReadbook(product_code)) {
    		return;
    	}
    	// 재고수량 확인
    	if(!isQuantity(product_code, order_quantity, product_quantity)) {
    		return;
    	}
    	
		var totalPriceElement = $('#total_price_' + product_code);
	    var modalTotalPrice = $('#modalTotalPrice');
	    modalTotalPrice.text(totalPriceElement.text());
	    calculatePaymentAmount();
	    
	 	// 선택된 제품 코드와 주문 수량을 폼에 설정
	    $('#productCodeInput').val(product_code);
    	$('#orderQuantityInput').val(order_quantity);
	    
	 	// 사용 포인트 입력값 가져오기
	    var usePoints = $('#usePoints').val();
	 	
	 	// 빈 문자열을 0으로 변환
	    if (usePoints == "") {
	        usePoints = "0";
	    }
	    $('#pointChangeInput').val(usePoints); // 사용 포인트를 point_change에 설정
	    
	 	// 결제 금액을 hidden input에 설정하여 폼으로 전송
	    var paymentAmountText = $('#paymentAmount').text();
	    var paymentAmount = parseInt(paymentAmountText.replace(/[^0-9]/g, '')); // 숫자만 추출
	    console.log('총금액: '+ paymentAmount);
	    $('#totalPriceInput').val(paymentAmount);
	    
	 	// point_change 값도 함께 전송
	 	console.log('사용포인트: '+usePoints);
	 	$('#pointChangeInput').val(usePoints);
	    
	 	// 모달 열기
	    $("#exampleModal").modal("show");
	}

	// 사용 포인트 유효성 검사 및 결제 금액 계산 (모달)
	function validatePoints(userPoints) {
		var usePointsInput = $('#usePoints');
		var usePointsValue = usePointsInput.val();
		var totalPointsValue = $('#modalTotalPrice').text();
		var paymentAmount = $('#paymentAmount');
		
		// 빈 문자열을 0으로 변환
		if (usePointsValue == "") {
			usePointsInput.val(0);
		    usePointsValue = 0; // 값이 숫자가 아니므로 문자열로 처리
		}
		console.log("테스트1: " + usePointsValue)
		
		// 정규식으로 양의 정수인지 확인
		var isPositiveInteger = /^\d+$/.test(usePointsValue);
		
		if (!isPositiveInteger) {
		    //alert('사용 포인트를 정확히 입력해주세요.');
		    usePointsInput.val(null);
		    console.log("확인1: " + totalPointsValue);
		    paymentAmount.text(totalPointsValue);
		    console.log("확인2: "+ paymentAmount.text());
		    return;
		}
		
		var usePoints = parseInt(usePointsInput.val());
		var totalPrice = parseInt($('#modalTotalPrice').text().replace(/[^0-9]/g, ''));
		
		// 입력 포인트가 음수이면 0으로 설정
		if (usePoints < 0) {
		    usePointsInput.val(0);
		    usePoints = 0;
		}
		   
		if (usePoints > userPoints) {
		    alert('잔여포인트보다 큽니다.');
		    usePointsInput.val(userPoints);
		    usePoints = userPoints;
		}
		
		if (usePoints > totalPrice) {
		    alert('총 금액보다 큽니다.');
		    usePointsInput.val(totalPrice);
		    usePoints = totalPrice;
		}
		
		var paymentAmount = totalPrice - usePoints;
		console.log('사용 포인트: ' + usePoints + ', 결제 금액: ' + paymentAmount);
		
		var formattedUsePoints = usePoints.toLocaleString('ko-KR');
	    usePointsInput.val(formattedUsePoints);
		
	    console.log("검증 : " + formattedUsePoints + "포인트");
		console.log(typeof(usePoints))
		
		$('#pointChangeInput').val(usePoints);
		$('#totalPriceInput').val(paymentAmount);
		
		calculatePaymentAmount();
	}
	
	// 포인트 사용 후 결제 금액 계산기
	function calculatePaymentAmount() {
	    var totalPriceText = $('#modalTotalPrice').text();
	    var totalPrice = parseInt(totalPriceText.replace(/[^0-9]/g, ''));
	    var usePointsInput = $('#usePoints').val();
	    var usePoints = parseInt(usePointsInput.replace(/[^0-9]/g, ''));
	    
	    if (isNaN(usePoints) || usePoints < 0) {
	        usePointsInput = 0;
	        usePoints = 0;
	    }
	    var paymentAmount = totalPrice - usePoints;
	    $('#paymentAmount').text(paymentAmount.toLocaleString() + ' 원');
	}
	      
</script>

<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>