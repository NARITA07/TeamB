package bookcafe.food.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import bookcafe.food.service.FoodService;
import bookcafe.member.service.MemberVO;
import bookcafe.myPage.service.MyPageService;

@Controller
public class FoodController {
	@Resource(name="foodService")
	public FoodService foodService;
	@Autowired
	private MyPageService myPageService;
	
	/*커피,음식 리스트*/
	@RequestMapping("foodList.do")
	public String foodList(Model model,HttpSession session) {
		model.addAttribute("coffees", foodService.getCoffeesList());
		model.addAttribute("foodess", foodService.getFoodesssList());
		String userId = (String) session.getAttribute("sessionId");
		MemberVO loginInfo = myPageService.getUserVO(userId);
		session.setAttribute("loginInfo", loginInfo);
		return "/food/foodList";
	}
}
