package bookcafe.cart.serviceImpl;

import java.util.List;

import bookcafe.cart.service.CartVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("cartMapper")
public interface CartMapper {

	public void insertCart(CartVO cart);

	public List<CartVO> selectCartList(String  user_code);


}
