package bookcafe.cart.serviceImpl;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import bookcafe.cart.service.CartVO;
import bookcafe.cart.service.PointLogVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("cartMapper")
public interface CartMapper {

   public void insertCart(CartVO cart);

   public List<CartVO> selectCartList(@Param("user_code") String  user_code, @Param("cart_code") String  cart_code);
   
   public CartVO selectCartCode(@Param("user_code") String user_code);

   public void deleteCart(CartVO cart);

   public int selectOrders(String cart_code);

   public void insertCartWithExistingCode(CartVO cart);

   public void insertCartWithFnCode(CartVO cart);

   public int selectTotalPrice(String cart_code);

   public int insertOrder(bookcafe.cart.service.OrdersVO order);

	public void updateQuantity(String cart_code);

	public void addPoint(PointLogVO  pointLog);

	public String getLastInsertOrderCode(String user_code);

	public int getTotalPrice(String order_code);
	

}
