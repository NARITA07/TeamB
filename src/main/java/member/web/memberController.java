package member.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class memberController {
	/* 로그인 페이지 */
	@RequestMapping("login.do")
	public String login() {
		return "/WEB-INF/views/member/login.jsp";
	}
	
	/* 회원등록 페이지 호출 */
	@RequestMapping("memberWrite.do")
	public String memberWrite() {
		return "/WEB-INF/views/member/login.jsp";
	}
}
