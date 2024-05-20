package bookcafe.myPage.controller;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import bookcafe.member.service.MemberVO;


@Controller
public class MyPageController {
	
	private static final Logger logger = LogManager.getLogger(MyPageController.class);
	
	// 마이페이지
	@RequestMapping("myPage.do")
	public String myPage(HttpSession session, Model model) {
		
		String userId = (String) session.getAttribute("sessionId");
		MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
		
		logger.info("UserId: " + user_id);
		return "/myPage/myPage";
	}
	
	// 내 정보관리 페이지
	@RequestMapping("myPageInfo.do")
	public String myPageInfo() {
		//log.info("myPageInfo Get..");
		return "bookCafe/myPageInfo";
	}
	
	// 내 정보 수정 페이지
	@RequestMapping("myPageInfo_modify.do")
	public String myPageInfo_modifyGet() {
		//log.info("myPageInfo_modify Get..");
		return "bookCafe/myPageInfo_modify";
	}
	
}
