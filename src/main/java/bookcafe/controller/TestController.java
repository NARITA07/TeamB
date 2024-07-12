package bookcafe.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.NexacroException;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.service.TestService;

@Controller
public class TestController {
	@Autowired
	private TestService service;
	
	@RequestMapping(value = "selectCommonCode.do")
	public NexacroResult selectCommonCode(@ParamDataSet(name="ds_sc", required = false) Map<String,Object> ds_sc) {
		System.out.println("ds_sc");
		NexacroResult result = new NexacroResult();
		ArrayList<Map<String,Object>> ds_combo = new ArrayList<Map<String,Object>>();
		
		ds_combo = service.selectCommonCode(ds_sc);
		
		result.addDataSet("ds_combo",ds_combo);
		System.out.println(result.getDataSets());
		return result;
	}
	
	@RequestMapping(value = "selectOrdList.do")
	public NexacroResult selectOrdList(@ParamDataSet(name="ds_scList", required = false) Map<String,Object> ds_scList) {
		System.out.println(ds_scList);
		NexacroResult result = new NexacroResult();
		ArrayList<Map<String,Object>> ds_list = new ArrayList<Map<String,Object>>();
		
		ds_list = service.selectOrdList(ds_scList);
		result.addDataSet("ds_list",ds_list);
		
		return result;
	}
}
