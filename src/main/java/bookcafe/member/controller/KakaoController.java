package bookcafe.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import bookcafe.member.service.KakaoService;

@Controller
public class KakaoController {
	
	@Autowired
	private KakaoService kakaoService;
	
	@GetMapping("/kakao")
	public @ResponseBody String kakaoCallback(String code) {
		String accessToken = kakaoService.getAccessToken(code);
		
		String memberInfo = kakaoService.getMemberInfo(accessToken);
		
		return memberInfo;
		
	}
}
