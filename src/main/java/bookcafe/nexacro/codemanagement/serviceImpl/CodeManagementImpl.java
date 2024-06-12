package bookcafe.nexacro.codemanagement.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.code.serviceImpl.CodeMapper;
import bookcafe.nexacro.codemanagement.service.CodeManagementService;

@Service
public class CodeManagementImpl implements CodeManagementService {

	@Autowired
	CodeManagementMapper codemmapper;
	
	//코드 검색 조회
	public List<Map<String, Object>> searchfirgrid(String search) {
		Map<String, Object>search_date = new HashMap<>();
		
		search_date.put("FIR_CODE", search);
		
		return codemmapper.searchfirgrid(search_date);
	}


	//상위코드 그리드 조회
	public List<Map<String, Object>> selectfirgrid() {

		return codemmapper.selectfirgrid();
	}

	//하위코드 그리드 조회
	public List<Map<String, Object>> selectsecgrid(String fir_category) {
		return codemmapper.selectsecgrid(fir_category);
	}

	//저장
	public int gridmodi(List<Map<String, Object>> save) {

		int result = 0;
		int fir_up = 0;

		for(int i = 0; i < save.size(); i++) {

			if(save.get(i).get("SEC_CODE") == null) {//상위코드 
				if(codemmapper.selectcodes(save.get(i)) == 1) {//상위코드가 존재한다면 업데이트 
					result	+=	codemmapper.updatecodes(save.get(i)); //업데이트

					fir_up++;

				}else{//상위코드가 존재하지 않는다면 인서트
					result += codemmapper.insertcodes(save.get(i)); //생성

				} 

				if(fir_up > 0) {

					//상위코드 변경 -> 하위코드 변경적용하기
					result += codemmapper.updateseccode(save.get(i));



				}



			}else if(save.get(i).get("SEC_CODE") != null) {//하위코드

				if(codemmapper.selectcodes(save.get(i)) == 1) {//상위코드가 존재한다면 업데이트
					result	+=	codemmapper.updatecodes(save.get(i)); //업데이트

				}else {
					result += codemmapper.insertcodes(save.get(i)); // 생성

				}

			}

		}

		return result;
	}

	//상위코드 최신값
	public String fircodenew() {
		return codemmapper.fircodenew();
	}

	//하위코드 최신값
	public String seccodenew() {
		return codemmapper.seccodenew();
	}

	//코드 삭제
	public int codedel(List<Map<String, Object>> save) {

		int result = 0;
		int fir_up = 0;

		for(int i = 0; i < save.size(); i++) {

			if(save.get(i).get("SEC_CODE") == null) {//상위코드 

				result += codemmapper.codedel(save.get(i));

				fir_up++;

			}else if(save.get(i).get("SEC_CODE") != null) {//하위코드

				result += codemmapper.codedel(save.get(i));

			}
			if(fir_up > 0) {

				result += codemmapper.codedel_sec(save.get(i));

			}

		}


		return result;
	}

	
}
