package bookcafe.nexacro.codemanagement.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.code.serviceImpl.CodeMapper;
import bookcafe.nexacro.codemanagement.service.CodeManagementService;

@Service
public class CodeManagementImpl implements CodeManagementService {

	@Autowired
	CodeManagementMapper codemmapper;

	//상위코드 그리드 조회
	public List<Map<String, Object>> selectfirgrid() {
		
		return codemmapper.selectfirgrid();
	}

	//하위코드 그리드 조회
	public List<Map<String, Object>> selectsecgrid(String fir_category) {
		return codemmapper.selectsecgrid(fir_category);
	}
	
	

}

