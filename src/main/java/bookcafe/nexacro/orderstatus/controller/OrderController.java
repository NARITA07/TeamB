package bookcafe.nexacro.orderstatus.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import bookcafe.member.service.EmailService;
import bookcafe.member.service.MemberService;
import bookcafe.nexacro.orderstatus.service.OrderService;
import bookcafe.point.service.PointService;
import bookcafe.point.service.PointVO;

@Controller
@RequestMapping("/orders")
public class OrderController {
	@Resource(name = "orderService")
	private OrderService orderService;

	@Resource(name = "memberService")
	public MemberService memberService;
	@Autowired
	public PointService pointService;

	@Inject
	JavaMailSender mailSender;
	@Autowired
	private EmailService emailService;

	@RequestMapping(value = "/select.do")
	public NexacroResult selectOrders() {
		List<Map<String, Object>> orders = orderService.selectOrders(-1, 3);
		NexacroResult result = new NexacroResult();
		result.addDataSet("ds_orders", orders);

		return result;
	}

	@RequestMapping(value = "/selectEnd.do")
	public NexacroResult selectOrdersEnd() {
		List<Map<String, Object>> orders = orderService.selectOrders(2, 4);
		NexacroResult result = new NexacroResult();
		result.addDataSet("ds_orders_end", orders);

		return result;
	}

	@RequestMapping(value = "/update.do")
	public NexacroResult updateOrders(
			@ParamDataSet(name = "ds_orders_updaterdy", required = false) List<Map<String, String>> orders) {
		NexacroResult result = new NexacroResult();
		System.out.print("orders count : " + orders.size() + " : ");
		System.out.println(orders);
		int temp = orderService.updateOrders(orders);

		if (temp == 1) {// 성공
			String orderCode = "";
			for (Map<String, String> order : orders) {
				if(orderCode.equals(order.get("ORDER_CODE")))
					continue;
				else
					orderCode = order.get("ORDER_CODE");
				if (Integer.valueOf(String.valueOf(order.get("ORDER_STATE"))) > 1) {
					String to = memberService.selectMemberEmail(order.get("USER_CODE"));
//		    			emailService.sendMail(to, "주문하신 음식이 준비완료되었습니다.");
				}
				
				if (Integer.valueOf(String.valueOf(order.get("PAYMENT_STATE"))) > 1) {
					PointVO vo = new PointVO();
					vo.setUser_code(order.get("USER_CODE"));
					vo.setOrder_code(order.get("ORDER_CODE"));

					List<Map<String, Object>> pointLogs = pointService
							.selectOrderToPointLog(String.valueOf(order.get("ORDER_CODE")));
					for (Map<String, Object> log : pointLogs) {
						int point = Integer.valueOf(String.valueOf(log.get("POINT_CHANGE")));
						vo.setPoint_change(-1 * point);
						pointService.insertPointLog(vo);
					}

					pointService.updateUserPoint(orders.get(0).get("USER_CODE"));
				}
			}
		} else {// 에러
			System.out.println("update Orders : 실패");
		}

		return result;
	}
}
