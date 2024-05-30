package bookcafe.member.serviceImpl;
	
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
	
@Service("memberService") 
public class MemberServiceImpl extends EgovAbstractServiceImpl implements MemberService {

@Resource(name = "memberMapper") 
MemberMapper memberMapper;
 
private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /* 회원가입 */
    @Override
    public String insertMember(MemberVO memberVO) throws Exception {
        memberVO.setUser_pass(passwordEncoder.encode(memberVO.getUser_pass())); // 비밀번호 암호화
        int result = memberMapper.insertMember(memberVO);
        return result > 0 ? "ok" : "fail";
    }

    /*로그인*/
    @Override public int loginProc(MemberVO memberVO) {
        MemberVO storedMemberVO = memberMapper.getUserInfo(memberVO.getUser_id());
        if (storedMemberVO != null && passwordEncoder.matches(memberVO.getUser_pass(), storedMemberVO.getUser_pass())) {
            return 1;
        } else {
            return 0;
        }
    }
    
    /*아이디 중복체크*/
    @Override 
    public int selectIdChk(String user_id) { 
        return memberMapper.selectIdChk(user_id); 
    }

    /* 아이디 찾기 */
    @Override
    public String findId(String userName, String userEmail) throws Exception {
        return memberMapper.findId(userName, userEmail);
    }

    /* 비밀번호 찾기 */
    @Override
    public boolean findPw(String userId, String userName, String userTel) throws Exception {
        int count = memberMapper.findPw(userId, userName, userTel);
        return count > 0;
    }

    /* 비밀번호 재설정 */
    @Override
    public boolean resetPassword(String userId, String newPassword) throws Exception {
        int result = memberMapper.resetPassword(userId, passwordEncoder.encode(newPassword)); // 비밀번호 암호화
        return result > 0;
    }

    /* 네이버 로그인 */
    @Override
    public String insertNaverMember(MemberVO memberVO) throws Exception {
        memberVO.setUser_joindate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

        // 주소나 필수가 아닌 정보가 누락된 경우 기본값 할당
        if(memberVO.getUser_address() == null) {
            memberVO.setUser_address("기본 주소");
        }

        int result = memberMapper.insertNaverMember(memberVO);
        return result > 0 ? "ok" : "fail";
    }
    
    /* 네이버 아이디 확인 */
    @Override
    public int selectSnsIdChk(String user_sns_id) {
        return memberMapper.selectSnsIdChk(user_sns_id);
    }	
    
 // 회원정보 조회하기
 	@Override
 	public MemberVO getUserInfo(String user_id) {
 		MemberVO memberVO = memberMapper.getUserInfo(user_id);
 		return memberVO;
 	}
}