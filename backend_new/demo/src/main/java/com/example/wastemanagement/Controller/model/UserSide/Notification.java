package com.example.wastemanagement.Controller.model.UserSide;

public class Notification {
    private int notificationId;
    private int recipientId;
    private int senderId;
    private String message;
    private String timeSent;

    //CONSTRUCTOR
    public Notification(int notificationId, int recipientId, int senderId, String message, String timeSent){
        this.notificationId = notificationId;
        this.recipientId = recipientId;
        this.senderId = senderId;
        this.message = message;
        this.timeSent = timeSent;
    }

    //GETTERS
    public int getNotificationId(){
        return notificationId;
    }
    public int getRecipientId(){
        return recipientId;
    }
    public int getSenderId(){
        return senderId;
    }
    public String getMessage(){
        return message;
    }
    public String getTimeSent(){
        return timeSent;
    }

    //SETTERS
    public void setMessage(String message){
        this.message = message;
    }
    public void setTimeSent(String timeSent){
        this.timeSent = timeSent;
    }

    //UTILITY METHOD
    public void display() {
        System.out.println("Notification: " + message + "(Sent at " +  timeSent + ")");
    }

    @Override
    public String toString() {
        return "Notification [ID=" + notificationId + ", RecipientID=" + recipientId + ",                                           SenderID=" + senderId + ", Message=" + message + ", Timesent=" + timeSent + "]";
    }
}