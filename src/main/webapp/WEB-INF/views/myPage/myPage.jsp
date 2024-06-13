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

//구매내역 모달창 내용
function getOrderInfo(order_code) {
	$.ajax({
	    url: '/myPage/getOrderInfo',
	    method: 'POST',
	    dataType: 'json',
	    data: { order_code: order_code },
	    success: function (data) {
	    	console.log('Success:', data);
			var modalBody = $("#orderModalBody");
			modalBody.empty();
			
	     	if (data == "") {
	     		modalBody.text("구매건 정보없음");
	      	} else {
	    		$.each(data, function(index, order) {
// 	    			var rental_date = formattedDate(order.res_rental_date);
// 	    			var return_date = formattedDate(order.res_return_date);
// 	    			var totalPay = formatNumberWithCommas(order.res_totalpay);
// 	    			var op_carseat = order.op_carseat == 'Y' ? 'O' : 'X';
// 	    			var op_navi = order.op_navi == 'Y' ? 'O' : 'X';
// 	    			var op_bt = order.op_bt == 'Y' ? 'O' : 'X';
// 	    			var op_cam = order.op_cam == 'Y' ? 'O' : 'X';
	    			
	   	  			var row = $("<ul style='color: black;'>");
	    	  		row.append($("<li>").text("주문번호: "));
// 	    	  		row.append($("<li>").text("주문번호: " + order.order_code));
// 	    	  		row.append($("<li>").text("대여시작일: " + rental_date));
// 	    	  		row.append($("<li>").text("대여종료일: " + return_date));
// 	    	  		row.append($("<li>").text("차종: " + resInfo.car_company + "-" + resInfo.car_name + "(" + resInfo.car_fuel + ")"));
// 	    	  		row.append($("<li>").html("옵션 <br>	-카시트: " + op_carseat + 
// 	    	  								  "<br> -내비게이션: " + op_navi + 
// 	    	  								  "<br> -블루투스: " + op_bt + 
// 	    	  								  "<br> -후방카메라: " + op_cam));
// 	    	  		row.append($("<li>").text("금액: " + totalPay + " P"));
// 	    	  		if (resInfo.pay_status == null) {
// 		    	  		row.append($("<li>").text("예약상태: " + resInfo.res_status + "(결제 전)"));
// 	    	  		} else {
// 		    	  		row.append($("<li>").text("예약상태: " + resInfo.res_status));
// 	    	  		}
	    	  		row.append($("</ul>"));
	    	  		
	    	  		modalBody.append(row);
	            });
	
	            $("#orderModal").modal("show");
	         }
      },
      error: function(xhr, status, error) {
          console.log('구매상세정보 에러:', error);
      }
	});
}

$(document).ready(function() {
	
// 	var myPoint = $("#myPoint").text();
// 	if (myPoint.length > 0) {
// 		$("#myPoint").text(formatNumberWithCommas(myPoint));
// 	}
	
    // vip 등급설명 모달
    $(".fa-info-circle").click(function() {
        $("#myGradeModal").modal("show");
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
										${loginInfo.user_name}님 안녕하세요! 
									</h2>
									<c:if test="${not empty loginInfo.user_id}">
										<a href="myPageInfo">내정보 보러가기
										<i class="fa fa-arrow-circle-right"></i>
										</a>
									</c:if>
								</div>
								<h5>( 회원등급:
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
									) <i class="fa fa-info-circle"></i>
								</h5>
								<c:if test="${loginInfo.user_leadbook == 'Y'}">
									<h5>*도서열람권 이용중입니다.*</h5>
								</c:if>
								<hr>
								<div style="padding-top: 50px; padding-bottom: 50px;">
									<div style="display: flex; justify-content: space-between; align-items: center;">
										<h3 style="margin-right:20px;">나의 포인트 : 
											<a id="myPoint" style="margin-left:10px;"><fmt:formatNumber value="${loginInfo.user_point}" type="number" groupingUsed="true"/></a>P 
										</h3>
										<a href="pointList">포인트 내역조회
										<i class="fa fa-arrow-circle-right"></i>
										</a>
									</div>
								</div>
								<hr>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12" style="padding-top: 30px;">
								<div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
									<h3>
										금일 카페 주문목록
									</h3>
									<a href="orderList">전체 주문내역
									<i class="fa fa-arrow-circle-right"></i>
									</a>
								</div>
								<%-- 주문내역이 없는 경우 --%>
					         	<c:if test="${empty myOrder}">
									<div class="jumbotron card card-block">
							            <p>오늘의 주문내역이 없습니다.</p>
							            <p><a class="btn btn-primary btn-large" href="/foodList.do">맛있는 커피 주문하러 가기</a></p>
							        </div>
					          	</c:if>
					          	<%-- 주문내역이 있는 경우 --%>
					          	<c:if test="${not empty myOrder}">
						          	<div class="row">
						          		<c:forEach var="myOrder" items="${myOrder}">
											<div class="orderDiv col-md-4" onclick="getOrderInfo('${myOrder.order_code}')" style="padding: 20px;">
												<div class="card">
													<h6 class="card-header" style="background-color: #AB8212; color:#fff;
																				   display: flex; justify-content: center;
																				   align-items: center;">
														<c:choose>
								                            <c:when test="${myOrder.order_state eq 1}">주문확인중</c:when>
								                            <c:when test="${myOrder.order_state eq 2}">준비중</c:when>
								                            <c:when test="${myOrder.order_state eq 3}">준비완료</c:when>
								                        </c:choose>
													</h6>
													<img class="card-body-img" src="${myOrder.product_path}" onerror="this.onerror=null; this.src='/images/no_image.jpg'"/>
													<div class="card-footer" style="background-color: #AB8212;
																					display: flex; justify-content: center; 
																					align-items: center;">
														<h6 style="color:#fff;">${myOrder.product_name}
															<c:if test="${myOrder.whole_quantity > 1}">
																외 ${myOrder.whole_quantity-1} 건
															</c:if>
														</h6>
													</div>
												</div>
											</div>
										</c:forEach>
									</div>
								</c:if>
							</div>
						</div>
						<hr>
						<div class="row">
							<div class="col-md-12" style="padding-top: 30px;">
								<div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
									<h3>
										금일 도서 대여목록
									</h3>
									<a href="borrowList">책 대여 내역조회
									<i class="fa fa-arrow-circle-right"></i>
									</a>
								</div>
								<%-- 대여중인 도서가 없는 경우 --%>
					         	<c:if test="${empty myBook}">
									<div class="jumbotron card card-block">
							            <p>오늘의 대여내역이 없습니다.</p>
							            <p><a class="btn btn-primary btn-large" href="/bookList.do">도서 목록 보러 가기</a></p>
							        </div>
					          	</c:if>
					          	<%-- 대여중인 도서가 있는 경우 --%>
					          	<c:if test="${not empty myBook}">
						          	<div class="row">
						          		<c:forEach var="myBook" items="${myBook}">
											<div class="orderDiv col-md-4" onclick="getResInfo(${myBook.order_code})" style="padding: 20px;">
												<div class="card">
													<h6 class="card-header" style="background-color: #324554; color:#fff;
																				   display: flex; justify-content: center;
																				   align-items: center;">
													${myBook.return_state}
													</h6>
													<img class="card-body-img" src="${myBook.book_path}" onerror="this.onerror=null; this.src='/images/no_image.jpg'"/>
													<div class="card-footer" style="background-color: #324554;
																					display: flex; justify-content: center; 
																					align-items: center;">
														<h6 style="color:#fff;">${myBook.book_name}</h6>
													</div>
												</div>
											</div>
										</c:forEach>
									</div>
								</c:if>
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
	
	<!-- VIP 선정기준 모달창 -->
	<div class="modal fade" id="myGradeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog" role="document">
	        <div class="modal-content">
	            <div class="modal-header">
	                <h5 class="modal-title" id="myGradeModalLabel">VIP 승급 안내</h5>
	                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true">&times;</span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <p>3개월 이내 10만 원 이상 구매시 
	                	<c:if test="${loginInfo.user_authority =='1'}">
	                		VIP로 승급합니다.<br>
	                	</c:if>
	                	<c:if test="${loginInfo.user_authority =='2'}">
	                		VIP등급이 유지됩니다.<br>
	                	</c:if>
	                	현재 ${loginInfo.user_name}님의 3개월 구매금액은
	                	<a id="purchaseAmount"><fmt:formatNumber value="${purchaseAmount}" type="number" groupingUsed="true"/></a>
	                	원 입니다. (등급조건 충족시 익일 등급반영)</p>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
	            </div>
	        </div>
	    </div>
	</div>
	
	<!-- 구매내역 모달창 -->
	<div class="modal fade" id="orderModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header" style="background-color: #AB8212;">
					<h5 class="modal-title" id="myModalLabel" style="color: #fff;">구매 정보</h5>
					<button type="button" class="close" data-bs-dismiss="modal">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body" id="orderModalBody">
				
				</div>
				<div class="modal-footer" style="justify-content: center;">
					<button type="button" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
				</div>
			</div>
		</div>
	</div>
	<!-- // 구매내역 모달창 -->
	
	<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>