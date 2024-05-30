package bookcafe.myPage.service;

public class MyOrderDTO {
	// 주문자
	private String user_code;	//유저코드
	
	// 장바구니 테이블(CART)
	private String cart_code;	//카트코드
	private int order_quantity;	//주문수량
	
	// 음식 테이블(FOOD)
	private String product_code;		//음식코드
	private String product_name;		//음식이름
	private int product_price;			//가격
	private int product_quantity;		//재고
	private String product_category;	//카테고리
	private String product_path;		//경로
	
	// 주문 테이블(ORDERS)
	private String order_code;			//주문코드
	private String admin_code;			//관리자코드
	private int order_state;			//주문상태(0:준비중, 1:준비중(재고감소), 2:준비완료, 3:픽업완료)
	private int total_price;			//총 금액
	private String payment_date;		//결제일자
	private int payment_method;			//결제방식(1:카드, 2:포인트)
	private int payment_state;			//결제상태(0:결제중, 1:결제완료, 2:환불, 3:취소)
	
	
	
	public String getUser_code() {
		return user_code;
	}
	public void setUser_code(String user_code) {
		this.user_code = user_code;
	}
	public String getCart_code() {
		return cart_code;
	}
	public void setCart_code(String cart_code) {
		this.cart_code = cart_code;
	}
	public int getOrder_quantity() {
		return order_quantity;
	}
	public void setOrder_quantity(int order_quantity) {
		this.order_quantity = order_quantity;
	}
	public String getProduct_code() {
		return product_code;
	}
	public void setProduct_code(String product_code) {
		this.product_code = product_code;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public int getProduct_price() {
		return product_price;
	}
	public void setProduct_price(int product_price) {
		this.product_price = product_price;
	}
	public int getProduct_quantity() {
		return product_quantity;
	}
	public void setProduct_quantity(int product_quantity) {
		this.product_quantity = product_quantity;
	}
	public String getProduct_category() {
		return product_category;
	}
	public void setProduct_category(String product_category) {
		this.product_category = product_category;
	}
	public String getProduct_path() {
		return product_path;
	}
	public void setProduct_path(String product_path) {
		this.product_path = product_path;
	}
	public String getOrder_code() {
		return order_code;
	}
	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}
	public String getAdmin_code() {
		return admin_code;
	}
	public void setAdmin_code(String admin_code) {
		this.admin_code = admin_code;
	}
	public int getOrder_state() {
		return order_state;
	}
	public void setOrder_state(int order_state) {
		this.order_state = order_state;
	}
	public int getTotal_price() {
		return total_price;
	}
	public void setTotal_price(int total_price) {
		this.total_price = total_price;
	}
	public String getPayment_date() {
		return payment_date;
	}
	public void setPayment_date(String payment_date) {
		this.payment_date = payment_date;
	}
	public int getPayment_method() {
		return payment_method;
	}
	public void setPayment_method(int payment_method) {
		this.payment_method = payment_method;
	}
	public int getPayment_state() {
		return payment_state;
	}
	public void setPayment_state(int payment_state) {
		this.payment_state = payment_state;
	}
	
}
