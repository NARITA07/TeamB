package bookcafe.nexacro.orderstatus.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.nexacro.orderstatus.service.OrderService;

@Controller
public class OrderController {
	   @Resource(name = "orderService")
	    private OrderService orderService;
		
	    @RequestMapping(value = "/select_orders.do")
	    public NexacroResult selectOrders() {
	    	List<Map<String, Object>> dataList = orderService.selectOrders();
		    NexacroResult result = new NexacroResult();
		    result.addDataSet("ds_orders", dataList);
		    
		    return result;
	    }
	    @RequestMapping(value = "/update_orders.do")
	    public NexacroResult updateOrders(@ParamDataSet(name = "ds_orders_updaterdy", required = false) List<Map<String,String>> orders) {
	    	NexacroResult result = new NexacroResult();
	    	System.out.print("orders count :" + orders.size()+" : ");
	    	System.out.println(orders);
	    	int temp = orderService.updateOrders(orders);
	    	
	    	if(temp ==1 ) {//성공
	    		System.out.println("update Orders : 성공");
	    	}else {// 에러
	    		System.out.println("update Orders : 실패");
	    	}
	    	List<Map<String,Object>> dataList = orderService.selectOrders();
	    	result.addDataSet("ds_orders",dataList);
	    	
	    	return result;
	    }
}
