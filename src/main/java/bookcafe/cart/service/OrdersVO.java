package bookcafe.cart.service;

public class OrdersVO {
	private String order_code;
	private String admin_code;
	private String user_code;
	private String cart_code;
	private int order_state;
	private int total_price;
	private String payment_date;
	private int payment_state;
	
	
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
	public int getPayment_state() {
		return payment_state;
	}
	public void setPayment_state(int payment_state) {
		this.payment_state = payment_state;
	}
	
	@Override
	public String toString() {
		return "OrdersVO [order_code=" + order_code + ", admin_code=" + admin_code + ", user_code=" + user_code
				+ ", cart_code=" + cart_code + ", order_state=" + order_state + ", total_price=" + total_price
				+ ", payment_date=" + payment_date + ", payment_state=" + payment_state + "]";
	}
	
}
