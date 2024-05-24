package bookcafe.nexacro.mebership.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.mebership.service.OrderHistoryStatusService;

@Controller
public class OrderHistoryStatusCtroller {
	  private Logger logger = LoggerFactory.getLogger(OrderHistoryStatusCtroller.class);
	  
		@Resource(name="txManager")
		PlatformTransactionManager transationManager;
		
	    @Resource(name = "orderhistoryService")
	    private OrderHistoryStatusService hoservice;
	    
	    
	    // food_combo 조회
	    @RequestMapping(value = "/MenuCombo.do")
	    public NexacroResult MenuCombo() {
	    	List<Map<String, Object>> dataList = hoservice.MenuCombo();
	    	NexacroResult result = new NexacroResult();
	    	result.addDataSet("food_combo", dataList);
	    	return result;
	    }
	    
	    // 조회하기 버튼
	    @RequestMapping(value = "/ViewList.do")
	    public NexacroResult ViewList(@ParamDataSet(name = "search_combo", required = false) Map<String,String> search_combo){
	    	
	    	System.out.println("조회하기버튼 클릭! : " + search_combo);
	    	
	    	List<Map<String, Object>> dataList = hoservice.ViewList(search_combo);
	    	
		    NexacroResult result = new NexacroResult();
		    result.addDataSet("result_grid", dataList);
		    
		    System.out.println("기간이 선택 됐나요? : "+ dataList);
		
		    return result;
	    	
	    }
	    
	    


}
