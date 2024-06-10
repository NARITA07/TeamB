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
		width: 25%;
	}
	#tbl_point th:nth-child(5), #tbl_point td:nth-child(5) {
		width: 15%;
	}
	#tbl_point th:nth-child(6)), #tbl_point td:nth-child(6) {
		width: 10%;
	}
	#tbl_point th:nth-child(6)), #tbl_point td:nth-child(7) {
		width: 10%;
	}
</style>
</head>
<body>
<script>
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
									<div style="display: flex; justify-content: center; padding : 30px;">
										<h2 style="margin-right:20px;">${loginInfo.user_name}님의 도서 대여내역입니다.</h2>
									</div>
<!-- 									<div class="btn-group" role="group" style="padding-top: 20px; padding-bottom: 5px;"> -->
<!-- 										<button type="button" class="btn btn-outline-dark" id="pointAll">전체</button> -->
<!-- 										<button type="button" class="btn btn-outline-dark" id="plusPoint">적립</button> -->
<!-- 										<button type="button" class="btn btn-outline-dark" id="minusPoint">사용</button> -->
<!-- 									</div> -->
									<%-- 주문내역이 없는 경우 --%>
									<table id="tbl_point" class="table table-hover table-sm" style="text-align: center;">
										<thead>
											<tr class="table-warning">
												<th>#</th>
												<th>주문번호</th>
												<th>대여일시</th>
												<th>카테고리</th>
												<th>책 제목</th>
												<th>저자</th>
												<th>대여상태</th>
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