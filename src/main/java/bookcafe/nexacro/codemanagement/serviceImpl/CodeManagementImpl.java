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

	//저장
	public int gridmodi(List<Map<String, Object>> save) {
		
		for(int i = 0; i < save.size(); i++) {
			
			if(save.get(i).get("SEC_CODE") == null) {//상위코드 
				
				System.out.println("상위");
				
				//코드가 존재한다면 업데이트 
				
				// 없으면 인서트
				
				//상위코드의 사용여부가 변경이 된다면
				
				//하위코드의 사용여부 또한 똑같이 변경
					
				
			}else if(save.get(i).get("FIR_CODE") == null) {//하위코드
				
				System.out.println("하위");
				
				// 코드가 존재한다면 업데이트
				
				// 없으면 인서트
				
				// 하위코드의 업데이트는 상위코드에 영향을 미치지 않음.
				
			}
			
			
			
			
			
		}
		
		return codemmapper.gridmodi(save);
	}
	
	

}

