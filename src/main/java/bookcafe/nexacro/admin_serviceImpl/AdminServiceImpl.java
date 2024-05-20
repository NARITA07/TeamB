package bookcafe.nexacro.admin_serviceImpl;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.admin_service.AdminService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("AdminService")
public class AdminServiceImpl extends EgovAbstractServiceImpl implements AdminService {
	
	@Autowired
	AdminMapper nex_mapper;

	//회원가입(관리자)
	@Override
	public int insert_admin(Map<String, String> membership) {
    	String code = nex_mapper.find_code(); //admin_code 확인
    	if(code.equals("0")) { //admin_code가 없어서 0이 반환되면
    		
    		membership.put("ADMIN_CODE", "MANAGER_1"); // 최초의 ADMIN_CODE는 = MANAGER_1이으로 지정
    		
    	}else {
    		
        	String managerName = code.substring(0, code.indexOf("_")); // MANAGER 걸러내고
        	String codeName = code.substring(code.indexOf("_")+1); // 숫자 걸러냄
        	int num = Integer.parseInt(codeName); // String 형태의 숫자를 정수로 변환
    		num += 1; // 1을 더해줌
        	membership.put("ADMIN_CODE", managerName +"_"+ num); // 새로운 코드 생성 -> 기존 가져온 값이 MANAGER_1이라면 MANAGER_2로 수정
        	
    	}
    	LocalDate date = LocalDate.now(); //현재날짜
    	
    	int y = date.getYear(); // 년
    	int m = date.getMonthValue(); //월
    	int d =date.getDayOfMonth(); //일
    	
    	String j_date = "" + y + "-" + m + "-" + d; // ex) 2024-05-18
    	
    	membership.put("ADMIN_JOINDATE", j_date); // 회원가입날짜
    	membership.put("ADMIN_AUTHORITY", "3"); // 권한 3 = MANAGER
    	
    	System.out.println("최종확인" + membership);
    	return nex_mapper.insert_data(membership);
	}
  
  }
 