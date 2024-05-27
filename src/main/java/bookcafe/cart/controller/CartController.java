package bookcafe.cart.controller;



import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;

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
        
        return "redirect:/foodList.do";
    }
	
	@RequestMapping("cartList.do")
	public String selectCartList(Model model, @RequestParam(name = "user_code")String user_code) {
		System.out.println("컨트롤러"+user_code);
		  List<CartVO> cartList= cartService.selectCartList(user_code);
		  
		  model.addAttribute("cartList",cartList);
		return "/cart/cartList";
	}
	
	@RequestMapping("deleteCart.do")
	public String deleteCart(
			@RequestParam(name = "cart_code")String cart_code,
			@RequestParam(name = "product_code")String product_code,
			@RequestParam(name = "user_code")String user_code) {
		System.out.println("컨트롤러"+cart_code);
		
		CartVO cart = new CartVO();
		cart.setUser_code(user_code);
		cart.setProduct_code(product_code);
		cart.setCart_code(cart_code);
		
		cartService.deleteCart(cart);
		return "redirect:/cartList.do";
	}
}
