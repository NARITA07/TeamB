package bookcafe.member.service;

public interface MemberService {
//!
/* 회원 등록 처리 */
public String insertMember(MemberVO memberVO) throws Exception;

/* 중복 확인 */
public int selectIdChk(String user_id);

/* 마지막으로 id 한번더 체크 */
public boolean checkIdExists(String user_id);

/* 마지막으로 tel 한번더 체크 */
public boolean checkTelExists(String user_tel);
	
/* 로그인 */
public int loginProc(MemberVO memberVO);

/* 아이디 찾기 */
public String findId(String userName, String userEmail) throws Exception;

/* 비밀번호 찾기 */
boolean findPw(String userId, String userName, String userTel) throws Exception;

/* 비밀번호 재설정 */
boolean resetPassword(String userId, String newPassword) throws Exception;

// 네이버 로그인
public String insertNaverMember(MemberVO memberVO) throws Exception;

// user_sns_id 중복 체크
public int selectSnsIdChk(String user_sns_id); 

//회원정보 조회하기
public MemberVO getUserInfo(String user_id);

/* 회원 코드로 이메일 받아오기 */
public String selectMemberEmail(String user_code);

}