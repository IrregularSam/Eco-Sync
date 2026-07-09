package com.example.wastemanagement.Controller.model.UserSide;

public class User {
    private int userId;
    private String name;
    private String email;
    private String location;
    private String role;

    public User( int userId, String name, String email, String location, String role) {

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.location = location;
        this.role = role;
    }

    //GETTERS
    public int getUserId() {
        return userId;
    }
    public String getName() {
        return name;
    }
    public String getemail() {
        return email;
    }
    public String getlocation() {
        return location;
    }
    public String getrole() {
        return role;
    }

    //SETTERS
    public void setUserId(int UserId){
        this.userId = UserId;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setLocation(String location){
        this.location = location;
    }
    public void setRole(String role){
        this.role = role;
    }

    //UTITLITY METHOD
    @Override
    public String toString() {
        return "User [ID=" + userId + ", Name=" + name + ", Email=" + email + "," + 
                        "            Location=" + location + ", Role=" + role + "]"; 
    }
}
