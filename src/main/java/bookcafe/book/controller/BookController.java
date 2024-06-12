package bookcafe.book.controller;

import java.util.HashMap;
import java.util.Iterator;
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
import org.springframework.web.bind.annotation.ResponseBody;

import bookcafe.book.service.BookService;
import bookcafe.book.service.BookVO;
import bookcafe.member.service.MemberService;
import bookcafe.member.service.MemberVO;
import bookcafe.paging.service.PaginationVO;
import bookcafe.paging.service.PagingRequestVO;
import bookcafe.paging.service.PagingService;
import bookcafe.paging.serviceImpl.PagingServiceImpl;

@Controller
public class BookController { 

    private static final Logger logger = LoggerFactory.getLogger(BookController.class);

    @Resource(name = "bookService")
    public BookService bookService;
        
    @Resource(name = "memberService")
    private MemberService memberService;

    // 도서 목록 조회
    @GetMapping("bookList.do")
    public String showBookList(@RequestParam(value = "category", required = false) String category,
                               @RequestParam(value = "searchType", required = false) String searchType,
                               @RequestParam(value = "searchQuery", required = false) String searchQuery,
                               @RequestParam(value = "page", defaultValue = "1") int page,
                               @RequestParam(value = "size", defaultValue = "10") int size,
                               Model model, HttpSession session) {
        PagingRequestVO pagingRequest = new PagingRequestVO(page, size);
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
        
        // 페이징 서비스 객체 생성
        PagingService<BookVO> pagingService = new PagingServiceImpl<>(books);
        // 요청된 페이지의 도서 목록 가져오기
        List<BookVO> pagedBooks = pagingService.getPagedList(pagingRequest);
        // 총 레코드 수 가져오기
        int totalRecords = pagingService.getTotalRecords();
        // 페이징 정보를 담은 객체 생성
        PaginationVO pagination = new PaginationVO(totalRecords, page, size);
        // 모델에 페이징된 도서 목록과 페이징 정보를 추가
        model.addAttribute("books", pagedBooks);
        model.addAttribute("pagination", pagination);
        // 모든 카테고리 가져오기
        List<BookVO> categories = bookService.getAllCategories();
        model.addAttribute("categories", categories);
        // 카트 정보 가져오기
        Map<String, String> cart = (Map<String, String>) session.getAttribute("cart");
        if (cart == null) {
            cart = new HashMap<>();
        }
        cart = bookService.getCart(cart);
        session.setAttribute("cart", cart);
        model.addAttribute("cart", cart);

        /*MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
        if (loginInfo != null) {
            List<BookVO> borrowedBooks = bookService.getBorrowedBooksByUser(loginInfo.getUser_code());
            model.addAttribute("borrowedBooks", borrowedBooks);
        }*/

		model.addAttribute("selectedCategory", category); 
		
        return "/book/bookList";
    }

    // 장바구니에 도서 추가
    @PostMapping(value = "addToCart", produces = "text/html; charset=UTF-8")
    @ResponseBody
    public String addToCart(@RequestParam("bookCode") String bookCode, 
                            @RequestParam("bookName") String bookName, 
                            HttpSession session) {
        Map<String, String> cart = (Map<String, String>) session.getAttribute("cart");
        if (cart == null) {
            cart = new HashMap<>();
        }
        bookService.addToCart(cart, bookCode, bookName);
        session.setAttribute("cart", cart);
		return renderCartHtml(cart);
    }

    // 장바구니에서 도서 제거
    @PostMapping(value = "removeFromCart", produces = "text/html; charset=UTF-8")
    @ResponseBody
    public String removeFromCart(@RequestParam("bookCode") String bookCode, HttpSession session) {
        Map<String, String> cart = (Map<String, String>) session.getAttribute("cart");
        if (cart == null) {
            cart = new HashMap<>();
        }
        bookService.removeFromCart(cart, bookCode);
        session.setAttribute("cart", cart);
		return renderCartHtml(cart);
    }

    // 단일 도서 대여
    @PostMapping(value = "rentBook", produces = "text/html; charset=UTF-8")
    @ResponseBody
    public String rentBook(@RequestParam("bookCode") String bookCode, HttpSession session) {
        Map<String, String> cart = (Map<String, String>) session.getAttribute("cart");
        MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo"); 
        String userCode = loginInfo.getUser_code(); 
        bookService.rentBook(bookCode, userCode, cart);
        session.setAttribute("cart", cart);
		return renderCartHtml(cart);
    }
    
    // 장바구니 도서 대여
    @PostMapping(value = "rentBooks", produces = "text/html; charset=UTF-8")
    @ResponseBody
    public String rentBooks(HttpSession session) {
        Map<String, String> cart = (Map<String, String>) session.getAttribute("cart");
        MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo"); 
        String userCode = loginInfo.getUser_code();

        StringBuilder alertMessage = new StringBuilder();
        // 장바구니가 null이 아니고 비어 있지 않으면 실행
        if (cart != null && !cart.isEmpty()) {
            Iterator<Map.Entry<String, String>> iterator = cart.entrySet().iterator();
            // 장바구니에 있는 모든 책을 확인
            while (iterator.hasNext()) {
                Map.Entry<String, String> entry = iterator.next();
                String bookCode = entry.getKey();
                if (!bookService.isBookAvailable(bookCode)) {
                    if (alertMessage.length() > 0) {
                        alertMessage.append(", ");
                    }
                    alertMessage.append(entry.getValue());
                    iterator.remove();
                }
            }
            if (alertMessage.length() > 0) {
                alertMessage.append(" 책은 이미 대여되어서 대여가 불가능 합니다.");
            }
            if (!cart.isEmpty()) {
                bookService.rentBooks(cart, userCode);
            }
        }
        session.setAttribute("cart", cart);
        return alertMessage.toString();
    }

    // 장바구니 HTML 렌더링
    private String renderCartHtml(Map<String, String> cart) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> entry : cart.entrySet()) {
            sb.append("<div class='cart-item'>")
              .append("<span>").append(entry.getValue()).append("</span>")
              .append("<button class='btn btn-danger remove-from-cart btn-custom' data-book-code='").append(entry.getKey()).append("'>삭제</button>")
              .append("</div>");
        }
        return sb.toString();
    }
    
}
