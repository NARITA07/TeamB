package bookcafe.point.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import bookcafe.point.service.PointService;

@Controller
@RequestMapping("/point/")
public class PointController {

	@Autowired
	private PointService pointService;
	
}
