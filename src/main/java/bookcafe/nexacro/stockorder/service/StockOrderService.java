package bookcafe.nexacro.stockorder.service;

import java.util.List;
import java.util.Map;

public interface StockOrderService {

	// grid1 메뉴리스트 불러오기
	List<Map<String, Object>> grid1MenuList();
	
	// popup창에서 신청완료 시 발주신청서 저장
	List<Map<String, Object>> saveStockOrder(List<Map<String, String>> stock_order);
}
