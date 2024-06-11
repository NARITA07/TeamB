package bookcafe.paging.service;

import java.util.List;

public interface PagingService<T> {
    List<T> getPagedList(PagingRequestVO pagingRequest);
    int getTotalRecords();
}
