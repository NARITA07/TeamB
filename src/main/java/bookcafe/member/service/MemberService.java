package bookcafe.member.service;


public interface MemberService {

/* 회원 등록 처리 */
public String insertMember(MemberVO memberVO) throws Exception;

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

// 네이버 로그인
public String insertNaverMember(MemberVO memberVO) throws Exception;

boolean checkUserInfo(String userId, String userName, String userTel, String userEmail);

public String insertbMember(MemberVO memberVO) throws Exception;	

public int selectTelChk(String user_tel);


boolean updateNonMember(String userTel, String userName, String userEmail, String userAddress) throws Exception;

String selectMemberEmail(String user_code);
}
