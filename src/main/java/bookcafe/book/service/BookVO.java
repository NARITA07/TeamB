package bookcafe.book.service;

public class BookVO {
	private String book_code;
    private String book_name;
    private String book_quantity;
    private String book_price;
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
	public String getBook_price() {
		return book_price;
	}
	public void setBook_price(String book_price) {
		this.book_price = book_price;
	}
}
