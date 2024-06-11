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
	public Map<String, Object> C_fir_code_chx(List<Map<String, Object>> modi_date) {
		Map<String, Object> num = new HashMap<>();
		int date = 0;
		for(int i = 0; i < modi_date.size(); i++) {	

			int result = codemmapper.select_mo_or_in(modi_date.get(i).get("FIR_CODE"));
		if(result == 1) { // 값이 있음 -> 수정 
			
			//중위코드
			date += codemmapper.C_sec_code_chx(modi_date.get(i));
			
			//상위코드
			date += codemmapper.C_fir_code_chx(modi_date.get(i));
			
		
			}else {// 그 외는 인서트
			
			
				date += codemmapper.insert_fir_code(modi_date.get(i));
			
			}
			num.put("num", date);
		}
		
		return num;
	}


	//상위코드 생성
	@Override
	public Map<String, Object> add_fir_code(Map<String, Object>fir_code_add) {
		
		Map<String, Object> codes = new HashMap<>();
		int num = codemmapper.add_fir_code(fir_code_add);
		System.out.println(num);
		codes.put("num", num);
		return codes;
		
	}

	//상위코드 삭제
	@Override
	public void del_date(List<Map<String, Object>> del_date) {
		
		for(int i = 0; i < del_date.size(); i++ ) {
			
			codemmapper.C_del_date(del_date.get(i));
			codemmapper.C_del_sec_date(del_date.get(i));
		}
		
		
	}


	@Override
	public void sec_code_add(Map<String, Object> sec_code_add) {
		codemmapper.sec_code_add(sec_code_add);
		
	}


	@Override
	public void sec_code_modi(List<Map<String, Object>> modi_date_sec) {
		
for(int i = 0; i < modi_date_sec.size(); i++ ) {
	codemmapper.sec_code_modi(modi_date_sec.get(i));
		}
		
	}


	@Override
	public void del_date_sec(List<Map<String, Object>> del_date_sec) {
		
	for(int i = 0; i < del_date_sec.size(); i++ ) {
			
			codemmapper.del_date_sec(del_date_sec.get(i));
		}
		
		
	}

	
	@Override
	public String max_code() {
		
		return codemmapper.max_code();
	}		
	
	

}

