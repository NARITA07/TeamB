package bookcafe.point.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import bookcafe.member.service.MemberVO;
import bookcafe.point.service.PointService;
import bookcafe.point.service.PointVO;

@Controller
@RequestMapping("/point/*")
public class PointController {

	@Autowired
	private PointService pointService;
	
	// 포인트페이지
	@GetMapping("/pointList")
	public void pointList(HttpSession session, Model model) {
		
		MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
		String user_id = loginInfo.getUser_id();
		
		// 포인트 내역 조회
		List<PointVO> pointList = pointService.getPointList(user_id);
		
		model.addAttribute("pointList", pointList);
	}
	
}
