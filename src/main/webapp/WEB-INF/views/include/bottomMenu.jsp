<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<link href="/css/style.css" rel="stylesheet" />
<style>
	body {
		min-height: 100vh; /* 최소 높이를 화면의 높이로 설정 */
		margin: 0;
		padding: 0;
	}
	
	footer {
		width: 100%;
		height: 150px;
		bottom: 0;
		margin-top : auto;
		justify-content: center;
        align-items: center;
        box-sizing: border-box;
        position: relative; /* 기본값을 relative로 설정 */
	}
</style>
</head>
<body>

    <!-- Footer-->
    <footer class="py-5 bg-dark">
        <p class="m-0 text-center text-white">Copyright &copy; 책빵 2024</p>
    </footer>

    <!-- Bootstrap core JS-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        window.onload = function() {
            adjustFooterPosition(); // 페이지 로드 시 footer 위치 조정
        };

        window.addEventListener('resize', function() {
            adjustFooterPosition(); // 윈도우 리사이즈 이벤트가 발생할 때마다 footer 위치 조정
        });

        window.addEventListener('scroll', function() {
            adjustFooterPosition(); // 스크롤 이벤트가 발생할 때마다 footer 위치 조정
        });

        function adjustFooterPosition() {
            var footer = document.querySelector('footer');
            var bodyHeight = document.body.scrollHeight;
            var windowHeight = window.innerHeight;

            // 본문의 길이가 화면의 높이보다 길 경우에만 footer를 본문 하단에 위치시킴
            if (bodyHeight > windowHeight) {
                footer.style.position = 'relative';
            } else {
                footer.style.position = 'fixed';
            }
        }
    </script>

</body>
</html>
