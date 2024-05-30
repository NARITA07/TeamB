package bookcafe.myPage.service;

public class PWchangeDTO {
	private String user_id;
    private String password;
    private String newPassword;
    
    public PWchangeDTO() {
    }

	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
	@Override
	public String toString() {
		return "PWchangeDTO [user_id=" + user_id + ", password=" + password + ", newPassword=" + newPassword + "]";
	}
	
}
