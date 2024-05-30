package bookcafe.nexacro.orderhistorystatus.service;

import java.util.List;
import java.util.Map;

public interface OrderHistoryStatusService {
	
    // 주문이력현황조회
    // 대분류 combo
	List<Map<String, Object>> OHFirCombo();
	// 중분류 combo
	List<Map<String, Object>> OHSecCombo();
	// 소분류 combo
	List<Map<String, Object>> OHThirCombo();
	
	// 대분류 선택 시 중분류 변화
	List<Map<String, Object>> SelSecCombo(Map<String, String> param);
	// 중분류 선택 시 소분류 변화
	List<Map<String, Object>> SelThirCombo(Map<String, String> param);
	
	//조회하기버튼
	List<Map<String, Object>> ViewList(Map<String, String> param);

	

}
