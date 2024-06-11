package bookcafe.nexacro.codemanagement.service;

import java.util.List;
import java.util.Map;

import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

public interface CodeManagementService {

	//상위코드 그리드 조회
	List<Map<String,Object>> selectfirgrid();
	
	//하위코드 그리드 조회
	List<Map<String,Object>> selectsecgrid(String fir_category);
	


}
