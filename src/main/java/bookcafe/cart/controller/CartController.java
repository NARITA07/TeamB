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
import org.springframework.web.bind.annotation.ResponseBody;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;
import bookcafe.cart.service.OrdersVO;
import bookcafe.cart.service.ReceiptVO;
import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;
import bookcafe.point.service.PointService;
import bookcafe.point.service.PointVO;

	@Controller
	public class CartController {
		
	@Autowired
	private CartService cartService;
	
	@Autowired
	private PointService pointService;
	
	@Autowired
	private MemberService memberService;
	
	// 장바구니 담기 (비동기)
	@RequestMapping("insertCart.do")
    @ResponseBody
    public String insertCartAjax(@RequestParam("user_code") String user_code,
                                 @RequestParam("product_code") String product_code, 
                                 @RequestParam("order_quantity") int order_quantity, HttpSession session) {

        String cart_code = cartService.selectMaxCartCode(user_code);
        // 카트코드 부여
        int isOrders = cartService.selectOrders(cart_code);
        if (isOrders > 0) {
            cart_code = null;
        }
        System.out.println("cart_code: " + cart_code);
        
        // 카트에 user_code,product_code,cart_code 있는지 확인
        CartVO existingCart = cartService.selectCartItem(user_code, product_code, cart_code);
        if (existingCart != null) {
        	// 카트에 담겨있으면 수량 변경
            existingCart.setOrder_quantity(existingCart.getOrder_quantity() + order_quantity);
            cartService.updateCartItem(existingCart);
        } else { // 기존에 없으면 생성
            CartVO cart = new CartVO();
            cart.setUser_code(user_code);
            cart.setProduct_code(product_code);
            cart.setOrder_quantity(order_quantity);
            cart.setCart_code(cart_code);

            int result = cartService.insertCart(cart);
            if (result != 1) {
                return "{\"status\":\"fail\"}";
            }
        }

        // 장바구니 숫자 업데이트
        int cartSize = cartService.getCurrentCartSize(user_code);
        session.setAttribute("cartSize", cartSize);

        return "{\"status\":\"success\", \"cartSize\":" + cartSize + "}";
    }
	
	// 장바구니 상품 갯수 수정 (비동기)
	@RequestMapping("updateQuantity.do")
	@ResponseBody
	public String updateQuantity(@RequestParam("cart_code") String[] cartCodes,
								@RequestParam("product_code") String[] productCodes,
							    @RequestParam("order_quantity") String[] orderQuantities,
							    Model model) {
		String message = "";
		int result = 0;

	        for (int i = 0; i < cartCodes.length; i++) {
	            String cart_code = cartCodes[i];
	            String product_code = productCodes[i];
	            String order_quantity = orderQuantities[i];

	            System.out.println("Cart Code: " + cart_code);
	            System.out.println("Product Code: " + product_code);
	            System.out.println("Order Quantity: " + order_quantity);
	            
	            result =  cartService.updateQuantity1(cart_code, product_code, Integer.parseInt(order_quantity));
	        }

		if(result == 1) {
			message = "success";
        }
		return message;
	}
	
	
	// 장바구니 리스트 보기
	@RequestMapping("cartList.do")
	public String selectCartList(Model model, HttpSession session) {
	
		// 사용자 정보 업데이트
		String sessionId = (String) session.getAttribute("sessionId");
		MemberVO loginInfo = (MemberVO) memberService.getUserInfo(sessionId);
		session.setAttribute("loginInfo", loginInfo);
		
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
							 @RequestParam(name = "user_code") String user_code,
							 HttpSession session) {
		System.out.println("삭제컨트롤러" + user_code);
		
		CartVO cart = new CartVO();
		cart.setUser_code(user_code);
		cart.setProduct_code(product_code);
		cart.setCart_code(cart_code);
		
		cartService.deleteCart(cart);
		//* 추가  S*//
		// 장바구니 수량 업데이트
	    int cartSize = cartService.getCurrentCartSize(user_code);
	    session.setAttribute("cartSize", cartSize);
	    //* 추가  E* //

		return "redirect:/cartList.do";
	}
	
	// 주문 넣기(결제)
	@PostMapping("/submitOrder")
	public String submitOrder(@ModelAttribute OrdersVO order, HttpSession session, CartVO cart, int total_price, int point_change) {
		System.out.println("결제 컨트롤러 - 카트코드: " + order.getCart_code());
		System.out.println("결제VO: " + order.toString());
		MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
	    String user_code = loginInfo.getUser_code();
	    String cart_code =cartService.selectMaxCartCode(user_code);
	    
	    
		cartService.insertOrder(order);
		
		// 도서열람권 조회 및 업데이트
		System.out.println("열람권 조회용 cart_code : " + cart_code);
		cartService.canReadBook(user_code, cart_code);
		System.out.println("열람권 조회용 cart_code : " + user_code);
		String readBook = cartService.selectReadBook(user_code);
		System.out.println("책 권한 조회 "+ readBook);
		// 세션에 업데이트된 권한 넘기기
		session.setAttribute("user_leadbook", readBook);
		System.out.println("세션  권한 조회 "+ session.getAttribute("user_leadbook"));
		
		// 재고 감소
		
	    cartService.selectQuantitiy(cart_code);
	    
		String order_code = cartService.selectOrderCode(cart_code);
		System.out.println("컨트롤러 오더코드1: "+order_code);
		int totalPrice = cartService.getTotalPrice(order_code);
		System.out.println("컨트롤러 토탈가격1: "+totalPrice);
		
		// 포인트 업데이트
		PointVO pointLog = new PointVO();
		if(point_change != 0) {
			int minus_point = point_change * -1;
			System.out.println("포인트차감 : " + minus_point);
			pointLog.setUser_code(user_code);
			pointLog.setOrder_code(order_code);
			pointLog.setPoint_change(minus_point);
			pointService.insertPointLog(pointLog);
			System.out.println("test3");
		}
		// 포인트 증가
		int pointChange = (int) (totalPrice * 0.05);
		System.out.println("주문넣기 컨트롤러 오더코드: " + order_code);
		System.out.println("총 가격: " + totalPrice);
		System.out.println("포인트 적립: " + pointChange);
		 
		pointLog.setUser_code(user_code);
		pointLog.setOrder_code(order_code);
		pointLog.setPoint_change(pointChange);
		System.out.println("포인트적립VO(pointLog):" + pointLog);
		
		// 포인트 로그 입력
		int result = pointService.insertPointLog(pointLog);
		if (result == 1) {
			int newSumPoint = pointService.selectTotalPoint(user_code);
			// 유저 포인트 업데이트
			pointService.updateUserPoint(user_code);
			// 세션 포인트 업데이트
			loginInfo.setUser_point(newSumPoint);
			session.setAttribute("loginInfo", loginInfo);
			System.out.println("loginInfo_point:" + loginInfo.getUser_point());
		} else {
			System.out.println("포인트적립실패");
		}
		
		//* 추가  S*//
		// 장바구니 수량 업데이트
		int cartSize = cartService.getCurrentCartSize(user_code);
		session.setAttribute("cartSize", cartSize);
		//* 추가  E* //
		return "redirect:/selectReceipt.do?order_code=" + order_code;
	}
	
	
	// 바로구매 
	@PostMapping("/submitOrderDirect")
	public String submitOrderDirect(CartVO cart, HttpSession session,OrdersVO orders,int total_price, int point_change) {
		System.out.println("ordersVO:" + orders);
		System.out.println("point_change:" + point_change);
		
		String user_code = orders.getUser_code();
		String cart_code = cartService.selectMaxCartCode(user_code);
		System.out.println("처음 cart_code 확인 : "+cart_code);
		// 카트코드 부여
		int isOrders = cartService.selectOrders(cart_code);
		// 해당 카트코드의 결제내역이 있는 경우
		if (isOrders > 0) {
			cart.setCart_code(null);
		} 
		// 해당 카트코드로 결제 진행하면 되는 경우
		else {
			// 기존 장바구니 목록들 뒤로 미루기
			cartService.updateCartcode(cart_code);
			// 카트코드 뺏어서 사용
			cart.setCart_code(cart_code);
			System.out.println("카트코드 훔치기 성공");
		}
	    System.out.println("cart_code: " + cart_code);
		
		
		// 카트에 바로 넣기
		int result = cartService.directInsertCart(cart);
		if (result >= 1) {
			System.out.println("바로 장바구니 담기 성공");
			System.out.println("장바구니 이후 cartVO:" + cart);
			// 주문 바로 넣기
			orders.setCart_code(cart_code);
			orders.setTotal_price(total_price);
			orders.setUser_code(user_code);
			int messege =cartService.directInsertOrders(orders);
			
			// 도서열람권 조회 및 업데이트
			System.out.println("열람권 조회용 cart_code : " + cart_code);
			cartService.canReadBook(user_code, cart_code);
			System.out.println("열람권 조회용 cart_code : " + user_code);
			String readBook = cartService.selectReadBook(user_code);
			System.out.println("책 권한 조회 "+ readBook);
			// 세션에 업데이트된 권한 넘기기
			session.setAttribute("user_leadbook", readBook);
			System.out.println("세션  권한 조회 "+ session.getAttribute("user_leadbook"));
			
			if (messege >= 1) {
				System.out.println("바로 주문 성공");
				System.out.println("결제 이후 OrdersVO:" + orders);
				// 재고 업데이트
				cartService.updateQuantity(cart_code);
				System.out.println("test1");
				cart_code = orders.getCart_code();
				String order_code = cartService.selectOrderCode(cart_code);
				System.out.println("test2");
				PointVO pointLog = new PointVO();
				if(point_change != 0) {
					int minus_point = point_change * -1;
					System.out.println("포인트차감 : " + minus_point);
					pointLog.setUser_code(user_code);
					pointLog.setOrder_code(order_code);
					pointLog.setPoint_change(minus_point);
					pointService.insertPointLog(pointLog);
					System.out.println("test3");
				}
				
				
				// 포인트 적립
				int pointChange = (int) (total_price * 0.05);
				pointLog.setUser_code(user_code);
				pointLog.setOrder_code(order_code);
				pointLog.setPoint_change(pointChange);
				System.out.println("바로구매 포인트적립VO :" + pointLog);
				
				// 포인트 로그 입력
				int pointResult = pointService.insertPointLog(pointLog);
				if (pointResult == 1) {
					int newSumPoint = pointService.selectTotalPoint(user_code);
					// 유저 포인트 업데이트
					pointService.updateUserPoint(user_code);
					// 세션 포인트 업데이트
					MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
					loginInfo.setUser_point(newSumPoint);
					session.setAttribute("loginInfo", loginInfo);
					System.out.println("loginInfo_point:" + loginInfo.getUser_point());
				}
				System.out.println("바로 주문 포인트적립까지 완료!");
				
			} else {
				System.out.println("바로 주문 실패");
			}
		} else {
			System.out.println("바로 장바구니 담기 실패");
		}
		String order_code = cartService.selectOrderCode(cart_code);
		return "redirect:/selectReceipt.do?order_code=" + order_code;
	}
	
	// 영수증 화면
	@RequestMapping("selectReceipt.do")
	public String selectReceipt(Model model, String order_code,String user_code, ReceiptVO receipt,HttpSession session) {
		System.out.println("영수증 컨트롤러");
		System.out.println("주문번호 : "+order_code);
		// 영수증 뽑기 (메뉴정보)
	    List<ReceiptVO> receiptList = cartService.selectReceiptOrder(order_code);
	    // 영수증 뽑기 (결제정보)
	    ReceiptVO receiptInfo = cartService.selectReceiptInfo(order_code);
	    // 영수증 뽑기 (포인트)
	    ReceiptVO receiptPoint = cartService.selectReceiptPoint(order_code);
	    
	    // 조회 결과를 모델에 담아서 화면에 전달
	    model.addAttribute("receiptList", receiptList);
	    model.addAttribute("receiptInfo", receiptInfo);
	    model.addAttribute("receiptPoint", receiptPoint);
	    
		return "/receipt/receipt";
	}
	
	
	
}