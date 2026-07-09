package com.example.wastemanagement.Controller.model.UserSide;

public class Report {
    private int reportId;
    private int userId;
    private String location;
    private String issueType;
    private String status;
    private String timestamp;

    //CONSTRUCTORS
    public Report(int reportId, int userId, String location, String issueType, String status, String timestamp){

        this.reportId = reportId;
        this.userId = userId;
        this.location = location;
        this.issueType = issueType;
        this.status = status;
        this.timestamp = timestamp;
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
    public String getStatus(){
        return status;
    }
    public String getTimestamp(){
        return timestamp;
    }

    //SETTERS
    public void setLocation(String location){
        this.location = location;
    }
    public void setIssueType(String issueType){
        this.issueType = issueType;
    }
    public void setStatus(String status){
        this.issueType = status;
    }

    //UTITLITY METHOD
    public void markResolved() {
        this.status ="Resolved";
    }

    @Override
    public String toString() {
        return "Report [ID=" + reportId + ", UserID=" + userId +
        ", Location=" + location + ", Issue=" + issueType + ",                                                                        Status=" + status + ", Timestamp=" + timestamp + "]";
    }
}


