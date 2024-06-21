package bookcafe.point.service;

public class PointVO {
	// 포인트테이블 필수입력
	private String point_code;
	private String user_code;
	private String order_code;
	private int point_change;
	private String point_joindate;
	private int point_state;
	
	// 마이페이지 - 포인트 리스트 출력용
	private int rowNum;
	private int payment_state;
	private int user_point;
	private String point_section;
	private int total_price;
	private String startDate;
	private String endDate;
	
	
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
	public int getRowNum() {
		return rowNum;
	}
	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}
	public int getPayment_state() {
		return payment_state;
	}
	public void setPayment_state(int payment_state) {
		this.payment_state = payment_state;
	}
	public int getUser_point() {
		return user_point;
	}
	public void setUser_point(int user_point) {
		this.user_point = user_point;
	}
	public String getPoint_section() {
		return point_section;
	}
	public void setPoint_section(String point_section) {
		this.point_section = point_section;
	}
	public int getTotal_price() {
		return total_price;
	}
	public void setTotal_price(int total_price) {
		this.total_price = total_price;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public int getPoint_state() {
		return point_state;
	}
	public void setPoint_state(int point_state) {
		this.point_state = point_state;
	}
	@Override
	public String toString() {
		return "PointVO [point_code=" + point_code + ", user_code=" + user_code + ", order_code=" + order_code
				+ ", point_change=" + point_change + ", point_joindate=" + point_joindate + ", point_state="
				+ point_state + ", rowNum=" + rowNum + ", payment_state=" + payment_state + ", user_point=" + user_point
				+ ", point_section=" + point_section + ", total_price=" + total_price + ", startDate=" + startDate
				+ ", endDate=" + endDate + "]";
	}
	
	
	
}
