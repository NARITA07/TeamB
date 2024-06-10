package bookcafe.myPage.serviceImpl;

import java.util.List;

import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.MyOrderDTO;
import bookcafe.myPage.service.PWchangeDTO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("myPageMapper")
public interface MyPageMapper {

	// 비밀번호 변경하기
	public int updatePassword(PWchangeDTO pwChangeDTO);
	
	// 회원정보 수정하기
	public int updateMember(MemberVO updateVO);
	
	// 전화번호 중복 확인하기
	public int checkDupTel(String user_tel);
	
	// 회원정보 삭제하기
	public int deleteMember(String user_id);
	
	// 3개월 구매금액 조회하기
	public Integer getMyPurchaseAmount(String user_code);
	
	// 카페주문내역 조회하기(전체내역)
	public List<MyOrderDTO> getMyOrderList(String user_code);
	
	// 카페주문내역 조회하기(오늘날짜)
	public List<MyOrderDTO> getMyOrder(String user_code);
	
}