package bookcafe.nexacro.sales.controller;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.sales.service.SalesService;

@Controller
public class SalesController {
	
	@Resource(name="txManager")
	PlatformTransactionManager transactionManager;
	
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
	
	// 도서 이력 조회
	@RequestMapping(value = "/selectBookSales.do")
    public NexacroResult selectBookSales(@ParamDataSet(name = "sales_con", required = false) Map<String,String> sales_con) { 
		System.out.println("=====도서"+sales_con);
		List<Map<String, Object>> dataList = sales_service.selectBookSales(sales_con);
	    NexacroResult result = new NexacroResult();
	    result.addDataSet("book_sales_dtl", dataList);
	    return result;
    }
	
	// 대여중인 도서 조회
		@RequestMapping(value = "/selectBookList.do")
	    public NexacroResult selectBookList(@ParamDataSet(name = "sales_con", required = false) Map<String,String> sales_con) { 
			System.out.println("=====대여중");
			List<Map<String, Object>> dataList = sales_service.selectBookList(sales_con);
		    NexacroResult result = new NexacroResult();
		    result.addDataSet("book_sales_dtl", dataList);
		    return result;
	    }
	
	//중분류 조건 조회
	@RequestMapping(value = "/selectSalesCombo.do")
    public NexacroResult selectSalesCombo(@ParamDataSet(name = "combo_dtl", required = false) Map<String,String> combo_dtl) {    
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
		
	//반납 update
	@RequestMapping(value = "/updateSelected.do")
	public NexacroResult updateSelected(@ParamDataSet(name = "book_sales_dtl", required = false) List<Map<String, String>> book_sales_dtl) throws IOException, InvocationTargetException, SQLException {
	    DefaultTransactionDefinition transDef = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED); 
	    transDef.setReadOnly(false);
	    transDef.setIsolationLevel(TransactionDefinition.ISOLATION_READ_COMMITTED);
	    TransactionStatus txStatus = transactionManager.getTransaction(transDef);
	    
	    NexacroResult result = new NexacroResult();
	    
	    System.out.println("====반납 수정" + book_sales_dtl);
	    try {
	        if (book_sales_dtl != null) {
	            for (Map<String, String> param : book_sales_dtl) {
	                if ("Y".equals(param.get("CHK"))) {
	                    sales_service.updateSelected(param);
	                }
	            }
	        }
	        transactionManager.commit(txStatus);
	    } catch (Exception e) {
	        result.setErrorCode(-1);
	        result.setErrorMsg(e.getMessage());
	        transactionManager.rollback(txStatus);
	    }
	    
	    return result;
	}
		
	//insert 반납
	@RequestMapping(value = "/insertSelected.do")
	public NexacroResult insertSelected(@ParamDataSet(name = "book_sales_dtl", required = false) List<Map<String, String>> book_sales_dtl) throws IOException, InvocationTargetException, SQLException {
	    DefaultTransactionDefinition transDef = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED); 
	    transDef.setReadOnly(false);
	    transDef.setIsolationLevel(TransactionDefinition.ISOLATION_READ_COMMITTED);
	    TransactionStatus txStatus = transactionManager.getTransaction(transDef);
	    
	    NexacroResult result = new NexacroResult();
	    
	    System.out.println("====insert반납" + book_sales_dtl);
	    try {
	        if (book_sales_dtl != null) {
	            for (Map<String, String> param : book_sales_dtl) {
	                if ("Y".equals(param.get("CHK"))) {
	                    sales_service.insertSelected(param);
	                }
	            }
	        }
	        transactionManager.commit(txStatus);
	    } catch (Exception e) {
	        result.setErrorCode(-1);
	        result.setErrorMsg(e.getMessage());
	        transactionManager.rollback(txStatus);
	    }
	    
	    return result;
	}
		
	//반납테이블 DELETE
	@RequestMapping(value = "/deleteSelected.do")
	public NexacroResult deleteSelected(@ParamDataSet(name = "book_sales_dtl", required = false) List<Map<String, String>> book_sales_dtl) throws IOException, InvocationTargetException, SQLException {
	    DefaultTransactionDefinition transDef = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED); 
	    transDef.setReadOnly(false);
	    transDef.setIsolationLevel(TransactionDefinition.ISOLATION_READ_COMMITTED);
	    TransactionStatus txStatus = transactionManager.getTransaction(transDef);
	    
	    NexacroResult result = new NexacroResult();
	    
	    System.out.println("====반납 수정" + book_sales_dtl);
	    try {
	        if (book_sales_dtl != null) {
	            for (Map<String, String> param : book_sales_dtl) {
	                if ("Y".equals(param.get("CHK"))) {
	                    sales_service.deleteSelected(param);
	                }
	            }
	        }
	        transactionManager.commit(txStatus);
	    } catch (Exception e) {
	        result.setErrorCode(-1);
	        result.setErrorMsg(e.getMessage());
	        transactionManager.rollback(txStatus);
	    }
	    
	    return result;
	}
}
