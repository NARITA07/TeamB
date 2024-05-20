package bookcafe.nexacro.admin_serviceImpl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;


@Mapper
public interface AdminMapper {

	//관리자 코드 찾기
	public String find_code();
	
	//회원가입(관리자)
	public int insert_data(Map<String, String> membership);   
	
}