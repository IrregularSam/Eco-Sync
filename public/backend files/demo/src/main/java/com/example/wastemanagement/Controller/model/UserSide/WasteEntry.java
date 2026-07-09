package com.example.wastemanagement.Controller.model.UserSide;

public class WasteEntry {
    private int entryId;
    private int userId;
    private String wasteType;
    private int quantity;
    private String timestamp;

    //CONSTRUCTOR
    public WasteEntry(int entryId, int userId, String wasteType, int quantity, String timestamp){

        this.entryId = entryId;
        this.userId = userId;
        this.wasteType = wasteType;
        this.quantity = quantity;
        this.timestamp = timestamp;
    }

    //GETTERS
    public int getEntryId(){
        return entryId;
    }
    public int getUserId(){
        return userId;
    }
    public String getWasteType(){
        return wasteType;
    }
    public int getQuantity(){
        return quantity;
    }
    public String getTimestamp(){
        return timestamp;
    }

    //SETTERS
    public void setWasteType(String wasterType){
        this.wasteType = wasterType;
    }
    public void setQuantity(int quantity){
        this.quantity = quantity;
    }
    public void setTimestamp(String timestamp){
        this.timestamp = timestamp;
    }

    //UTITLITY METHOD
    @Override
    public String toString() {
        return "WasteEntry [ID=" + entryId + ", UserId=" + userId + ", Type=" + wasteType + ", Quantity="
    + quantity + ", Timestamp=" + timestamp + "]";
    }
}
