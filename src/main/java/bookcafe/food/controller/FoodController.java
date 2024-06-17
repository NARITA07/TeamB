package bookcafe.food.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import bookcafe.food.service.FoodService;
import bookcafe.food.service.FoodVO;
import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;

@Controller
public class FoodController {
	@Resource(name="foodService")
	public FoodService foodService;
	
	@Resource(name = "memberService")
    private MemberService memberService;
	
	// 커피,음식 리스트
	@RequestMapping("foodList.do")
	public String foodList(Model model, HttpSession session) {
		// 사용자 정보 업데이트
		String sessionId = (String) session.getAttribute("sessionId");
		if (sessionId != null) {
			MemberVO loginInfo = (MemberVO) memberService.getUserInfo(sessionId);
            session.setAttribute("loginInfo", loginInfo);
		}
		
		List<FoodVO> foodList = foodService.getFoodesssList();
		List<FoodVO> food_Category = foodService.getFoodCategory();
		
		model.addAttribute("foodess", foodList);
		model.addAttribute("category", food_Category);
		
		return "/food/foodList";
	}
	
}
