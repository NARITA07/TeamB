<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script>
	// 비밀번호 변경 유효성 검사 모듈
	$(function() {
	    // 검사 결과 저장 객체
	    var valid = {
	        newPWValid:false,
	        confirmPWValid:false,
	        isAllValid:function() {
				return this.newPWValid && this.confirmPWValid;
			}
	    }

		// 비밀번호 유효성 검사
		$("#newPassword").blur(function() {
		    var pattern = /^[^\s]{2,16}$/;
		    if(pattern.test($(this).val())){
		        $("#invalid-message1").text("사용가능한 비밀번호입니다.");
		        $("#invalid-message1").css("color", "green");
		        valid.newPWValid = true;
		    } else {
		        $("#invalid-message1").text("비밀번호는 공백 문자를 제외한 모든 문자로 이루어진 2~16자입니다.");
		        $("#invalid-message1").css("color", "red");
		        valid.newPWValid = false;
		    }
		});

		// 비밀번호 확인 일치 여부 검사
		$("#confirmPassword").blur(function() {
		    if($("#newPassword").val() == $(this).val()) {
		        $("#invalid-message2").hide();
		        valid.confirmPWValid = true;
		    } else {
		        $("#invalid-message2").show();
		        $("#invalid-message2").text("비밀번호가 일치하지 않습니다.");
		        valid.confirmPWValid = false;
		    }
		});
		
		// 비밀번호 변경 버튼 클릭 시 폼 유효성 검사
		$("#btn-pwdChange-save").click(function(e) {
		    e.preventDefault();
		    if(!valid.isAllValid()) {
		        alert("입력한 정보를 다시 확인해주세요.");
		        return;
		    }

		    var password1 = $("#password1").val();
		    var newPassword = $("#newPassword").val();
		    var confirmPassword = $("#confirmPassword").val();

		    if (newPassword !== confirmPassword) {
		        alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
		        return;
		    }

		    // AJAX 요청
		    $.ajax({
		        type: "POST",
		        url: "/myPage/pwdChange",
		        data: {
		            password1: password1,
		            newPassword: newPassword
		        },
		        success: function(response) {
		            alert("비밀번호가 성공적으로 변경되었습니다.");
		            $("#modal-pwdChangeForm").modal("hide");
		        },
		        error: function(jqXHR, textStatus, errorThrown) {
		            alert("비밀번호 변경 중 오류가 발생했습니다.");
		        }
		    });
		});
	});
</script>
