package bookcafe.food.serviceImpl;

import java.util.List;


import bookcafe.food.service.FoodVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("foodMapper")
public interface FoodMapper {
	/*음식 리스트*/
	List<FoodVO> selectFoodessList();
}
