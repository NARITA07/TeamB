package bookcafe.nexacro.orderstatus.serviceImpl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("OrderMapper")
public interface OrderMapper {
	List<Map<String,Object>> selectOrders();
	int updateOrders(Map<String,String> order);
	int updateFoodQuantity(Map<String,String> order);
}
