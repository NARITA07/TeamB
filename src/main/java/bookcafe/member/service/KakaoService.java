package bookcafe.member.service;


import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

@Service
public class KakaoService {
	public String getAccessToken(String code) {
		HttpHeaders header = new HttpHeaders();
		header.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		
		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
		body.add("grant_type", "authorization_code");
		body.add("client_id", "71bd349e9c720af296b576faee206eaf");
		body.add("redirect_uri", "http://localhost:8082/kakao");
		body.add("code", code);
		
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, header);
		
		RestTemplate restTemplate = new RestTemplate();
		
		ResponseEntity<String> responseEntity = restTemplate.exchange(
				"https://kauth.kakao.com/oauth/token",
				HttpMethod.POST,
				requestEntity,
				String.class);
		
		String jsonData = responseEntity.getBody();
		
		Gson gsonObj = new Gson();
		Map<?,?> data = gsonObj.fromJson(jsonData, Map.class);
		
		return (String) data.get("access_token");
		
	}
	
	public String getMemberInfo(String access_token) {
		HttpHeaders header = new HttpHeaders();
		header.add("Authorization", "Bearer " + access_token);
		header.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(header);
		
		RestTemplate restTemplate = new RestTemplate();
		
		ResponseEntity<String> responseEntity = restTemplate.exchange(
				"https://kapi.kakao.com/v2/user/me",
				HttpMethod.POST,
				requestEntity,
				String.class);
		
		String jsonData = responseEntity.getBody();
		
		return responseEntity.getBody();
		
	}
}
