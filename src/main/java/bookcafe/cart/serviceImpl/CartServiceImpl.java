package bookcafe.cart.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;
import bookcafe.cart.service.PointLogVO;

@Service
public class CartServiceImpl implements CartService{
	
	@Autowired
	private CartMapper cartMapper;
	
	@Transactional
	@Override
	public int insertCart(CartVO cart) {
		String cart_code = cart.getCart_code();
		int count_order = cartMapper.selectOrders(cart_code);
		System.out.println("count_order: " + count_order);
		
		// 조건에 따라 cart_code 설정
		// 주문이력이 있는 경우
		if ((cart_code != "" || cart_code != null) && count_order == 0) {
			System.out.println("카트코드있음");
			cart.setCart_code(cart_code);
		} 
		// 첫주문인 경우
		else {
			System.out.println("카트코드없음");
			cart.setCart_code("");  // 이 값이 ""일 때 fnCode('cart')를 사용
		}
		
		// CART 테이블에 제품 추가
	    return cartMapper.insertCart(cart);
	}
	
	@Override
	public List<CartVO> selectCartList(CartVO cartListVO) {
		List<CartVO> cartList = cartMapper.selectCartList(cartListVO);
		return cartList;
	}
	   
	@Override
	public String selectMaxCartCode(String user_code) {
		String cart_code;
		cart_code = cartMapper.selectMaxCartCode(user_code);
		return cart_code;
	}
	
	@Transactional
	@Override
	public void deleteCart(CartVO cart) {
		cartMapper.deleteCart(cart);
	}
	   
	@Override
	public int selectTotalPrice(String cart_code) {
		Integer totalPrice = cartMapper.selectTotalPrice(cart_code);
        return totalPrice != null ? totalPrice : 0;
	}
	
	@Transactional
	@Override
	public int insertOrder(bookcafe.cart.service.OrdersVO order) {
		 order.setOrder_code(cartMapper.getLastInsertOrderCode(order.getUser_code()));
		 //order.setTotal_price(total_price);
		return cartMapper.insertOrder(order);
	}
	
	@Override
	public int selectOrders(String cart_code) {
		return cartMapper.selectOrders(cart_code);
	}
	
	@Transactional
	@Override
	public void updateQuantity(String cart_code) {
		cartMapper.updateQuantity(cart_code);
	}
	
	@Transactional
	@Override
	public void addPoint(PointLogVO  pointLog) {
		cartMapper.addPoint(pointLog);
	}
	
	@Override
	public int getTotalPrice(String order_code) {
		System.out.println("서비스임플"+order_code);
		return cartMapper.getTotalPrice(order_code);
	}
	
	@Override
	public String selectOrderCode(String cart_code) {
		return cartMapper.selectOrderCode(cart_code);
	}
	
	@Override
	public void updateUserPoint(String user_code) {
		cartMapper.updateUserPoint(user_code);
	}

	/*
	 * @Override public void minusPoint(int amountOfPayment, String user_code,
	 * String order_code) { cartMapper.minusPoint(amountOfPayment, user_code,
	 * order_code);
	 * 
	 * }
	 */
	
}