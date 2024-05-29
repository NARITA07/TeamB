package bookcafe.code.service;

import java.util.List;
import java.util.Map;

import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

public interface CodeService {

	//대분류 코드
	List<Map<String, Object>> fir_select();

	int fir_insert(Map<String, String>Fir_insert);

	List<Map<String, Object>> sec_select(Map<String, String> fir_Code);

	int sec_insert(Map<String, String> sec_insert);

}
