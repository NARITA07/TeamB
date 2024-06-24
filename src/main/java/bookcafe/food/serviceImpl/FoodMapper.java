package bookcafe.food.serviceImpl;

import java.util.List;


import bookcafe.food.service.FoodVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("foodMapper")
public interface FoodMapper {
	
	// 음식 리스트
	public List<FoodVO> selectFoodessList();
	
	// 음식 카테고리
	public List<FoodVO> getFoodCategory();
	
	// 재고수량조회
	public FoodVO checkQuantity(String product_code);
}
