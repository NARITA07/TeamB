package bookcafe.nexacro.codemanagement.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface CodeManagementMapper {
	
	//코드검색 조회
	List<Map<String, Object>> searchfirgrid(Map<String, Object> search);
	
	//하위 코드 검색
	List<Map<String, Object>> searchsecgrid(String search2);
	
	//상위코드 조회
	List<Map<String, Object>> selectfirgrid();
	
	//하위코드 조회
	List<Map<String, Object>> selectsecgrid(String fir_category);
	
	//저장
	int gridmodi(List<Map<String, Object>> save);

	//상위코드 최신값
	String fircodenew();

	//하위코드 최신값
	String seccodenew();

	//코드 확인
	int selectcodes(Map<String, Object> map);

	//코드 업데이트
	int updatecodes(Map<String, Object> map);
	
	//코드 생성
	int insertcodes(Map<String, Object> map);
	
	//상위코드 변경 -> 하위코드 변경적용하기
	int updateseccode(Map<String, Object> map);

	//코드 삭제
	int codedel(Map<String, Object> map);
	
	//상위코드 삭제 -> 하위코드 삭제하기
	int codedel_sec(Map<String, Object> map);



}
