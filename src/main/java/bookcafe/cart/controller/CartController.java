package bookcafe.cart.controller;



import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;
import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.MyPageService;

@Controller
public class CartController {
	@Autowired
	private CartService cartService;
	@Autowired
	private MyPageService myPageService;
	
	@RequestMapping("insertCart.do")
    public String insertCart(
            @RequestParam("user_code") String user_code,
            @RequestParam("product_code") String product_code,
            @RequestParam("order_quantity") int order_quantity) {
        
		System.out.println("컨트롤러 사용자 코드"+user_code);
		System.out.println("컨트롤러 제품 코드"+product_code);
		System.out.println("컨트롤러 수량"+order_quantity);
		
		CartVO cart = new CartVO();
		cart.setUser_code(user_code);
		cart.setProduct_code(product_code);
		cart.setOrder_quantity(order_quantity);
		
        cartService.insertCart(cart);
        
        return "redirect:/foodList.do";
    }
	
	@RequestMapping("cartList.do")
	public String selectCartList(HttpSession session, Model model) {
		  
		  String userId = (String) session.getAttribute("sessionId"); 
		//  MemberVO loginInfo = myPageService.getUserVO(userId);
		//  session.setAttribute("loginInfo", loginInfo);
		  
		//  String user_code = loginInfo.getUser_code();
		//  List<CartVO> cartList= cartService.selectCartList(user_code);
		//  model.addAttribute("cartList",cartList);
		return "/cart/cartList";
	}
	@RequestMapping("deleteCart.do")
	public String deleteCart(@RequestParam(name = "cart_code")String cart_code) {
		System.out.println("컨트롤러"+cart_code);
		return "redirect:/cartList.do";
	}
}
