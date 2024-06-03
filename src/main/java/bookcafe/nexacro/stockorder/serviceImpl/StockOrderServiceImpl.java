package bookcafe.nexacro.stockorder.serviceImpl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.stockorder.service.StockOrderService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("stockorderService")
public class StockOrderServiceImpl extends EgovAbstractServiceImpl implements StockOrderService {
	private Logger logger = LoggerFactory.getLogger(StockOrderServiceImpl.class);

	@Resource(name = "stockorderMapper")
	private StockOrderMapper somapper;
	
	// grid1 메뉴콤보
	@Override
	public List<Map<String, Object>> grid1MenuList() {
		return somapper.grid1MenuList();
	}

	// popup창에서 신청완료 시 발주신청서 저장
	@Override
	public List<Map<String, Object>> saveStockOrder(List<Map<String, String>> stock_order) {
		return somapper.saveStockOrder(stock_order);
	}

	// 중분류 콤보
	@Override
	public List<Map<String, Object>> SOSecCombo() {
		return somapper.SOSecCombo();
	}
	// 소분류 콤보
	@Override
	public List<Map<String, Object>> SOThirCombo() {
		return somapper.SOThirCombo();
	}
	
	// 중분류 선택 시 소분류 변화
	@Override
	public List<Map<String, Object>> ChkThirCombo(Map<String, String> find_thir_combo) {
		return somapper.ChkThirCombo(find_thir_combo);
	}

	// combo를 통해 grid1 메뉴리스트 필터링
	@Override
	public List<Map<String, Object>> ViewList(Map<String, String> search_so_grid) {
		return somapper.ViewList(search_so_grid);
	}

	
	
	
}
	

