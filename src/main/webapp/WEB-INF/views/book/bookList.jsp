<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Book List</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<style>
    .main-content {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-bottom: 20px;
    }
    h1 {
        margin-top: 20px;
        text-align: center;
    }
    .category-btn {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
    .category-btn form {
        margin: 0 10px;
    }
    .category-btn button {
        padding: 10px 20px;
        background-color: #AB8212;
        color: white;
        border: none;
        cursor: pointer;
    }
    .category-btn button:hover {
        background-color: #99730F;
    }
    .sidebar {
        background-color: #f2f2f2;
        padding: 20px;
        border-left: 1px solid #ccc;
        overflow-y: auto;
        margin-top: 20px;
    }
    .sidebar h2 {
        text-align: center;
    }
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
    }
    .cart-item button {
        background-color: #AB8212;
        color: white;
        border: none;
        cursor: pointer;
        padding: 5px 10px;
    }
    .cart-item button:hover {
        background-color: #99730F;
    }
</style>
</head>
<body>
    <%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
    <div class="container-fluid" style="margin-top: 50px;"> 
        <div class="row">
            <div class="col-lg-9 col-md-12">
                <h1>책 리스트</h1>
                <div class="category-btn" style="margin-top:30px;">
                    <form method="get" action="bookList.do">
                        <button type="submit">전체</button>
                    </form>
                    <c:forEach var="category" items="${categories}">
                        <form method="get" action="bookList.do">
                            <input type="hidden" name="category" value="${category.sec_name}">
                            <button type="submit" class="${selectedCategory == category.sec_name ? 'btn btn-warning' : 'btn btn-primary'}">${category.sec_name}</button>
                        </form>
                    </c:forEach>
                </div>
                <div class="search-form">
                    <form method="get" action="bookList.do">
                        <select name="searchType">
                            <option value="name">책 이름</option>
                            <option value="author">저자</option>
                        </select>
                        <input type="text" name="searchQuery" placeholder="검색어 입력">
                        <button type="submit" class="btn btn-primary" style="background-color: #AB8212;">검색</button>
                    </form>
                </div>
                <div class="table-responsive" style="margin-top: 20px;">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th style="display:none;">책 코드</th>
                                <th>책 이름</th>
                                <th>저자</th>
                                <th>출판 날짜</th>
                                <th>카테고리</th>
                                <th>대여하기</th>
                                <th>담기</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach items="${books}" var="book">
                                <tr>
                                    <td style="display:none;">${book.book_code}</td>
                                    <td>${book.book_name}</td>
                                    <td>${book.book_writer}</td>
                                    <td>${book.book_publication_date}</td>
                                    <td>${book.sec_name}</td>
                                    <td>
                                        <c:choose>
                                            <c:when test="${loginInfo != null && loginInfo.user_leadbook == 'Y' && book.book_quantity == 'Y'}">
                                                <form method="post" action="rentBook">
                                                    <input type="hidden" name="bookCode" value="${book.book_code}">
                                                    <button type="submit" class="btn-primary btn" style="background-color: #AB8212;">대여하기</button>
                                                </form>
                                            </c:when>
                                            <c:otherwise>
                                                <button disabled class="btn btn-secondary">대여하기</button>
                                            </c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td>
                                        <c:choose>
                                            <c:when test="${loginInfo != null && loginInfo.user_leadbook == 'Y' && book.book_quantity == 'Y'}">
                                                <c:choose>
                                                    <c:when test="${cart[book.book_code] != null}">
                                                        <button disabled class="btn btn-secondary">이미 담겼습니다</button>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <form method="post" action="addToCart">
                                                            <input type="hidden" name="bookCode" value="${book.book_code}">
                                                            <input type="hidden" name="bookName" value="${book.book_name}">
                                                            <button type="submit" class="btn btn-success" style="background-color: #AB8212;">담기</button>
                                                        </form>
                                                    </c:otherwise>
                                                </c:choose>
                                            </c:when>
                                            <c:otherwise>
                                                <button disabled class="btn btn-secondary">담기</button>
                                            </c:otherwise>
                                        </c:choose>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-3 col-md-10 sidebar">
                <h2>담긴도서</h2>
                <div id="cartTableBody">
                    <c:forEach var="entry" items="${cart}">
                        <div class="cart-item">
                            <span>${entry.value}</span>
                            <form method="post" action="removeFromCart" style="margin:0;">
                                <input type="hidden" name="bookCode" value="${entry.key}">
                                <button type="submit" class="btn btn-danger">삭제</button>
                            </form>
                        </div>
                    </c:forEach>
                </div>
                <form method="post" action="rentBooks" style="margin-top: 20px;">
                    <button type="submit" class="btn btn-primary" style="background-color: #AB8212;">대여하기</button>
                </form>
            </div>
        </div>
    </div>
    <%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>