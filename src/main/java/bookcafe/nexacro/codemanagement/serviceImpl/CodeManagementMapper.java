package bookcafe.nexacro.codemanagement.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface CodeManagementMapper {

	//대분류 코드 조회
	List<Map<String, Object>> init_fir_code();
	
	List<Map<String, Object>> sec_category_select(Map<String, Object> sec_category_select);

	//상위코드 변경
	void C_fir_code_chx(Map<String, Object> modi_date);

	//하위코드 변경
	void C_sec_code_chx(Map<String, Object> modi_date);

	//상위코드 생성
	void add_fir_code(Map<String, Object> fir_code_add);

	//상위코드 삭제
	void C_del_date(Map<String, Object> map);
	

	


}
