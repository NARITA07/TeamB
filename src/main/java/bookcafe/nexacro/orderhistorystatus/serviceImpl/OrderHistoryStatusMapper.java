package bookcafe.nexacro.orderhistorystatus.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("orderhistoryMapper")
public interface OrderHistoryStatusMapper {
	
    // 대분류 combo
	List<Map<String, Object>> OHFirCombo();
	
	// 중분류 combo
	List<Map<String, Object>> OHSecCombo();
	
	// 소분류 combo
	List<Map<String, Object>> OHThirCombo();
	
	// 대분류 선택 시 중분류 변화
	List<Map<String, Object>> SelSecCombo(Map<String, String> param);
	
	//조회하기(메뉴만)
	List<Map<String, Object>> ViewList(Map<String, String> param);



	
}
