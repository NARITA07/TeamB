package bookcafe.cart.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;
import bookcafe.cart.service.PointLogVO;

@Service
public class CartServiceImpl implements CartService{
	@Autowired
	private CartMapper cartMapper;

	@Override
    public void insertCart(CartVO cart) {
        //System.out.println("서비스임플 오더 카트 코드: " + orders.getCart_code());
       // System.out.println("서비스임플 카트 카트 코드: " + cart.getCart_code());
        
        // 조건에 따라 cart_code 설정
        //  OrdersVO에 cart_code가 없고, CartVO에 cart_code가 없다면 ~
		int count_order = selectOrder(cart.getCart_code());
        if ((cart.getCart_code() =="" || cart.getCart_code() != null) && count_order == 0) {
    		System.out.println("test");
        	cart.setCart_code(cart.getCart_code());
        } else{
    		System.out.println("test2");
        	cart.setCart_code("");  // 이 값이 ""일 때 fnCode('cart')를 사용
        }

        // CART 테이블에 제품 추가
        cartMapper.insertCart(cart);
    }

	@Override
	public List<CartVO> selectCartList(String  user_code,String  cart_code) {
		return cartMapper.selectCartList(user_code, cart_code);
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
	public void deleteCart(CartVO cart) {
		cartMapper.deleteCart(cart);
	}
	
	@Override
    public int selectTotalPrice(String cart_code) {
        return cartMapper.selectTotalPrice(cart_code);
    }

	@Override
	public int insertOrder(bookcafe.cart.service.OrdersVO order) {
		 order.setOrder_code(cartMapper.getLastInsertOrderCode(order.getUser_code()));
		 //order.setTotal_price(total_price);
		return cartMapper.insertOrder(order);
		
	}

	@Override
	public int selectOrder(String cart_code) {
		return cartMapper.selectOrders(cart_code);
	}

	@Override
	public void updateQuantity(String cart_code) {
		cartMapper.updateQuantity(cart_code);
	}

	@Override
	public void addPoint(PointLogVO  pointLog) {
		cartMapper.addPoint(pointLog);
	}

	@Override
	public int getTotalPrice(String order_code) {
		return cartMapper.getTotalPrice(order_code);
	}

	

}
