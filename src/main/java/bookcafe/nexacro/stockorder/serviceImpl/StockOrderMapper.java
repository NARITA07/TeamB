package bookcafe.nexacro.stockorder.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("stockorderMapper")
public interface StockOrderMapper {
	
	// grid1 메뉴리스트 불러오기
	List<Map<String, Object>> grid1MenuList();
	
	// grid2 발주신청서 리스트 불러오기
	List<Map<String, Object>> grid2OrderList();

	// 발주신청서 저장
	int saveStockOrder(Map<String, String> stock_order);

	// 발주신청서 업데이트
	int updateStockOrder(Map<String, String> state_update);
	
	// 재고 업데이트
	int updateStockQuantity(Map<String, String> state_update);

	// 중분류 콤보
	List<Map<String, Object>> SOSecCombo();
	// 소분류 콤보
	List<Map<String, Object>> SOThirCombo();

	// 중분류 선택 시 소분류 변화
	List<Map<String, Object>> ChkThirCombo(Map<String, String> find_thir_combo);

	// combo를 통해 grid1 메뉴리스트 필터링
	List<Map<String, Object>> ViewList(Map<String, String> search_so_grid);

	// combo를 통해 grid2 메뉴리스트 필터링
	List<Map<String, Object>> ViewStockOrder(Map<String, String> search_so_grid);



	



	
}
