package bookcafe.nexacro.mebership.controller;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.mebership.service.MemberManagermentService;

@Controller
public class MemberManagermentCtroller {
	
	//@ParamVariable(name="member", required = false) String member 변수 이용 시 사용
	
	@Autowired
	MemberManagermentService mms;
	
	@Resource(name="txManager")
	PlatformTransactionManager transactionManager;
	
	//회원관리
	@RequestMapping("membermanagement.do")
	public NexacroResult Admin_membership(@ParamDataSet(name = "search_dtl", required = false) Map<String,String> search_dtl) {   
		NexacroResult result = new NexacroResult(); // 넥사크로타입의 변수 result를 선언 
		
		List<Map<String, Object>> member =  mms.select_member(search_dtl);
			
		result.addDataSet("Member_Management", member);
		
		return result;
		
	}
	@RequestMapping("getcombo.do")
	public NexacroResult Get_Combo() {   
		NexacroResult result = new NexacroResult(); // 넥사크로타입의 변수 result를 선언 
		
		List<Map<String, Object>> member_Authority =  mms.select_User_Authority();
			
		result.addDataSet("Member_Authority", member_Authority);
		
		return result;
		
	}
	@RequestMapping("updateMember.do")
	public NexacroResult Update_Member(@ParamDataSet(name = "Member_Selected", required = false) List<Map<String,String>> members) {   
		NexacroResult result = new NexacroResult(); // 넥사크로타입의 변수 result를 선언 
		System.out.println(members);
		int updateResult = mms.update_Member(members);
		if(updateResult == 0) {
			result.setErrorCode(-1);
			result.setErrorMsg("member update fail");
		}
		//result.addDataSet("Member_Authority", member_Authority);
		
		return result;
		
	}
	@RequestMapping("deleteMember.do")
	public NexacroResult Delete_Member(@ParamDataSet(name = "Member_Selected", required = false) List<Map<String,String>> members) {   
		NexacroResult result = new NexacroResult(); // 넥사크로타입의 변수 result를 선언 
		
		int deleteResult = mms.delete_Member(members);
		if(deleteResult == 0) {
			result.setErrorCode(-1);
			result.setErrorMsg("member delete fail");
		}
		//result.addDataSet("Member_Authority", member_Authority);
		
		return result;
		
	}
	
	// 포인트로그 조회
		@RequestMapping(value = "/selectPointlog.do")
	    public NexacroResult selectPointlog(@ParamDataSet(name = "Member_Selected", required = false) Map<String,String> Member_Selected) { 
			System.out.println("=====포인트로그"+Member_Selected);
			List<Map<String, Object>> dataList = mms.selectPointlog(Member_Selected);
		    NexacroResult result = new NexacroResult();
		    result.addDataSet("pointlog_dtl", dataList);
		    return result;
	    }
		
		//포인트추가 insert
		@RequestMapping(value = "/insertPointLog.do")
		public NexacroResult insertPointLog(@ParamDataSet(name = "Member_Selected", required = false) List<Map<String, String>> Member_Selected) throws IOException, InvocationTargetException, SQLException {
		    DefaultTransactionDefinition transDef = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED); 
		    transDef.setReadOnly(false);
		    transDef.setIsolationLevel(TransactionDefinition.ISOLATION_READ_COMMITTED);
		    TransactionStatus txStatus = transactionManager.getTransaction(transDef);
		    
		    NexacroResult result = new NexacroResult();
		    
		    System.out.println("====insert포인트" + Member_Selected);
		    try {
		        if (Member_Selected != null) {
		            for (Map<String, String> param : Member_Selected) {
		                mms.insertPointLog(param);
		                mms.updateUserPoint(param);
		            }
		        }
		        transactionManager.commit(txStatus);
		    } catch (Exception e) {
		        result.setErrorCode(-1);
		        result.setErrorMsg(e.getMessage());
		        transactionManager.rollback(txStatus);
		    }
		    
		    return result;
		}
	
}