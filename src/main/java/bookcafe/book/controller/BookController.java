package bookcafe.book.controller;


import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import bookcafe.book.service.BookService;
import bookcafe.book.service.BorrowService;
import bookcafe.member.service.MemberService;

@Controller
public class BookController { 
	
	@Resource(name = "bookService")
    public BookService bookService;

	@Resource(name = "borrowService")
	private BorrowService borrowService;
	    
	@Resource(name = "memberService")
	private MemberService memberService;
	
    @GetMapping("bookList.do")
    public String showBookList(Model model) {
        model.addAttribute("books", bookService.getBookList());
        return "/book/bookList";
    }
    
   
}
 