package bookcafe.book.serviceImpl;

import java.util.List;

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
    
}
 