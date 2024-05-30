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
    	List<Map<String, Object>> dataList = sales_service.selectSales(sales_con);
	    NexacroResult result = new NexacroResult();
	    result.addDataSet("sales_dtl", dataList);
	
	    return result;
    }
	
	// 도서 매출현황 조회
	@RequestMapping(value = "/selectBookSales.do")
    public NexacroResult selectBookSales(@ParamDataSet(name = "book_sales_con", required = false) Map<String,String> book_sales_con) {    	    	
		List<Map<String, Object>> dataList = sales_service.selectBookSales(book_sales_con);
	    NexacroResult result = new NexacroResult();
	    result.addDataSet("book_sales_dtl", dataList);
	    return result;
    }
	
}
