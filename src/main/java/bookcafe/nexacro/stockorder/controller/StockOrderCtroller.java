package bookcafe.nexacro.stockorder.controller;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
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

import bookcafe.nexacro.stockorder.service.StockOrderService;

@Controller
public class StockOrderCtroller {
	
	private Logger logger = LoggerFactory.getLogger(StockOrderCtroller.class);
	
	@Resource(name="txManager")
	PlatformTransactionManager transationManager;
	
	@Resource(name = "stockorderService")
    private StockOrderService soservice;
	
    // grid1 list 불러오기
    @RequestMapping(value = "/grid1MenuList.do")
    public NexacroResult grid1MenuList() {
    	
    	List<Map<String, Object>> dataList = soservice.grid1MenuList();
    	
    	NexacroResult result = new NexacroResult();
    	
    	result.addDataSet("stock_grid1", dataList);
    	
    	return result;
    } 
    
    // grid2 list 불러오기
    @RequestMapping(value = "/grid2OrderList.do")
    public NexacroResult grid2OrderList() {
    	List<Map<String, Object>> dataList = soservice.grid2OrderList();
    	
    	NexacroResult result = new NexacroResult();
    	result.addDataSet("stock_grid2", dataList);
    	return result;
    }     
    
    // 중분류 조회
    @RequestMapping(value = "/SOSecCombo.do")
    public NexacroResult SOSecCombo() {
    
    	List<Map<String, Object>> dataList = soservice.SOSecCombo();
    	
    	NexacroResult result = new NexacroResult();
    	
    	result.addDataSet("find_sec_combo", dataList);
    	return result;
    }
    
    // 소분류 조회
    @RequestMapping(value = "/SOThirCombo.do")
    public NexacroResult SOThirCombo() {
    
    	List<Map<String, Object>> dataList = soservice.SOThirCombo();
    	
    	NexacroResult result = new NexacroResult();
    	
    	result.addDataSet("find_thir_combo", dataList);
    	
    	return result;
    }
    
    // 중분류 선택 시 소분류 변화
    @RequestMapping(value = "/ChkThirCombo.do")
    public NexacroResult ChkThirCombo(@ParamDataSet(name = "find_thir_combo",required = false) Map<String,String> find_thir_combo){
    	
    	List<Map<String, Object>> dataList = soservice.ChkThirCombo(find_thir_combo);
    	
    	NexacroResult result = new NexacroResult();
    	
    	result.addDataSet("find_thir_combo", dataList);
    	return result;
    }
    
    //발주신청 버튼 누르면 발주신청서에 내용이 저장되도록
    @RequestMapping("/saveStockOrder.do")
    public NexacroResult saveStockOrder(@ParamDataSet(name = "stock_order", required = false) List<Map<String,String>> stock_order){
    	
    	NexacroResult result = new NexacroResult();	
    
        int service_result = soservice.saveStockOrder(stock_order);

        return result;
    }
    
    // 발주신청서 상태 업데이트
    @RequestMapping("/updateStockOrder.do")
    public NexacroResult updateStockOrder(@ParamDataSet(name = "stock_order_update", required = false) List<Map<String,String>> stock_order_update){
    	
    	NexacroResult result = new NexacroResult();	
    
        int service_result = soservice.updateStockOrder(stock_order_update);

        return result;
    }
    
    // 재고 업데이트
    @RequestMapping("/updateStockQuantity.do")
    public NexacroResult updateStockQuantity(@ParamDataSet(name = "stock_order_update", required = false) List<Map<String,String>> stock_order_update){
    	
    	System.out.println("뭐가들어왔나요?"+stock_order_update);
    	
    	NexacroResult result = new NexacroResult();	
    
        int service_result = soservice.updateStockQuantity(stock_order_update);

        return result;
    }
    
    // 조회하기 버튼 grid1
    @RequestMapping(value = "/ViewList.do")
    public NexacroResult ViewList(@ParamDataSet(name = "search_so_grid", required = false) Map<String,String> search_so_grid){
    	List<Map<String, Object>> dataList = soservice.ViewList(search_so_grid);
	    NexacroResult result = new NexacroResult();
	    result.addDataSet("stock_grid1", dataList);	
	    return result;
    	
    }
    
    // 조회하기 버튼 grid2
    @RequestMapping(value = "/ViewStockOrder.do")
    public NexacroResult ViewStockOrder(@ParamDataSet(name = "search_so_grid", required = false) Map<String,String> search_so_grid){
    	
    	List<Map<String, Object>> dataList = soservice.ViewStockOrder(search_so_grid);
    	
	    NexacroResult result = new NexacroResult();
	    result.addDataSet("stock_grid2", dataList);
	
	    return result;
    	
    }    
    
}

// 어떤 뷰로 갈지, 어떤 서비스로 갈지
