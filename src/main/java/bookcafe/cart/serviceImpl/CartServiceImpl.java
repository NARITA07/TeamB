package bookcafe.cart.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;
import bookcafe.cart.service.OrdersVO;

@Service
public class CartServiceImpl implements CartService{
	
	@Autowired
	private CartMapper cartMapper;
	
	@Transactional
	@Override
	public int insertCart(CartVO cart) {
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
	
//	@Transactional
//	@Override
//	public void addPoint(PointLogVO  pointLog) {
//		cartMapper.addPoint(pointLog);
//	}
	
	@Override
	public int getTotalPrice(String order_code) {
		System.out.println("서비스임플"+order_code);
		Integer getTotalPrice = cartMapper.getTotalPrice(order_code);
        return getTotalPrice != null ? getTotalPrice : 0;
	}
	
	@Override
	public String selectOrderCode(String cart_code) {
		return cartMapper.selectOrderCode(cart_code);
	}
	
//	@Override
//	public void updateUserPoint(String user_code) {
//		cartMapper.updateUserPoint(user_code);
//	}

	@Transactional
	@Override
	public int directInsertCart(CartVO cart) {
		return cartMapper.directInsertCart(cart);
	}

	@Transactional
	@Override
	public int directInsertOrders(OrdersVO orders) {
		return cartMapper.directInsertOrders(orders);
	}

	@Transactional
	@Override
	public int updateCartcode(String cart_code) {
		int result = cartMapper.updateCartcode(cart_code);
		System.out.println("updateCartcode :" + result);
		int seq = cartMapper.updateSeq();
		System.out.println("updateSeq:" + seq);
		return result;
	}


	
}