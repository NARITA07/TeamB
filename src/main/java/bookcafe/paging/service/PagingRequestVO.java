package bookcafe.paging.service;

public class PagingRequestVO {
    private int page;       // 요청 페이지 번호
    private int size;       // 페이지당 레코드 수

    public PagingRequestVO() {
        this.page = 1;
        this.size = 10;
    }

    public PagingRequestVO(int page, int size) {
        this.page = page;
        this.size = size;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}
