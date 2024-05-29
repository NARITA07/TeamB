package bookcafe.code.controller;

import static org.hamcrest.CoreMatchers.instanceOf;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.code.service.CodeService;

@Controller
public class CodeController {

	@Autowired
	CodeService codeservice;
	
	//대분류 코드
	@RequestMapping("fir_code.do")
	public NexacroResult f_code() {
		NexacroResult result = new NexacroResult();
			System.out.println("연결");
		List<Map<String, Object>> fir_codes = codeservice.fir_select();
			System.out.println(fir_codes);
		result.addDataSet("Fir_Code", fir_codes);
		
		
		return result;


	}
	
	//대분류 코드 생성
	@RequestMapping("fir_insert.do")
	public NexacroResult f_insert(@ParamDataSet(name = "Fir_insert")Map<String, String>Fir_insert) {
		NexacroResult result = new NexacroResult();
		
		int insert_result = codeservice.fir_insert(Fir_insert);
		result.addDataSet("Fir_Code", insert_result);
		
		
		return result;
}
	
	

	//중분류 코드
	@RequestMapping("sec_code.do")
	public NexacroResult s_code(@ParamDataSet(name="Fir_Code")Map<String,String> Fir_Code) {
		System.out.println("중분류" + Fir_Code);
		NexacroResult result = new NexacroResult();
			
		List<Map<String, Object>> ss = codeservice.sec_select(Fir_Code);
		
		System.out.println(ss);
		result.addDataSet("Sec_Code",ss);
		
		return result;

	}
	
	//중분류 코드 생성
	@RequestMapping("sec_insert.do")
	public NexacroResult s_insert(@ParamDataSet(name = "Sec_insert")Map<String, String>Sec_insert) {
		NexacroResult result = new NexacroResult();
		
		int insert_result = codeservice.sec_insert(Sec_insert);
		result.addDataSet("Sec_insert", insert_result);
		
		
		return result;
	
	}
	
}
