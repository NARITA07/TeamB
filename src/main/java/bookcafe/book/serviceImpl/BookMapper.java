package bookcafe.book.serviceImpl;
	
import java.util.List;

import org.apache.ibatis.annotations.Param;

import bookcafe.book.service.BookVO;
import bookcafe.book.service.BorrowVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
	
	@Mapper("bookMapper")
	public interface BookMapper {    
		List<BookVO> selectBookList();

	}