package com.hexaware.simplyfly.dto;

public class RegisterRequest {

	private String username;
    private String password;
    private String roles;
	private String email;
    
    public RegisterRequest() {
		super();
	}

	public RegisterRequest(String username, String password, String roles, String email) {
		super();
		this.username = username;
		this.password = password;
		this.roles = roles;
		this.email = email;
	}

	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getRoles() {
		return roles;
	}


	public void setRoles(String roles) {
		this.roles = roles;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "RegisterRequest [username=" + username + ", password=" + password + ", roles=" + roles + "]";
	} 
    
    
}
