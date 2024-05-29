package bookcafe.code.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface CodeMapper {

	//대분류 코드
	List<Map<String, Object>> fir_select();
	
	//대분류 등록
	int Fir_insert(Map<String, String> fir_insert);

	List<Map<String, Object>> sec_select(Map<String, String> fir_Code);

	int sec_insert(Map<String, String> sec_insert);

}
