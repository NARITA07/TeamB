<%@ page language="java" pageEncoding="UTF-8"%>
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
	    margin-top: 50px;
	}
	#receipt{
		width: 270px;
		margin-left: 107px
	}
	
        
	
</style>
</head>
<body>
	<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
	<div class="container">
		<div class="receipt-container">
			<div id="receipt">
				<h1>영수증</h1>
				<c:forEach items="${receiptList}" var="receipt">
					<div>
						<span>${receipt.product_name}</span>  ${receipt.order_quantity}개
					</div>
					<div>
						<label>제품가격</label>
						<span>${receipt.product_amount}</span>
					</div>
				</c:forEach>
				<div>
					<label>기존가격</label>
					<span>${receiptInfo.total_amount}</span>
				</div>
				<div>
					<label>사용포인트</label>
					<span>${receiptPoint.point_change2}</span>
				</div>
				<div>
					<label>결제가격</label>
					<span>${receiptInfo.total_price}</span>
				</div>
				<div>
					<label>적립포인트</label>
					<span>${receiptPoint.point_change1}</span>
				</div>
				<div>
					<label>결제일</label>
					<span>${receiptInfo.payment_date}</span>
				</div>
				<input type="button" value="영수증 출력" onclick="fnPrint()">
			</div>
		</div>
	</div>
	<script>
	function fnPrint() {
		var receiptContent = document.getElementById('receipt').innerHTML;
		var originalContent = document.body.innerHTML;

		document.body.innerHTML = receiptContent;

		window.print();

		document.body.innerHTML = originalContent;
	}
	/* function fnPrint() {
        window.print();
    }

    window.addEventListener('beforeprint', function () {
        document.getElementById('receipt').classList.add('print-style');
        document.getElementById('non-printable').classList.add('hidden');
    });

    window.addEventListener('afterprint', function () {
        document.getElementById('receipt').classList.remove('print-style');
        document.getElementById('non-printable').classList.remove('hidden');
    }); */
	</script>
	<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>