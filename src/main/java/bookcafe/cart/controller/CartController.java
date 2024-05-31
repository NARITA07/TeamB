package bookcafe.cart.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

@Controller
public class CartController {
	@Autowired
	private CartService cartService;

	// 장바구니 담기
	@RequestMapping("insertCart.do")
	public String insertCart(@RequestParam("user_code") String user_code,
			@RequestParam("product_code") String product_code, @RequestParam("order_quantity") int order_quantity) {

		CartVO cart = cartService.selectCartCode(user_code);
		if (cart == null) {
			cart = new CartVO();
		}

		cart.setUser_code(user_code);
		cart.setProduct_code(product_code);
		cart.setOrder_quantity(order_quantity);
		System.out.println("컨트롤러" + user_code);
		cartService.insertCart(cart);

		// cart_code 하나 보내기

		return "redirect:/foodList.do";
	}

	// 장바구니 리스트 보기
	@RequestMapping("cartList.do")
	public String selectCartList(Model model, HttpSession session) {

		MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
		String user_code = loginInfo.getUser_code();

		// OrdersVO orders = new OrdersVO();

		System.out.println("컨트롤러" + user_code);

		String cart_code = (cartService.selectCartCode(user_code)).getCart_code();

		/*
		 * CartVO cartVO = cartService.selectCartCode(user_code); String cart_code; if
		 * (cartVO == null || cartVO.getCart_code() == null) { cart_code = ""; } else {
		 * cart_code = cartVO.getCart_code(); }
		 */

		System.out.println("컨트롤러1");
		// order에 있는지 없는지 체크
		int order_code = cartService.selectOrder(cart_code);
		System.out.println("컨트롤러2");
		List<CartVO> cartList;
		if (order_code >= 1) {
			cartList = new ArrayList<CartVO>();

		} else {
			cartList = cartService.selectCartList(user_code, cart_code);
			int total_price = cartService.selectTotalPrice(cart_code);
			model.addAttribute("total_price", total_price);
		}

		System.out.println("컨트롤러" + cart_code);
		model.addAttribute("cartList", cartList);
		model.addAttribute("cart_code", cart_code);

		return "/cart/cartList";
	}

	// 장바구니 상품 지우기
	@RequestMapping("deleteCart.do")
	public String deleteCart(@RequestParam(name = "cart_code") String cart_code,
			@RequestParam(name = "product_code") String product_code,
			@RequestParam(name = "user_code") String user_code,
			@RequestParam(name = "order_quantity") int order_quantity) {
		System.out.println("삭제컨트롤러" + user_code);

		CartVO cart = new CartVO();
		cart.setUser_code(user_code);
		cart.setProduct_code(product_code);
		cart.setCart_code(cart_code);
		cart.setOrder_quantity(order_quantity);

		cartService.deleteCart(cart);
		return "redirect:/cartList.do";
	}

	// 주문 넣기
	@PostMapping("/submitOrder")
	public String submitOrder(@ModelAttribute OrdersVO order, HttpSession session) {
		System.out.println("결제 컨틀롤러" + order.getCart_code());
		System.out.println("결제VO: " + order.toString());
		cartService.insertOrder(order);

		// 재고 감소
		MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
		String user_code = loginInfo.getUser_code();
		String cart_code =(cartService.selectCartCode(user_code)).getCart_code();
		cartService.updateQuantity(cart_code);
		
		// 포인트 증가
	    String order_code = order.getOrder_code();
	    int totalPrice = cartService.getTotalPrice(order_code);
	    int pointChange = (int) (totalPrice * 0.05);
	    System.out.println("주문넣기 컨트롤러 오더코드: " + order_code);
	    System.out.println("총 가격: " + totalPrice);
	    System.out.println("포인트 변경: " + pointChange);

	    PointLogVO pointLog = new PointLogVO();
	    pointLog.setUser_code(user_code);
	    pointLog.setOrder_code(order_code);
	    pointLog.setPoint_change(pointChange);

	    cartService.addPoint(pointLog);
		 

		return "redirect:/cartList.do";
	}
}
