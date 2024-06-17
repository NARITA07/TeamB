package bookcafe.cart.service;

public class CartVO {
	private String user_code;
	private String product_code;
	private String cart_code;
	private int order_quantity;
	private int count_cart;
	private String user_id;
	private String product_name;
	private int product_price;
	private String sequence_number;
	private String product_quantity;
	
	public String getUser_code() {
		return user_code;
	}
	public void setUser_code(String user_code) {
		this.user_code = user_code;
	}
	public String getProduct_code() {
		return product_code;
	}
	public void setProduct_code(String product_code) {
		this.product_code = product_code;
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
	public int getCount_cart() {
		return count_cart;
	}
	public void setCount_cart(int count_cart) {
		this.count_cart = count_cart;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public int getProduct_price() {
		return product_price;
	}
	public void setProduct_price(int product_price) {
		this.product_price = product_price;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getSequence_number() {
		return sequence_number;
	}
	public void setSequence_number(String sequence_number) {
		this.sequence_number = sequence_number;
	}
	public String getProduct_quantity() {
		return product_quantity;
	}
	public void setProduct_quantity(String product_quantity) {
		this.product_quantity = product_quantity;
	}
	@Override
	public String toString() {
		return "CartVO [user_code=" + user_code + ", product_code=" + product_code + ", cart_code=" + cart_code
				+ ", order_quantity=" + order_quantity + ", count_cart=" + count_cart + ", user_id=" + user_id
				+ ", product_name=" + product_name + ", product_price=" + product_price + ", sequence_number="
				+ sequence_number + ", product_quantity=" + product_quantity + "]";
	}
	
}
