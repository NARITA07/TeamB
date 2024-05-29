package bookcafe.cart.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;
import bookcafe.orders.service.OrdersVO;

@Service
public class CartServiceImpl implements CartService{
	@Autowired
	private CartMapper cartMapper;

	@Override
	public void insertCart(CartVO cart) {
		 
		List<OrdersVO> orders = cartMapper.selectOrders(cart);
	    if (orders != null && !orders.isEmpty()) {
	        OrdersVO order = orders.get(0);
	        cart.setCart_code(order.getCart_code());
	    } else {
	    	 cart.setCart_code("");
	    }
	    cartMapper.insertCart(cart);
	}

	@Override
	public List<CartVO> selectCartList(String  user_code) {
		return cartMapper.selectCartList(user_code);
	}
	
	 @Override
	    public String selectCartCode(String user_code) {
	        return cartMapper.selectCartCode(user_code);
	    }

	@Override
	public void deleteCart(CartVO cart) {
		cartMapper.deleteCart(cart);
	}
	
	@Override
    public int selectTotalPrice(String cart_code) {
        return cartMapper.selectTotalPrice(cart_code);
    }

	@Override
	public int insertOrder(bookcafe.cart.service.OrdersVO order) {
		return cartMapper.insertOrder(order);
		
	}

	

}
