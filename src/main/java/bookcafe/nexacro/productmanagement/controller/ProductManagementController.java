package bookcafe.nexacro.productmanagement.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

@Controller
public class ProductManagementController {
	
	
	
	@RequestMapping("product.do")
	public NexacroResult product(@ParamDataSet(name="PM")Map<String,String>PM ) {
		System.out.println(PM);
		NexacroResult ss = new NexacroResult();
		
		
		
		return ss;
	}

}
