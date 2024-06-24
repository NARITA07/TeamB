<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>receipt</title>
    <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
    <!-- Bootstrap icons-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/food.css" rel="stylesheet" />
    <style>
        body {
            font-size: 9pt;
            color: #333333;
            font-family: '맑은 고딕', Arial, sans-serif;
            background-color: #f8f9fa;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .container {
        	display:flex;
        	justify-content:center;
            align-items: center;
            height: 100%;
        }
        .receipt-container {
            width: 100%;
            max-width: 400px;
            padding: 20px;
            border: 1px solid #ccc;
            background: white;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            margin-top: 20px;
        }
        #receipt {
            width: 100%;
        }
        h1{
			text-align: center;
		}
        .orderInfo{
        	display:flex;
        	justify-content: space-between;
        	margin-top: 20px;
        	margin-bottom: 20px;
        	padding-top: 20px;
        	padding-bottom: 20px;
        	border-top: 1px solid black;
        	border-bottom: 1px solid black;
        }
        .pricePoint{	
        	margin-top: 20px;
        	margin-bottom: 20px;
        	padding-top: 20px;
        	padding-bottom: 20px;
        	border-bottom: 1px solid black;
        }
        .orderDate{
        	margin-bottom: 20px;
        }
        .productName{
        	width: 215px;
        }
        .orderQuantity{
        	width: 38px;
        }
        .printBtn{
        	margin-bottom: 20px;
        }
        .totalAmount, .pointChange2, .pointChange1, .totalPrice, .orderDate{
        	display:flex;
        	justify-content: space-between;
        }
        .printBtn{
        	display: flex;
        	justify-content: center;
        }

        @media print {
        	h1{
				text-align: center;
				font-size: 500pt;
			}
        	
        	.receipt-container {
	            width: 100%;
	            max-width: 1320px;
	            padding: 20px;
	            border: 1px solid #ccc;
	            background: white;
	            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	            margin-top: 50px;
	            font-size: 25pt;
	        }
        	.printBtn{
        		display: none;
        	}
        	.productName{
	        	width: 315px;
	        }
	        .orderQuantity{
	        	width: 68px;
	        }
        	.top{
        		display: none;
        	}
        	.bottom{
        		display: none;
        	}
        }
    </style>
</head>
<body>
	<div class="top">
		<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
	</div>
	
	<div class="container" style="margin-top: 50px;">
	    <div class="receipt-container">
	        <div id="receipt">
	            <h1>영수증</h1>
	            <c:forEach items="${receiptList}" var="receipt">
		            <div class="orderInfo">
		            	<div class="productName">
	                        <span>${receipt.product_name}</span>
	                    </div>
	                    <c:choose>
	                        <c:when test="${receipt.product_code == 'food_014'}">
	                            <div class="orderQuantity">
			                        <span></span>
			                    </div>
	                        </c:when>
	                        <c:otherwise>
	                            <div class="orderQuantity">
			                        <span>${receipt.order_quantity}개</span>
			                    </div>
	                        </c:otherwise>
                        </c:choose>
	                    <div>
	                        <span class="price" data-price="${receipt.product_amount}"></span>
	                    </div>
		            </div>
                </c:forEach>
                <div class="pricePoint">
                	<div class="totalAmount">
	                    <label>총 금액</label>
	                    <span class="price" data-price="${receiptInfo.total_amount}"></span>
	                </div>
	                <div class="pointChange2">
	                    <label>사용포인트</label>
	                    <span class="price" data-price="${receiptPoint.point_change2}"></span>
	                </div>
	                <div class="totalPrice">
	                    <label>결제금액</label>
	                    <span class="price" data-price="${receiptInfo.total_price}"></span>
	                </div>
	                <div class="pointChange1">
	                    <label>적립포인트</label>
	                    <span class="price" data-price="${receiptPoint.point_change1}"></span>
	                </div>
                </div>
	            <div class="orderDate">
	                <label>결제일시</label>
	                <span class="payment_date">${receiptInfo.payment_date}</span>
	            </div>
	            <div class="printBtn">
	            	<input type="button" value="영수증 출력" onclick="fnPrint()">
	            </div>
	        </div>
	    </div>
	</div>
	<script>
		 // 숫자 포맷 함수
	    function formatPrice(price) {
	        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
	    }
	
	    // 페이지 로드 시 가격 포맷 적용
	    document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.price').forEach(function(element) {
                var price = element.getAttribute('data-price') || 0; // 값이 없으면 0으로 설정
                element.textContent = formatPrice(price);
            });
        });
	    function fnPrint() {
	        window.print();
	    }
	    
	    document.addEventListener('DOMContentLoaded', function() {
	        var paymentDates = document.querySelectorAll('.payment_date');
	        paymentDates.forEach(function(dateElement) {
	            var payment_date = dateElement.textContent;
	            if (payment_date.length > 0) {
	                dateElement.textContent = formattedDate(payment_date);
	            }
	        });
	    });

	    function formattedDate(dateString) {
	        var year = dateString.substring(0, 4);
	        var month = dateString.substring(4, 6);
	        var day = dateString.substring(6, 8);
	        var hour = dateString.substring(8, 10);
	        var minute = dateString.substring(10, 12);

	        var formattedDate = year + "-" + month + "-" + day + " " + hour + ":" + minute;
	        console.log("날짜 : " + formattedDate);
	        return formattedDate;
	    }
	</script>
	<div class="bottom">
		<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
	</div>
</body>
</html>