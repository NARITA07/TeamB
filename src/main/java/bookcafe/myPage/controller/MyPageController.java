package bookcafe.myPage.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.MyPageService;


@Controller
@RequestMapping("/myPage")
public class MyPageController {
	
	@Autowired
	private MyPageService myPageService;
	
	// 마이페이지
	@GetMapping("/myPage")
	public void myPage(HttpSession session, Model model) {

		String userId = (String) session.getAttribute("sessionId");
		MemberVO loginInfo = myPageService.getUserVO(userId);
		System.out.println("UserId: " + userId);
		
		session.setAttribute("loginInfo", loginInfo);
	}
	
	// 내 정보관리 페이지
	@GetMapping("/myPageInfo")
	public void myPageInfo() {
	}
	
	// 내 정보 수정 페이지
	@GetMapping("/myPageInfo_modify")
	public void myPageInfo_modifyGet() {
	}
	
}
