package bookcafe.serviceImpl;

import java.util.ArrayList;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.mapper.TestMapper;
import bookcafe.service.TestService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service
public class TestServiceImpl extends EgovAbstractServiceImpl implements TestService{

	@Autowired
	TestMapper mapper;
	
	@Override
	public ArrayList<Map<String, Object>> selectCommonCode(Map<String, Object> ds_sc) {
		return mapper.selectCommonCode(ds_sc);
	}

	@Override
	public ArrayList<Map<String, Object>> selectOrdList(Map<String, Object> ds_scList) {
		return mapper.selectOrdList(ds_scList);
	}

}
