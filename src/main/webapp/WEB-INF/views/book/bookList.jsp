<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Book List</title>
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
</head>
<body>
    <%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
    <div class="container">
        <h1>Book List</h1>
        <label><a>소설</a></label>
        <label><a>만화</a></label>
        <label><a>잡지</a></label>
        <table>
            <tr>
                <th>책 코드</th>
                <th>책 이름</th>
                <th>대여 가능여부</th>
                <th>가격</th>
                <th>대여하기</th>
                <th>담기</th>
            </tr>
            <c:forEach items="${books}" var="book">
                <tr>
                    <td>${book.book_code}</td>
                    <td>${book.book_name}</td>
                    <td>${book.book_quantity}</td>
                    <td>${book.book_price}</td>
                    <td><button onclick="openRentForm('${book.book_code}', '${book.book_name}')">대여하기</button></td>
                    <td><button onclick="addToCart('${book.book_code}', '${book.book_name}', '${book.book_quantity}', '${book.book_price}')">담기</button></td>
                </tr>
            </c:forEach>
        </table>
    </div>
	
    <div class="sidebar" id="sidebar">
    	<h3>담긴 책들:</h3>
        <table id="cartTable">
            <thead>
                <tr>
                    <th>책 코드</th>
                    <th>책 이름</th>
                    <th>가격</th>
                </tr>
            </thead>
            <tbody id="cartList">
                <!-- Cart items will be dynamically added here -->
            </tbody>
        </table>
        <br><br><br>
        <h2>비회원 대여하기</h2>
        <form action="rentBook.do" method="post">
            <input type="hidden" name="book_code" id="form_book_code">
            <input type="hidden" name="user_authority" value="0">
            <label>이름: </label><input type="text" name="user_name" required><br>
            <label>전화번호: </label><input type="text" name="user_tel" required><br>
            <label>Email: </label><input type="email" name="user_email" required><br>
            <label>주소: </label><input type="text" name="user_address" required><br>
            <input type="submit" value="비회원 대여하기">
        </form>
        
    </div>

    <%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
    <script>
        let cartItems = {};

        function openRentForm(bookCode, bookName) {
            var sidebar = document.getElementById("sidebar");
            var formBookCode = document.getElementById("form_book_code");
            formBookCode.value = bookCode;
            sidebar.classList.add("show-sidebar");
        }

        function addToCart(bookCode, bookName, bookQuantity, bookPrice) {
            if (bookQuantity.toLowerCase() !== 'y') {
                alert('이 도서는 대여할 수 없습니다.');
                return;
            }
            if (cartItems[bookCode]) {
                alert('이 도서는 이미 담겼습니다.');
                return;
            }
            cartItems[bookCode] = { name: bookName, price: bookPrice };
            var cartList = document.getElementById("cartList");
            var row = document.createElement("tr");
            var cellCode = document.createElement("td");
            var cellName = document.createElement("td");
            var cellPrice = document.createElement("td");
            cellCode.textContent = bookCode;
            cellName.textContent = bookName;
            cellPrice.textContent = bookPrice;
            row.appendChild(cellCode);
            row.appendChild(cellName);
            row.appendChild(cellPrice);
            cartList.appendChild(row);

            // Show the sidebar when a book is added to the cart
            var sidebar = document.getElementById("sidebar");
            sidebar.classList.add("show-sidebar");
        }

        function toggleSidebar() {
            var sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("show-sidebar");
        }
    </script>
</body>
</html>