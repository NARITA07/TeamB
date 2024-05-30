package bookcafe.cart.service;

import java.util.List;


public interface CartService {

	public void insertCart(CartVO cart);

	public List<CartVO> selectCartList(String  user_code);
	
	public String selectCartCode(String user_code);

	public void deleteCart(CartVO cart);
	
	public int selectTotalPrice(String cart_code);

	public int insertOrder(OrdersVO order);


}
