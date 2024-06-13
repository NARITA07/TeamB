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
	
	//상위 코드 검색 조회
	@RequestMapping("fir_grid_search.do")
	public NexacroResult fir_grid_search(@ParamVariable(name = "search", required = false)String search) {
		System.out.println(search);
		NexacroResult result = new NexacroResult();

		result.addDataSet("fir_code_grid", codemservice.searchfirgrid(search));
		
		return result;
	}
	
	@RequestMapping("sec_grid_search.do")
	public NexacroResult sec_grid_search(@ParamVariable(name = "search2", required = false)String search2) {
		System.out.println(search2);
		NexacroResult result = new NexacroResult();

		result.addDataSet("sec_code_grid", codemservice.searchsecgrid(search2));
		
		return result;
	}
	

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


	//상위코드 최신값
	@RequestMapping("fir_code_new.do")
	public NexacroResult fir_code_new() {
		NexacroResult result = new NexacroResult();

		result.addVariable("fir_code_new", codemservice.fircodenew());

		return result;

	}

	//하위코드 최신값
	@RequestMapping("sec_code_new.do")
	public NexacroResult sec_code_new() {
		NexacroResult result = new NexacroResult();

		result.addVariable("sec_code_new", codemservice.seccodenew());

		return result;

	}
	
	//코드 삭제
		@RequestMapping("del_code.do")
		public NexacroResult del_code(@ParamDataSet(name = "save", required = false)List<Map<String, Object>> save) {
			System.out.println(save);
			NexacroResult result = new NexacroResult();

			result.addVariable("message_count", codemservice.codedel(save));

			return result;
		}

}