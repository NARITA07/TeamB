package bookcafe.nexacro.mebership.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface MemberManagermentMapper {

	public List<Map<String, Object>> select_member();

	public Map<String, Object> select_non(String nonmember);

	public int img_path(String path);
	
	public List<Map<String, Object>> select_User_Authority();
	
	public int update_Member(Map<String,String> member);
	
	public int delete_Member(Map<String,String> member);
}
