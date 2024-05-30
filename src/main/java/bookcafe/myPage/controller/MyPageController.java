package bookcafe.myPage.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.MyPageService;
import bookcafe.myPage.service.PWchangeDTO;


@Controller
@RequestMapping("/myPage/")
public class MyPageController {
	
	@Autowired
	private MyPageService myPageService;
	
	@Autowired
	private MemberService memberService;
	
	// 마이페이지
	@GetMapping("/myPage")
	public void myPageMain(HttpSession session) {
		MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
		
    	System.out.println("loginInfo: " + loginInfo);
	}
	
	// 내 정보관리 페이지
	@GetMapping("/myPageInfo")
	public void myPageInfo() {
	}
	
	// 내 정보 수정 페이지
	@GetMapping("/myPageInfo_modify")
	public void myPageInfo_modifyGet() {
	}
	
	// 카페 전체 주문내역 페이지
	@GetMapping("/orderList")
	public void myOrderList() {
	}
	
	// 책 대여 내역조회 페이지
	@GetMapping("/borrowList")
	public void myBorrowList() {
	}
	
	// 정보수정완료
	@Transactional
	@PostMapping("/memberModify_submit")
	public String myPageInfo_modifyPost(HttpSession session, MemberVO updateVO, RedirectAttributes rttr) {
		System.out.println("updateVO:" + updateVO);
		int result = myPageService.updateMember(updateVO);
		rttr.addFlashAttribute("modifyResult", result);

		if (result == 1) {
			// loginInfo 수정정보 업데이트하기
			MemberVO updateInfo = memberService.getUserInfo(updateVO.getUser_id());
	    	session.setAttribute("loginInfo", updateInfo);
	    	System.out.println("loginInfo:" + updateInfo);
	    	return "redirect:/myPage/myPageInfo";
	    } else {
	        return "fail";
	    }
	}
	
	// 비밀번호 변경
	@Transactional
	@PostMapping("/pwdChange")
	public ResponseEntity<String> pwdChange(HttpSession session,
	                                        @RequestParam("user_id") String userId,
	                                        @RequestParam("newPassword") String newPassword) {
	    PWchangeDTO pwChangeDTO = new PWchangeDTO();
	    pwChangeDTO.setUser_id(userId);
	    pwChangeDTO.setNewPassword(newPassword);
		
	    int result = myPageService.changePassword(pwChangeDTO);
	    System.out.println("pwdChange result:" + result);
	    
	    if (result == 1) {
	    	MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
	    	loginInfo.setUser_pass(pwChangeDTO.getNewPassword());
	        return ResponseEntity.ok("success");
	    } else {
	        return ResponseEntity.ok("fail");
	    }
	}
	
	
	// 회원탈퇴
	@DeleteMapping("/delete/{user_id}")
	@ResponseBody
	@Transactional
	public String deleteMember(HttpSession session, @PathVariable("user_id") String user_id) {
		System.out.println("deleteMember...");
		MemberVO deleteVO = memberService.getUserInfo(user_id);
		System.out.println("deleteVO:" + deleteVO);
		int count = myPageService.deleteMember(user_id);
		if (count == 1) {
			session.invalidate();
			return "success";
		} else {
			return "fail";
		}
	}
		
}
