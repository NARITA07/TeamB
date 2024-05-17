<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인</title>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<link href="css/style.css" rel="stylesheet" />
<script>
  $( function() {
	 $("#btn_submit").click(function(){
		var user_id = $("#user_id").val();
		var user_pass = $("#user_pass").val();
		if(user_id == ""){
			alert("아이디를 입력해주세요");
			$("#user_id").focus();
			return false;
		}
		if(user_pass == ""){
			alert("패스워드를 입력해주세요");
			$("#user_pass").focus();
			return false;
		}
		
		$.ajax({
			type:"POST",
			data:"user_id="+user_id+"&user_pass="+user_pass,
			url:"loginProc.do",
			dataType:"text",
			success:function(result){
				if(result == "ok"){
					alert(user_id + "님 로그인에 성공하였습니다.");
					$("#frm")[0].reset();
					location.href="./";
				}else if(result == "x"){
					alert(user_id + " 해당아이디는 없는 아이디입니다");
				}else{
					alert(user_id + "님 패스워드가 틀렸습니다");
				}
			},	
			error:function(){
				alert("에러가 발생하였습니다.");
			}
		});
	 }); 
  });
</script>
</head>
<body>
	<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
<!-- 로그인 -->
    <section class="ftco-section contact-section">
      <div class="container">
		<div class="row d-flex mb-5 contact-info">

			<div class="col-md-6 block-9 mb-md-5">
			<%-- <c:if test="${sessionId == null}"> --%>
				<form name="frm" id="frm" class="bg-light p-5 contact-form">
					<div class="form-group">
						<label for="user_id">아이디</label> 
						<input type="text" id="user_id" name="user_id" class="form-control" placeholder="아이디를 입력해주세요."> 
						<input type="hidden" id="user_id" class="idmessage" value="아이디 입력해주세요" readonly>
					</div>
					<div class="form-group">
						<label for="user_pass">비밀번호</label> <input type="password" name="user_pass" id="user_pass" class="form-control" placeholder="비밀번호를 입력해주세요."> 
							<input type="hidden" id="user_pass" class="pwmessage" value="최소 8자 이상 입력해주세요." readonly>
					</div>
					<!-- <div class="form-group">
						<div class="custom-control custom-checkbox small">
							<input type="checkbox" class="custom-control-input" id="useCookie" name="useCookie"> 
							<label class="custom-control-label" for="useCookie">아이디 저장</label>
						</div>
					</div> -->
					<div class="row d-flex mb-5 contact-info" style="justify-content: center; align-items: center;">
					<div class="form-group" style="display: flex;">
						<button type="button" name="btn_submit" id="btn_submit" class="btn btn-primary py-3 px-5">로그인</button>
					</div>
					</div>
					<div class="row d-flex mb-5 contact-info" style="justify-content: center; align-items: center;">
					<div class="loginBtns" style="display: flex;">
						<a href="memberWrite.do" style="margin-right: 80px;">회원가입</a>
						<a href="findIdForm.do" style="margin-right: 20px;">아이디찾기</a> 
						<a href="findPwForm.do">비밀번호찾기</a>
					</div>
					</div>
				</form>
			<%-- </c:if> --%>
			</div>
			<!-- 왼쪽 -->
			<div class="col-md-6 block-9 mb-md-5">
			<%-- <c:if test="${nonMemberLoginDTO == null}"> --%>
				<form action="#" class="bg-light p-5 contact-form">
					<div class="form-group">
						<p style="font-size: 30px; margin-bottom: 20px;">비회원으로 예약하셨나요?</p>
					</div>
					<div class="form-group">
						<p style="margin-bottom: 150px;">이름과 전화번호로 예약내역을 확인해 보세요.</p>
						<div class="form-group">
							<button type="button" id="btn-Non-member"class="btn btn-primary py-3 px-5">비회원 예약조회</button>
						</div>
					</div>
				</form>
				<%-- </c:if> --%>
			</div>
			
		</div>
	</div>
<!-- 비회원 모달 -->
	<div class="row">
		<div class="col-md-12">
			<div class="modal fade" id="modal-Non-member" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="myModalLabel">비회원 예약조회</h5>
							<button type="button" class="close" data-dismiss="modal">
								<span aria-hidden="true">×</span>
							</button>
							
						</div>
						<form  id="frmLoginbtn" class="user" action="/login/NonLoginPost" method="post"  >
							<div class="modal-body">
								<label>이름</label>
								<input type="text" class="form-control" id="non_name"  name="non_name"/>
							</div>
							<div class="modal-body">
								<label>전화번호</label>
								<input type="text" class="form-control" id="non_tel" name="non_tel" placeholder="'-'없이 입력해주세요."/>
							</div>
							<div class="modal-footer">
								<button type="submit" class="btn btn-primary" id="frmLogin">예약조회</button>
								<button type="button" class="btn btn-secondary"
									data-dismiss="modal">닫기</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- //모달 -->

</section>
</body>
</html>