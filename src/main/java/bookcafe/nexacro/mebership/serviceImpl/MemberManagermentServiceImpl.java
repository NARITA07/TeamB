package bookcafe.nexacro.mebership.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.mebership.service.MemberManagermentService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

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

	
	 @Override public int img_path(String path) { 
	  return mmm.img_path(path); }

	@Override
	public List<Map<String, Object>> select_User_Authority() {
		return mmm.select_User_Authority();
	}

	@Override
	public int update_Member(List<Map<String, String>> members) {
		int result = 0;
		for(Map<String,String> member : members) {
			result = mmm.update_Member(member);
		}
		return result;
	}

	@Override
	public int delete_Member(List<Map<String, String>> members) {
		int result = 0;
		for(Map<String,String> member : members) {
			result = mmm.delete_Member(member);
		}
		return result;
	}

	@Override
	public List<Map<String, Object>> selectPointlog(Map<String, String> member_Selected) {
		return mmm.selectPointlog(member_Selected);
	}

	@Override
	public void insertPointLog(Map<String, String> param) {
		mmm.insertPointLog(param);
	}

	@Override
	public void updateUserPoint(Map<String, String> param) {
		mmm.updateUserPoint(param);
	}
	 


}
