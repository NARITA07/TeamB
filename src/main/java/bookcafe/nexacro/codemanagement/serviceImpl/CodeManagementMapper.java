package bookcafe.nexacro.codemanagement.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface CodeManagementMapper {
	//상위코드 조회
	List<Map<String, Object>> selectfirgrid();
	
	//하위코드 조회
	List<Map<String, Object>> selectsecgrid(String fir_category);

	int gridmodi(List<Map<String, Object>> save);
	

	


}
