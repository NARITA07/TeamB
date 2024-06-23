<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Book List</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
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
        margin-bottom: 50px;
    }
    .category-btn form {
        margin: 0 10px;
    }
    .category-btn .btn {
        padding: 15px 20px;
        background-color: #c19f76;
        font-size: 20px;
        color: white;
        font-weight: bold;
/*         border: none; */
        cursor: pointer;
    }
     .category-btn button:hover {
         background-color: #c19f76;
     }
     .category-btn .btn.active{
        padding: 15px 20px;
        background-color: #766650 !important;
        font-size: 20px;
        color: white;
        font-weight: bold;
        cursor: pointer;
     }
    .sidebar {
        background-color: #f2f2f2;
        padding: 20px;
        border-left: 1px solid #ccc;
/*         height: 70vh; */
        position: sticky;
        top: 100px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        max-height: 100vh;
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
    .table-fixed {
        table-layout: fixed;
        width: 100%;
    }
    .table-fixed th, .table-fixed td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        vertical-align: baseline;
    }
    .table-fixed th:nth-child(2), .table-fixed td:nth-child(2) {
        width: 20%;
    }
    .table-fixed th:nth-child(3), .table-fixed td:nth-child(3) {
        width: 20%;
    }
    .table-fixed th:nth-child(4), .table-fixed td:nth-child(4) {
        width: 15%;
    }
    .table-fixed th:nth-child(5), .table-fixed td:nth-child(5) {
        width: 15%;
    }
    .table-fixed th:nth-child(6), .table-fixed td:nth-child(6) {
        width: 15%;
    }
    .table-fixed th:nth-child(7), .table-fixed td:nth-child(7) {
        width: 15%;
    }
    .search-form {
        text-align: center;
        margin-bottom: 20px;
    }
    .search-form form {
        display: inline-block;
    }
    .search-form select, .search-form input {
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 5px 10px; 
    }
    #rent-books {
        background-color: #ccc;
        border: 1px solid white;
        margin-top: 20px;
    }
    #rent-books:enabled {
        background-color: #AB8212;
        border: 1px solid #AB8212;
    }
    .pagination {
        display: flex;
        justify-content: center;
    }
    .btn-custom {
        font-weight: bold !important;
        font-size: 18px !important;
    }
    .half-height {
        height: 50%;
        overflow-y: auto;
    }
    a.page-link {
       color: #111;
   }
   li.page-item.active a.page-link{
      background-color: #c19f76;
      border: 1px solid #c19f76;
   }
   li.page-item a.page-link:hover{
      background-color: #dbbb95;
      border: 1px solid #dbbb95;
      color: #fff;
   }
    @media (max-width: 1200px) {
        body {
            font-size: 13px;
        }
        .category-btn button {
            padding: 8px 16px;
            font-size: 16px !important;
        }
        .search-form select, .search-form input, .search-form button {
            padding: 8px;
            font-size: 16px !important;
        }
        .cart-item button {
            padding: 4px 8px;
            font-size: 16px !important;
        }
        #rent-books {
            font-size: 16px !important;
        }
    }
    @media (max-width: 992px) {
        body {
            font-size: 12px;
        }
        .category-btn button {
            padding: 6px 12px;
            font-size: 14px !important;
        }
        .search-form select, .search-form input, .search-form button {
            padding: 6px;
            font-size: 14px !important;
        }
        .cart-item button {
            padding: 3px 6px;
            font-size: 14px !important;
        }
        #rent-books {
            font-size: 14px !important;
        }
    }
    @media (max-width: 768px) {
        body {
            font-size: 11px;
        }
        .category-btn button {
            padding: 5px 10px;
            font-size: 12px !important;
        }
        .search-form select, .search-form input, .search-form button {
            padding: 5px;
            font-size: 12px !important;
        }
        .cart-item button {
            padding: 3px 5px;
            font-size: 12px !important;
        }
        #rent-books {
            font-size: 12px !important;
        }
    }
    @media (max-width: 576px) {
        body {
            font-size: 8px;
        }
        .category-btn button {
            padding: 4px 8px;
            font-size: 8px !important;
        }
        .search-form select, .search-form input, .search-form button {
            padding: 4px;
            font-size: 8px !important;
        }
        .cart-item button {
            padding: 2px 4px;
            font-size: 8px !important;
        }
        #rent-books {
            font-size: 8px !important;
        }
    }
</style>
<script>
$(document).ready(function() {
    // 카트 목록추가
    function bindAddToCart() {
        $('.add-to-cart').off('click').on('click', function(event) {
            var button = $(this);
            var bookCode = button.data('book-code');
            var bookName = button.data('book-name');
            $.ajax({
                url: 'addToCart',
                type: 'POST',
                data: { bookCode: bookCode, bookName: bookName },
                success: function(response) {
                    updateCart(response);
                    button.prop('disabled', true).removeClass('btn-success').addClass('btn-secondary').css('background-color', '#ccc').text('+');
                },
                error: function(xhr, status, error) {
                    alert("카트에 담기를 실패하였습니다.");
                }
            });
        });
    }

    // 카트목록 삭제
    $(document).on('click', '.remove-from-cart', function(event) {
        var button = $(this);
        var bookCode = button.data('book-code');
        $.ajax({
            url: 'removeFromCart',
            type: 'POST',
            data: { bookCode: bookCode },
            success: function(response) {
                updateCart(response);
                reloadBookList(); // 도서 목록 다시 로드
            },
            error: function(xhr, status, error) {
                alert("목록 삭제에 실패하였습니다.");
            }
        });
    });

    // 단건대여
    $(document).on('click', '.rent-book', function(event) {
        var button = $(this);
        var bookCode = button.data('book-code');
        $.ajax({
            url: 'rentBook',
            type: 'POST',
            data: { bookCode: bookCode },
            success: function(response) {
                updateCart(response);
                reloadBookList();
            },
            error: function(xhr, status, error) {
                alert("대여가 실패하였습니다");
            }
        });
    });

    // 카트대여 버튼 클릭 시 모달 표시
    $('#rent-books').click(function(event) {
        $('#rentBooksModal').modal('show');
    });

    // 모달의 확인 버튼 클릭 시
    $('#confirmRentBooks').click(function() {
        $.ajax({
            url: 'rentBooks',
            type: 'POST',
            success: function(response) {
                $('#rentBooksModal').modal('hide');
                if (response.trim()) {
                    alert(response.trim());
                }
                updateCart(); // 카트 업데이트
                reloadBookList(); // 도서 목록 다시 로드
            },
            error: function(xhr, status, error) {
                alert("대여가 실패하였습니다");
            }
        });
    });

    // 카트 업데이트 함수
    function updateCart() {
        $.ajax({
            url: window.location.href,
            type: 'GET',
            success: function(response) {
                var newCart = $(response).find('#cartTableBody').html();
                $('#cartTableBody').html(newCart);
                bindAddToCart(); // 다시 바인딩
                toggleRentButton(); // 대여하기 버튼 상태 업데이트
            },
            error: function(xhr, status, error) {
                alert("카트 업데이트를 실패하였습니다.");
            }
        });
    }

    // 도서 목록 다시 로드 함수
    function reloadBookList() {
        $.ajax({
            url: window.location.href,
            type: 'GET',
            success: function(response) {
                // 새로운 도서 목록을 페이지에 반영
                var newBookList = $(response).find('.table-responsive').html();
                $('.table-responsive').html(newBookList);
                bindAddToCart(); // 도서 목록을 다시 로드한 후 이벤트를 다시 바인딩
                toggleRentButton(); // 대여하기 버튼 상태 업데이트
            },
            error: function(xhr, status, error) {
                alert("대여목록 불러오기를 실패하였습니다.");
            }
        });
    }

    // 대여하기 버튼 상태 업데이트 함수
    function toggleRentButton() {
        if ($('#cartTableBody').children().length > 0) {
            $('#rent-books').prop('disabled', false).css('background-color', '#766650');
        } else {
            $('#rent-books').prop('disabled', true).css('background-color', '#ccc');
        }
    }

    // 초기 이벤트 바인딩
    bindAddToCart();
    toggleRentButton(); // 초기 상태 확인
});
</script>
</head>
<body>
<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>

<section class="py-5">
   <div class="container px-5 px-lg-5">
       <div class="row">
           <div class="col-lg-12 col-md-12">
               <h1 style="margin-bottom: 50px;">도서 목록</h1>
               <div class="category-btn">
                   <form method="get" action="bookList.do">
                       <button type="submit" class="btn ${selectedCategory == null ? 'active' : ''}" style="background-color: #c19f76;">전체</button>
                   </form>
                   <c:forEach var="category" items="${categories}">
                       <form method="get" action="bookList.do">
                           <input type="hidden" name="category" value="${category.sec_name}">
                           <button type="submit" class="btn ${selectedCategory == category.sec_name ? 'active' : ''}">${category.sec_name}</button>
                       </form>
                   </c:forEach>
               </div>
               <div class="search-form" style="margin-bottom: 20px;">
                   <form method="get" action="bookList.do">
                       <select name="searchType" style="height: 38px; vertical-align: middle;">
                           <option value="name" ${searchType == 'name' ? 'selected' : ''}>책 이름</option>
                           <option value="author" ${searchType == 'author' ? 'selected' : ''}>저자</option>
                       </select>
                       <input type="text" name="searchQuery" placeholder="검색어 입력" value="${searchQuery}" style="height: 38px; vertical-align: middle;">
                       <button type="submit" class="btn btn-primary" style="background-color: #766650; border: none; font-weight: bold !important; font-size: 18px !important;">검색</button>
                       <input type="hidden" name="category" value="${selectedCategory}">
                   </form>
               </div>
               </div>
               <div class="col-lg-9 col-md-12">
               <div class="table-responsive" style="margin:auto;">
                   <table class="table table-fixed">
                       <thead>
                           <tr>
                               <th style="display:none;">책 코드</th>
                               <th>책 이름</th>
                               <th>저자</th>
                               <th>출판일</th>
                               <th>카테고리</th>
                               <th>대여상태</th>
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
                                           <c:when test="${book.book_quantity == 'Y'}">
                                               <%-- <button class="btn-primary btn rent-book" data-book-code="${book.book_code}" style="background-color: #AB8212; font-weight: bold !important; font-size: 18px !important;">대여하기</button> --%>
                                               <span>대여가능</span>
                                           </c:when>
                                           <c:otherwise>
                                               <!-- <button disabled class="btn btn-secondary" style="font-weight: bold !important; font-size: 18px !important;">대여하기</button> -->
                                               <span>대여불가능</span>
                                           </c:otherwise>
                                       </c:choose>
                                   </td>
                                   <td>
                                       <c:choose>
                                           <c:when test="${loginInfo != null && loginInfo.user_leadbook == 'Y' && book.book_quantity == 'Y'}">
                                               <c:choose>
                                                   <c:when test="${cart[book.book_code] != null}">
                                                       <button disabled class="btn btn-secondary" style="background-color: #766650; font-weight: bold !important; font-size: 18px !important;">+</button>
                                                   </c:when>
                                                   <c:otherwise>
                                                       <button class="btn btn-success add-to-cart" data-book-code="${book.book_code}" data-book-name="${book.book_name}" style="background-color: #766650; font-weight: bold !important; font-size: 18px !important; border:none !important;">+</button>
                                                   </c:otherwise>
                                               </c:choose>
                                           </c:when>
                                           <c:otherwise>
                                               <button disabled class="btn btn-secondary" style="background-color: #ccc; font-weight: bold !important; font-size: 18px !important;">+</button>
                                           </c:otherwise>
                                       </c:choose>
                                   </td>
                               </tr>
                           </c:forEach>
                       </tbody>
                   </table>
               </div>
               <nav>
				   <ul class="pagination">
				       <!-- 처음으로 이동 버튼, 목록이 없을 때 비활성화 -->
				       <li class="page-item ${pagination.currentPage == 1 || books.isEmpty() ? 'disabled' : ''}">
				           <a class="page-link" href="?page=1&size=${pagination.recordsPerPage}&category=${selectedCategory}&searchType=${searchType}&searchQuery=${searchQuery}">&laquo;&laquo;</a>
				       </li>
				       <!-- 이전 페이지 이동 버튼, 목록이 없을 때 비활성화 -->
				       <li class="page-item ${pagination.currentPage == 1 || books.isEmpty() ? 'disabled' : ''}">
				           <a class="page-link" href="?page=${pagination.currentPage - 1}&size=${pagination.recordsPerPage}&category=${selectedCategory}&searchType=${searchType}&searchQuery=${searchQuery}">&laquo;</a>
				       </li>
				       <c:forEach begin="${pagination.startPage}" end="${pagination.endPage}" var="i">
				           <li class="page-item ${pagination.currentPage == i ? 'active' : ''}">
				               <a class="page-link" href="?page=${i}&size=${pagination.recordsPerPage}&category=${selectedCategory}&searchType=${searchType}&searchQuery=${searchQuery}" style="color:#766650;">${i}</a>
				           </li>
				       </c:forEach>
				       <!-- 다음 페이지 이동 버튼, 목록이 없을 때 비활성화 -->
				       <li class="page-item ${pagination.currentPage == pagination.totalPages || books.isEmpty() ? 'disabled' : ''}">
				           <a class="page-link" href="?page=${pagination.currentPage + 1}&size=${pagination.recordsPerPage}&category=${selectedCategory}&searchType=${searchType}&searchQuery=${searchQuery}">&raquo;</a>
				       </li>
				       <!-- 마지막으로 이동 버튼, 목록이 없을 때 비활성화 -->
				       <li class="page-item ${pagination.currentPage == pagination.totalPages || books.isEmpty() ? 'disabled' : ''}">
				           <a class="page-link" href="?page=${pagination.totalPages}&size=${pagination.recordsPerPage}&category=${selectedCategory}&searchType=${searchType}&searchQuery=${searchQuery}">&raquo;&raquo;</a>
				       </li>
				   </ul>
				</nav>
           </div>
           <div class="col-lg-3 col-md-12 sidebar">
              <h2>담긴도서</h2>
               <div class="half-height" style="height: 90%">
                   <div id="cartTableBody">
                       <c:forEach var="entry" items="${cart}">
                           <div class="cart-item">
                               <span>${entry.value}</span>
                               <button class="btn btn-danger remove-from-cart" data-book-code="${entry.key}" style="background-color:#766650; font-weight: bold !important; font-size: 20px !important;">-</button>
                           </div>
                       </c:forEach>
                   </div>
               </div>
               <button id="rent-books" class="btn btn-primary" style="background-color: #766650; margin-top: 20px; font-weight: bold !important; font-size: 18px !important; margin-bottom:50px; border:none !important;" disabled>대여하기</button>
           </div>
       </div>
      <!-- Modal -->
      <div class="modal fade" id="rentBooksModal" role="dialog"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content" style="text-align: center;">
            <div class="modal-header" style="justify-content: center;">
               <span style="width: 100%; font-size:18px;">선택하신 도서를 대여하시겠습니까?</span>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
            <div class="modal-footer" style="margin:auto;">
              <button type="button" class="btn btn-primary" id="confirmRentBooks" style="background-color: #766650; border:none;">확인</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="background-color: #6c757d; border:none;">취소</button>
            </div>
          </div>
        </div>
      </div>
   </div>
</section>
<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>