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
		width: 15%;
	}
	#tbl_point th:nth-child(3), #tbl_point td:nth-child(3) {
		width: 20%;
	}
	#tbl_point th:nth-child(4), #tbl_point td:nth-child(4) {
		width: 22%;
	}
	#tbl_point th:nth-child(5), #tbl_point td:nth-child(5) {
		width: 13%;
	}
	#tbl_point th:nth-child(6)), #tbl_point td:nth-child(6) {
		width: 15%;
	}
	#tbl_point th:nth-child(7), #tbl_point td:nth-child(7) {
		width: 10%;
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

$(function() {
	
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
								                <button class="btn btn-primary" onclick="orderHistory()">조회</button>
								            </div>
								        </div>
								    </div>
									<%-- 주문내역이 없는 경우 --%>
									<table id="tbl_point" class="table table-hover table-sm" style="text-align: center;">
										<thead>
											<tr class="table-warning">
												<th>#</th>
												<th>주문번호</th>
												<th>결제일시</th>
												<th>주문메뉴</th>
												<th>결제금액</th>
												<th>결제상태</th>
												<th>주문상태</th>
											</tr>
										</thead>
										<tbody>
							         	<c:if test="${empty orderList}">
						          			<tr>
												<td colspan='7'>카페 주문내역이 없습니다.</td>
											</tr>
							          	</c:if>
										<c:if test="${not empty orderList}">
											<c:forEach var="order" items="${orderList}">
												<tr>
													<td>${order.rowNum}</td>
													<td>${order.order_code}</td>
													<td class="payment_date">${order.payment_date}</td>
													<td>${order.product_name}
														<c:if test="${order.whole_quantity > 1}">
															외 ${order.whole_quantity-1} 건
														</c:if>
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
								                    <td>
								                        <c:choose>
								                            <c:when test="${order.order_state eq 1}">주문확인중</c:when>
								                            <c:when test="${order.order_state eq 2}">준비중</c:when>
								                            <c:when test="${order.order_state eq 3}">준비완료</c:when>
								                        </c:choose>
								                    </td>
												</tr>
											</c:forEach>
										</c:if>
										</tbody>
									</table>
									<nav>
										<ul class="pagination" style="display: flex; justify-content: center;">
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
	
	<div class="footer">
    	<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
	</div>
</body>
</html>