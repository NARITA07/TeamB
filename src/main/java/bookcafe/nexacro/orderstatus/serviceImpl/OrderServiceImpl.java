package bookcafe.nexacro.orderstatus.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookcafe.nexacro.orderstatus.service.OrderService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("orderService")
public class OrderServiceImpl extends EgovAbstractServiceImpl implements OrderService{
	@Autowired
	OrderMapper mapper;
	@Override
	public List<Map<String, Object>> selectOrders(int start,int end) {
		return mapper.selectOrders(start, end);
	}
	@Override
	public int updateOrders(List<Map<String, String>> orders) {
		int result =0;
		for (Map<String, String> order : orders) {
			result = mapper.updateOrders(order);
			if(Integer.valueOf(String.valueOf(order.get("PAYMENT_STATE"))) > 1) { // 0결제중 1 결제완료 2 환불 3 취소
				//포인트처리해야됨
			}
		}
		return result;
	}


}
