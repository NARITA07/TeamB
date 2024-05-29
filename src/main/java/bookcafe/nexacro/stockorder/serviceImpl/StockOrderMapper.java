package bookcafe.nexacro.stockorder.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("stockorderMapper")
public interface StockOrderMapper {
	
	// grid1 메뉴리스트 불러오기
	List<Map<String, Object>> grid1MenuList();

	
	// 발주신청서 저장
	List<Map<String, Object>> saveStockOrder(List<Map<String, String>> stock_order);
	
}
