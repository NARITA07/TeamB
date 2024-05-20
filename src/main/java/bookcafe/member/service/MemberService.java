package bookcafe.member.service;


public interface MemberService {

/* 회원 등록 처리 */
public String insertMember(MemberVO memberVO) throws Exception;	

/* user_code 증가 */
String generateUserCode();

/* 중복 확인 */
public int selectIdChk(String user_id);
	
/* 로그인 */
public int loginProc(MemberVO memberVO);

/* 아이디 찾기 */
String findId(String userName, String userTel) throws Exception;

/* 비밀번호 찾기 */
boolean findPw(String userId, String userName, String userTel) throws Exception;

/* 비밀번호 재설정 */
boolean resetPassword(String userId, String newPassword) throws Exception;

}