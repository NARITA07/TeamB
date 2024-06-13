package bookcafe.nexacro.mebership.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.javassist.bytecode.stackmap.BasicBlock.Catch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.mebership.service.AdminService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("AdminService")
public class AdminServiceImpl extends EgovAbstractServiceImpl implements AdminService {
	
	@Autowired
	AdminMapper adminmapper;

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	//로그인(관리자)

	public Map<String, String> select_admin(Map<String, String> admin_Login) {
		Map<String, String> result = new HashMap<>();
		String name = admin_Login.get("ADMIN_ID"); //아이디값 추출
		
		String pass = adminmapper.selectpass(name);// 추출한 아이디값으로 패스워드 추출
	
		if(adminmapper.checkid(name) == null) {
			
			 result.put("ERROR", "아이디가 틀렸습니다.");
			 
			 return result;
		}
		
		if(passwordEncoder.matches(admin_Login.get("ADMIN_PASS"), pass)){// db의 패스워드와 입력한 패스워드를 매치 
				//권한 확인
			if(adminmapper.Checkuserauthority(name) == 3 || adminmapper.Checkuserauthority(name) == 4) {
				//로그인 성공!
				result = adminmapper.select_admin(admin_Login);
			}
		}else {
			
			result.put("ERROR", "비밀번호가 틀렸습니다.");
		}

	
		return result;
	}
}


 