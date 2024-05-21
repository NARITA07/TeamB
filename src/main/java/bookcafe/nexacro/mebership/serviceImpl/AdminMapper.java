package bookcafe.nexacro.mebership.serviceImpl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;


@Mapper
public interface AdminMapper {

	//관리자 코드 찾기
	public String find_code();
	
	//회원가입(관리자)
	public int insert_data(Map<String, String> membership);
	
	//로그인(관리자)
	public Map<String, String> select_admin(Map<String, String> admin_Login);   
	
	//로그인(ID찾기)
	public Map<String, String> select_admin_id(String id);
	
}