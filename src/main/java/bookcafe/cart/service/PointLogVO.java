package bookcafe.cart.service;

public class PointLogVO {
	private String point_code;
	private String user_code;
	private String order_code;
	private int point_change;
	private String point_joindate;
	public String getPoint_code() {
		return point_code;
	}
	public void setPoint_code(String point_code) {
		this.point_code = point_code;
	}
	public String getUser_code() {
		return user_code;
	}
	public void setUser_code(String user_code) {
		this.user_code = user_code;
	}
	public String getOrder_code() {
		return order_code;
	}
	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}
	public int getPoint_change() {
		return point_change;
	}
	public void setPoint_change(int point_change) {
		this.point_change = point_change;
	}
	public String getPoint_joindate() {
		return point_joindate;
	}
	public void setPoint_joindate(String point_joindate) {
		this.point_joindate = point_joindate;
	}
	
}
