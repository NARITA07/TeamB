package bookcafe.nexacro.sales.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.sales.service.SalesService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("SalesService")
public class SalesServiceImpl extends EgovAbstractServiceImpl implements SalesService{
	
	@Autowired
	SalesMapper Sales_mapper;
	
	//카페 조회
	@Override
	public List<Map<String, Object>> selectSales(Map<String, String> sales_con) {
		return Sales_mapper.selectSales(sales_con);
	}
	
	//도서 조회
	@Override
	public List<Map<String, Object>> selectBookSales(Map<String, String> sales_con) {
		return Sales_mapper.selectBookSales(sales_con);
	}
	//분류 콤보 조회
	@Override
	public List<Map<String, Object>> selectSalesCombo(Map<String, String> combo_con) {
		return Sales_mapper.selectSalesCombo(combo_con);
	}
	//차트 조회
	@Override
	public List<Map<String, Object>> selectSalesChart(Map<String, String> sales_con) {
		return Sales_mapper.selectSalesChart(sales_con);
	}
	//반납 처리
	@Override
	public void updateSelected(Map<String, String> book_sales_dtl) {
		Sales_mapper.updateSelected(book_sales_dtl);
	}
	//대여중인 도서 조회
	@Override
	public List<Map<String, Object>> selectBookList(Map<String, String> sales_con) {
		return Sales_mapper.selectBookList(sales_con);
	}

	//insert 반납
	@Override
	public void insertSelected(Map<String, String> param) {
		Sales_mapper.insertSelected(param);
	}


	

}
