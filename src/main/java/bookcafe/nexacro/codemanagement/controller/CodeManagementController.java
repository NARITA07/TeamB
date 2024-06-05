package bookcafe.nexacro.codemanagement.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.codemanagement.service.CodeManagementService;

@Controller
public class CodeManagementController {

	@Autowired
	CodeManagementService codemservice;
	
	
	//대분류 코드 생성
	@RequestMapping("add_fir_code.do")
	public void add_fir_code(@ParamDataSet(name="fir_code_add",required = false)Map<String,Object>fir_code_add) {
		System.out.println(fir_code_add);
		codemservice.add_fir_code(fir_code_add);
		
		
	}
	
	
	
	
	

	@RequestMapping("C_init_fir_code.do")
	public NexacroResult init_fir_code() {
		System.out.println("코드관리 ");
		// 넥사크로 변수 선언
		NexacroResult nex_fir_code = new NexacroResult();

		nex_fir_code.addDataSet("init_fir_code", codemservice.init_fir_code());
		return nex_fir_code;

	}

	// 대분류 코드 선택 시 중분류 하위카테고리 조회
	@RequestMapping("C_select_sec_code.do")
	public NexacroResult select_sec_code(
			@ParamDataSet(name = "fir_category_select", required = false) Map<String, Object> sec_category_select) {
		System.out.println(sec_category_select);
		NexacroResult nex_sec_category_select = new NexacroResult();

		nex_sec_category_select.addDataSet("sec_code", codemservice.sec_category_select(sec_category_select));
		return nex_sec_category_select;
	}
	
	//대분류 코드 수정
		@RequestMapping("C_fir_code_chx.do")
		public void C_fir_code_chx(@ParamDataSet(name = "modi_date", required = false) Map<String, Object> modi_date) {
			System.out.println(modi_date);
				
			codemservice.C_fir_code_chx(modi_date);
			
		}
		
		//대분류 코드 삭제
		@RequestMapping("C_del_date.do")
		public void C_del_date(@ParamDataSet(name="del_date", required = false)List<Map<String,Object>>del_date){
			System.out.println(del_date);
			codemservice.del_date(del_date);
			
			
		}
		
		
}