package bookcafe.cart.controller;



import java.text.SimpleDateFormat;
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
import org.springframework.web.bind.annotation.ResponseBody;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;
import bookcafe.cart.service.OrdersVO;
import bookcafe.member.service.MemberVO;

@Controller
public class CartController {
	@Autowired
	private CartService cartService;
	
	@RequestMapping("insertCart.do")
    public String insertCart(
            @RequestParam("user_code") String user_code,
            @RequestParam("product_code") String product_code,
            @RequestParam("order_quantity") int order_quantity) {
		
		CartVO cart = new CartVO();
		cart.setUser_code(user_code);
		cart.setProduct_code(product_code);
		cart.setOrder_quantity(order_quantity);
		System.out.println("컨트롤러"+user_code);
        cartService.insertCart(cart);
        
        // cart_code 하나 보내기
        
        return "redirect:/foodList.do";
    }
	
	@RequestMapping("cartList.do")
	public String selectCartList(Model model,HttpSession session) {
		
		MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
		String user_code = loginInfo.getUser_code();
		List<CartVO> cartList= cartService.selectCartList(user_code);
		String cart_code = cartService.selectCartCode(user_code);
		int total_price = cartService.selectTotalPrice(cart_code);
		
	  	System.out.println("컨트롤러"+user_code);
	  	System.out.println("컨트롤러"+cart_code);
	  	
	  	model.addAttribute("cartList",cartList);
	  	model.addAttribute("cart_code", cart_code);
	  	model.addAttribute("total_price", total_price);
		return "/cart/cartList";
	}
	
	@RequestMapping("deleteCart.do")
	public String deleteCart(
			@RequestParam(name = "cart_code")String cart_code,
			@RequestParam(name = "product_code")String product_code,
			@RequestParam(name = "user_code")String user_code,
			@RequestParam(name = "order_quantity")int order_quantity) {
		System.out.println("삭제컨트롤러"+user_code);
		
		CartVO cart = new CartVO();
		cart.setUser_code(user_code);
		cart.setProduct_code(product_code);
		cart.setCart_code(cart_code);
		cart.setOrder_quantity(order_quantity);
		
		cartService.deleteCart(cart);
		return "redirect:/cartList.do";
	}
	
	
	@PostMapping("/submitOrder")
    @ResponseBody
    public String submitOrder(@ModelAttribute OrdersVO order) {
		order.setPayment_date(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
		System.out.println("결제 컨틀롤러"+order.getCart_code());
		System.out.println("결제VO: "+order.toString());
		int result = cartService.insertOrder(order);
		String returnPage="";
		
		if (result == 1) {
			returnPage = "redirect:/index";
		} else {
			returnPage = "redirect:/cartList.do";
		}
		return returnPage;
    }
}
