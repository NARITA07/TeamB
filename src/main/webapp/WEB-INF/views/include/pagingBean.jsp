<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
		<nav aria-label="..." id="page_btn">
			<ul class="pagination pagination-lg justify-content-center" >
				<!-- 시작페이지가 pagePerBlock(10)보다 크면 앞에 보여줄 페이지가 있다 -->
				<c:if test="${pb.startPage > pb.pagePerBlock }">
					<li class="page-item"><a href="adminMbList.do?pageNum=1"
							class="page-link"><span aria-current="page"><<</span></a></li>
					<li class="page-item"><a href="adminMbList.do?pageNum=${pb.startPage - 1 }"
						class="page-link"><span aria-current="page"><</span></a></li>
				</c:if>
				<c:forEach var="i" begin="${pb.startPage }" end="${pb.endPage }">
					<!-- 현재 머물고 있는 페이지가 몇 페이지인지 구별할 때 -->
					<c:if test="${pb.currentPage == i }">
						<li class="page-item"><a href="adminMbList.do?pageNum=${i }"
							class="page-link" style=" background-color: #007bff; color: #fff;">ㅤ${i}ㅤ</a></li>
					</c:if>
					<c:if test="${pb.currentPage != i }">
						<li class="page-item"><a href="adminMbList.do?pageNum=${i }"
							class="page-link">ㅤ${i}ㅤ</a></li>
					</c:if>
				</c:forEach>
				<!-- 보여줄 페이지가 뒤에 남아있는 경우(다음 버튼 활성화)=> endPage < totalPage인 경우 -->
				<c:if test="${pb.endPage < pb.totalPage }">
					<li class="page-item"><a href="adminMbList.do?pageNum=${pb.endPage + 1 }"
						class="page-link"><span aria-current="page">></span>
					</a></li>
					<li class="page-item"><a href="adminMbList.do?pageNum=${pb.totalPage }"
						class="page-link"><span aria-current="page">>></span>
					</a></li>
				</c:if>
				
			</ul>
		</nav>
</body>
</html>