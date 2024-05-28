package bookcafe.cart.serviceImpl;

import java.util.List;

import bookcafe.cart.service.CartVO;
import bookcafe.orders.service.OrdersVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("cartMapper")
public interface CartMapper {

	public void insertCart(CartVO cart);

	public List<CartVO> selectCartList(String  user_code);
	
	String selectCartCode(String user_code);

	public void deleteCart(CartVO cart);

	public List<OrdersVO> selectOrders(CartVO cart);

	public void insertCartWithExistingCode(CartVO cart);

	public void insertCartWithFnCode(CartVO cart);

	public int selectTotalPrice(String cart_code);

	public int insertOrder(bookcafe.cart.service.OrdersVO order);




}
