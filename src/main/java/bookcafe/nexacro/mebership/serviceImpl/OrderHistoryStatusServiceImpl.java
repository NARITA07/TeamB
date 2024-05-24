package bookcafe.nexacro.mebership.serviceImpl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.mebership.service.OrderHistoryStatusService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("orderhistoryService")
public class OrderHistoryStatusServiceImpl extends EgovAbstractServiceImpl implements OrderHistoryStatusService {
	private Logger logger = LoggerFactory.getLogger(OrderHistoryStatusServiceImpl.class);
	
	 @Resource(name = "orderhistoryMapper")
	    private OrderHistoryStatusMapper ohmapper;

	 
	    //food_combo
		@Override
		public List<Map<String, Object>> MenuCombo() {
			return ohmapper.MenuCombo();	
		}  
		
		//조회하기(
		@Override
		public List<Map<String, Object>> ViewList(Map<String, String> param) {
			return ohmapper.ViewList(param);
		}


}
