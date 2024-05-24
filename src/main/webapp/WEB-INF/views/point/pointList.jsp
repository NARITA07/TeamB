<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<title>포인트 내역</title>
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
		width: 10%;
	}
	#tbl_point th:nth-child(2), #tbl_point td:nth-child(2) {
		width: 30%;
	}
	#tbl_point th:nth-child(3), #tbl_point td:nth-child(3) {
		width: 20%;
	}
	#tbl_point th:nth-child(4), #tbl_point td:nth-child(4) {
		width: 20%;
	}
	#tbl_point th:nth-child(5), #tbl_point td:nth-child(5) {
		width: 20%;
	}
	.modal-dialog {
		width: 500px;
	    max-width: 100%;
	    margin: 1.75rem auto;
	}
	
	ul {
    list-style-type: square;
}
</style>
</head>
<body>
<script>

//금액 자릿수 표시하기(콤마)
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function() {
	
	var myPoint = $("#myPoint").text();
	if (myPoint.length > 0) {
		$("#myPoint").text(formatNumberWithCommas(myPoint));
	}
	
	$(".point_cost").each(function() {
		var point_cost = $(this).text();
		if (point_cost.length > 0) {
			$(this).text(formatNumberWithCommas(point_cost));
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
					<div class="col-md-2">
					</div>
					<div class="col-md-8">
						<div class="row">
							<div class="col-md-12">
								<div style="display: flex; justify-content: space-between; align-items: center;">
									<h2>
										${loginInfo.user_id}님의 포인트 내역입니다. 
									</h2>
								</div>
								<div style="padding-top: 30px; padding-bottom: 50px;">
									<div style="display: flex; align-items: center;">
										<h3 style="margin-right:20px;">현재 포인트 : <a id="myPoint" style="margin-left:10px;">${loginInfo.user_point}</a>P </h3>
									</div>
									<div class="btn-group" role="group" style="padding-top: 20px; padding-bottom: 5px;">
										<button type="button" class="btn btn-outline-dark" id="pointAll">전체</button>
										<button type="button" class="btn btn-outline-dark" id="plusPoint">적립</button>
										<button type="button" class="btn btn-outline-dark" id="minusPoint">사용</button>
									</div>
									<%-- 포인트내역이 없는 경우 --%>
									<table id="tbl_point" class="table table-hover table-sm" style="text-align: center;">
										<thead>
											<tr class="table-warning">
												<th>#</th>
												<th>날짜(최근순)</th>
												<th>사유</th>
												<th>포인트</th>
												<th>구분</th>
											</tr>
										</thead>
										<tbody>
							         	<c:if test="${empty pointList}">
						          			<tr>
												<td colspan='5'>포인트 내역이 없습니다.</td>
											</tr>
							          	</c:if>
										<c:if test="${not empty pointList}">
											<c:forEach var="point" items="${pointList}">
												<tr>
													<td>${point.rowNum}</td>
													<td class="point_use_date">${point.point_joindate}</td>
													<td>${point.payment_state}</td>
													<td class="point_cost">${point.point_change} P</td>
													<td>${point.point_section}</td>
												</tr>
											</c:forEach>
										</c:if>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-2">
					</div>
				</div>
			</div>
		</div>
	</div>
	</section>
	<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>