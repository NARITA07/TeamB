package bookcafe.member.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;

@Controller
public class MemberController { 
	
	@Resource(name = "memberService")
	public MemberService memberService;
	
	/* 로그인 페이지 */ 
  @RequestMapping("login.do") 
  public String login() { 
	  return "/WEB-INF/views/member/login.jsp"; 
  }
  
  /*회원등록 페이지 호출*/
  
  @RequestMapping("memberWrite.do") 
  public String MemberWrite() { 
	  return "/WEB-INF/views/member/login.jsp"; 
	  }

	/* 로그인 */
	@RequestMapping("loginProc.do")
	@ResponseBody
	public String loginProc(MemberVO memberVO, HttpSession session) throws Exception {
		String message = "";
		int cnt = memberService.selectIdChk(memberVO.getUser_id());
		if (cnt == 0) { // 아이디가 없습니다.
			message = "x";
		} else {
			int cnt2 = memberService.loginProc(memberVO);
			if (cnt2 == 0) {
				message = "wrong password"; // 패스워드가 틀렸습니다.
			} else {
				session.setAttribute("sessionId", memberVO.getUser_id());
				message = "ok"; // 로그인성공
			}
		}
		System.out.println(message);
		return message;
	}
  
  }
 