package bookcafe.cart.service;

import java.util.List;


public interface CartService {

	public void insertCart(CartVO cart);

	public List<CartVO> selectCartList(String  user_code);

}
