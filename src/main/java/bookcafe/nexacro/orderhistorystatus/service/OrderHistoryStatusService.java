package bookcafe.nexacro.orderhistorystatus.service;

import java.util.List;
import java.util.Map;

public interface OrderHistoryStatusService {
	
    // 주문이력현황조회
    //food_combo
	List<Map<String, Object>> MenuCombo();
	//조회하기버튼
	List<Map<String, Object>> ViewList(Map<String, String> param);

}
