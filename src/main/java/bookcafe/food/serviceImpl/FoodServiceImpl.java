package bookcafe.food.serviceImpl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bookcafe.food.service.FoodService;
import bookcafe.food.service.FoodVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("foodService")
public class FoodServiceImpl extends EgovAbstractServiceImpl implements FoodService{
	@Resource(name="foodMapper")
	FoodMapper foodMapper;
	
	// 음식 리스트
	@Override
	public List<FoodVO> getFoodesssList() {
		return foodMapper.selectFoodessList();
	}
	
	@Override
	public List<FoodVO> getFoodCategory() {
		return foodMapper.getFoodCategory();
	}
	
	// 재고수량 조회
	@Override
	public FoodVO checkQuantity(String product_code) {
		return foodMapper.checkQuantity(product_code);
	}
}
