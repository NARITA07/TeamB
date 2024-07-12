package bookcafe.mapper;

import java.util.ArrayList;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;


@Mapper
public interface TestMapper {

	public ArrayList<Map<String, Object>> selectCommonCode(Map<String, Object> ds_sc);

	public ArrayList<Map<String, Object>> selectOrdList(Map<String, Object> ds_scList);

}
