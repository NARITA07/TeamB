package bookcafe.code.controller;

import java.util.Map;

import javax.ejb.SessionBean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.code.service.CodeService;

@Controller
public class CodeController {

	@Autowired
	CodeService codeservice;
	//대분류 코드 조회(카테고리)
	@RequestMapping("init_fir_code.do")
	public NexacroResult init_fir_code() {
		
		//넥사크로 변수 선언
		NexacroResult nex_fir_code = new NexacroResult();
		
		nex_fir_code.addDataSet("init_fir_code", codeservice.init_fir_code());
		return nex_fir_code;
		
	}
	
	//대분류 코드 조회(view)
	@RequestMapping("view_code.do")
	public NexacroResult view_code() {
		NexacroResult nex_view_code = new NexacroResult();
		
		nex_view_code.addDataSet("view_code", codeservice.view_code());

	
		return nex_view_code;
		
	}
	
	//대분류 코드 선택조회
		@RequestMapping("fir_category_select.do")
		public NexacroResult fir_category_select(@ParamDataSet(name="fir_category_select")Map<String, Object> fir_category_select) {
			NexacroResult nex_fir_category_select = new NexacroResult();
			
			nex_fir_category_select.addDataSet("fir_category_select", codeservice.fir_category_select(fir_category_select));
			return nex_fir_category_select;
		}
		
	//대분류 코드 선택 시 중분류 하위카테고리 조회
	@RequestMapping("select_sec_code.do")
	public NexacroResult select_sec_code(@ParamDataSet(name="fir_category_select")Map<String, Object> sec_category_select){
		System.out.println(sec_category_select);
		NexacroResult nex_sec_category_select = new NexacroResult();
		
		nex_sec_category_select.addDataSet("sec_code",codeservice.sec_category_select(sec_category_select));
		return nex_sec_category_select;
	}
	
	
	//중분류 코드 선택 시 선택에 맞춰 조회
	@RequestMapping("choice_sec_code.do")
	public NexacroResult choice_sec_code(@ParamDataSet(name="choice_sec_code")Map<String, Object> choice_sec_code){
		System.out.println(choice_sec_code);
		System.out.println("중분류 선택");
		NexacroResult nex_sec_category_select = new NexacroResult();
		
		nex_sec_category_select.addDataSet("view_code",codeservice.choice_sec_code(choice_sec_code));
			
		return nex_sec_category_select;
	
			
	}
}