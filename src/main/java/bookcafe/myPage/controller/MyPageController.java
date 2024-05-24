package bookcafe.myPage.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.MyPageService;
import bookcafe.myPage.service.PWchangeDTO;
import bookcafe.point.service.PointService;


@Controller
@RequestMapping("/myPage/*")
public class MyPageController {
	
	@Autowired
	private MyPageService myPageService;
	
	// 마이페이지
	@GetMapping("/myPage")
	public void myPage(HttpSession session, Model model) {
		String userId = (String) session.getAttribute("sessionId");
		
		System.out.println("UserId: " + userId);
	}
	
	// 내 정보관리 페이지
	@GetMapping("/myPageInfo")
	public void myPageInfo() {
	}
	
	// 내 정보 수정 페이지
	@GetMapping("/myPageInfo_modify")
	public void myPageInfo_modifyGet() {
	}
	
	// 정보수정완료
	@Transactional
	@PostMapping("/memberModify_submit")
	public String myPageInfo_modifyPost(HttpSession session, MemberVO updateVO, RedirectAttributes rttr) {
		System.out.println("updateVO:" + updateVO);
		int result = myPageService.updateMember(updateVO);
		rttr.addFlashAttribute("modifyResult", result);
		// 변경 결과에 따라 응답 반환
	    if (result == 1) {
	    	session.setAttribute("loginInfo", updateVO);
	    	return "redirect:/myPage/myPageInfo";
	    } else {
	        return "fail";
	    }
	}
	
	// 비밀번호 변경
	@Transactional
	@PutMapping("/pwdChange")
	public ResponseEntity<String> pwdChange(HttpSession session, @RequestBody PWchangeDTO pwChangeDTO) {
		MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
		System.out.println("user_id:" + pwChangeDTO.getUser_id());
		System.out.println("password:" + pwChangeDTO.getPassword());
		System.out.println("newPassword:" + pwChangeDTO.getNewPassword());
	    // 비밀번호 변경 로직 수행
	    int result = myPageService.changePassword(pwChangeDTO);
	    System.out.println("pwdChange result:" + result);
	    // 변경 결과에 따라 응답 반환
	    if (result == 1) {
	    	loginInfo.setUser_pass(pwChangeDTO.getNewPassword());
	        return ResponseEntity.ok("success");
	    } else {
	        return ResponseEntity.ok("fail");
	    }
	}
	
	
//	// 회원탈퇴
//	@DeleteMapping("/delete/{mem_id}")
//	@ResponseBody
//	@Transactional
//	public String deleteMember(HttpSession session, @PathVariable("userId") String userId) {
//		System.out.println("deleteMember...");
//		MemberVO deleteVO = myPageService.getUserVO(userId);
//		System.out.println("deleteVO:" + deleteVO);
//		//myPageService.registerDelMember(deleteVO);
//		System.out.println("deleteVO 등록완료");
//		int count = myPageService.deleteMember(mem_id);
//		if (count == 1) {
//			session.invalidate();
//			return "success";
//		} else {
//			return "fail";
//		}
//	}
	
}
