package bookcafe.cart.service;

public class PricePointVO {
	private int total_price;
	private int user_points;
	public int getUser_points() {
		return user_points;
	}
	public void setUser_points(int user_points) {
		this.user_points = user_points;
	}
	public int getTotal_price() {
		return total_price;
	}
	public void setTotal_price(int total_price) {
		this.total_price = total_price;
	}
}
