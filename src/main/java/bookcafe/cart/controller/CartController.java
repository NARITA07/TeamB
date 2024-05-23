package bookcafe.cart.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
}
