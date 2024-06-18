package bookcafe.code.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface CodeMapper {

	//대분류 코드 조회
	List<Map<String, Object>> init_fir_code();
	
	//대분류 코드 조회(view)
	List<Map<String, Object>> view_code();

	List<Map<String, Object>> fir_category_select(Map<String, Object> fir_category_select);

	List<Map<String, Object>> sec_category_select(Map<String, Object> sec_category_select);

	List<Map<String, Object>> choice_sec_code(Map<String, Object> choice_sec_code);

	List<Map<String, Object>> sec_code_chk(String code);


	


}
