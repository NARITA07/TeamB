package bookcafe.food.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
	
	// 일반 회원과 네이버 로그인 사용자를 구분하는 메서드 추가
    private boolean isNaverUser(String sessionId) {
        return sessionId != null && sessionId.length() > 10;
    }
	
	// 커피,음식 리스트
	@RequestMapping("foodList.do")
	public String foodList(Model model, HttpSession session) {
		// 사용자 정보 업데이트
		String sessionId = (String) session.getAttribute("sessionId");
		MemberVO loginInfo = (MemberVO) memberService.getUserInfo(sessionId);
		session.setAttribute("loginInfo", loginInfo);
		    
		if(sessionId != null) {
			if (isNaverUser(sessionId)) {
			    loginInfo = memberService.getUserInfoBySnsId(sessionId);
			} else {
			    loginInfo = memberService.getUserInfo(sessionId);
			}
			session.setAttribute("loginInfo", loginInfo);
		}
		
		List<FoodVO> foodList = foodService.getFoodesssList();
		List<FoodVO> food_Category = foodService.getFoodCategory();
		
		model.addAttribute("foodess", foodList);
		model.addAttribute("category", food_Category);
		
		return "/food/foodList";
	}
	
	// Food 테이블 조회(재고체크용)
	@RequestMapping(value = "/checkFood.do", produces = "text/html; charset=UTF-8")
	@ResponseBody
	public ResponseEntity<String> checkFood(@RequestParam("product_code") String product_code,
						 @RequestParam("order_quantity") int order_quantity) {
		System.out.println("product_code: " + product_code + ", order_quantity: " + order_quantity);
		
		FoodVO productInfo = (FoodVO) foodService.checkQuantity(product_code);
		
		if (productInfo == null) {
	        // productInfo가 null인 경우 예외 처리
	        System.out.println("productInfo가 null입니다.");
	        return ResponseEntity.ok("제품 정보를 찾을 수 없습니다.");
	    }
		System.out.println("productInfo: " + productInfo.toString());
		
		String product_name = productInfo.getProduct_name();
		int availableQuantity = productInfo.getProduct_quantity();
		
		if (availableQuantity != 0 && availableQuantity >= order_quantity) {
            // 충분한 재고가 있는 경우
            return ResponseEntity.ok("success");
        } else if (availableQuantity == 0) {
        	// 재고가 0인 경우
        	return ResponseEntity.ok(product_name + "의 재고가 부족합니다.");
        } else {
            // 재고 부족한 경우
            return ResponseEntity.ok(product_name + "의 주문가능 수량은 " + availableQuantity + "개 입니다.");
        }
	}
	
}
