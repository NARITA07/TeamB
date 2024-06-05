package bookcafe.nexacro.sales.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.sales.service.SalesService;

@Controller
public class SalesController {
	
	@Resource(name="txManager")
	PlatformTransactionManager transationManager;
	
	@Autowired
	SalesService sales_service;
	
	
	// 카페 매출현황 SELECT
	@RequestMapping(value = "/selectSales.do")
    public NexacroResult selectSales(@ParamDataSet(name = "sales_con", required = false) Map<String,String> sales_con) {    
    	System.out.println("=====카페"+sales_con);
		List<Map<String, Object>> dataList = sales_service.selectSales(sales_con);
	    NexacroResult result = new NexacroResult();
	    result.addDataSet("sales_dtl", dataList);
	
	    return result;
    }
	
	// 도서 매출현황 조회
	@RequestMapping(value = "/selectBookSales.do")
    public NexacroResult selectBookSales(@ParamDataSet(name = "sales_con", required = false) Map<String,String> sales_con) {    	    	
		System.out.println("=====도서");
		List<Map<String, Object>> dataList = sales_service.selectBookSales(sales_con);
	    NexacroResult result = new NexacroResult();
	    result.addDataSet("book_sales_dtl", dataList);
	    return result;
    }
	
	//대분류
	@RequestMapping(value = "/selectFirstCombo.do")
    public NexacroResult selectFirstCombo() {    
       List<Map<String, Object>> dataList = sales_service.selectFirstCombo();
       
       NexacroResult result = new NexacroResult();
       result.addDataSet("combo_con", dataList);
       return result;
    }
	
	//중분류 조회
	@RequestMapping(value = "/selectSecondCombo.do")
    public NexacroResult selectSecondCombo() {       
       List<Map<String, Object>> dataList = sales_service.selectSecondCombo();
       
       NexacroResult result = new NexacroResult();
       result.addDataSet("combo_dtl", dataList);
       return result;
    }
	
	//중분류 조건 조회
	@RequestMapping(value = "/selectSalesCombo.do")
    public NexacroResult selectSalesCombo(@ParamDataSet(name = "combo_dtl", required = false) Map<String,String> combo_dtl) {    
		System.out.println("중분류"+combo_dtl);
		List<Map<String, Object>> dataList = sales_service.selectSalesCombo(combo_dtl);
	    NexacroResult result = new NexacroResult();
	    result.addDataSet("combo_dtl", dataList);
	    return result;
    }
	
	// 카페 매출현황 차트 SELECT
		@RequestMapping(value = "/selectSalesChart.do")
	    public NexacroResult selectSalesChart(@ParamDataSet(name = "sales_con", required = false) Map<String,String> sales_con) {    
	    	System.out.println("=====카페 차트"+sales_con);
			List<Map<String, Object>> dataList = sales_service.selectSalesChart(sales_con);
		    NexacroResult result = new NexacroResult();
		    result.addDataSet("sales_chart_dtl", dataList);
		
		    return result;
	    }
}
