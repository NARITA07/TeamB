package bookcafe.myPage.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.MyOrderDTO;
import bookcafe.myPage.service.MyPageService;
import bookcafe.myPage.service.PWchangeDTO;
import bookcafe.point.service.PointService;
import bookcafe.point.service.PointVO;


@Controller
@RequestMapping("/myPage/")
public class MyPageController {
	
	@Autowired
	private MyPageService myPageService;
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private PointService pointService;
	
	// 비밀번호 암호화
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	// 마이페이지
	@GetMapping("/myPage")
	public void myPageMain(HttpSession session, Model model) {
		MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
		System.out.println("loginInfo: " + loginInfo.toString());
		String user_code = loginInfo.getUser_code();
		
		// 3개월 구매금액 조회
		int purchaseAmount = myPageService.getMyPurchaseAmount(user_code);
		System.out.println("purchaseAmount:" + purchaseAmount);
		
		// 카페주문내역 조회(오늘날짜)
		List<MyOrderDTO> myOrder = myPageService.getMyOrder(user_code);
		
		model.addAttribute("purchaseAmount", purchaseAmount);
		model.addAttribute("myOrder", myOrder);
	}
	
	// 내 정보관리 페이지
	@GetMapping("/myPageInfo")
	public void myPageInfo() {
	}
	
	// 내 정보 수정 페이지
	@GetMapping("/myPageInfo_modify")
	public void myPageInfo_modifyGet() {
	}
	
	// 포인트페이지
	@GetMapping("/pointList")
	public void pointList(HttpSession session, Model model) {
		MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
		String user_code = loginInfo.getUser_code();
		
		// 포인트 내역 조회
		List<PointVO> pointList = pointService.getPointList(user_code);
		System.out.println("pointList:" + pointList.toString());
		
		// 포인트 총금액
		int totalPoint = pointService.selectTotalPoint(user_code);
		System.out.println("totalPoint:" + totalPoint);
		
		model.addAttribute("pointList", pointList);
		model.addAttribute("totalPoint", totalPoint);
	}
	
	// 카페 전체 주문내역 페이지
	@GetMapping("/orderList")
	public void myOrderList(HttpSession session, Model model) {
		MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
		String user_code = loginInfo.getUser_code();
		
		// 카페주문내역 조회하기(전체내역)
		List<MyOrderDTO> orderList = myPageService.getMyOrderList(user_code);
		System.out.println("orderList:" + orderList);
		
		model.addAttribute("orderList", orderList);
	}
	
	// 책 대여 내역조회 페이지
	@GetMapping("/borrowList")
	public void myBorrowList() {
	}
	
	// 정보수정완료
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
	@PostMapping("/pwdChange")
	public ResponseEntity<String> changePassword(HttpSession session,
				                                 @RequestParam("password1") String password1,
				                                 @RequestParam("newPassword") String newPassword) {
		
		MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
		
		if (passwordEncoder.matches(password1, loginInfo.getUser_pass())) {
			String encNewPassword = passwordEncoder.encode(newPassword);
			
			PWchangeDTO pwChangeDTO = new PWchangeDTO();
			pwChangeDTO.setUser_id(loginInfo.getUser_id());
			pwChangeDTO.setNewPassword(encNewPassword);
			int result = myPageService.updatePassword(pwChangeDTO);
			
			if (result == 1) {
				System.out.println("updatePassword");
				loginInfo.setUser_pass(encNewPassword);
				session.setAttribute("loginInfo", loginInfo);
				return ResponseEntity.ok("success");
			} else {
				return ResponseEntity.ok("fail");
			}
		}
		return ResponseEntity.ok("mismatch");
	}
	
	// 전화번호 중복체크(unique key)
	@PostMapping("/checkDupUserTel")
	@ResponseBody
	public String checkDuplicateUserTel(@RequestParam("user_tel") String user_tel){
		int checkDupTel = myPageService.checkDupTel(user_tel);
		
		if (checkDupTel > 0) {
			return "duplicate";
		} else {
			return "useOK";
		}
	}
	
	// 회원탈퇴
	@PostMapping("/delete")
	public ResponseEntity<String> deleteMember(HttpSession session, 
											   @RequestParam("del_enter_pwd") String del_enter_pwd) {
		System.out.println("deleteMember...");
		MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
		
		if (passwordEncoder.matches(del_enter_pwd, loginInfo.getUser_pass())) {
			int count = myPageService.deleteMember(loginInfo.getUser_id());
			if (count == 1) {
				System.out.println("회원탈퇴성공! deleteVO:" + loginInfo);
				session.invalidate();
				return ResponseEntity.ok("success");
			} else {
				return ResponseEntity.ok("fail");
			}
		}
		return ResponseEntity.ok("mismatch");
	}
		
}
