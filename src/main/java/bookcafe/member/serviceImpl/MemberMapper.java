package bookcafe.member.serviceImpl;

import org.apache.ibatis.annotations.Param;

import bookcafe.member.service.MemberVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("memberMapper")
public interface MemberMapper {    
	/* 회원가입 */
	int insertMember(MemberVO memberVO);

	/* 로그인 */
	int loginProc(MemberVO memberVO);
	
	/* 아이디 중복확인 */
	int selectIdChk(String user_id);
	
	/* 아이디 찾기*/
	String findId(@Param("user_name") String userName, @Param("user_tel") String userTel);

	/* 비밀번호 찾기 */
    int findPw(@Param("user_id") String userId, @Param("user_name") String userName, @Param("user_tel") String userTel);

    /* 비밀번호 재설정 */
    int resetPassword(@Param("user_id") String userId, @Param("new_password") String newPassword);
    
	// 사용자 정보 조회 메소드 추가
    MemberVO getUserInfo(@Param("user_id") String userId);
    
    /* 비회원가입 */
	int insertbMember(MemberVO memberVO);
    
	/* 전화번호 중복확인 */
	int selectTelChk(String user_tel);
	/* 비회원 재로그인*/
	int updateNonMember(String userTel,String userName, String userEmail, String userAddress);
}