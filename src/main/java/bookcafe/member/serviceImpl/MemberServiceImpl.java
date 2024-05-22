package bookcafe.member.serviceImpl;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("memberService") 
public class MemberServiceImpl extends EgovAbstractServiceImpl implements MemberService {

@Resource(name = "memberMapper") 
MemberMapper memberMapper;

	/* 회원가입 */
	@Override
	public String insertMember(MemberVO memberVO) throws Exception {
	    memberVO.setUser_joindate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
	    int result = memberMapper.insertMember(memberVO);
	    return result > 0 ? "ok" : "fail";
	}

	/*로그인*/
	@Override public int loginProc(MemberVO memberVO) { 
		return memberMapper.loginProc(memberVO); 
	}
	
	/*아이디 중복체크*/
	@Override 
	public int selectIdChk(String user_id) { 
		return memberMapper.selectIdChk(user_id); 
	}
	
	/* 아이디 찾기 */
	@Override
    public String findId(String userName, String userTel) throws Exception {
        return memberMapper.findId(userName, userTel);
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
        int result = memberMapper.resetPassword(userId, newPassword);
        return result > 0;
    }
}
 
 