package bookcafe.nexacro.findaccount.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.findaccount.service.FindAccountService;

@Controller
public class FindAccountController {

	@Autowired
	FindAccountService fas;

	//아이디 찾기
	@RequestMapping("find_account.do")
	public NexacroResult FindAccount(@ParamDataSet(name = "Find_Account")Map<String, String>Find_Account) {
		NexacroResult result = new NexacroResult();

		Map<String, Object> id = fas.find_id(Find_Account);


		result.addDataSet("Find_ID",id);

		return result;
	}



	//비밀번호 변경
	@RequestMapping("change_pass.do")
	public void ChangePass(@ParamDataSet(name = "Change_Pass")Map<String, String>Change_Pass) {
		System.out.println(Change_Pass);
		
		
		fas.change_pass(Change_Pass);

	}

}
