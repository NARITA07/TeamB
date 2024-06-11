package bookcafe.nexacro.codemanagement.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.codemanagement.service.CodeManagementService;

@Controller
public class CodeManagementController {

	@Autowired
	CodeManagementService codemservice;
	
	//상위코드 그리드 조회
	@RequestMapping("fir_grid.do")
	public NexacroResult fir_grid () {
		NexacroResult result = new NexacroResult();
		
		result.addDataSet("fir_code_grid",codemservice.selectfirgrid());
		
		return result;
		
	}
	
	//하위코드 그리드 조회
	@RequestMapping("fir_category.do")
	public NexacroResult fir_category(@ParamVariable(name = "fir_category", required = false) String fir_category) {
		NexacroResult result = new NexacroResult();
		
		result.addDataSet("sec_code_grid",codemservice.selectsecgrid(fir_category));
		
		return result;
	
	}
	
	//저장
	@RequestMapping("grid_modi.do")
	public NexacroResult grid_modi(@ParamDataSet(name = "save", required = false)List<Map<String, Object>> save) {
		System.out.println(save);
		NexacroResult result = new NexacroResult();
		
		result.addVariable("message_count",codemservice.gridmodi(save));
		
		return result;
	
	}
		
	
		
}