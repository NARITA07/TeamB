package bookcafe.book.serviceImpl;

import java.util.List;
import java.util.Map;

import bookcafe.book.service.BookVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("bookMapper")
public interface BookMapper {
	//ㄴ
	// 도서 전체목록 조회
    List<BookVO> selectBookList();
    
    // 카테고리별 도서 목록 조회
    List<BookVO> selectBooksByCategory(String category);
    
    // 도서 수량 업데이트
    void updateBookQuantity(String bookCode);
    
    // 대여 기록
    void insertBorrowRecord(Map<String, Object> borrowRecord);
    
    // 주문 기록
    void insertOrderRecord(Map<String, Object> orderRecord);
    
    // 사용자가 대여한 도서 목록 조회
	/* List<BookVO> selectBorrowedBooksByUser(String userCode); */
    
    // 도서 이름으로 검색
    List<BookVO> searchBooksByName(String name);
    
    // 저자 이름으로 검색
    List<BookVO> searchBooksByAuthor(String author);
    
    // 모든 카테고리 조회
    List<BookVO> selectAllCategories();
    
    // 대여 기록 삽입
    void insertBorrowRecordWithCode(Map<String, Object> borrowRecord);
    
    // 도서 대여 가능 여부 확인
    String getBookQuantity(String bookCode);

}
