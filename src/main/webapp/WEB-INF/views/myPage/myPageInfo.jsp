<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<title>마이페이지-내정보관리</title>
	<meta charset="UTF-8">
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
	<style>
	.btn-primary {
		background-color: #766650 !important;
	    color: white !important;
	    border: none !important;
	}
	</style>
</head>
<body>
<script>
$(function() {
	// 주소 split
	var str = "${loginInfo.user_address}";
	var addr = str.split("# ");
	var addr1 = addr[0];
	var addr2 = addr[1];
	var addr3 = addr[2];
	$("#postcode").val(addr1);
	$("#address").val(addr2);
	$("#detailAddress").val(addr3);
	
	// 회원탈퇴 모달
	$("#btn-deleteInfo").click(function() {
		$("#del_enter_pwd").val("");
		$("#modal-delForm").modal("show");
	});
	
	// 회원탈퇴 처리
	$("#btn-delete-save").click(function(e) {
		e.preventDefault();
		var user_id = $("#user_id").val(); 
		var del_enter_pwd = $("#del_enter_pwd").val();
		
		if (del_enter_pwd=="") {
			alert("비밀번호를 입력하세요.");
			return;
		} 
		
		$.ajax({
            method: "POST",
            url: "/myPage/delete",
            data: {
            	del_enter_pwd: del_enter_pwd
	        },
            success: function(rData) {
                console.log("rData:", rData);
                console.log("회원탈퇴 응답받음");
                if (rData == "success") {
	                alert("회원탈퇴성공! 로그인 페이지로 이동합니다.");
	                $("#modal-delForm").modal("hide");
	                location.href = "/login.do";
                } else if (rData == "mismatch") {
	            	alert("입력한 비밀번호가 틀렸습니다.");
	            } else {
	                alert("회원탈퇴에 실패했습니다.");
	        	}
            },
            error: function(xhr, status, error) {
               	alert("회원탈퇴 중 오류가 발생했습니다.");
                console.error("회원탈퇴 오류:", error);
            }
        });
	});
	
	var modifyResult = '${modifyResult}';
	if (modifyResult) {
		alert("회원정보 수정완료");
	}
	
}); 
</script>
	<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
	
    <section class="ftco-section">
		<div class="container">
			<div class="row" style="margin-top: 50px;">
				<div class="col-md-4"></div>
   				<div class="col-md-4">
					<div style="display: flex; justify-content: space-between; align-items: center;">
    				<h3>내 정보</h3>
					<a href="myPageInfo_modify" class="btn btn-primary">회원정보 수정</a>
					</div>
					<br>
					<div class="container">
					  <form>
					    <div class="form-group">
					      <label for="id">아이디</label>
					      <input type="text" class="form-control" id="user_id" name="user_id" value="${loginInfo.user_id}" readonly>
					    </div>
					    <div class="form-group">
					      <label for="pwd">비밀번호</label>
					      <input type="password" class="form-control" id="user_pass" name="user_pass" value="${loginInfo.user_pass}" readonly>
					    </div>
					    <div class="form-group">
					      <label for="name">이름</label>
					      <input type="text" class="form-control" id="user_name" name="user_name" value="${loginInfo.user_name}" readonly>
					    </div>
					    <div class="form-group">
					      <label for="phoneNumber">휴대폰 번호</label>
					      <input type="text" class="form-control" id="user_tel" name="user_tel" value="${loginInfo.user_tel}" readonly>
					    </div>
					    <div class="form-group">
					      <label for="email">이메일</label>
					      <input type="email" class="form-control" id="user_email" name="user_email" value="${loginInfo.user_email}" readonly>
					    </div>
					    <div class="form-group">
			              <small>주소</small>
			             	<input type="hidden" id="user_address" name="user_address" value="${loginInfo.user_address}">
					        <input type="text" class="form-control" id="postcode" readonly>
					        <input type="text" class="form-control" id="address" readonly>
					        <input type="text" class="form-control" id="detailAddress" readonly>			              	
		             	</div>
						<hr>
						<button type="button" id="btn-deleteInfo" class="btn btn-danger">회원탈퇴</button>
					  </form>
					</div>
				</div>
				<div class="col-md-4"></div>
   			</div>
   		</div>
	</section>

<!-- 회원탈퇴 버튼 클릭시 보여질 Modal -->
    <div class="modal fade" id="modal-delForm">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">회원탈퇴</h4>
                    <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
                </div>

                <form>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div align="center">
				                            탈퇴 후 복구가 불가능합니다. <br>
				                            정말로 탈퇴 하시겠습니까? <br>
                        </div>
                        <br>
                            <label for="userPwd" class="mr-sm-2">비밀번호 : </label>
                            <input type="password" class="form-control mb-2 mr-sm-2" placeholder="비밀번호 입력" id="del_enter_pwd" name="del_enter_pwd"> <br>
                    </div>
                    <!-- Modal footer -->
                    <div class="modal-footer" align="center">
                        <button type="button" class="btn btn-danger" id="btn-delete-save">탈퇴하기</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>

