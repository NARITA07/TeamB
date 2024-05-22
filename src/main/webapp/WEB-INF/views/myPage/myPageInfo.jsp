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
</head>
<body>
<!-- 비밀번호 암호화 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
<script>
function sha256(password) {
	if (password.trim() == "") {
		alert("비밀번호를 입력하세요");
	} else {
		return CryptoJS.SHA256(password).toString();
	}
}

$(function() {
	
	// 주소 split
	var str = "${loginInfo.user_address}";
// 	console.log("str:" + str);
	var addr = str.split("# ");
	var addr1 = addr[0];
	var addr2 = addr[1];
	var addr3 = addr[2];
// 	console.log("addr1:" + addr1);
// 	console.log("addr2:" + addr2);
// 	console.log("addr3:" + addr3);
	$("#sample2_postcode").val(addr1);
	$("#sample2_address").val(addr2);
	$("#sample2_detailAddress").val(addr3);
	
	
	// 회원탈퇴 모달
	$("#btn-deleteInfo").click(function() {
		$("#del_enter_pwd").val("");
		$("#modal-delForm").modal("show");
	});
	
	// 회원탈퇴 처리
	$("#btn-delete-save").click(function() {
		console.log("탈퇴하기 버튼");
		
		var mem_id = $("#id").val(); 
		var password = $("#password").val();
		console.log("password:", password);
		var del_enter_pwd = $("#del_enter_pwd").val();
		console.log("del_enter_pwd:", del_enter_pwd);
		var shaDelPassword = sha256(del_enter_pwd);
		console.log("shaDelPassword:", shaDelPassword);
		
		if (password != shaDelPassword) {
			alert("비밀번호가 맞지 않습니다.");
		} else if (password == shaDelPassword) {
			alert("비밀번호 일치확인");
			// 폼 데이터 생성
			var formData = {
                mem_id: mem_id
            };
			
			$.ajax({
	            method: "DELETE",
	            url: "/myPage/delete/" + mem_id,
	            success: function(rData) {
	                console.log("rData:", rData);
	                if (rData == "success") {
		                alert("회원탈퇴성공! 로그인 페이지로 이동합니다.");
		                $("#modal-delForm").modal("hide");
		                location.href = "/login/login";
	                } else if (rData == "fail") {
	                	alert("회원탈퇴실패!");
	                }
	                
	            },
	            error: function(xhr, status, error) {
                	alert("회원탈퇴실패!");
	                console.error("회원 삭제 실패:", error);
	            }
	        });
		}
		else {
			return;
		}
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
			<div class="row">
				<div class="col-md-2">
				</div>
   				<div class="col-md-8">
					<div style="display: flex; justify-content: space-between; align-items: center;">
    				<h3>
						내 정보
					</h3>
					<a href="myPageInfo_modify" class="btn btn-primary">회원정보 수정</a>
					</div>
					<br>
					<div class="container">
					  <form>
					    <div class="form-group">
					      <label for="id">아이디</label>
					      <input type="text" class="form-control" id="id" name="id" value="${loginInfo.user_id}" readonly>
					    </div>
					    <div class="form-group">
					      <label for="pwd">비밀번호</label>
					      <input type="password" class="form-control" id="password" name="password" value="${loginInfo.user_pass}" readonly>
					    </div>
					    <div class="form-group">
					      <label for="name">이름</label>
					      <input type="text" class="form-control" id="name" name="name" value="${loginInfo.user_name}" readonly>
					    </div>
					    <div class="form-group">
					      <label for="phoneNumber">휴대폰 번호</label>
					      <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" value="${loginInfo.user_tel}" readonly>
					    </div>
					    <div class="form-group">
					      <label for="email">이메일</label>
					      <input type="email" class="form-control" id="email" name="email" value="${loginInfo.user_email}" readonly>
					    </div>
					    <div class="form-group">
			              <small>주소</small>
			             	<input type="hidden" id="user_address" name="user_address" value="${loginInfo.user_address}">
					        <input type="text" class="form-control" id="sample2_postcode" readonly>
					        <input type="text" class="form-control" id="sample2_address" readonly>
					        <input type="text" class="form-control" id="sample2_detailAddress" readonly>			              	
		             	</div>
						<hr>
					  </form>
					</div>
					<button type="button" id="btn-deleteInfo" class="btn btn-danger">회원탈퇴</button>
			  	
				</div>
				<div class="col-md-2">
				</div>
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
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
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


