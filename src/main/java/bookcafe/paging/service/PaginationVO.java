package bookcafe.paging.service;

public class PaginationVO {
    private int totalRecords;
    private int currentPage;
    private int recordsPerPage;
    private int totalPages;
    private int startPage;
    private int endPage;

    public PaginationVO(int totalRecords, int currentPage, int recordsPerPage) {
        this.totalRecords = totalRecords;
        this.currentPage = currentPage;
        this.recordsPerPage = recordsPerPage;
        this.totalPages = (int) Math.ceil((double) totalRecords / recordsPerPage);
        this.startPage = Math.max(1, currentPage - 2);
        this.endPage = Math.min(totalPages, currentPage + 2);

        if (endPage - startPage < 4) {
            if (startPage == 1) {
                endPage = Math.min(startPage + 4, totalPages);
            } else if (endPage == totalPages) {
                startPage = Math.max(1, endPage - 4);
            }
        }
    }

	public int getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getRecordsPerPage() {
		return recordsPerPage;
	}

	public void setRecordsPerPage(int recordsPerPage) {
		this.recordsPerPage = recordsPerPage;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

    
}
