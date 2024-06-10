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
    
    // 도서 목록 조회
    @Override
    public List<BookVO> getBookList() {
        return bookMapper.selectBookList();
    }
    
    // 카테고리별 도서 목록 조회
    @Override
    public List<BookVO> getBooksByCategory(String category) {
        return bookMapper.selectBooksByCategory(category);
    }
    
    // 장바구니 조회
    @Override
    public Map<String, String> getCart(Map<String, String> sessionCart) {
        if (sessionCart == null) {
            return new HashMap<>();
        }
        return sessionCart;
    }

    // 장바구니에 도서 추가
    @Override
    public void addToCart(Map<String, String> cart, String bookCode, String bookName) {
        cart.put(bookCode, bookName);
    }

    // 장바구니에서 도서 제거
    @Override
    public void removeFromCart(Map<String, String> cart, String bookCode) {
        cart.remove(bookCode);
    }
    
    // 장바구니에 있는 도서 대여
    @Override
    public void rentBooks(Map<String, String> cart, String userCode) {
        if (cart == null || cart.isEmpty()) {
            return;
        }

        String borrowCode = null;
        boolean isFirst = true;

        for (String bookCode : cart.keySet()) {
            if (isFirst) {
                Map<String, Object> borrowRecord = new HashMap<>();
                borrowRecord.put("bookCode", bookCode);
                borrowRecord.put("userCode", userCode);
                bookMapper.insertBorrowRecord(borrowRecord);
                borrowCode = (String) borrowRecord.get("borrowCode");
                isFirst = false;
            } else {
                Map<String, Object> borrowRecord = new HashMap<>();
                borrowRecord.put("borrowCode", borrowCode);
                borrowRecord.put("bookCode", bookCode);
                borrowRecord.put("userCode", userCode);
                bookMapper.insertBorrowRecordWithCode(borrowRecord);
            }

            bookMapper.updateBookQuantity(bookCode);
        }

        Map<String, Object> orderRecord = new HashMap<>();
        orderRecord.put("userCode", userCode);
        orderRecord.put("cartCode", borrowCode);
        bookMapper.insertOrderRecord(orderRecord);

        cart.clear();
    }

    // 단일 도서 대여
    @Override
    public void rentBook(String bookCode, String userCode, Map<String, String> cart) {
        bookMapper.updateBookQuantity(bookCode);

        Map<String, Object> borrowRecord = new HashMap<>();
        borrowRecord.put("bookCode", bookCode);
        borrowRecord.put("userCode", userCode);
        bookMapper.insertBorrowRecord(borrowRecord);

        String borrowCode = (String) borrowRecord.get("borrowCode");

        Map<String, Object> orderRecord = new HashMap<>();
        orderRecord.put("userCode", userCode);
        orderRecord.put("cartCode", borrowCode);
        bookMapper.insertOrderRecord(orderRecord);

        if (cart != null) {
            cart.remove(bookCode);
        }
    }

    // 대여주문
    @Override
    public void createOrder(String borrowCode, String userCode, Map<String, String> cart) {
        Map<String, Object> orderRecord = new HashMap<>();
        orderRecord.put("adminCode", "admin_1");
        orderRecord.put("userCode", userCode);
        orderRecord.put("cartCode", borrowCode);
        orderRecord.put("orderState", 1); 
        orderRecord.put("totalPrice", 0);
        orderRecord.put("paymentDate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        orderRecord.put("paymentMethod", 0); 
        orderRecord.put("paymentState", 1);

        bookMapper.insertOrderRecord(orderRecord);
    }

    // 사용자가 대여한 도서 목록 조회
    /*@Override
    public List<BookVO> getBorrowedBooksByUser(String userCode) {
        return bookMapper.selectBorrowedBooksByUser(userCode);
    }*/

    // 도서 이름으로 검색
    @Override
    public List<BookVO> searchBooksByName(String name) {
        return bookMapper.searchBooksByName(name);
    }
    
    // 저자 이름으로 검색
    @Override
    public List<BookVO> searchBooksByAuthor(String author) {
        return bookMapper.searchBooksByAuthor(author);
    }
    
    // 모든 카테고리 조회
    @Override
    public List<BookVO> getAllCategories() {
        return bookMapper.selectAllCategories();
    }


}
