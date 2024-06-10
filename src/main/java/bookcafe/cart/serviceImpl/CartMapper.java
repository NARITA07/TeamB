package bookcafe.cart.serviceImpl;

import java.util.List;

import bookcafe.cart.service.CartVO;
import bookcafe.cart.service.OrdersVO;
import bookcafe.cart.service.PointLogVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("cartMapper")
public interface CartMapper {

	public int insertCart(CartVO cart);
	
	public List<CartVO> selectCartList(CartVO cartListVO);
	   
	public String selectMaxCartCode(String user_code);
	
	public void deleteCart(CartVO cart);
	
	public int selectOrders(String cart_code);
	
	public Integer selectTotalPrice(String cart_code);
	
	public int insertOrder(bookcafe.cart.service.OrdersVO order);
	
	public void updateQuantity(String cart_code);
	
//	public void addPoint(PointLogVO  pointLog);
	
	public String getLastInsertOrderCode(String user_code);
	
	public Integer getTotalPrice(String order_code);
	
	public String selectOrderCode(String cart_code);
	   
//	public void updateUserPoint(String user_code);

	public int directInsertCart(CartVO cart);

	public int directInsertOrders(OrdersVO orders);
	
	public int updateCartcode(String cart_code);
	
	public int updateSeq();
	
	
}
