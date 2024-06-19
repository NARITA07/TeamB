package bookcafe.member.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import bookcafe.cart.service.CartService;
import bookcafe.member.service.MemberVO;

public class BookCafeInterceptors extends HandlerInterceptorAdapter{

	@Autowired
	private CartService cartService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
	        throws Exception {
	    HttpSession session = request.getSession();
	    MemberVO memberVO = (MemberVO)session.getAttribute("loginInfo");
	    if(memberVO == null) {
	        session.setAttribute("prevPage", request.getRequestURI());
	        response.sendRedirect("/login.do");
	        return false;
	    }else {
            int cartSize = cartService.getCurrentCartSize(memberVO.getUser_code());
            session.setAttribute("cartSize", cartSize);
        }
	    return true;
	}
}
