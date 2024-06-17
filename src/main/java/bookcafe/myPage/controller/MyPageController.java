package bookcafe.myPage.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.MyBookDTO;
import bookcafe.myPage.service.MyOrderDTO;
import bookcafe.myPage.service.MyPageService;
import bookcafe.myPage.service.PWchangeDTO;
import bookcafe.paging.service.PaginationVO;
import bookcafe.paging.service.PagingRequestVO;
import bookcafe.paging.service.PagingService;
import bookcafe.paging.serviceImpl.PagingServiceImpl;
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
		// 사용자 정보 업데이트
		String sessionId = (String) session.getAttribute("sessionId");
		MemberVO loginInfo = (MemberVO) memberService.getUserInfo(sessionId);
        session.setAttribute("loginInfo", loginInfo);
		
		System.out.println("loginInfo: " + loginInfo.toString());
		String user_code = loginInfo.getUser_code();
		
		// 3개월 구매금액 조회
		int purchaseAmount = myPageService.getMyPurchaseAmount(user_code);
		System.out.println("purchaseAmount:" + purchaseAmount);
		
		// 카페주문내역 조회(오늘날짜)
		List<MyOrderDTO> myOrder = myPageService.getMyOrder(user_code);
		
		// 도서대여내역 조회(오늘날짜)
		List<MyBookDTO> myBook = myPageService.getMyBook(user_code);
		
		model.addAttribute("purchaseAmount", purchaseAmount);
		model.addAttribute("myOrder", myOrder);
		model.addAttribute("myBook", myBook);
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
	public void pointList(HttpSession session, Model model,
				  		  @RequestParam(required = false) String startDate, 
			              @RequestParam(required = false) String endDate,
			              @RequestParam(value = "page", defaultValue = "1") int page,
                          @RequestParam(value = "size", defaultValue = "10") int size) {
		
		MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
		String user_code = loginInfo.getUser_code();
		
		// 포인트 내역 조회
		PointVO pointVO = new PointVO();
		pointVO.setUser_code(user_code);
		pointVO.setStartDate(startDate);
		pointVO.setEndDate(endDate);
		List<PointVO> pointList = pointService.getPointList(pointVO);
		System.out.println("pointList:" + pointList.toString());
		
		// 포인트 총금액
		int totalPoint = pointService.selectTotalPoint(user_code);
		System.out.println("totalPoint:" + totalPoint);
		
		// 페이징
		PagingRequestVO pagingRequest = new PagingRequestVO(page, size);
		PagingService<PointVO> pagingService = new PagingServiceImpl<PointVO>(pointList);
		List<PointVO> pagedList = pagingService.getPagedList(pagingRequest);
		int totalRecords = pagingService.getTotalRecords();
		PaginationVO pagination = new PaginationVO(totalRecords, page, size);
		
		model.addAttribute("pointList", pagedList);
		model.addAttribute("totalPoint", totalPoint);
		model.addAttribute("startDate", startDate);
		model.addAttribute("endDate", endDate);
		model.addAttribute("pagination", pagination);
	}
	
	// 카페 전체 주문내역 페이지
	@GetMapping("/orderList")
	public void myOrderList(HttpSession session, Model model,
							@RequestParam(required = false) String startDate, 
				            @RequestParam(required = false) String endDate,
				            @RequestParam(value = "page", defaultValue = "1") int page,
                            @RequestParam(value = "size", defaultValue = "10") int size) {
		
		MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
		String user_code = loginInfo.getUser_code();
		
		// 카페주문내역 조회(전체내역)
		MyOrderDTO myOrderDTO = new MyOrderDTO();
		myOrderDTO.setUser_code(user_code);
		myOrderDTO.setStartDate(startDate);
		myOrderDTO.setEndDate(endDate);
		List<MyOrderDTO> orderList = myPageService.getMyOrderList(myOrderDTO);
		System.out.println("orderList:" + orderList);
		
		// 페이징
		PagingRequestVO pagingRequest = new PagingRequestVO(page, size);
		PagingService<MyOrderDTO> pagingService = new PagingServiceImpl<MyOrderDTO>(orderList);
		List<MyOrderDTO> pagedList = pagingService.getPagedList(pagingRequest);
		int totalRecords = pagingService.getTotalRecords();
		PaginationVO pagination = new PaginationVO(totalRecords, page, size);
		
		model.addAttribute("orderList", pagedList);
		model.addAttribute("startDate", startDate);
		model.addAttribute("endDate", endDate);
		model.addAttribute("pagination", pagination);
	}
	
	// 책 대여 내역조회 페이지
	@GetMapping("/borrowList")
	public void myBorrowList(HttpSession session, Model model,
							 @RequestParam(required = false) String startDate, 
				             @RequestParam(required = false) String endDate,
				             @RequestParam(value = "page", defaultValue = "1") int page,
                             @RequestParam(value = "size", defaultValue = "10") int size) {
		
		MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
		String user_code = loginInfo.getUser_code();
		
		// 도서대여내역 조회(전체내역)
		MyBookDTO myBookDTO = new MyBookDTO();
		myBookDTO.setUser_code(user_code);
		myBookDTO.setStartDate(startDate);
		myBookDTO.setEndDate(endDate);
		List<MyBookDTO> borrowList = myPageService.getMyBookList(myBookDTO);
		System.out.println("borrowList:" + borrowList);
		
		// 페이징
		PagingRequestVO pagingRequest = new PagingRequestVO(page, size);
		PagingService<MyBookDTO> pagingService = new PagingServiceImpl<MyBookDTO>(borrowList);
		List<MyBookDTO> pagedList = pagingService.getPagedList(pagingRequest);
		int totalRecords = pagingService.getTotalRecords();
		PaginationVO pagination = new PaginationVO(totalRecords, page, size);
		
		model.addAttribute("borrowList", pagedList);
		model.addAttribute("startDate", startDate);
		model.addAttribute("endDate", endDate);
		model.addAttribute("pagination", pagination);
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
	
	// 구매상세정보
	@PostMapping(value="/getOrderInfo", produces="application/json; charset=UTF-8")
	@ResponseBody
	public String getOrderInfo(@RequestParam String order_code) {
	    System.out.println("getOrderCode: " + order_code);
	    List<MyOrderDTO> orderInfo = myPageService.getOrderInfo(order_code);
	    System.out.println("orderInfo:" + orderInfo);
	    
	    // gson 변환
	    String g_orderInfo = (new Gson()).toJson(orderInfo);
	    
	    return g_orderInfo;
	}
		
}
