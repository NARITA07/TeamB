package bookcafe.code.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.code.service.CodeService;

@Service
public class CodeServiceImpl implements CodeService {
	
	@Autowired
	CodeMapper codemapper;

	//대분류 코드
	public List<Map<String, Object>> fir_select() {
		
		return codemapper.fir_select();
	}
	
	//대분류 등록
	public int fir_insert(Map<String, String> Fir_insert) {
		return codemapper.Fir_insert(Fir_insert);
	}

	@Override
	public List<Map<String, Object>> sec_select(Map<String, String> Fir_Code) {
		return codemapper.sec_select(Fir_Code);
	}

	@Override
	public int sec_insert(Map<String, String> sec_insert) {
		return codemapper.sec_insert(sec_insert);
	}

}
