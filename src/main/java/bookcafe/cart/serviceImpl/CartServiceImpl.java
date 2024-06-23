package bookcafe.cart.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;
import bookcafe.cart.service.OrdersVO;
import bookcafe.cart.service.ReceiptVO;

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
   public CartVO selectCartCode(String user_code) {
	 
	CartVO cartvo;
	try {
		cartvo = cartMapper.selectCartCode(user_code);
	}
	catch(NullPointerException e) {
		cartvo = new CartVO();
		return cartvo;
	}
	return cartvo;
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

	@Override
	public int updateQuantity1(String cart_code, String product_code, int order_quantity) {
		return cartMapper.updateQuantity1(cart_code, product_code, order_quantity);
	}

	@Override
	public void minusQuantity(String cart_code, String product_code, int order_quantity) {
		cartMapper.minusQuantity(cart_code, product_code, order_quantity);
	}

	@Override
	public void selectQuantitiy(String cart_code) {
		List<Map<String,Object>> cartList = cartMapper.selectQuantitiy(cart_code);
		System.out.println(cartList);
		for(Map<String,Object> cart : cartList){
			cartMapper.updateQuantity2(cart);
		}
	}

	@Override
	public void canReadBook(String user_code, String cart_code) {
		cartMapper.canReadBook(user_code, cart_code);
	}
	
	@Override
    public int getCurrentCartSize(String user_code) {
        return cartMapper.getCurrentCartSize(user_code);
    }
	
	@Transactional
	@Override
	public CartVO selectCartItem(String user_code, String product_code, String cart_code) {
	    return cartMapper.selectCartItem(user_code, product_code, cart_code);
	}

	@Transactional
	@Override
	public void updateCartItem(CartVO cart) {
	    cartMapper.updateCartItem(cart);
	}

	@Override
	public List<ReceiptVO> selectReceiptOrder(String order_code) {
		return cartMapper.selectReceiptOrder(order_code);
	}

	@Override
	public ReceiptVO selectReceiptInfo(String order_code) {
		return cartMapper.selectReceiptInfo(order_code);
	}

	@Override
	public ReceiptVO selectReceiptPoint(String order_code) {
		return cartMapper.selectReceiptPoint(order_code);
	}

	@Override
	public String selectReadBook(String user_code) {
		System.out.println(user_code);
		return cartMapper.selectReadBook(user_code);
	}

	@Override
	public OrdersVO selectOrdersInfo(String order_code) {
		return cartMapper.selectOrdersInfo(order_code);
	}


	
}