package bookcafe.nexacro.mebership.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.mebership.service.MemberManagermentService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Service
public class MemberManagermentServiceImpl extends EgovAbstractServiceImpl implements MemberManagermentService {
		
	
	@Autowired
	MemberManagermentMapper mmm;
	
	@Override
	public List<Map<String, Object>> select_member() {
		
		return mmm.select_member();
	}

	@Override
	public Map<String, Object> select_non(String nonmember) {
		
		return mmm.select_non(nonmember);
	}

}
