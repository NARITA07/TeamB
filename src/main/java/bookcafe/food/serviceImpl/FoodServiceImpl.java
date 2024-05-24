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
	
	/*커피 리스트*/
	@Override
	public List<FoodVO> getCoffeesList(){
		return foodMapper.selectCoffeesList();
	}
	/*음식 리스트*/
	@Override
	public List<FoodVO> getFoodesssList(){
		return foodMapper.selectFoodessList();
	}
}
