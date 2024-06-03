package bookcafe.nexacro.stockorder.service;

import java.util.List;
import java.util.Map;

public interface StockOrderService {

	// grid1 메뉴리스트 불러오기
	List<Map<String, Object>> grid1MenuList();
	
	// popup창에서 신청완료 시 발주신청서 저장
	List<Map<String, Object>> saveStockOrder(List<Map<String, String>> stock_order);

	// 중분류 콤보
	List<Map<String, Object>> SOSecCombo();
	// 소분류 콤보
	List<Map<String, Object>> SOThirCombo();
	// 중분류 선택 시 소분류 변화
	List<Map<String, Object>> ChkThirCombo(Map<String, String> find_thir_combo);
}
