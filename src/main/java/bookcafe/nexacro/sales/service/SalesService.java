package bookcafe.nexacro.sales.service;

import java.util.List;
import java.util.Map;

public interface SalesService {
	//카페 매출현황 SELECT
	public List<Map<String, Object>> selectSales(Map<String, String> sales_con);
	//도서 이력 SELECT
	public List<Map<String, Object>> selectBookSales(Map<String, String> sales_con);
	//중분류 콤보조회
	public List<Map<String, Object>> selectSalesCombo(Map<String, String> combo_con);
	
	//매출 차트
	public List<Map<String, Object>> selectSalesChart(Map<String, String> sales_con);
}
