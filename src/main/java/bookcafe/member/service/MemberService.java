package bookcafe.member.service;


public interface MemberService {

    /* 로그인 */
    public int loginProc(MemberVO memberVO);
    
    /* 중복 확인 */
    public int selectIdChk(String user_id);

}
