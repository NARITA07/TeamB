package bookcafe.cart.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.cart.service.CartService;
import bookcafe.cart.service.CartVO;

@Service
public class CartServiceImpl implements CartService{
	@Autowired
	private CartMapper cartMapper;

	@Override
	public void insertCart(CartVO cart) {

        cartMapper.insertCart(cart);
	}
}
