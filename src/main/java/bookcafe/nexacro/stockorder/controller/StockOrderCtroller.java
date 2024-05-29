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
	
	
	// 재고관리
    // grid1 list 불러오기
    @RequestMapping(value = "/grid1MenuList.do")
    public NexacroResult grid1MenuList() {
    	
    	System.out.println("grid1 메뉴리스트 조회 요청이 들어왔습니다.");
    	
    	List<Map<String, Object>> dataList = soservice.grid1MenuList();
    	NexacroResult result = new NexacroResult();
    	result.addDataSet("stock_grid1", dataList);
    	
    	System.out.println("전송되는 데이터 : " + dataList);
    	return result;
    } 
    
    //발주신청 버튼 누르면 발주신청서에 내용이 저장되도록
    @RequestMapping("/saveStockOrder.do")
    public NexacroResult saveStockOrder(@ParamDataSet(name = "stock_order", required = false) List<Map<String,String>> stock_order){
    	
    	System.out.println("뭐가들어왔나요?"+stock_order);
    	
    	NexacroResult result = new NexacroResult();	
    
        List<Map<String,Object>> dataList = soservice.saveStockOrder(stock_order);
	    result.addDataSet("result_stock_order",dataList);
        return result;
    }
    
}
