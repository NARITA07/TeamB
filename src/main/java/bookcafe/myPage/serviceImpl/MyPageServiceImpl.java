package bookcafe.myPage.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookcafe.member.service.MemberVO;
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

	// 회원정보 삭제하기
	@Transactional
	@Override
	public int deleteMember(String user_id) {
		int result = myPageMapper.deleteMember(user_id);
		return result;
	}

	// 카페주문내역 조회하기(전체내역)
	@Override
	public List<MyOrderDTO> getMyOrderList(String user_code) {
		List<MyOrderDTO> list = myPageMapper.getMyOrderList(user_code);
		return list;
	}
//
//	// 예약번호로 차종 조회하기
//	@Override
//	public String getCarName(GetCarNameDTO getCarNameDTO) {
//		String carName = myPageMapper.getCarName(getCarNameDTO);
//		return carName;
//	}
//
//	// 예약정보 현재시각기준 업데이트
//	@Override
//	public void updateTBLReserve(String mem_id) {
//		myPageMapper.updateTBLReserve(mem_id);
//	}
//
//	// 예약취소
//	@Override
//	public int cancelReservation(int res_rid) {
//		int result = myPageMapper.cancelReservation(res_rid);
//		return result;
//	}
//
//	// 예약정보 조회하기(비회원)
//	@Override
//	public List<NonMemberVO> getMemberList_non(NonMemberLoginDTO nonMemberLoginDTO) {
//		List<NonMemberVO> list = myPageMapper.getMemberList_non(nonMemberLoginDTO);
//		return list;
//	}
//
//	// 예약번호로 차종 조회하기(비회원)
//	@Override
//	public String getCarName_non(GetCarNameDTO getCarNameDTO) {
//		String carName = myPageMapper.getCarName_non(getCarNameDTO);
//		return carName;
//	}
//
//	// 예약취소(비회원)
//	@Override
//	public int cancelReservation_non(int non_rid) {
//		int result = myPageMapper.cancelReservation_non(non_rid);
//		return result;
//	}
//
//	// 예약정보 현재시각기준 업데이트(비회원)
//	@Override
//	public void updateNonMember(NonMemberLoginDTO nonMemberLoginDTO) {
//		myPageMapper.updateNonMember(nonMemberLoginDTO);
//	}
//
//	// 예약정보 조회하기(마이페이지)
//	@Override
//	public List<GetStatusDTO> getMyReserveList(String mem_id) {
//		List<GetStatusDTO> list = myPageMapper.getMyReserveList(mem_id);
//		return list;
//	}
//
//	// 예약정보 조회하기(예약번호 1개 정보)
//	@Override
//	public List<GetStatusDTO> getMyResInfo(int res_rid) {
//		List<GetStatusDTO> list = myPageMapper.getMyResInfo(res_rid);
//		return list;
//	}

}

