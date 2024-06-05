package bookcafe.book.service;

import java.util.List;
import java.util.Map;

public interface BookService {
	List<BookVO> getBookList();
    List<BookVO> getBooksByCategory(String category);
    Map<String, String> getCart(Map<String, String> sessionCart);
    void addToCart(Map<String, String> cart, String bookCode, String bookName);
    void removeFromCart(Map<String, String> cart, String bookCode);
    void rentBooks(Map<String, String> cart, String userCode); 
    void rentBook(String bookCode, String userCode, Map<String, String> cart);
    void createOrder(String borrowCode, String userCode, Map<String, String> cart);
    List<BookVO> getBorrowedBooksByUser(String userCode); 
	List<BookVO> searchBooksByName(String name);
	List<BookVO> searchBooksByAuthor(String author);
	List<BookVO> getBooksJoinedWithSecName();
	List<BookVO> getAllCategories();
	
}
