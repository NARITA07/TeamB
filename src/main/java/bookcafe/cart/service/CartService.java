package bookcafe.cart.service;

import java.util.List;


public interface CartService {

   public void insertCart(CartVO cart);

   public List<CartVO> selectCartList(String  user_code, String  cart_code);
   
   public CartVO selectCartCode(String user_code);

   public void deleteCart(CartVO cart);
   
   public int selectTotalPrice(String cart_code);

   public int insertOrder(OrdersVO order);
   
   public int selectOrder(String cart_code);



}