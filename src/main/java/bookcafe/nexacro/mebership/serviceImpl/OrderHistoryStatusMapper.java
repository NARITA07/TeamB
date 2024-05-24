package bookcafe.nexacro.mebership.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("orderhistoryMapper")
public interface OrderHistoryStatusMapper {
	
    //food_combo
	List<Map<String, Object>> MenuCombo();
	//조회하기(메뉴만)
	List<Map<String, Object>> ViewList(Map<String, String> param);
}
