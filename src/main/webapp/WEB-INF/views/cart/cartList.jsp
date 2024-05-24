<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>CartList</title>
	<style>
    html, body {
        height: 100%;
        margin: 0;
    }
    body {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    .container {
        margin-top: 20px; 
        flex: 1;
        padding-bottom: 50px;
    }
    h1 {
        margin-top: 20px; 
        text-align: center;
    }
    table {
        border-collapse: collapse;
        width: 80%;
        margin: 0 auto;
    }
    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
    }
    th {
        background-color: #f2f2f2;
    }
    .sidebar {
        position: fixed;
        top: 0;
        right: -300px;
        width: 300px;
        height: 100%;
        background-color: #f2f2f2;
        padding: 20px;
        transition: right 0.3s ease;
    }
    .show-sidebar {
        right: 0;
    }
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
</style>
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
		<table>
            <tr>
            	<th>주문코드</th>
                <th>음식이름</th>
                <th>음식가격</th>
                <th>음식수량</th>
                <th>삭제</th>
            </tr>
            <c:forEach items="${cartList}" var="cart">
                <tr>
                	<td>${cart.sequence_number}</td>	
                    <td>${cart.product_name}</td>
                    <td>${cart.product_price}</td>
                    <td>${cart.order_quantity}</td>
                    <td><button onclick="deleteCart('${cart.cart_code}','${cart.product_code}','${loginInfo.user_code}')">삭제</button></td>
                </tr>
            </c:forEach>
        </table>
	<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
	<script>
		function deleteCart(cart_code,product_code,user_code){
			alert("삭제되었습니다."+cart_code+product_code+user_code)
			var url = 'deleteCart.do?cart_code=' + encodeURIComponent(cart_code) +
              '&product_code=' + encodeURIComponent(product_code) +
              '&user_code=' + encodeURIComponent(user_code);
			window.location.href = url;
		}
	</script>
</body>
</html>