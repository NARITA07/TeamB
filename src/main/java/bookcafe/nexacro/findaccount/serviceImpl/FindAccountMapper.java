package bookcafe.nexacro.findaccount.serviceImpl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface FindAccountMapper {

	Map<String, Object> find_id(Map<String, String> find_Account);

	void change_pass(Map<String, String> change_Pass);

}
