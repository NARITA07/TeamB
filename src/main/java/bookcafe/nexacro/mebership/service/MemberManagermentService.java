package bookcafe.nexacro.mebership.service;

import java.util.List;
import java.util.Map;

public interface MemberManagermentService {

	public List<Map<String, Object>> select_member(Map<String,String> search_dtl);

	public Map<String, Object> select_non(String nonmember);

	public int img_path(String path);

	public List<Map<String, Object>> select_User_Authority();
	
	public int update_Member(List<Map<String,String>> members);
	
	public int delete_Member(List<Map<String,String>> members);

	public List<Map<String, Object>> selectPointlog(Map<String, String> member_Selected);

	public void insertPointLog(Map<String, String> param);
}
