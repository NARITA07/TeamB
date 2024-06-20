<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
   <title>포인트 내역조회</title>
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
      width: 15%;
   }
   #tbl_point th:nth-child(5), #tbl_point td:nth-child(5) {
      width: 20%;
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
// 기간별 포인트내역조회
function pointHistory() {
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    console.log("startDate:" + startDate + ", endDate:" + endDate);

    if (!startDate || !endDate) {
        alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
        return;
    }

    // 검색날짜 포함해서 페이지 리로드
    var queryString = "?startDate=" + startDate + "&endDate=" + endDate;
    window.location.href = "/myPage/pointList" + queryString;
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

     var formattedDate = year + "-" + month + "-" + day;
     
     return formattedDate;
}

$(document).ready(function() {
   
   $(".point_use_date").each(function() {
      var point_use_date = $(this).text();
      if (point_use_date.length > 0) {
         $(this).text(formattedDate(point_use_date));
      }
   });
   
});

$(function() {
   
   var originalData = $("#pointHistory").html();
   
    // 전체 버튼 클릭
   $("#pointAll").click(function() {
       var tbody = $("#tbl_point tbody");
       tbody.html(originalData);
       $("#tbl_point thead tr").removeClass().addClass("table-warning");
       if (tbody.children().length == 0) {
           tbody.html("<tr><td colspan='7'>포인트 내역이 없습니다.</td></tr>");
       }
   });
   
   // 적립 버튼 클릭
   $("#plusPoint").click(function() {
       var tbody = $("#tbl_point tbody");
       tbody.html(originalData);
       tbody.find("tr").hide();
       var earnedRows = tbody.find("tr:contains('적립')");
       earnedRows.show();
       $("#tbl_point thead tr").removeClass().addClass("table-primary");
       if (earnedRows.length == 0) {
           tbody.html("<tr><td colspan='7'>적립포인트 내역이 없습니다.</td></tr>");
       }
   });
   
   // 사용 버튼 클릭
   $("#minusPoint").click(function() {
       var tbody = $("#tbl_point tbody");
       tbody.html(originalData);
       tbody.find("tr").hide();
       var usedRows = tbody.find("tr:contains('사용')");
       usedRows.show();
       $("#tbl_point thead tr").removeClass().addClass("table-danger");
       if (usedRows.length == 0) {
           tbody.html("<tr><td colspan='7'>사용포인트 내역이 없습니다.</td></tr>");
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
                           <div style="display: flex; align-items: center; justify-content: center;">
                              <h2 style="margin-bottom:50px;">${loginInfo.user_name}님의 현재 포인트 : 
                              <a id="myPoint" style="margin-left:10px;">
                                 <fmt:formatNumber value="${totalPoint}" type="number" groupingUsed="true"/>
                              </a>P
                              </h2>
                           </div>
                            <!-- 날짜 선택기 -->
                              <div class="d-flex justify-content-between align-items-center" style="margin:10px;">
                              <div style="display: flex; justify-content: center;">
                                 <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-outline-dark" id="pointAll">전체</button>
                                    <button type="button" class="btn btn-outline-dark" id="plusPoint">적립</button>
                                    <button type="button" class="btn btn-outline-dark" id="minusPoint">사용</button>
                                 </div>
                              </div>
                                <div style="display: flex; align-items: center; justify-content: center;">
                                    <div class="col-auto">
                                        <input type="date" class="form-control" id="startDate" value="${startDate}">
                                    </div>
                                    <span>~</span>
                                    <div class="col-auto">
                                        <input type="date" class="form-control" id="endDate" value="${endDate}">
                                    </div>
                                    <div class="col-auto">
                                        <button class="btn btn-primary" onclick="pointHistory()"
                                        style="background-color: #c19f76; border: 1px solid;">조회</button>
                                    </div>
                                </div>
                            </div>
                           <table id="tbl_point" class="table table-hover table-sm" style="text-align: center;">
                              <thead>
                                 <tr class="table-warning">
                                    <th>#</th>
                                    <th>주문번호</th>
                                    <th>적립/사용일</th>
                                    <th>사유</th>
                                    <th>구매금액</th>
                                    <th>포인트</th>
                                    <th>구분</th>
                                 </tr>
                              </thead>
                              <tbody id="pointHistory">
                              <%-- 포인트내역이 없는 경우 --%>
                                 <c:if test="${empty pointList}">
                                     <tr>
                                    <td colspan='7'>포인트 내역이 없습니다.</td>
                                 </tr>
                                  </c:if>
                              <c:if test="${not empty pointList}">
                                 <c:forEach var="point" items="${pointList}">
                                    <tr>
                                       <td>${point.rowNum}</td>
                                       <td>${point.order_code}</td>
                                       <td class="point_use_date">${point.point_joindate}</td>
                                            <td>
                                                <c:choose>
                                                    <c:when test="${point.payment_state eq 1}">결제완료</c:when>
                                                    <c:when test="${point.payment_state eq 2}">환불</c:when>
                                                    <c:when test="${point.payment_state eq 3}">결제취소</c:when>
                                                    <c:otherwise>기타</c:otherwise>
                                                </c:choose>
                                            </td>
                                       <td><fmt:formatNumber value="${point.total_price}" type="number"/> 원</td>
                                       <td><fmt:formatNumber value="${point.point_change}" type="number"/> P</td>
                                       <td>${point.point_section}</td>
                                    </tr>
                                 </c:forEach>
                              </c:if>
                              </tbody>
                           </table>
                           <nav>
			                   <ul class="pagination" style="display: flex; justify-content: center; color: #fff">
			                       <li class="page-item ${pagination.currentPage == 1 || pointList.isEmpty() ? 'disabled' : ''}">
			                           <a class="page-link" href="?page=1&size=${pagination.recordsPerPage}&category=${selectedCategory}">&laquo;&laquo;</a>
			                       </li>
			                       <li class="page-item ${pagination.currentPage == 1 || pointList.isEmpty() ? 'disabled' : ''}">
			                           <a class="page-link" href="?page=${pagination.currentPage - 1}&size=${pagination.recordsPerPage}&category=${selectedCategory}">&laquo;</a>
			                       </li>
			                       <c:forEach begin="${pagination.startPage}" end="${pagination.endPage}" var="i">
			                           <li class="page-item ${pagination.currentPage == i ? 'active' : ''}">
			                               <a class="page-link" href="?page=${i}&size=${pagination.recordsPerPage}&category=${selectedCategory}" style="color:#766650;">${i}</a>
			                           </li>
			                       </c:forEach>
			                       <li class="page-item ${pagination.currentPage == pagination.totalPages || pointList.isEmpty() ? 'disabled' : ''}">
			                           <a class="page-link" href="?page=${pagination.currentPage + 1}&size=${pagination.recordsPerPage}&category=${selectedCategory}">&raquo;</a>
			                       </li>
			                       <li class="page-item ${pagination.currentPage == pagination.totalPages || pointList.isEmpty() ? 'disabled' : ''}">
			                           <a class="page-link" href="?page=${pagination.totalPages}&size=${pagination.recordsPerPage}&category=${selectedCategory}">&raquo;&raquo;</a>
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