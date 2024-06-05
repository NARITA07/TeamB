package bookcafe.book.serviceImpl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bookcafe.book.service.BookService;
import bookcafe.book.service.BookVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("bookService") 
public class BookServiceImpl extends EgovAbstractServiceImpl implements BookService {
    
    @Resource(name = "bookMapper") 
    BookMapper bookMapper;

    @Override
    public List<BookVO> getBookList() {
        return bookMapper.selectBookList();
    }

    @Override
    public List<BookVO> getBooksByCategory(String category) {
        return bookMapper.selectBooksByCategory(category);
    }

    @Override
    public Map<String, String> getCart(Map<String, String> sessionCart) {
        if (sessionCart == null) {
            return new HashMap<>();
        }
        return sessionCart;
    }

    @Override
    public void addToCart(Map<String, String> cart, String bookCode, String bookName) {
        cart.put(bookCode, bookName);
    }

    @Override
    public void removeFromCart(Map<String, String> cart, String bookCode) {
        cart.remove(bookCode);
    }
    
    @Override
    public void rentBooks(Map<String, String> cart, String userCode) {
        for (String bookCode : cart.keySet()) {
            bookMapper.updateBookQuantity(bookCode);

            Map<String, Object> borrowRecord = new HashMap<>();
            borrowRecord.put("bookCode", bookCode);
            borrowRecord.put("userCode", userCode);
            bookMapper.insertBorrowRecord(borrowRecord);

            // 방금 삽입된 borrowRecord에서 borrowCode를 가져옵니다.
            String borrowCode = (String) borrowRecord.get("borrowCode");

            // ORDERS 테이블에 삽입하기 위해 추가
            Map<String, Object> orderRecord = new HashMap<>();
            orderRecord.put("userCode", userCode);
            orderRecord.put("cartCode", borrowCode); // Borrow 코드 사용
            bookMapper.insertOrderRecord(orderRecord);
        }
        cart.clear();
    }

    @Override
    public void rentBook(String bookCode, String userCode, Map<String, String> cart) {
        bookMapper.updateBookQuantity(bookCode);

        Map<String, Object> borrowRecord = new HashMap<>();
        borrowRecord.put("bookCode", bookCode);
        borrowRecord.put("userCode", userCode);
        bookMapper.insertBorrowRecord(borrowRecord);

        // 방금 삽입된 borrowRecord에서 borrowCode를 가져옵니다.
        String borrowCode = (String) borrowRecord.get("borrowCode");

        // ORDERS 테이블에 삽입하기 위해 추가
        Map<String, Object> orderRecord = new HashMap<>();
        orderRecord.put("userCode", userCode);
        orderRecord.put("cartCode", borrowCode); // Borrow 코드 사용
        bookMapper.insertOrderRecord(orderRecord);

        if (cart != null) {
            cart.remove(bookCode);
        }
    }

    @Override
    public void createOrder(String borrowCode, String userCode, Map<String, String> cart) {
        // Create a new order record
        Map<String, Object> orderRecord = new HashMap<>();
        orderRecord.put("adminCode", "admin_1");
        orderRecord.put("userCode", userCode);
        orderRecord.put("cartCode", borrowCode);
        orderRecord.put("orderState", 1); 
        orderRecord.put("totalPrice", 1);
        orderRecord.put("paymentDate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        orderRecord.put("paymentMethod", "admin_1"); 
        orderRecord.put("paymentState", 1);

        bookMapper.insertOrderRecord(orderRecord);
    }

    @Override
    public List<BookVO> getBorrowedBooksByUser(String userCode) {
        return bookMapper.selectBorrowedBooksByUser(userCode);
    }

	@Override
    public List<BookVO> searchBooksByName(String name) {
        return bookMapper.searchBooksByName(name);
    }

	@Override
    public List<BookVO> searchBooksByAuthor(String author) {
        return bookMapper.searchBooksByAuthor(author);
    }

	@Override
    public List<BookVO> getBooksJoinedWithSecName() {
        return bookMapper.selectBooksJoinedWithSecName();
    }

	@Override
    public List<BookVO> getAllCategories() {
        return bookMapper.selectAllCategories();
    }

}