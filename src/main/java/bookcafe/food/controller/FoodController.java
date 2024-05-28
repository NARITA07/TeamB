package bookcafe.food.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import bookcafe.food.service.FoodService;

@Controller
public class FoodController {
	@Resource(name="foodService")
	public FoodService foodService;
	
	
	
	/*커피,음식 리스트*/
	@RequestMapping("foodList.do")
	public String foodList(Model model) {
		model.addAttribute("coffees", foodService.getCoffeesList());
		model.addAttribute("foodess", foodService.getFoodesssList());
		return "/food/foodList";
	}
}
