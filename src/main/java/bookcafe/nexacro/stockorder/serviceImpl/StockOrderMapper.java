package bookcafe.nexacro.stockorder.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("stockorderMapper")
public interface StockOrderMapper {
	
	// grid1 메뉴리스트 불러오기
	List<Map<String, Object>> grid1MenuList();

	
	// 발주신청서 저장
	List<Map<String, Object>> saveStockOrder(List<Map<String, String>> stock_order);


	// 중분류 콤보
	List<Map<String, Object>> SOSecCombo();
	// 소분류 콤보
	List<Map<String, Object>> SOThirCombo();

	// 중분류 선택 시 소분류 변화
	List<Map<String, Object>> ChkThirCombo(Map<String, String> find_thir_combo);

	// combo를 통해 grid1 메뉴리스트 필터링
	List<Map<String, Object>> ViewList(Map<String, String> search_so_grid);
	
}
