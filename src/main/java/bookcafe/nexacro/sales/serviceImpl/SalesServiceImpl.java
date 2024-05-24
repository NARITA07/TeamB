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
	public List<Map<String, Object>> selectBookSales(Map<String, String> book_sales_con) {
		return Sales_mapper.selectBookSales(book_sales_con);
	}


	

}