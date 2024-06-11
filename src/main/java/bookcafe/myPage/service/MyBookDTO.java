package bookcafe.myPage.service;

public class MyBookDTO {
	private int rowNum;
	
	// 주문자
	private String user_code;	//유저코드
	
	// 도서 테이블(BOOK)
	private String book_code;				//도서코드
	private String book_name;				//책이름
	private String book_quantity;			//대여 여부?
	private String book_writer;				//저자
	private String book_publication_date;	//출판일
	private String book_path;				//경로
	private String book_category;			//카테고리
	private int book_cnt;					//대여횟수
	
	// 도서대여신청 테이블(BORROW)
	private String borrow_code;			//카트코드
	
	// 주문 테이블(ORDERS)
	private String order_code;			//주문코드
	private String cart_code;			//카트코드
	private int order_state;			//주문상태(1:준비(재고감소), 2:준비중, 3:준비완료)
	private String payment_date;		//결제일자
	
	// SEC_CODE
	private String sec_name;			//카테고리 이름
	
	
	
	public int getRowNum() {
		return rowNum;
	}
	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}
	public String getUser_code() {
		return user_code;
	}
	public void setUser_code(String user_code) {
		this.user_code = user_code;
	}
	public String getBook_code() {
		return book_code;
	}
	public void setBook_code(String book_code) {
		this.book_code = book_code;
	}
	public String getBook_name() {
		return book_name;
	}
	public void setBook_name(String book_name) {
		this.book_name = book_name;
	}
	public String getBook_quantity() {
		return book_quantity;
	}
	public void setBook_quantity(String book_quantity) {
		this.book_quantity = book_quantity;
	}
	public String getBook_writer() {
		return book_writer;
	}
	public void setBook_writer(String book_writer) {
		this.book_writer = book_writer;
	}
	public String getBook_publication_date() {
		return book_publication_date;
	}
	public void setBook_publication_date(String book_publication_date) {
		this.book_publication_date = book_publication_date;
	}
	public String getBook_path() {
		return book_path;
	}
	public void setBook_path(String book_path) {
		this.book_path = book_path;
	}
	public String getBook_category() {
		return book_category;
	}
	public void setBook_category(String book_category) {
		this.book_category = book_category;
	}
	public int getBook_cnt() {
		return book_cnt;
	}
	public void setBook_cnt(int book_cnt) {
		this.book_cnt = book_cnt;
	}
	public String getBorrow_code() {
		return borrow_code;
	}
	public void setBorrow_code(String borrow_code) {
		this.borrow_code = borrow_code;
	}
	public String getOrder_code() {
		return order_code;
	}
	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}
	public String getCart_code() {
		return cart_code;
	}
	public void setCart_code(String cart_code) {
		this.cart_code = cart_code;
	}
	public int getOrder_state() {
		return order_state;
	}
	public void setOrder_state(int order_state) {
		this.order_state = order_state;
	}
	public String getPayment_date() {
		return payment_date;
	}
	public void setPayment_date(String payment_date) {
		this.payment_date = payment_date;
	}
	public String getSec_name() {
		return sec_name;
	}
	public void setSec_name(String sec_name) {
		this.sec_name = sec_name;
	}
	
	@Override
	public String toString() {
		return "MyBookDTO [rowNum=" + rowNum + ", user_code=" + user_code + ", book_code=" + book_code + ", book_name="
				+ book_name + ", book_quantity=" + book_quantity + ", book_writer=" + book_writer
				+ ", book_publication_date=" + book_publication_date + ", book_path=" + book_path + ", book_category="
				+ book_category + ", book_cnt=" + book_cnt + ", borrow_code=" + borrow_code + ", order_code="
				+ order_code + ", cart_code=" + cart_code + ", order_state=" + order_state + ", payment_date="
				+ payment_date + ", sec_name=" + sec_name + "]";
	}
	
}
