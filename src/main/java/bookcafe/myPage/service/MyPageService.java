package bookcafe.myPage.service;

import java.util.List;

import bookcafe.member.service.MemberVO;

public interface MyPageService {
	
	// 비밀번호 변경하기
	public int updatePassword(PWchangeDTO pwChangeDTO);
	
	// 회원정보 수정하기
	public int updateMember(MemberVO updateVO);
	
	// 전화번호 중복 확인하기
	public int checkDupTel(String user_tel);
	
	// 회원정보 삭제하기
	public int deleteMember(String user_id);
	
	// 3개월 구매금액 조회하기
	public int getMyPurchaseAmount(String user_code);
	
	// 카페주문내역 조회하기(전체내역)
	public List<MyOrderDTO> getMyOrderList(String user_code);
	
	// 카페주문내역 조회하기(오늘날짜)
	public List<MyOrderDTO> getMyOrder(String user_code);
	
	// 도서대여내역 조회하기(전체내역)
	public List<MyBookDTO> getMyBookList(String user_code);
	
	// 도서대여내역 조회하기(오늘날짜)
	public List<MyBookDTO> getMyBook(String user_code);
	
}