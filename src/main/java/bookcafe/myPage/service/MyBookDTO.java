package bookcafe.myPage.service;

public class MyBookDTO {
	private String user_code;	//유저코드
	
	//도서대여 테이블
	private String borrow_code;		//대여코드
	private String binding_code;	//관심도서코드
	private String borrow_date;		//대여일자
	private String return_date;		//반납예정일
	
	//반납 테이블
	private String return_code;		//반납코드
	private String book_code;		//도서코드
	private String final_date;		//최종반납일
	private int money;				//연체료
	private String return_payment;	//결제방식
	private String admin_code;		//관리자코드
	
	
	public String getUser_code() {
		return user_code;
	}
	public void setUser_code(String user_code) {
		this.user_code = user_code;
	}
	public String getBorrow_code() {
		return borrow_code;
	}
	public void setBorrow_code(String borrow_code) {
		this.borrow_code = borrow_code;
	}
	public String getBinding_code() {
		return binding_code;
	}
	public void setBinding_code(String binding_code) {
		this.binding_code = binding_code;
	}
	public String getBorrow_date() {
		return borrow_date;
	}
	public void setBorrow_date(String borrow_date) {
		this.borrow_date = borrow_date;
	}
	public String getReturn_date() {
		return return_date;
	}
	public void setReturn_date(String return_date) {
		this.return_date = return_date;
	}
	public String getReturn_code() {
		return return_code;
	}
	public void setReturn_code(String return_code) {
		this.return_code = return_code;
	}
	public String getBook_code() {
		return book_code;
	}
	public void setBook_code(String book_code) {
		this.book_code = book_code;
	}
	public String getFinal_date() {
		return final_date;
	}
	public void setFinal_date(String final_date) {
		this.final_date = final_date;
	}
	public int getMoney() {
		return money;
	}
	public void setMoney(int money) {
		this.money = money;
	}
	public String getReturn_payment() {
		return return_payment;
	}
	public void setReturn_payment(String return_payment) {
		this.return_payment = return_payment;
	}
	public String getAdmin_code() {
		return admin_code;
	}
	public void setAdmin_code(String admin_code) {
		this.admin_code = admin_code;
	}
	
	
}
