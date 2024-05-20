package bookcafe.book.service;

public class BorrowVO {
    private String borrow_code;
    private String borrow_date;
    private String return_date;
    private String money;
    private String book_code;
    private String user_code;

    public String getBorrow_code() {
        return borrow_code;
    }

    public void setBorrow_code(String borrow_code) {
        this.borrow_code = borrow_code;
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

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getBook_code() {
        return book_code;
    }

    public void setBook_code(String book_code) {
        this.book_code = book_code;
    }

    public String getUser_code() {
        return user_code;
    }

    public void setUser_code(String user_code) {
        this.user_code = user_code;
    }
}
