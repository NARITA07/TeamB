<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
   <title>도서 대여목록</title>
   <meta charset="UTF-8">
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
   <link href="/css/style.css" rel="stylesheet" />
<style>
   #tbl_point tr, #tbl_point td, #tbl_point th {
      padding: 10px;
   }
   #tbl_point th:nth-child(1), #tbl_point td:nth-child(1) {
      width: 5%;
   }
   #tbl_point th:nth-child(2), #tbl_point td:nth-child(2) {
      width: 15%;
   }
   #tbl_point th:nth-child(3), #tbl_point td:nth-child(3) {
      width: 20%;
   }
   #tbl_point th:nth-child(4), #tbl_point td:nth-child(4) {
      width: 20%;
   }
   #tbl_point th:nth-child(5), #tbl_point td:nth-child(5) {
      width: 15%;
   }
   #tbl_point th:nth-child(6), #tbl_point td:nth-child(6) {
      width: 15%;
   }
   #tbl_point th:nth-child(7), #tbl_point td:nth-child(7) {
      width: 10%;
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
</style>
</head>
<body>
<script>
// 기간별 대여내역조회
function borrowHistory() {
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    console.log("startDate:" + startDate + ", endDate:" + endDate);

    if (!startDate || !endDate) {
        alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
        return;
    }

    // 검색날짜 포함해서 페이지 리로드
    var queryString = "?startDate=" + startDate + "&endDate=" + endDate;
    window.location.href = "/myPage/borrowList" + queryString;
}

// 날짜 형식 변환
function formattedDate(point_use_date) {
   if (!point_use_date) {
        return "";
    }
   
   // 대상 문자열
    var dateStr = point_use_date;
    
   // 연도, 월, 일 추출
     var year = dateStr.substring(0, 4);
     var month = dateStr.substring(4, 6);
     var day = dateStr.substring(6, 8);
     var hour = dateStr.substring(8, 10);
     var minute = dateStr.substring(10, 12);

     var formattedDate = year + "-" + month + "-" + day + " " + hour + ":" + minute;
     
     return formattedDate;
}

$(document).ready(function() {
   
   $(".payment_date").each(function() {
      var payment_date = $(this).text();
      if (payment_date.length > 0) {
         $(this).text(formattedDate(payment_date));
      }
   });
   
});
</script>
   <%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
   
   <section class="ftco-section">
   <div class="container">
      <div class="row">
         <div class="col-md-12">
            <div class="row" style="margin-top: 50px;">
               <div class="col-md-1">
               </div>
               <div class="col-md-10">
                  <div class="row">
                     <div class="col-md-12">
                        <div style="padding-top: 30px; padding-bottom: 50px;">
                           <div style="display: flex; justify-content: center;">
                              <h2 style="margin-bottom:50px;">${loginInfo.user_name}님의 도서 대여내역입니다.</h2>
                           </div>
                            <!-- 날짜 선택기 -->
                              <div class="d-flex justify-content-end align-items-center" style="margin:10px;">
                                <div style="display: flex; align-items: center; justify-content: center;">
                                    <div class="col-auto">
                                        <input type="date" class="form-control" id="startDate" value="${startDate}">
                                    </div>
                                    <span>~</span>
                                    <div class="col-auto">
                                        <input type="date" class="form-control" id="endDate" value="${endDate}">
                                    </div>
                                    <div class="col-auto">
                                        <button class="btn btn-primary" onclick="borrowHistory()"
                                        style="background-color: #c19f76; border: 1px solid;">조회</button>
                                    </div>
                                </div>
                            </div>
                           <table id="tbl_point" class="table table-hover table-sm" style="text-align: center;">
                              <thead>
                                 <tr class="table-warning">
                                    <th>#</th>
                                    <th>주문번호</th>
                                    <th>대여일시</th>
                                    <th>책 제목</th>
                                    <th>저자</th>
                                    <th>카테고리</th>
                                    <th>대여상태</th>
                                 </tr>
                              </thead>
                              <tbody>
                              	 <%-- 주문내역이 없는 경우 --%>
                                 <c:if test="${empty borrowList}">
                                     <tr>
                                    <td colspan='7'>도서 대여내역이 없습니다.</td>
                                 </tr>
                                 </c:if>
                                 <%-- 주문내역이 있는 경우 --%>
                             	 <c:if test="${not empty borrowList}">
                                 <c:forEach var="borrow" items="${borrowList}">
                                    <tr>
                                       <td>${borrow.rowNum}</td>
                                       <td>${borrow.order_code}</td>
                                       <td class="payment_date">${borrow.payment_date}</td>
                                       <td>${borrow.book_name}</td>
                                       <td>${borrow.book_writer}</td>
                                       <td>${borrow.sec_name}</td>
                                       <td>${borrow.return_state}</td>
                                    </tr>
                                 </c:forEach>
                              </c:if>
                              </tbody>
                           </table>
                           <nav>
			                   <ul class="pagination" style="display: flex; justify-content: center; color: #fff">
			                       <li class="page-item ${pagination.currentPage == 1 || borrowList.isEmpty() ? 'disabled' : ''}">
			                           <a class="page-link" href="?page=1&size=${pagination.recordsPerPage}&startDate=${startDate}&endDate=${endDate}">&laquo;&laquo;</a>
			                       </li>
			                       <li class="page-item ${pagination.currentPage == 1 || borrowList.isEmpty() ? 'disabled' : ''}">
			                           <a class="page-link" href="?page=${pagination.currentPage - 1}&size=${pagination.recordsPerPage}&startDate=${startDate}&endDate=${endDate}">&laquo;</a>
			                       </li>
			                       <c:forEach begin="${pagination.startPage}" end="${pagination.endPage}" var="i">
			                           <li class="page-item ${pagination.currentPage == i ? 'active' : ''}">
			                               <a class="page-link" href="?page=${i}&size=${pagination.recordsPerPage}&startDate=${startDate}&endDate=${endDate}" style="color:#766650;">${i}</a>
			                           </li>
			                       </c:forEach>
			                       <li class="page-item ${pagination.currentPage == pagination.totalPages || borrowList.isEmpty() ? 'disabled' : ''}">
			                           <a class="page-link" href="?page=${pagination.currentPage + 1}&size=${pagination.recordsPerPage}&startDate=${startDate}&endDate=${endDate}">&raquo;</a>
			                       </li>
			                       <li class="page-item ${pagination.currentPage == pagination.totalPages || borrowList.isEmpty() ? 'disabled' : ''}">
			                           <a class="page-link" href="?page=${pagination.totalPages}&size=${pagination.recordsPerPage}&startDate=${startDate}&endDate=${endDate}">&raquo;&raquo;</a>
			                       </li>
			                   </ul>
			               </nav>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-md-1">
               </div>
            </div>
         </div>
      </div>
   </div>
   </section>
   
   <div class="footer">
       <%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
   </div>
</body>
</html>