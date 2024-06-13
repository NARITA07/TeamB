package bookcafe.cart.service;

public class ReceiptVO {
	private String order_code;
	private String product_name;
	private String order_quantity;
	private String product_amount;
	private String total_price;
	private String payment_date;
	private String total_amount;
	private String point_change1;
	private String point_change2;
	private int order_amount;
	private String product_code;
	
	@Override
	public String toString() {
		return "ReceiptVO [order_code=" + order_code + ", product_name=" + product_name + ", order_quantity="
				+ order_quantity + ", product_amount=" + product_amount + ", total_price=" + total_price
				+ ", payment_date=" + payment_date + ", total_amount=" + total_amount + ", point_change1="
				+ point_change1 + ", point_change2=" + point_change2 + ", order_amount=" + order_amount
				+ ", product_code=" + product_code + "]";
	}
	public String getOrder_code() {
		return order_code;
	}
	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getOrder_quantity() {
		return order_quantity;
	}
	public void setOrder_quantity(String order_quantity) {
		this.order_quantity = order_quantity;
	}
	public String getProduct_amount() {
		return product_amount;
	}
	public void setProduct_amount(String product_amount) {
		this.product_amount = product_amount;
	}
	public String getTotal_price() {
		return total_price;
	}
	public void setTotal_price(String total_price) {
		this.total_price = total_price;
	}
	public String getPayment_date() {
		return payment_date;
	}
	public void setPayment_date(String payment_date) {
		this.payment_date = payment_date;
	}
	public String getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(String total_amount) {
		this.total_amount = total_amount;
	}
	public String getPoint_change1() {
		return point_change1;
	}
	public void setPoint_change1(String point_change1) {
		this.point_change1 = point_change1;
	}
	public String getPoint_change2() {
		return point_change2;
	}
	public void setPoint_change2(String point_change2) {
		this.point_change2 = point_change2;
	}
	public int getOrder_amount() {
		return order_amount;
	}
	public void setOrder_amount(int order_amount) {
		this.order_amount = order_amount;
	}
	public String getProduct_code() {
		return product_code;
	}
	public void setProduct_code(String product_code) {
		this.product_code = product_code;
	}
	
	
}
