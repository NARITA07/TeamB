package bookcafe.book.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import bookcafe.book.service.BookService;
import bookcafe.book.service.BookVO;
import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;

@Controller
public class BookController { 

    private static final Logger logger = LoggerFactory.getLogger(BookController.class);

    @Resource(name = "bookService")
    public BookService bookService;
        
    @Resource(name = "memberService")
    private MemberService memberService;

    @GetMapping("bookList.do")
    public String showBookList(@RequestParam(value = "category", required = false) String category,
                               @RequestParam(value = "searchType", required = false) String searchType,
                               @RequestParam(value = "searchQuery", required = false) String searchQuery,
                               Model model, HttpSession session) {
        List<BookVO> books;
        if (searchQuery != null && !searchQuery.isEmpty()) {
            if ("name".equals(searchType)) {
                books = bookService.searchBooksByName(searchQuery);
            } else if ("author".equals(searchType)) {
                books = bookService.searchBooksByAuthor(searchQuery);
            } else {
                books = bookService.getBookList();
            }
        } else if (category != null && !category.isEmpty()) {
            books = bookService.getBooksByCategory(category);
        } else {
            books = bookService.getBookList();
        }

        /*for (BookVO book : books) {
            logger.info("Book Code: " + book.getBook_code() + ", Quantity: " + book.getBook_quantity());
        }*/

        model.addAttribute("books", books);
        
        // 모든 카테고리 가져오기
        List<BookVO> categories = bookService.getAllCategories();
        model.addAttribute("categories", categories);
        
        Map<String, String> cart = (Map<String, String>) session.getAttribute("cart");
        if (cart == null) {
            cart = new HashMap<>();
        }
        cart = bookService.getCart(cart);
        session.setAttribute("cart", cart);
        model.addAttribute("cart", cart);
        
        MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
        if (loginInfo != null) {
            List<BookVO> borrowedBooks = bookService.getBorrowedBooksByUser(loginInfo.getUser_code());
            model.addAttribute("borrowedBooks", borrowedBooks);
        }

        // 선택된 카테고리를 모델에 추가
        model.addAttribute("selectedCategory", category);

        return "/book/bookList";
    }

    @PostMapping("addToCart")
    public String addToCart(@RequestParam("bookCode") String bookCode, 
                            @RequestParam("bookName") String bookName, 
                            HttpSession session) {
        Map<String, String> cart = (Map<String, String>) session.getAttribute("cart");
        cart = bookService.getCart(cart);
        bookService.addToCart(cart, bookCode, bookName);
        session.setAttribute("cart", cart);
        return "redirect:/bookList.do";
    }

    @PostMapping("removeFromCart")
    public String removeFromCart(@RequestParam("bookCode") String bookCode, HttpSession session) {
        Map<String, String> cart = (Map<String, String>) session.getAttribute("cart");
        cart = bookService.getCart(cart);
        bookService.removeFromCart(cart, bookCode);
        session.setAttribute("cart", cart);
        return "redirect:/bookList.do";
    }

    @PostMapping("rentBook")
    public String rentBook(@RequestParam("bookCode") String bookCode, HttpSession session) {
        Map<String, String> cart = (Map<String, String>) session.getAttribute("cart");
        MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo"); 
        String userCode = loginInfo.getUser_code(); 
        logger.info("대여유저: " + userCode);
        cart = bookService.getCart(cart);
        bookService.rentBook(bookCode, userCode, cart);
        session.setAttribute("cart", cart);
        return "redirect:/bookList.do";
    }
    
    @PostMapping("rentBooks")
    public String rentBooks(HttpSession session) {
        Map<String, String> cart = (Map<String, String>) session.getAttribute("cart");
        MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo"); 
        String userCode = loginInfo.getUser_code(); 
        logger.info("대여유저: " + userCode);
        cart = bookService.getCart(cart);
        if (cart != null && !cart.isEmpty()) {
            bookService.rentBooks(cart, userCode);
        }
        session.setAttribute("cart", cart);
        return "redirect:/bookList.do";
    }
}
