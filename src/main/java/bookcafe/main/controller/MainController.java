package bookcafe.main.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import bookcafe.book.service.BookService;
import bookcafe.book.service.BookVO;
import bookcafe.cart.service.CartService;
import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;

@Controller
public class MainController {
	@Resource(name = "bookService")
    public BookService bookService;
        
    @Resource(name = "memberService")
    private MemberService memberService;
    
    @Autowired
    private CartService cartService;
    
    // 도서대여 탑3
    @GetMapping("/")
    public String showBookList(Model model,HttpSession session) {
    	
    	List<BookVO> books;
        books = bookService.selectTopBooksOfMonth();
        model.addAttribute("books", books);
        
        String sessionId = (String) session.getAttribute("sessionId");
        if (sessionId != null) {
        	MemberVO loginInfo = (MemberVO) memberService.getUserInfo(sessionId);
        	session.setAttribute("loginInfo", loginInfo);
        	
            String user_code = loginInfo.getUser_code();
            int cartSize = cartService.getCurrentCartSize(user_code);
            session.setAttribute("cartSize", cartSize);
            
        }
        return "/main/index";
    }
	
}