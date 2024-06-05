package bookcafe.code.serviceImpl;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.code.controller.CodeController;
import bookcafe.code.service.CodeService;

@Service
public class CodeServiceImpl implements CodeService {

	@Autowired
	CodeMapper codemapper;
	
	//대분류 조회
	public List<Map<String, Object>> init_fir_code(){

		List<Map<String, Object>> re_init_fir_code = codemapper.init_fir_code();
		
		//USE_STATUS 확인하고 리턴
		return use_stat(re_init_fir_code);
	}
	
	//대분류 코드 조회(view)
	public List<Map<String, Object>> view_code(){
		
		List<Map<String, Object>> re_view_code = codemapper.view_code();
		
		//USE_STATUS 확인하고 리턴
		return use_stat(re_view_code);
		
	}
	
	//대분류 코드 선택조회
	@Override
	public List<Map<String, Object>> fir_category_select(Map<String, Object> fir_category_select) {
		
		List<Map<String, Object>> sfir_category_select = codemapper.fir_category_select(fir_category_select);
		//USE_STATUS 확인하고 리턴
		return use_stat(sfir_category_select);
	}
	
	
	@Override
	public List<Map<String, Object>> sec_category_select(Map<String, Object> sec_category_select) {
		List<Map<String, Object>> ssec_category_select = codemapper.sec_category_select(sec_category_select);
		//USE_STATUS 확인하고 리턴
		return use_stat(ssec_category_select);
	}
	
	@Override
	public List<Map<String, Object>> choice_sec_code(Map<String, Object> choice_sec_code) {
		System.out.println(choice_sec_code);
		List<Map<String, Object>> schoice_sec_code = codemapper.choice_sec_code(choice_sec_code);
		
		return use_stat(schoice_sec_code);
	}
	
	
	
	
	
	
	
	
	//사용여부 처리 -- USE_STATUS이 "N" 인것들 제거
	private List<Map<String, Object>> use_stat(List<Map<String, Object>> v) {
		
		for(int i = 0; i < v.size(); i++) {

			if(v.get(i).get("USE_STATUS").equals("N")) { // 사용여부가 N인것

				v.remove(i);//리스트에서 삭제

			}
		}
		return v;
	}

}

