package bookcafe.nexacro.findaccount.serviceImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.findaccount.service.FindAccountService;

@Service
public class FindAccountImpl implements FindAccountService{

	@Autowired
	FindAccountMapper fam;
	
	@Override
	public Map<String, Object> find_id(Map<String, String> find_Account) {
			
		System.out.println(fam.find_id(find_Account));
		
		return fam.find_id(find_Account);
	}

	@Override
	public void change_pass(Map<String, String> change_Pass) {
		fam.change_pass(change_Pass);
	}

}
