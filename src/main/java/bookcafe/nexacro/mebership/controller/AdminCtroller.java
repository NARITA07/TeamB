package bookcafe.nexacro.mebership.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.mebership.service.AdminService;

@Controller
public class AdminCtroller {

	
	@Resource(name="txManager")
	PlatformTransactionManager transationManager;
	
	@Autowired
	AdminService nex_service;
	
	//회원가입(관리자)
	@RequestMapping(value = "/membership.do")
    public NexacroResult Admin_membership(@ParamDataSet(name = "Membership", required = false) Map<String,String> Membership) {   
		NexacroResult result = new NexacroResult(); // 넥사크로타입의 변수 result를 선언 
	    Map<String, Object> addform = new HashMap<>(); // Map타입의 변수 addform를 선언
	    
		try {
		
		int data = nex_service.insert_admin(Membership); //회원가입이 성공했으면 1 실패했으면 0을 반환
		
		addform.put("result", data); // 1을 초기화
		
	}	catch (Exception n) {// 무슨 이유가 생겨서 예외발생
		
        addform.put("error", "0");// 0을 초기화
    }
	    
	    result.addDataSet("log", addform); // result의 dataset에 "log"의 오브젝트를 만들고 선언된 값은 key : value의 형태로 초기화
	    
	    return result; // 값을 반환
    }
	
	//로그인(관리자)
	@RequestMapping("admin_login.do")
	public NexacroResult Admin_Login(@ParamDataSet(name = "Admin_Login", required = false) Map<String,String> Admin_Login) { 
		NexacroResult result = new NexacroResult(); // 넥사크로타입의 변수 result를 선언
		try {
			
			Map<String, String> data = nex_service.select_admin(Admin_Login); //로그인
			result.addDataSet("Result_Data", data); 
		}catch(Exception e) {//예외처리
	
		}
		
		
		
		return result;
	}
	
}
