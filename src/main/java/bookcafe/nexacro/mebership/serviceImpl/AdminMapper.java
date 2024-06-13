package bookcafe.nexacro.mebership.serviceImpl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;


@Mapper
public interface AdminMapper {

	//로그인(관리자)
	public Map<String, String> select_admin(Map<String, String> admin_Login);   
	
	//로그인(ID찾기)
	public Map<String, String> select_admin_id(String id);

	public String selectpass(String name);

	public int Checkuserauthority(String name);
	
	//아이디 확인
	public String checkid(String name);
	
}