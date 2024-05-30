package bookcafe.nexacro.orderhistorystatus.controller;

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

import bookcafe.nexacro.orderhistorystatus.service.OrderHistoryStatusService;

@Controller
public class OrderHistoryStatusCtroller {
	  private Logger logger = LoggerFactory.getLogger(OrderHistoryStatusCtroller.class);
	  
		@Resource(name="txManager")
		PlatformTransactionManager transationManager;
		
	    @Resource(name = "orderhistoryService")
	    private OrderHistoryStatusService ohservice;
	    
	    
	    // 대분류 조회
	    @RequestMapping(value = "/OHFirCombo.do")
	    public NexacroResult OHFirCombo() {
	    	
	    	List<Map<String, Object>> dataList = ohservice.OHFirCombo();
	    	
	    	NexacroResult result = new NexacroResult();
	    	
	    	result.addDataSet("find_fir_combo", dataList);
	    	return result;
	    }
	    
	    // 중분류 조회
	    @RequestMapping(value = "/OHSecCombo.do")
	    public NexacroResult OHSecCombo() {
	    
	    	List<Map<String, Object>> dataList = ohservice.OHSecCombo();
	    	
	    	NexacroResult result = new NexacroResult();
	    	
	    	result.addDataSet("find_sec_combo", dataList);
	    	return result;
	    }
	    
	    // 소분류 조회
	    @RequestMapping(value = "/OHThirCombo.do")
	    public NexacroResult OHThirCombo() {
	    
	    	List<Map<String, Object>> dataList = ohservice.OHThirCombo();
	    	
	    	NexacroResult result = new NexacroResult();
	    	
	    	result.addDataSet("find_thir_combo", dataList);
	    	
	    	System.out.println("보내준다 : " + dataList);
	    	
	    	return result;
	    }
	    
	    
	    // 대분류 선택 시 중분류 변화
	    @RequestMapping(value = "/SelSecCombo.do")
	    public NexacroResult SelSecCombo(@ParamDataSet(name = "find_sec_combo",required = false) Map<String,String> find_sec_combo){
	    	
	    	System.out.println("분류코드 들어왔니?" + find_sec_combo);
	    	
	    	List<Map<String, Object>> dataList = ohservice.SelSecCombo(find_sec_combo);
	    	
	    	NexacroResult result = new NexacroResult();
	    	
	    	result.addDataSet("find_sec_combo", dataList);
	    	return result;
	    }
	    
	    // 중분류 선택 시 소분류 변화
	    @RequestMapping(value = "/SelThirCombo.do")
	    public NexacroResult SelThirCombo(@ParamDataSet(name = "find_thir_combo",required = false) Map<String,String> find_thir_combo){
	    	
	    	System.out.println("분류코드 들어왔니?" + find_thir_combo);
	    	
	    	List<Map<String, Object>> dataList = ohservice.SelThirCombo(find_thir_combo);
	    	
	    	NexacroResult result = new NexacroResult();
	    	
	    	result.addDataSet("find_thir_combo", dataList);
	    	return result;
	    }
	    
	    
	    // 조회하기 버튼
	    @RequestMapping(value = "/ViewList.do")
	    public NexacroResult ViewList(@ParamDataSet(name = "search_combo", required = false) Map<String,String> search_combo){
	    	
	    	System.out.println("조회하기버튼 클릭! : " + search_combo);
	    	
	    	List<Map<String, Object>> dataList = ohservice.ViewList(search_combo);
	    	
		    NexacroResult result = new NexacroResult();
		    result.addDataSet("result_grid", dataList);
		    
		    System.out.println("기간이 선택 됐나요? : "+ dataList);
		
		    return result;
	    	
	    }
	    
	    


}
