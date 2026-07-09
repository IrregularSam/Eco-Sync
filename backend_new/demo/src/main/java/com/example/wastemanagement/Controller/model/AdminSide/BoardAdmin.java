package com.example.wastemanagement.Controller.model.AdminSide;

public class BoardAdmin {
    private int adminId;
    private String name;
    private String role;
    private String contactInfo;

    //CONSTRUCTOR
    public BoardAdmin(int adminId, String name, String role, String contactInfo){
        this.adminId = adminId;
        this.name = name;
        this.role = role;
        this.contactInfo = contactInfo;
    }

    //GETTERS
    public int getAdmin(){
        return adminId;
    }
    public String getName(){
        return name;
    }
    public String getRole(){
        return role;
    }
    public String getContactInfo(){
        return contactInfo;
    }

    //SETTERS
    public void setName(String name){
        this.name = name;
    }
    public void setRole(String role){
        this.role = role;
    }
    public void setContactInfo(String contactInfo){
        this.contactInfo = contactInfo;
    } 

    // UTILITY METHODS
    public void sendNotification(String message){
        System.out.println("Admin " + name + " sent notification: " + message);
    }
    public void updateSchedule(String scheduleDetails){
        System.out.println("Admin " + name + " Updated schedule: " + scheduleDetails);
    }

    @Override
    public String toString() {
        return "BoradAdmin [ID=" + adminId + ", Name=" + name + ", Role=" + role
         + ", Contact=" + contactInfo + " ]";
    }
}
