package bookcafe.nexacro.mebership.controller;

import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.mebership.service.MemberManagermentService;

@Controller
public class MemberManagermentCtroller {
	
	//@ParamVariable(name="member", required = false) String member 변수 이용 시 사용
	
	@Autowired
	MemberManagermentService mms;
	
	//회원관리
	@RequestMapping("membermanagement.do")
	public NexacroResult Admin_membership() {   
		NexacroResult result = new NexacroResult(); // 넥사크로타입의 변수 result를 선언 
		
		List<Map<String, Object>> member =  mms.select_member();
			
		result.addDataSet("Member_Management", member);
		
		return result;
		
	}
	
	//회원 조회
	@RequestMapping("upload.do")
	public NexacroResult Non_member(HttpServletRequest request, HttpServletResponse response) { 
		System.out.println(request instanceof MultipartHttpServletRequest);
		NexacroResult result = new NexacroResult(); // 넥사크로타입의 변수 result를 선언 

	
        return result;
		
	}
}