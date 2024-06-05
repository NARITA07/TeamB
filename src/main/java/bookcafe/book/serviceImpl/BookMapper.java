package bookcafe.book.serviceImpl;

import java.util.List;
import java.util.Map;

import bookcafe.book.service.BookVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("bookMapper")
public interface BookMapper {    
    List<BookVO> selectBookList();
    List<BookVO> selectBooksByCategory(String category);
    void updateBookQuantity(String bookCode);
    void insertBorrowRecord(Map<String, Object> borrowRecord);
	void insertOrderRecord(Map<String, Object> orderRecord);
	List<BookVO> selectBorrowedBooksByUser(String userCode);
	List<BookVO> searchBooksByName(String name);
	List<BookVO> searchBooksByAuthor(String author);
	List<BookVO> selectBooksJoinedWithSecName();
	List<BookVO> selectAllCategories();
}
