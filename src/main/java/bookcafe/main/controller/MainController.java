package bookcafe.main.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import bookcafe.book.service.BookService;
import bookcafe.book.service.BookVO;
import bookcafe.member.service.MemberService;

@Controller
public class MainController {
	@Resource(name = "bookService")
    public BookService bookService;
        
    @Resource(name = "memberService")
    private MemberService memberService;

    // 도서대여 탑3
    @GetMapping("/")
    public String showBookList(Model model) {
        List<BookVO> books;
            books = bookService.selectTopBooksOfMonth();
            model.addAttribute("books", books);
      	
        return "/main/index";
    }
	
}
