package bookcafe.paging.serviceImpl;

import java.util.List;

import bookcafe.paging.service.PagingRequestVO;
import bookcafe.paging.service.PagingService;

public class PagingServiceImpl<T> implements PagingService<T> {
    private final List<T> allRecords; // 모든 레코드

    public PagingServiceImpl(List<T> allRecords) {
        this.allRecords = allRecords;
    }

    @Override
    public List<T> getPagedList(PagingRequestVO pagingRequest) {
        int fromIndex = (pagingRequest.getPage() - 1) * pagingRequest.getSize();
        int toIndex = Math.min(fromIndex + pagingRequest.getSize(), allRecords.size());
        return allRecords.subList(fromIndex, toIndex);
    }

    @Override
    public int getTotalRecords() {
        return allRecords.size();
    }
}
