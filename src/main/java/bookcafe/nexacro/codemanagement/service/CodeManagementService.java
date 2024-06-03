package bookcafe.nexacro.codemanagement.service;

import java.util.List;
import java.util.Map;

import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

public interface CodeManagementService {

	//대분류 코드 조회
	List<Map<String, Object>> init_fir_code();

	List<Map<String, Object>> sec_category_select(Map<String, Object> sec_category_select);

	void C_fir_code_chx(Map<String, Object> modi_date);

	void add_fir_code(Map<String, Object> fir_code_add);

	void del_date(List<Map<String, Object>> del_date);



}
