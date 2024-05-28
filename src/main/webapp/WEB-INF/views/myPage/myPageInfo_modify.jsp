<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>마이페이지-내정보관리</title>
    <meta charset="UTF-8">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
<!-- 카카오 주소 API -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<!-- 비밀번호 암호화 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

<!-- 비밀번호변경 유효성 검사 스크립트 include -->
<%@ include file="/WEB-INF/views/include/check_pw.jsp" %>

<script>
// 카카오 주소 api
function openZipSearch() {
    var width = 500;
    var height = 600;
    var themeObj = { bgColor: "#FFFF00" };
    new daum.Postcode({
        width: width,
        height: height,
        theme: themeObj,
        oncomplete: function(data) {
            var addr = (data.userSelectedType === 'R') ? data.roadAddress : data.jibunAddress;
            $("#postcode").val(data.zonecode);
            $("#address").val(addr);
            $("#detailAddress").focus();
        }
    }).open({
        left: (window.screen.width / 2) - (width / 2),
        top: (window.screen.height / 2) - (height / 2),
        popupTitle: '주소 검색'
    });
}

$(function() {
    // 주소 split
    var str = "${loginInfo.user_address}";
    var addr = str.split("# ");
    $("#postcode").val(addr[0]);
    $("#address").val(addr[1]);
    $("#detailAddress").val(addr[2]);

    // 수정완료버튼 클릭
    $("#btn_submit").click(function() {
        var combinedAddress = $("#postcode").val() + '# ' + $("#address").val() + '# ' + $("#detailAddress").val();
        $("#user_address").val(combinedAddress);
    });

    // 비밀번호 변경 모달 열기
    $("#pwdChange").click(function() {
        $("#password1").val("");
        $("#newPassword").val("");
        $("#confirmPassword").val("");
        $("#invalid-message1").text("비밀번호는 영문 대/소문자, 숫자, 특수문자를 1개 이상 포함한 8~16자입니다.");
        $("#invalid-message2").hide();
        $("#modal-pwdChangeForm").modal("show");
    });

    // 비밀번호 변경 처리
    $("#btn-pwdChange-save").click(function(e) {
        e.preventDefault();
        if ($("#invalid-message1").text() == "사용가능한 비밀번호입니다.") {
            validatePasswordChangeForm(); // 폼 유효성 검사 실행
        } else {
            alert("비밀번호 형식을 다시 확인해주세요.");
        }
    });
});
</script>

<%@ include file="/WEB-INF/views/include/topMenu.jsp" %>
<section class="ftco-section">
    <div class="container">
        <div class="row" style="margin-top: 50px;">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <h3>내 정보 수정</h3>
                <br>
                <div class="container">
                    <form id="formModify" action="/myPage/memberModify_submit" method="post">
                        <div class="form-group">
                            <label for="id">아이디</label>
                            <input type="text" class="form-control" id="user_id" name="user_id" value="${loginInfo.user_id}" readonly>
                        </div>
                        <div class="form-group">
                            <label for="pwd">비밀번호</label>
                            <div style="display: flex; align-items: center;">
                                <input type="password" class="form-control" id="user_pass" name="user_pass" value="${loginInfo.user_pass}" style="margin-right: 10px;" readonly>
                                <button type="button" id="pwdChange" class="btn btn-primary" style="flex-shrink: 0;">변경</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="name">이름</label>
                            <input type="text" class="form-control" id="user_name" name="user_name" value="${loginInfo.user_name}" readonly>
                        </div>
                        <div class="form-group">
                            <label for="phoneNumber">휴대폰 번호</label>
                            <input type="text" class="form-control" id="user_tel" name="user_tel" value="${loginInfo.user_tel}" required>
                        </div>
                        <div class="form-group">
                            <label for="email">이메일</label>
                            <input type="email" class="form-control" id="user_email" name="user_email" value="${loginInfo.user_email}" required>
                        </div>
                        <div class="form-group">
                            <small>주소</small>
                            <div class="input-group" style="display: flex; align-items: center;">
                                <input type="text" class="form-control" id="postcode" style="margin-right: 10px;" required>
                                <span class="input-group-btn">
                                    <input type="button" onclick="openZipSearch()" value="우편번호 찾기" class="btn btn-info">
                                </span>
                            </div>
                            <input type="text" class="form-control" id="address" required>
                            <input type="text" class="form-control" id="detailAddress" required>
                            <input type="hidden" id="user_address" name="user_address" value="${loginInfo.user_address}">
                        </div>
                        <hr>
                        <button type="submit" id="btn_submit" class="btn btn-success">수정완료</button>
                    </form>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</section>

<!-- 비밀번호 변경 모달창 -->
<div class="modal fade" id="modal-pwdChangeForm" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="myModalLabel">비밀번호 변경</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <label for="pwd">현재 비밀번호</label>
                <input type="password" class="form-control" id="password1">
            </div>
            <div class="modal-body">
                <label for="pwd">새 비밀번호</label>
                <input type="password" class="form-control" id="newPassword">
                <div id="invalid-message1"></div>
            </div>
            <div class="modal-body">
                <label for="pwd">새 비밀번호 확인</label>
                <input type="password" class="form-control" id="confirmPassword">
                <div id="invalid-message2">비밀번호가 일치하지 않습니다.</div>
                <div id="invalid-message3">비밀번호를 입력하세요.</div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" id="btn-pwdChange-save">저장</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
            </div>
        </div>
    </div>
</div>
<!-- // 비밀번호 변경 모달창 -->

<%@ include file="/WEB-INF/views/include/bottomMenu.jsp" %>
</body>
</html>
