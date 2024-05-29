package bookcafe.nexacro.sales.service;

import java.util.List;
import java.util.Map;

public interface SalesService {
	//카페 매출현황 SELECT
	public List<Map<String, Object>> selectSales(Map<String, String> sales_con);
	//도서 매출현황 SELECT
	public List<Map<String, Object>> selectBookSales(Map<String, String> book_sales_con);
}
