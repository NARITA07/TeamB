package bookcafe.nexacro.codemanagement.serviceImpl;

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
	
	//대분류 조회
	public List<Map<String, Object>> init_fir_code(){

		List<Map<String, Object>> re_init_fir_code = codemmapper.init_fir_code();
		
		return re_init_fir_code;
	}
	
	
	@Override
	public List<Map<String, Object>> sec_category_select(Map<String, Object> sec_category_select) {
		List<Map<String, Object>> ssec_category_select = codemmapper.sec_category_select(sec_category_select);
		return ssec_category_select;
	}


	@Override
	public void C_fir_code_chx(Map<String, Object> modi_date) {
		
		//하위코드 변경
		codemmapper.C_sec_code_chx(modi_date);
		
		//상위코드 변경 
		codemmapper.C_fir_code_chx(modi_date);
	}


	//상위코드 생성
	@Override
	public void add_fir_code(Map<String, Object>fir_code_add) {
		codemmapper.add_fir_code(fir_code_add);
		
	}

	//상위코드 삭제
	@Override
	public void del_date(List<Map<String, Object>> del_date) {
		
		for(int i = 0; i < del_date.size(); i++ ) {
			
			codemmapper.C_del_date(del_date.get(i));
			
		}
		
		
	}
	

}

