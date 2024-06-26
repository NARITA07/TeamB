package bookcafe.code.service;

import java.util.List;
import java.util.Map;

import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

public interface CodeService {

	//대분류 코드 조회
	List<Map<String, Object>> init_fir_code();

	//대분류 코드 조회(view)
	List<Map<String, Object>> view_code();
	
	//대분류 코드 선택조회
	List<Map<String, Object>> fir_category_select(Map<String, Object> fir_category_select);

	List<Map<String, Object>> sec_category_select(Map<String, Object> sec_category_select);

	List<Map<String, Object>> choice_sec_code(Map<String, Object> choice_sec_code);

	List<Map<String, Object>> add_sec_code(String add_fir_code);


}
