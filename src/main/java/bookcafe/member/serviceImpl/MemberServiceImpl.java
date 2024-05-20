package bookcafe.member.serviceImpl;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("memberService") 
  public class MemberServiceImpl extends EgovAbstractServiceImpl implements MemberService {
  
		/*
		 * @Resource(name = "memberMapper") public MemberMapper memberMapper;
		 */
  
	@Resource(name = "memberMapper") 
  MemberMapper memberMapper;
  
  
  /*로그인*/
  @Override public int loginProc(MemberVO memberVO) { 
	  return memberMapper.loginProc(memberVO); 
	  }
  /*아이디 중복체크*/
  @Override public int selectIdChk(String user_id) { return
		  memberMapper.selectIdChk(user_id); }

  }
 