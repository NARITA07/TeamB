package bookcafe.food.service;

import java.util.List;

public interface FoodService {
	/*커피 리스트*/
	List<FoodVO> getCoffeesList();
	/*음식 리스트*/
	List<FoodVO> getFoodesssList();
}
