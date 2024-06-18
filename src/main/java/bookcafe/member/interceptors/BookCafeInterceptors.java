package bookcafe.member.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import bookcafe.member.service.MemberVO;

public class BookCafeInterceptors extends HandlerInterceptorAdapter{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
	        throws Exception {
	    HttpSession session = request.getSession();
	    MemberVO memberVO = (MemberVO)session.getAttribute("loginInfo");
	    if(memberVO == null) {
	        session.setAttribute("prevPage", request.getRequestURI());
	        response.sendRedirect("/login.do");
	        return false;
	    }
	    return true;
	}
}
