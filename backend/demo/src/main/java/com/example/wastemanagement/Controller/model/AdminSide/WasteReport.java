package com.example.wastemanagement.Controller.model.AdminSide;

public class WasteReport {
    private int reportId;
    private int userId;
    private String location;
    private String issueType;
    private String status;
    private String timestamp;
    private int assignedAdmin;

    //CONSTRUCTOR
    public WasteReport(int reportId, int userId, String location, String issueType,
         String timestamp){

            this.reportId = reportId;
            this.userId = userId;
            this.location = location;
            this.issueType = issueType;
            this.status = "pending";
            this.timestamp = timestamp;
            this.assignedAdmin = -1;
         }

    //GETTERS
    public int getReportId(){
        return reportId;
    }
    public int getUserId(){
        return userId;
    }
    public String getLocation(){
        return location;
    }
    public String getIssueType(){
        return issueType;
    }
    public String getTimeStamp(){
        return timestamp;
    }
    public String getStatus(){
        return status;
    }
    public int getAssignedAmin(){
        return assignedAdmin;
    }

    //SETTERS
    public void setLocation(String location){
        this.location = location;
    }
    public void setIssueType(String issueType){
        this.issueType = issueType;
    }
    public void setTimestamp(String timesstamp){
        this.timestamp = timesstamp;
    }
    public void setAssignedAdmin(int assignedAdmin){
        this.assignedAdmin = assignedAdmin;
    }

    public void markResolved(){
        this.status = "Resolved";
    }

    //UTILITY METHOD
    public String toString() {
        return "WasteReport [ID=" + reportId + ", UserID=" + userId + ", Location=" + location + ", Status=" + status + ", Timestamp=" + timestamp + ", AssignedAdmin=" + assignedAdmin + "]";
    }
}
