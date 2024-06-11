package bookcafe.book.service;

import java.util.List;
import java.util.Map;

public interface BookService {

	// 도서 목록 조회
    List<BookVO> getBookList();
    
    // 카테고리별 도서 목록 조회
    List<BookVO> getBooksByCategory(String category);
    
    // 장바구니 조회
    Map<String, String> getCart(Map<String, String> sessionCart);
    
    // 장바구니에 도서 추가
    void addToCart(Map<String, String> cart, String bookCode, String bookName);
    
    // 장바구니에서 도서 제거
    void removeFromCart(Map<String, String> cart, String bookCode);
    
    // 장바구니에 있는 도서 대여
    void rentBooks(Map<String, String> cart, String userCode);
    
    // 단일 도서 대여
    void rentBook(String bookCode, String userCode, Map<String, String> cart);
    
    // 대여주문
    void createOrder(String borrowCode, String userCode, Map<String, String> cart);
    
    // 사용자가 대여한 도서 목록 조회
	/* List<BookVO> getBorrowedBooksByUser(String userCode); */
    
    // 도서 이름으로 검색
    List<BookVO> searchBooksByName(String name);
    
    // 저자 이름으로 검색
    List<BookVO> searchBooksByAuthor(String author);
    
    // 모든 카테고리 조회
    List<BookVO> getAllCategories();
    
    // 도서 대여 가능 여부 확인
    boolean isBookAvailable(String bookCode);

}
