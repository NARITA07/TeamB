<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
   <title>카페주문 전체내역</title>
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
	   width: 20%;
	}
	#tbl_point th:nth-child(3), #tbl_point td:nth-child(3) {
	   width: 20%;
	}
	#tbl_point th:nth-child(4), #tbl_point td:nth-child(4) {
	   width: 25%;
	}
	#tbl_point th:nth-child(5), #tbl_point td:nth-child(5) {
	   width: 15%;
	}
	#tbl_point th:nth-child(6), #tbl_point td:nth-child(6) {
	   width: 15%;
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
	
	.modal-table {
	 width: 100%;
	 border-collapse: collapse;
    }

    .modal-table th, .modal-table td {
        border: 1px solid #dee2e6;
        padding: 8px;
        text-align: left;
    }

    .modal-table th {
        background-color: #f8f9fa;
    }
</style>
</head>
<body>
<script>
//기간별 구매내역조회
function orderHistory() {
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    console.log("startDate:" + startDate + ", endDate:" + endDate);

    if (!startDate || !endDate) {
        alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
        return;
    }

    // 검색날짜 포함해서 페이지 리로드
    var queryString = "?startDate=" + startDate + "&endDate=" + endDate;
    window.location.href = "/myPage/orderList" + queryString;
}

// 날짜 형식 변환
function formattedDate(payment_date) {
   if (!payment_date) {
        return "";
    }
   
   // 대상 문자열
    var dateStr = payment_date;
    
   // 연도, 월, 일 추출
     var year = dateStr.substring(0, 4);
     var month = dateStr.substring(4, 6);
     var day = dateStr.substring(6, 8);
     var hour = dateStr.substring(8, 10);
     var minute = dateStr.substring(10, 12);

     var formattedDate = year + "-" + month + "-" + day + " " + hour + ":" + minute;
     
     return formattedDate;
}

//구매내역 모달창 내용
function getOrderInfo(order_code) {
	$.ajax({
		url: '/myPage/getOrderInfo',
		method: 'POST',
		data: { order_code: order_code },
		success: function (data) {
			console.log('Success:', data);
			var modalBody = $("#orderModalBody");
			modalBody.empty();
	      
			if (data.length == 0) {
			   modalBody.text("구매건 정보없음");
			 } else {
				$("#myModalLabel").text("주문번호: " + order_code);
				
				var payment_date = formattedDate(data[0].payment_date);
				var usePoint = data[0].point_change2;
				var total_price = data[0].total_price;
				
				var table = $("<table class='modal-table'>");
				var tbody = $("<tbody>");
				  
				// Row 1: 결제금액
				var row2 = $("<tr>");
				row2.append($("<th scope='row'>").text("결제금액"));
				row2.append($("<td>").text(total_price.toLocaleString() + " 원 ( " + usePoint.toLocaleString() + " P 사용 )"));
				tbody.append(row2);
				
				// Row 2: 결제시각
				var row3 = $("<tr>");
				row3.append($("<th scope='row'>").text("결제시각"));
				row3.append($("<td>").text(payment_date));
				tbody.append(row3);
	            
				// Row 3: 주문 메뉴
				$.each(data, function(index, order) {
				var row4 = $("<tr>");
	             
				if (index == 0) {
				    var th = $("<th scope='row'>").text("주문메뉴");
				    th.attr("rowspan", data.length);
				    row4.append(th);
				}
				
				var product_name = order.product_name;
				var order_quantity = order.order_quantity;
				var td = $("<td>").text(product_name + " " + order_quantity + "개");
				row4.append(td);
				tbody.append(row4);
				});
	             
				table.append(tbody);
				modalBody.append(table);
				$("#orderModal").modal("show");
			}
		},
		error: function(xhr, status, error) {
		    console.log('구매상세정보 에러:', error);
		}
	});
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
                              <h2 style="margin-bottom:50px;">${loginInfo.user_name}님의 카페 주문내역입니다.</h2>
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
										<button class="btn btn-primary" onclick="orderHistory()"
												style="background-color: #c19f76; border: 1px solid;">조회</button>
									</div>
								</div>
							</div>
                           <table id="tbl_point" class="table table-hover table-sm" style="text-align: center;">
                              <thead>
                                 <tr class="table-warning">
                                    <th>#</th>
                                    <th>주문번호</th>
                                    <th>결제일시</th>
                                    <th>주문메뉴</th>
                                    <th>결제금액</th>
                                    <th>결제상태</th>
                                 </tr>
                              </thead>
                              <tbody>
								  <%-- 주문내역이 없는 경우 --%>
	                              <c:if test="${empty orderList}">
		                              <tr>
		                              <td colspan='7'>카페 주문내역이 없습니다.</td>
		                              </tr>
	                              </c:if>
	                              <%-- 주문내역이 있는 경우 --%>
	                              <c:if test="${not empty orderList}">
	                                 <c:forEach var="order" items="${orderList}">
	                                    <tr onclick="getOrderInfo('${order.order_code}')">
	                                       <td>${order.rowNum}</td>
	                                       <td>${order.order_code}</td>
	                                       <td class="payment_date">${order.payment_date}</td>
	                                       <td>${order.product_name}
	                                          <c:if test="${order.whole_quantity > 1}">외 ${order.whole_quantity-1} 건</c:if>
	                                       </td>
	                                       <td><fmt:formatNumber value="${order.total_price}" type="number"/> 원</td>
                                           <td>
	                                           <c:choose>
	                                               <c:when test="${order.payment_state eq 0}">결제중</c:when>
	                                               <c:when test="${order.payment_state eq 1}">결제완료</c:when>
	                                               <c:when test="${order.payment_state eq 2}">환불</c:when>
	                                               <c:when test="${order.payment_state eq 3}">결제취소</c:when>
	                                               <c:otherwise>기타</c:otherwise>
	                                           </c:choose>
                                           </td>
	                                    </tr>
	                                 </c:forEach>
	                              </c:if>
                              </tbody>
                           </table>
                           <nav>
                              <ul class="pagination" style="display: flex; justify-content: center; color: #fff">
                                 <li class="page-item ${pagination.currentPage == 1 ? 'disabled' : ''}">
                                    <a class="page-link" href="?page=1&size=${pagination.recordsPerPage}">&laquo;&laquo;</a>
                                 </li>
                                 <li class="page-item ${pagination.currentPage == 1 ? 'disabled' : ''}">
                                    <a class="page-link" href="?page=${pagination.currentPage - 1}&size=${pagination.recordsPerPage}">&laquo;</a>
                                 </li>
                                 <c:forEach begin="${pagination.startPage}" end="${pagination.endPage}" var="i">
                                    <li class="page-item ${pagination.currentPage == i ? 'active' : ''}">
                                       <a class="page-link" href="?page=${i}&size=${pagination.recordsPerPage}">${i}</a>
                                    </li>
                                 </c:forEach>
                                 <li class="page-item ${pagination.currentPage == pagination.totalPages ? 'disabled' : ''}">
                                    <a class="page-link" href="?page=${pagination.currentPage + 1}&size=${pagination.recordsPerPage}">&raquo;</a>
                                 </li>
                                 <li class="page-item ${pagination.currentPage == pagination.totalPages ? 'disabled' : ''}">
                                    <a class="page-link" href="?page=${pagination.totalPages}&size=${pagination.recordsPerPage}">&raquo;&raquo;</a>
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
   
	<!-- 구매내역 모달창 -->
	<div class="modal fade" id="orderModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	   <div class="modal-dialog modal-dialog-centered" role="document" >
	      <div class="modal-content" style="text-align: center;">
	         <div class="modal-header">
	            <h5 class="modal-title" id="myModalLabel"></h5>
	            <button type="button" class="close" data-bs-dismiss="modal">
	               <span aria-hidden="true">×</span>
	            </button>
	         </div>
	         <div class="modal-body" id="orderModalBody">
	         
	         </div>
	         <div class="modal-footer" style="justify-content: center;">
	            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
	         </div>
	      </div>
	   </div>
	</div>
	<!-- // 구매내역 모달창 -->
   
   <div class="footer">
       <%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
   </div>
</body>
</html>