package bookcafe.myPage.serviceImpl;

import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.PWchangeDTO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("myPageMapper")
public interface MyPageMapper {

	// 비밀번호 변경하기
	public int changePassword(PWchangeDTO pwChangeDTO);
	
	// 회원정보 수정하기
	public int updateMember(MemberVO updateVO);
	
//	// 탈퇴회원 기록하기
//	public int registerDelMember(MemberVO deletedVO);
//	
//	// 회원정보 삭제하기
//	public int deleteMember(String mem_id);
//	
//	// 예약정보 현재시각기준 업데이트
//	public void updateTBLReserve(String mem_id);
//	
//	// 예약정보 조회하기(예약페이지)
//	public List<GetStatusDTO> getReserveList(String mem_id);
//	
//	// 예약번호로 차종 조회하기
//	public String getCarName(GetCarNameDTO getCarNameDTO);
//	
//	// 예약취소
//	public int cancelReservation(int res_rid);
//	
//	// 예약정보 현재시각기준 업데이트(비회원)
//	public void updateNonMember(NonMemberLoginDTO nonMemberLoginDTO);
//	
//	// 예약정보 조회하기(비회원)
//	public List<NonMemberVO> getMemberList_non(NonMemberLoginDTO nonMemberLoginDTO);
//	
//	// 예약번호로 차종 조회하기(비회원)
//	public String getCarName_non(GetCarNameDTO getCarNameDTO);
//	
//	// 예약취소(비회원)
//	public int cancelReservation_non(int non_rid);
//	
//	// 예약정보 조회하기(마이페이지)
//	public List<GetStatusDTO> getMyReserveList(String mem_id);
//	
//	// 예약정보 조회하기(예약번호 1개 정보)
//	public List<GetStatusDTO> getMyResInfo(int res_rid);

}