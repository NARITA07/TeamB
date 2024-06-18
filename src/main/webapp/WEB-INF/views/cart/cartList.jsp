<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>CartList</title>
   <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
   <style>
      table {
          border-collapse: collapse;
          width: 100%;
          margin: auto;
      }
      table thead{
         background-color: #fff;
         border-bottom: 1px solid #cdcdcd;
         border-top: 1px solid #cdcdcd;
      }
      th, td {
         border: 1px solid black;
         padding: 8px;
         text-align: center;
      }
      th {
          background-color: #fff;
          border-bottom: 1px solid #cdcdcd
      }
      .btn.btn-light.buy_btn {
          margin-left: 47%;
          margin-top: 30px;
          background-color: #766650;
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
      input#usePoints {
          width: 75px;
          display:inline-block;
      }
      .cartAmountTable {
          width: 100%;
          border-collapse: collapse;
       }
   
       .cartAmountTable th, .cartAmountTable td {
           border: 1px solid #dee2e6;
           padding: 8px;
           text-align: left;
       }
   
       .cartAmountTable th {
           background-color: white;
       }
       .modal-md {
          max-width: 50%; /* 필요에 따라 크기를 조정 */
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
         <form id="updateForm" action="updateQuantity.do" method="post">
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
               <tbody style="vertical-align: baseline;">
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
                           <c:choose>
                               <c:when test="${cart.product_code == 'food_014'}">
                                   <td id="order_quantity${count.count}">
                                       <input class="order_quantity" name="order_quantity" type="number" id="orderQuantity-${cart.product_code}" value="${cart.order_quantity}" min="1" onchange="calculateTotalPrice()" readonly>
                                   </td>
                               </c:when>
                               <c:otherwise>
                                   <td id="order_quantity${count.count}">
                                       <input class="order_quantity" name="order_quantity" type="number" id="orderQuantity-${cart.product_code}" value="${cart.order_quantity}" min="1" onchange="calculateTotalPrice()">
                                   </td>
                               </c:otherwise>
                           </c:choose>
                           <td class="total_price">
                           <fmt:formatNumber value="${cart.product_price*cart.order_quantity}" type="number" groupingUsed="true"/>원
                           </td>
                           <td><button class="btn btn-light delete_btn" onclick="deleteCart('${cart.cart_code}', '${cart.product_code}', '${cart.user_code}', '${cart.order_quantity}'); return false;">삭제</button></td>
                           <td>
                              <input type="hidden" name="cart_code" class="cartCode" value="${cart.cart_code}">
                              <input type="hidden" name="product_code" class="productCode" value="${cart.product_code}">
                              <input type="hidden" name="product_quantity" class="productQuantity" value="${cart.product_quantity}">
                           </td>
                        </tr>
                     </c:forEach>
                  </c:if>
               </tbody>
            </table>
         </form>
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
   <c:if test="${empty cartList}">
      <input type="button" class="btn btn-light buy_btn" value="메뉴" onclick="goFoodList()">
   </c:if>
   <c:if test="${not empty cartList}">
      <div class="cart-item">
         <c:choose>
            <c:when test="${not empty total_price}">
               <button id="btnBuy" type="submit" form="updateForm" class="btn btn-light buy_btn" data-cart-code="${cart_code}"><!-- onclick="direct_buy()" -->
                	구매
               </button>
            </c:when>
            <c:otherwise>
            </c:otherwise>
         </c:choose>
      </div>
   </c:if>
   <!-- End Button trigger modal -->
   
   <!-- Modal -->
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered" style="max-width: 22%;">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="exampleModalLabel">장바구니 구매하기</h5>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body" style="margin-bottom: 16px">
             <form id="orderForm" action="/submitOrder" method="post">
                <table>
                    <tbody class="cartAmountTable">
                       <tr>
                           <th><label for="orderInfo">주문메뉴</label></th>
                           <td>
                                 <span id="modalOrderInfo"></span>
                                 <span id="modalOrderCnt"></span>
                             </td>
                       </tr>
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
                         <th><label for="usePoints">사용 포인트</label></th>
                         <td>
                            <input type="text" class="form-control usePoints" id="usePoints" name="usePoints" value=""
                            oninput="validatePoints(${loginInfo.user_point})"> 원
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
           <button type="submit" form="orderForm" class="btn btn-light">
              	 결제
           </button>
               </div>
       </div>
     </div>
   </div>
   <!-- End Modal -->
   <script>
      calculateTotalPrice();
      
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
               total_price_elements[i].innerHTML = new Intl.NumberFormat('ko-KR').format(total_price) + ' 원';
               totalPrice += total_price;
           }
           
           // 총 금액을 화면에 표시
           document.getElementById('totalPriceValue').textContent = totalPrice.toLocaleString() + ' 원';
           
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
   
		// 구매버튼 클릭시 장바구니 수량 변경
		function updateCartInfo() {
			// formData를 serializeArray로 직렬화
	         var formData = $('#updateForm').serializeArray();
	         
          // 사용 포인트 입력값 가져오기
          var usePoints = $('#usePoints').val();
  
          // 빈 문자열을 0으로 변환
          if (usePoints === "") {
              usePoints = "0";
          }
          
          $.ajax({
              type: "POST",
              url: "updateQuantity.do",
              data: formData,
              success: function(response) {
                  if (response === 'success') {
                      // 장바구니 업데이트 성공 시 모달에 총 금액 업데이트
                      var totalPriceValue = $('#totalPriceValue').text();
                      $('#modalTotalPrice').text(totalPriceValue);
                 
                      /* // 모든 order_quantity 값을 수집하여 숨겨진 필드에 설정
                      var orderQuantities = [];
                      document.querySelectorAll('.order_quantity').forEach(function(input) {
                          orderQuantities.push(input.value);
                      });
                      console.log("수량 테스트"+orderQuantities)
                      document.getElementById('orderQuantityInput').value = orderQuantities;
                      
                      var productCodes = [];
                      document.querySelectorAll('.productCode').forEach(function(input) {
                         productCodes.push(input.value);
                      });
                      console.log("음식코드 테스트"+productCodes)
                      document.getElementById('productCodeInput').value = productCodes; */
                      
                      
                      // 사용 포인트 입력값 가져오기 및 빈 문자열을 0으로 변환
                      var usePoints = document.getElementById('usePoints').value;
                      if (usePoints === "") {
                          usePoints = "0";
                      }
                      $('#pointChangeInput').val(usePoints);
  
                      // 모달에 총 금액 업데이트
                      var totalPriceText = $('#modalTotalPrice').text();
  
                      // 결제 금액 계산 (여기서 calculatePaymentAmount 함수 호출 가능)
                      calculatePaymentAmount();
  
                      // 결제 금액을 hidden input에 설정하여 폼으로 전송
                      var paymentAmountText = $('#paymentAmount').text();
                      var paymentAmount = parseInt(paymentAmountText.replace(/[^0-9]/g, '')); // 숫자만 추출
                      console.log('모달 결제 금액'+paymentAmount);
                      $('#totalPriceInput').val(paymentAmount);
                      
                      // point_change 값도 함께 전송
                      $('#pointChangeInput').val(usePoints);
                      
                      return true;
                  } else {
                      alert('장바구니 업데이트 실패.');
                      return false;
                  }
              },
              error: function() {
                  alert('서버와의 통신 중 오류가 발생했습니다.');
                  return false;
              }
          });
          return true;
      }
		
      // 구매버튼 클릭시 재고수량 확인
      $('#btnBuy').on('click', function(e) {
         e.preventDefault();
         
         if(!updateCartInfo()) {
             return;
          }
         
          // 각 상품의 재고를 확인하여 0 이하인 경우 경고창 표시
          var isStockValid = true;
          $('.cartData').each(function() {
              var orderQuantity = parseInt($(this).find('.order_quantity').val());
              var productQuantity = parseInt($(this).find('.productQuantity').val());
              var product_code = ($(this).find('.productCode').val());
              
              if (product_code == 'food_014') {
                 isStockValid = true;
                 return true;
              } else {
                 if (productQuantity <= 0) {
                     var productName = $(this).find('td:first').text();
                     alert(productName + "의 재고가 부족합니다.");
                     isStockValid = false;
                     return false; // 반복문 탈출
                 } else if (orderQuantity > productQuantity) {
                    var productName = $(this).find('td:first').text();
                     alert(productName + "의 주문가능 수량은 " + productQuantity + "개 입니다.");
                     isStockValid = false;
                     return false; // 반복문 탈출
                 }
              }
          });

          // 모든 상품의 재고가 유효하면 구매 모달 열기
          if (isStockValid) {
             $('#modalTotalPrice').text($('#totalPriceValue').text());
             calculatePaymentAmount();
             
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
             
             // 제품 수량, 이름 모달창에 전송
             var orderDetails = '';
            $('[id^="product_name"]').each(function(index) {
                var productName = $(this).text();
                var orderQuantity = $('.order_quantity').eq(index).val(); // index를 사용하여 대응하는 수량 요소를 선택
                orderDetails += productName + ' ' + orderQuantity + '개<br>'; // 각 값을 줄바꿈 태그와 함께 추가
            });
            $('#modalOrderInfo').html(orderDetails);
             
             // 모달 열기
             $("#exampleModal").modal("show");
          }
      });
   
      
   
       // 페이지 로드 시 총 금액을 계산하여 표시
       window.onload = calculateTotalPrice;
      
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
   
           calculatePaymentAmount(); // 결제 금액 갱신
       }
   
       function calculatePaymentAmount() {
           var totalPriceText = document.getElementById('modalTotalPrice').textContent;
           console.log("기존금액"+totalPriceText)
           var totalPrice = parseInt(totalPriceText.replace(/[^0-9]/g, ''));
           
           var usePointsInput = document.getElementById('usePoints').value;
           
            var usePoints = parseInt(usePointsInput.replace(/[^0-9]/g, ''));
            console.log("포인트"+usePointsInput)
           if (isNaN(usePoints) || usePoints < 0) {
               usePointsInput = 0;
               usePoints = 0;
           }
           var paymentAmount = totalPrice - usePoints;
           console.log("결제금액"+paymentAmount)
           document.getElementById('paymentAmount').textContent = paymentAmount.toLocaleString() + ' 원';
       }
      function goFoodList(){
          var url = 'foodList.do';
           window.location.href = url;
      }
   </script>
<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>