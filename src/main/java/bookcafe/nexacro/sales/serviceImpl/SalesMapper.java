package bookcafe.nexacro.sales.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface SalesMapper {
	//카페 조회
	List<Map<String, Object>> selectSales(Map<String, String> sales_con);
	//도서 조회
	List<Map<String, Object>> selectBookSales(Map<String, String> sales_con);
	
	//대분류
	List<Map<String, Object>> selectFirstCombo();
	//중분류
	List<Map<String, Object>> selectSalesCombo(Map<String, String> combo_con);
	List<Map<String, Object>> selectSecondCombo();
	
	//매출 차트
	List<Map<String, Object>> selectSalesChart(Map<String, String> sales_con);

}
