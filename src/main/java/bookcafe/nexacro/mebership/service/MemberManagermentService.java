package bookcafe.nexacro.mebership.service;

import java.util.List;
import java.util.Map;

public interface MemberManagermentService {

	public List<Map<String, Object>> select_member();

	public Map<String, Object> select_non(String nonmember);

	public int img_path(String path);

	public List<Map<String, Object>> select_User_Authority();
	
	public int update_Member(List<Map<String,String>> members);
	
	public int delete_Member(List<Map<String,String>> members);

	public List<Map<String, Object>> selectPointlog(Map<String, String> member_Selected);

	//포인트로그 insert
	public void insertPointLog(Map<String, String> param);
	
	//유저포인트 update
	public void updateUserPoint(Map<String, String> param);
}
