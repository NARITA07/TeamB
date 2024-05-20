package bookcafe.member.serviceImpl;

import org.apache.ibatis.annotations.Param;

import bookcafe.member.service.MemberVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("memberMapper")
public interface MemberMapper {    
	/* 회원가입 */
	int insertMember(MemberVO memberVO);
	
	/* user_code 증가 */
    String getMaxUserCode();

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
    
    
}