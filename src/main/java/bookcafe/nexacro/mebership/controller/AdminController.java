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
public class AdminController {

	
	@Resource(name="txManager")
	PlatformTransactionManager transationManager;
	
	@Autowired
	AdminService nex_service;
	
	//로그인(관리자)
	@RequestMapping("admin_login.do")
	public NexacroResult Admin_Login(@ParamDataSet(name = "Admin_Login", required = false) Map<String,String> Admin_Login) { 
		NexacroResult result = new NexacroResult(); // 넥사크로타입의 변수 result를 선언
			
			Map<String, String> data = nex_service.select_admin(Admin_Login); //로그인
			result.addDataSet("Result_Data", data); 
		
		
		return result;
	}
	
}
