package bookcafe.nexacro.mebership.service;

import java.util.Map;

public interface AdminService {

	//회원가입(관리자)
	public int insert_admin(Map<String, String> membership);
	
	//로그인(관리자)
	public Map<String, String> select_admin(Map<String, String> admin_Login);


}
