package bookcafe.nexacro.orderhistorystatus.serviceImpl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.orderhistorystatus.service.OrderHistoryStatusService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("orderhistoryService")
public class OrderHistoryStatusServiceImpl extends EgovAbstractServiceImpl implements OrderHistoryStatusService {
	private Logger logger = LoggerFactory.getLogger(OrderHistoryStatusServiceImpl.class);
	
	 @Resource(name = "orderhistoryMapper")
	    private OrderHistoryStatusMapper ohmapper;

	 
	    // 대분류 combo
		@Override
		public List<Map<String, Object>> OHFirCombo() {
			return ohmapper.OHFirCombo();	
		}
		
		// 중분류 combo
		@Override
		public List<Map<String, Object>> OHSecCombo() {
			return ohmapper.OHSecCombo();
		}
		
		// 소분류 combo
		@Override
		public List<Map<String, Object>> OHThirCombo() {
			return ohmapper.OHThirCombo();
		}
		
		// 대분류 선택 시 중분류 변화
		@Override
		public List<Map<String, Object>> SelSecCombo(Map<String, String> param) {
			return ohmapper.SelSecCombo(param);
		}
		
		// 중분류 선택 시 소분류 변화
		@Override
		public List<Map<String, Object>> SelThirCombo(Map<String, String> param) {
			return ohmapper.SelThirCombo(param);
		}
		
		//조회하기(
		@Override
		public List<Map<String, Object>> ViewList(Map<String, String> param) {
			return ohmapper.ViewList(param);
		}

	





	

}
