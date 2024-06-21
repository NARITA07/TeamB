package bookcafe.cart.service;

import java.util.List;


public interface CartService {

	public int insertCart(CartVO cart);
	
	public CartVO selectCartCode(String user_code);
	
	public List<CartVO> selectCartList(CartVO cartListVO);
	   
	public String selectMaxCartCode(String user_code);
	
	public void deleteCart(CartVO cart);
	   
	public int selectTotalPrice(String cart_code);
	
	public int insertOrder(OrdersVO order);
	   
	public int selectOrders(String cart_code);

	public void updateQuantity(String cart_code);
	
//	public void addPoint(PointLogVO  pointLog);
	
	public int getTotalPrice(String order_code);
	
	public String selectOrderCode(String cart_code);
	
//	public void updateUserPoint(String user_code);

	public int directInsertCart(CartVO cart);

	public int directInsertOrders(OrdersVO orders);
	
	public int updateCartcode(String cart_code);

	public int updateQuantity1(String cart_code, String product_code, int order_quantity);

	public void minusQuantity(String cart_code, String product_code, int order_quantity);

	public void selectQuantitiy(String cart_code);

	public void canReadBook(String user_code, String cart_code);
	
	int getCurrentCartSize(String user_code);
	
	public CartVO selectCartItem(String user_code, String product_code, String cart_code);

	public void updateCartItem(CartVO cart);

	public List<ReceiptVO> selectReceiptOrder(String order_code);

	public ReceiptVO selectReceiptInfo(String order_code);

	public ReceiptVO selectReceiptPoint(String order_code);

	public String selectReadBook(String user_code);

	public OrdersVO selectOrdersInfo(String order_code);



}