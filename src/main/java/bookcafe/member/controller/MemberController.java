package bookcafe.member.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;

@Controller
public class MemberController { 
	
	@Resource(name = "memberService")
	public MemberService memberService;

	/*회원등록 페이지 호출*/
	@RequestMapping("memberWrite.do") 
	public String MemberWrite() { 
		return "/member/memberWrite"; 
	}
	
	/* 회원가입처리 */
	@RequestMapping("memberWriteSave.do")
    @ResponseBody
    public String insertMember(MemberVO memberVO) throws Exception {
        String message = memberService.insertMember(memberVO);
        return message;
    }
	
	/* 아이디 중복체크 */
	@RequestMapping("idChk.do")
	@ResponseBody
	public String selectIdChk(String user_id) throws Exception {
		String message = "";
		System.out.println("user_id :" + user_id);
		int cnt = memberService.selectIdChk(user_id);
		if (cnt == 0) {
			message = "ok";
		}
		return message;
	}
	/* 로그인 페이지 */ 
	  @RequestMapping("login.do") 
	  public String login() { 
		  return "/member/login"; 
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
	
	/* 로그아웃 */
	@RequestMapping("logout.do")
	public String logout(HttpSession session) {
		session.removeAttribute("sessionId");
		return "../../index";
	}
	
	/* 아이디찾기 페이지  페이지 이동  */
	@RequestMapping("findIdForm.do")
	public String findIdForm() {
	    return "/member/findIdForm";
	}

	/* 아이디 찾기 처리 */
	@RequestMapping("findId.do")
    @ResponseBody
    public String findId(@RequestParam("user_name") String userName, @RequestParam("user_tel") String userTel) throws Exception {
        String userId = memberService.findId(userName, userTel);
        return userId != null ? userId : "not found";
    }
	
	/* 비밀번호 찾기 페이지 이동 */
	@RequestMapping("findPwForm.do")
	public String findPw() {
		return "/member/findPwForm";
	}
	
	 /* 비밀번호 찾기 처리 */
    @RequestMapping("findPw.do")
    @ResponseBody
    public String findPw(@RequestParam("user_id") String userId, @RequestParam("user_name") String userName, @RequestParam("user_tel") String userTel) throws Exception {
        boolean userExists = memberService.findPw(userId, userName, userTel);
        return userExists ? "found" : "not found";
    }

    /* 비밀번호 재설정 */
    @RequestMapping("resetPassword.do")
    @ResponseBody
    public String resetPassword(@RequestParam("user_id") String userId, @RequestParam("new_password") String newPassword) throws Exception {
        boolean success = memberService.resetPassword(userId, newPassword);
        return success ? "success" : "fail";
    }
}
 