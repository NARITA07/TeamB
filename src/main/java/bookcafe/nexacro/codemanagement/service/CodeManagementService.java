package bookcafe.nexacro.codemanagement.service;

import java.util.List;
import java.util.Map;

import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

public interface CodeManagementService {

	//대분류 코드 조회
	List<Map<String, Object>> init_fir_code();

	List<Map<String, Object>> sec_category_select(Map<String, Object> sec_category_select);

	void C_fir_code_chx(Map<String, Object> modi_date);
	
	//상위코드 생성
	Map<String, Object> add_fir_code(Map<String, Object> fir_code_add);
	
	//중위코드 생성
	void sec_code_add(Map<String, Object> sec_code_add);
	
	//상위코드 삭제
	void del_date(List<Map<String, Object>> del_date);

	void sec_code_modi(List<Map<String, Object>> modi_date_sec);

	void del_date_sec(List<Map<String, Object>> del_date_sec);

	//최신 코드 조회
	String max_code();
	


}
