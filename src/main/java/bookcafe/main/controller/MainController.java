package bookcafe.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {
	@GetMapping (value ="/aaa") 
	public String main() { 
		System.out.println("tttt");
	    return "/member/login"; 
	}
	@GetMapping ("") 
	public String home() { 
		System.out.println("ttttaaa");
	    return "/member/login"; 
	}
}
