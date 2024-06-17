package bookcafe.food.service;

import java.util.List;

public interface FoodService {
	
	// 음식 리스트
	public List<FoodVO> getFoodesssList();
	
	// 음식 카테고리
	public List<FoodVO> getFoodCategory();
}
