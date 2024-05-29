package bookcafe.point.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
	@RequestMapping("/pointList")
	public String pointList(HttpSession session, Model model) {
		String user_id = (String) session.getAttribute("sessionId");
		
		// 포인트 내역 조회
		List<PointVO> pointList = pointService.getPointList(user_id);
		System.out.println("pointList:" + pointList.toString());
		model.addAttribute("pointList", pointList);
		
		return "/myPage/pointList";
	}
	
}
