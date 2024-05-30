package bookcafe.nexacro.orderstatus.service;

import java.util.List;
import java.util.Map;

public interface OrderService {
	List<Map<String,Object>> selectOrders(int start,int end);
	int updateOrders(List<Map<String,String>> orders);
}
