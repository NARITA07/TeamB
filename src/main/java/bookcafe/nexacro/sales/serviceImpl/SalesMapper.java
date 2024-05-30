package bookcafe.nexacro.sales.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface SalesMapper {
	//카페 조회
	List<Map<String, Object>> selectSales(Map<String, String> sales_con);
	//도서 조회
	List<Map<String, Object>> selectBookSales(Map<String, String> book_sales_con);

}
