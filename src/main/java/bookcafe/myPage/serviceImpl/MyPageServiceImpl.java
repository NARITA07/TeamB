package bookcafe.myPage.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.MyBookDTO;
import bookcafe.myPage.service.MyOrderDTO;
import bookcafe.myPage.service.MyPageService;
import bookcafe.myPage.service.PWchangeDTO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service
public class MyPageServiceImpl extends EgovAbstractServiceImpl implements MyPageService{
	
	@Autowired
	private MyPageMapper myPageMapper;
	
	// 비밀번호 변경하기
	@Transactional
	@Override
	public int updatePassword(PWchangeDTO pwChangeDTO) {
		int result = myPageMapper.updatePassword(pwChangeDTO);
		return result;
	}

	// 회원정보 수정하기
	@Transactional
	@Override
	public int updateMember(MemberVO updateVO) {
		int result = myPageMapper.updateMember(updateVO);
		return result;
	}
	
	// 전화번호 중복 확인하기
	@Override
	public int checkDupTel(String user_tel) {
		System.out.println("user_tel:" + user_tel);
		int result = myPageMapper.checkDupTel(user_tel);
		System.out.println("result:" + result);
		return result;
	}

	// 회원정보 삭제하기
	@Transactional
	@Override
	public int deleteMember(String user_id) {
		int result = myPageMapper.deleteMember(user_id);
		return result;
	}
	
	// 3개월 구매금액 조회하기
	@Override
	public int getMyPurchaseAmount(String user_code) {
		Integer purchase_amount = myPageMapper.getMyPurchaseAmount(user_code);
        return purchase_amount != null ? purchase_amount : 0;
	}

	// 카페주문내역 조회하기(전체내역)
	@Override
	public List<MyOrderDTO> getMyOrderList(String user_code) {
		List<MyOrderDTO> list = myPageMapper.getMyOrderList(user_code);
		return list;
	}
	
	// 카페주문내역 조회하기(오늘날짜)
	@Override
	public List<MyOrderDTO> getMyOrder(String user_code) {
		List<MyOrderDTO> list = myPageMapper.getMyOrder(user_code);
		return list;
	}
	
	// 도서대여내역 조회하기(전체내역)
	@Override
	public List<MyBookDTO> getMyBookList(String user_code) {
		List<MyBookDTO> list = myPageMapper.getMyBookList(user_code);
		return list;
	}
	
	// 도서대여내역 조회하기(오늘날짜)
	@Override
	public List<MyBookDTO> getMyBook(String user_code) {
		List<MyBookDTO> list = myPageMapper.getMyBook(user_code);
		return list;
	}

}

