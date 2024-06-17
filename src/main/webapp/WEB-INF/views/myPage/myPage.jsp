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
	<style>
	/*
 	.table-abc { 
       thi: 1px thin black; 
       border-collapse: collapse; 
     } 
     .table-abc th .table-abc td{ 
         border: thin; 
     } 
     */
	</style>
</head>
<body>
<script>
//날짜 형식 변환
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

//주문상태코드 변환
function getOrderState(order_state) {
    switch (order_state) {
        case 1:
            return "주문확인중";
        case 2:
            return "준비중";
        case 3:
            return "준비완료";
    }
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
	      		var order_state = getOrderState(data[0].order_state); 
	      		var usePoint = data[0].point_change2;
	      		var total_price = data[0].total_price;
	      		
   	  			var table = $("<table class='table'>");
   	  			var tbody = $("<tbody>");
   	  			
                // Row 1: 주문상태
                var row1 = $("<tr>");
                row1.append($("<th scope='row'>").text("주문상태"));
                row1.append($("<td>").text(order_state));
                tbody.append(row1);

                // Row 2: 결제금액
                var row2 = $("<tr>");
                row2.append($("<th scope='row'>").text("결제금액"));
                row2.append($("<td>").text(total_price + " 원 ( " + usePoint + " P 사용 )"));
                tbody.append(row2);

                // Row 3: 결제시각
                var row3 = $("<tr>");
                row3.append($("<th scope='row'>").text("결제시각"));
                row3.append($("<td>").text(payment_date));
                tbody.append(row3);
    	  		
    			// Row 4: 주문 메뉴
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
											<div class="orderDiv col-md-4" style="padding: 20px;">
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
	                	원 입니다. <br>(등급조건 충족시 익일 등급반영)</p>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
	            </div>
	        </div>
	    </div>
	</div>
	
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
					<button type="button" class="btn btn-primary" data-bs-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
	<!-- // 구매내역 모달창 -->
	
	<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>