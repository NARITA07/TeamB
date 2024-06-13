package bookcafe.nexacro.codemanagement.service;

import java.util.List;
import java.util.Map;

import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

public interface CodeManagementService {

	//상코드 검색 조회
	List<Map<String,Object>> searchfirgrid(String search);
	
	//하위코드 검색 조회
	List<Map<String,Object>> searchsecgrid(String search2);
	
	//상위코드 그리드 조회
	List<Map<String,Object>> selectfirgrid();
	
	//하위코드 그리드 조회
	List<Map<String,Object>> selectsecgrid(String fir_category);

	//저장
	int gridmodi(List<Map<String, Object>> save);

	//상위코드 최신값
	String fircodenew();
	
	//하위코드 최신값
	String seccodenew();

	//코드 삭제
	int codedel(List<Map<String, Object>> save);

	

	
	


}
