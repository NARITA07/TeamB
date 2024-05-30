package bookcafe.nexacro.findaccount.service;

import java.util.Map;

public interface FindAccountService {
	
	//아이디 찾기
	Map<String, Object> find_id(Map<String, String> find_Account);

	void change_pass(Map<String, String> change_Pass);

}
