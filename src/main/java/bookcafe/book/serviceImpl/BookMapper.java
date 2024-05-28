package bookcafe.book.serviceImpl;
	
import java.util.List;

import bookcafe.book.service.BookVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
	
	@Mapper("bookMapper")
	public interface BookMapper {    
		List<BookVO> selectBookList();

	}