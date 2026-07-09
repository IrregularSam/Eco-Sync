package com.example.wastemanagement.Controller.model.AdminSide;

public class PickupSchedule {
    private int schduleId;
    private String location;
    private String wasteType;
    private String dateTime;
    private int updatedBy;

    //CONSTRUCTOR
    public PickupSchedule(int schduleId, String location, String wasteType, String dateTime, 
        int updatedBy){

            this.schduleId = schduleId;
            this.location = location;
            this.wasteType = wasteType;
            this.dateTime = dateTime;
            this.updatedBy = updatedBy;
        }

    //GETTERS 
    public int getScheduleId(){
        return schduleId;
    }
    public String getLocation(){
        return location;
    }
    public String getWasteType(){
        return wasteType;
    }
    public String getDateTime(){
        return dateTime;
    }
    public int getUpdatedBy(){
        return updatedBy;
    }

    //SETTERS
    public void setLocation(String location){
        this.location = location;
    }
    public void setWasteType(String wasteType){
        this.wasteType = wasteType;
    }
    public void setDateTime(String dateTime){
        this.dateTime = dateTime;
    }
    public void setUpdatedBy(int updatedBy){
        this.updatedBy = updatedBy;
    }

    //UTILITY 
    public void reschedule(String newDateTime) {
        this.dateTime = newDateTime;
        System.out.println("Pickup rescheduled to: " + newDateTime);
    }

    @Override
    public String toString() {
        return "PickupSchedule [ID=" + schduleId + ", Location=" + location + ", UpdatedByAdmin=" + updatedBy + "]";
    }
}
