<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
	<title>마이페이지</title>
	<meta charset="UTF-8">
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
	<link href="/css/style.css" rel="stylesheet" />
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
										${loginInfo.user_name}님 안녕하세요! 
									</h2>
									<c:if test="${not empty loginInfo.user_id}">
										<a href="myPageInfo">내정보 보러가기
										<i class="fa fa-arrow-circle-right"></i>
										</a>
									</c:if>
								</div>
								<h5>(회원등급:
									<c:if test="${loginInfo.user_authority =='1'}">
										일반
									</c:if>
									<c:if test="${loginInfo.user_authority =='2'}">
										VIP
									</c:if>
									<c:if test="${loginInfo.user_authority =='3'}">
										MANAGER
									</c:if>
									<c:if test="${loginInfo.user_authority =='4'}">
										MASTER
									</c:if>
									)
								</h5>
								<hr>
								<div style="padding-top: 50px; padding-bottom: 50px;">
									<div style="display: flex; justify-content: space-between; align-items: center;">
<%-- 										<h3 style="margin-right:20px;">나의 포인트 : <a id="myPoint" style="margin-left:10px;">${loginInfo.user_point}</a>P </h3> --%>
										<h3 style="margin-right:20px;">나의 포인트 : 
											<a id="myPoint" style="margin-left:10px;"><fmt:formatNumber value="${loginInfo.user_point}" type="number" groupingUsed="true"/></a>P 
										</h3>
										<a href="pointList">포인트 내역조회
										<i class="fa fa-arrow-circle-right"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12" style="padding-top: 30px; padding-bottom: 30px;">
								<div style="display: flex; justify-content: space-between;" style="padding-bottom: 50px;">
									<h3>
										최근 카페 주문목록
									</h3>
									<a href="orderList">전체 주문내역
									<i class="fa fa-arrow-circle-right"></i>
									</a>
								</div>
								<%-- 주문내역이 없는 경우 --%>
					         	<c:if test="${empty myOrderList}">
									<div class="jumbotron card card-block">
							            <p>최근 카페 주문 건이 없습니다.</p>
							            <p><a class="btn btn-primary btn-large" href="/foodList.do">맛있는 커피 주문하러 가기</a></p>
							        </div>
					          	</c:if>
					          	<%-- 주문내역이 있는 경우 --%>
					          	<c:if test="${not empty myOrderList}">
						          	<div class="row">
										<table id="tbl_order" class="table table-hover table-sm" style="text-align: center;">
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
							          		<c:forEach var="myOrder" items="${myOrderList}">
												<tr>
													<td>${point.rowNum}</td>
													<td class="point_use_date">${point.point_use_date}</td>
													<td>${point.code_name}</td>
													<td class="point_cost">${point.point_cost} P</td>
													<td>${point.point_section}</td>
												</tr>
											</c:forEach>
											</tbody>
										</table>
									</div>
								</c:if>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12" style="padding-top: 30px;">
								<div style="display: flex; justify-content: space-between;" style="padding-bottom: 50px;">
									<h3>
										나의 대여 도서목록
									</h3>
									<a href="borrowList">책 대여 내역조회
									<i class="fa fa-arrow-circle-right"></i>
									</a>
								</div>
								<%-- 대여중인 도서가 없는 경우 --%>
					         	<c:if test="${empty reserveList}">
									<div class="jumbotron card card-block">
							            <p>현재 대여중인 도서가 없습니다.</p>
							            <p><a class="btn btn-primary btn-large" href="/bookList.do">재밌는 책 보러 가기</a></p>
							        </div>
					          	</c:if>
					          	<%-- 대여중인 도서가 있는 경우 --%>
					          	<c:if test="${not empty reserveList}">
						          	<div class="row">
						          		<c:forEach var="myReserve" items="${reserveList}">
											<div class="reserveDiv col-md-4" onclick="getResInfo(${myReserve.res_rid})" style="padding-bottom: 30px;">
												<div class="card" style="height: 100%;">
													<h6 class="card-header" style="background-color: #f07039; color:#fff;
																				   display: flex; justify-content: center;
																				   align-items: center;">
														${myReserve.res_rental_date}
													</h6>
													<div class="card-body" style="height: 250px; 
																				  background-image: url(/resources/upload/${myReserve.unique_file_nm}); 
																				  background-size: cover; 
																				  background-position: center;">
												    </div>
													<div class="card-footer" style="background-color: #f07039;
																					display: flex; justify-content: center; 
																					align-items: center;">
														<h4 style="color:#fff;">${myReserve.car_name}</h4>
													</div>
												</div>
											</div>
										</c:forEach>
									</div>
								</c:if>
							</div>
						</div>
						<hr>
					</div>
					<div class="col-md-2">
					</div>
				</div>
			</div>
		</div>
	</div>
	</section>
	
	<!-- 예약내역 모달창 -->
	<div class="modal fade" id="reserveInModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header" style="background-color: #f07039;">
					<h5 class="modal-title" id="myModalLabel" style="color: #fff;">예약 정보</h5>
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body" id="resModalBody">
				
				</div>
				<div class="modal-footer" style="justify-content: center;">
					<button type="button" class="btn btn-primary" data-dismiss="modal">확인</button>
				</div>
			</div>
		</div>
	</div>
	<!-- // 예약내역 모달창 -->
	<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>