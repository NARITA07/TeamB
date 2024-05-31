package bookcafe.nexacro.orderstatus.serviceImpl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("OrderMapper")
public interface OrderMapper {
	List<Map<String,Object>> selectOrders(@Param("start_state") int start_state, @Param("end_state") int end_state);
	int updateOrders(Map<String,String> order);
	int updateFoodQuantity(Map<String,String> order);
}
