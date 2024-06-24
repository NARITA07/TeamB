package bookcafe.cart.serviceImpl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import bookcafe.cart.service.CartVO;
import bookcafe.cart.service.OrdersVO;
import bookcafe.cart.service.PointLogVO;
import bookcafe.cart.service.ReceiptVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("cartMapper")
public interface CartMapper {

	public int insertCart(CartVO cart);
	
	public List<CartVO> selectCartList(CartVO cartListVO);
	
	public CartVO selectCartCode(@Param("user_code") String user_code);
	   
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

	public int updateQuantity1(@Param("cart_code") String cart_code, 
            @Param("product_code") String product_code, 
            @Param("order_quantity") int order_quantity);

	public void minusQuantity(@Param("cart_code") String cart_code, 
            @Param("product_code") String product_code, 
            @Param("order_quantity") int order_quantity);

	
	public List<Map<String,Object>> selectQuantitiy(String cart_code);
	
	public int updateQuantity2(Map<String,Object> cart);

	public void canReadBook(@Param("user_code")String user_code,@Param("cart_code") String cart_code);
	
	int getCurrentCartSize(String user_code);
	
	public CartVO selectCartItem(@Param("user_code") String user_code, @Param("product_code") String product_code, @Param("cart_code") String cart_code);

	public void updateCartItem(CartVO cart);

	public List<ReceiptVO> selectReceiptOrder(String order_code);

	public ReceiptVO selectReceiptInfo(String order_code);

	public ReceiptVO selectReceiptPoint(String order_code);

	public String selectReadBook(@Param("user_code")String user_code);

	public OrdersVO selectOrdersInfo(String order_code);
	
	public Integer selectProductStock(String product_code);
	
	public int getAvailableQuantity(String product_code);

	public List<Map<String, Object>> selectQuantitiy1(String cart_code);

	
}
