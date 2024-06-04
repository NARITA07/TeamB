package bookcafe.cart.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;
import bookcafe.cart.service.OrdersVO;
import bookcafe.cart.service.PointLogVO;
import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.MyPageService;
import bookcafe.point.service.PointService;
import bookcafe.point.service.PointVO;

	@Controller
	public class CartController {
		
	@Autowired
	private MyPageService myPageService;
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private PointService pointService;
	
	// 장바구니 담기
	@RequestMapping("insertCart.do")
	public String insertCart(@RequestParam("user_code") String user_code,
	                         @RequestParam("product_code") String product_code, 
	                         @RequestParam("order_quantity") int order_quantity) {
		  
		String cart_code = cartService.selectMaxCartCode(user_code);
	    System.out.println("cart_code: " + cart_code);
	  
		CartVO cart = new CartVO();
		cart.setUser_code(user_code);
		cart.setProduct_code(product_code);
		cart.setOrder_quantity(order_quantity);
		cart.setCart_code(cart_code);
		System.out.println("cartVO: " + cart.toString());
		int result = cartService.insertCart(cart);
		if (result >= 1) {
			System.out.println("장바구니 담기 성공");
		} else {
			System.out.println("장바구니 담기 실패");
		}
			
		return "redirect:/foodList.do";
	}
	
	// 장바구니 리스트 보기
	@RequestMapping("cartList.do")
	public String selectCartList(Model model, HttpSession session) {
	
		MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
		String user_code = loginInfo.getUser_code();
		String cart_code = cartService.selectMaxCartCode(user_code);
		System.out.println("cart_code:" + cart_code);
		
		// 최근 cart_code가 order에 있는지 없는지 체크
		int order_count = cartService.selectOrders(cart_code);
		System.out.println("order_count:" + order_count);
		
		List<CartVO> cartList;
		int total_price;
		
		// 주문이 존재할 경우(=해당 카트코드는 결제완료 상태이므로 cartList=null 반환)
		if (order_count >= 1) {
		    cartList = new ArrayList<CartVO>();
		    total_price = 0;
		} 
		// 주문이 존재하지 않을 경우(=해당 카트코드는 결제전이므로 cartList 출력)
		else {
			CartVO cartListVO = new CartVO();
			cartListVO.setUser_code(user_code);
			cartListVO.setCart_code(cart_code);
			
			cartList = cartService.selectCartList(cartListVO);
			total_price = cartService.selectTotalPrice(cart_code);
			System.out.println("total_price:" + total_price);
		}
		
		System.out.println("카트리스트:" + cartList);
		
		model.addAttribute("total_price", total_price);
		model.addAttribute("cartList", cartList);
		model.addAttribute("cart_code", cart_code);
		
		return "/cart/cartList";
	}
	
	// 장바구니 상품 지우기
	@RequestMapping("deleteCart.do")
	public String deleteCart(@RequestParam(name = "cart_code") String cart_code,
							 @RequestParam(name = "product_code") String product_code,
							 @RequestParam(name = "user_code") String user_code) {
		System.out.println("삭제컨트롤러" + user_code);
		
		CartVO cart = new CartVO();
		cart.setUser_code(user_code);
		cart.setProduct_code(product_code);
		cart.setCart_code(cart_code);
		
		cartService.deleteCart(cart);
		return "redirect:/cartList.do";
	}
	
	// 주문 넣기(결제)
	@PostMapping("/submitOrder")
	public String submitOrder(@ModelAttribute OrdersVO order, HttpSession session) {
		System.out.println("결제 컨트롤러 - 카트코드: " + order.getCart_code());
		System.out.println("결제VO: " + order.toString());
		cartService.insertOrder(order);
		
		// 재고 감소
	    MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
	    String user_code = loginInfo.getUser_code();
	    String cart_code =cartService.selectMaxCartCode(user_code);
	    cartService.updateQuantity(cart_code);
		
	    // 포인트 증가
		String order_code = cartService.selectOrderCode(cart_code);
		System.out.println("컨트롤러 오더코드1"+order_code);
		int totalPrice = cartService.getTotalPrice(order_code);
		System.out.println("컨트롤러 토탈가격1"+totalPrice);
		 
		int pointChange = (int) (totalPrice * 0.05);
		System.out.println("주문넣기 컨트롤러 오더코드: " + order_code);
		System.out.println("총 가격: " + totalPrice);
		System.out.println("포인트 변경: " + pointChange);
		 
		// 포인트 감소
		//cartService.minusPoint(amountOfPayment, user_code, order_code);
		 
		// 포인트 업데이트
		PointVO pointLog = new PointVO();
		pointLog.setUser_code(user_code);
		pointLog.setOrder_code(order_code);
		pointLog.setPoint_change(pointChange);
		
		// 포인트 로그 입력
		int result = pointService.insertPointLog(pointLog);
		if (result == 1) {
			// 합산 포인트 계산
			int newSumPoint = pointService.selectTotalPoint(user_code);
			loginInfo.setUser_point(newSumPoint);
			session.setAttribute("loginInfo", loginInfo);
			System.out.println("loginInfo_point:" + loginInfo.getUser_point());
			myPageService.updateMember(loginInfo);
		} else {
			System.out.println("포인트적립실패");
		}
		
		return "redirect:/cartList.do";
	}
}