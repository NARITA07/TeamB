package bookcafe.nexacro.mebership.service;

import java.util.List;
import java.util.Map;

public interface MemberManagermentService {

	public List<Map<String, Object>> select_member();

	public Map<String, Object> select_non(String nonmember);

	public int img_path(String path);

	public List<Map<String, Object>> select_User_Authority();
}
