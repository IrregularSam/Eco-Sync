package com.example.wastemanagement.Controller;

import com.example.wastemanagement.Controller.model.UserSide.Notification;

import org.springframework.web.bind.annotation.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/admin")
public class BoardDashboardController {
    
    //LOGIN ENDPOINT
    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = "SELECT * FROM BoardAdmin WHERE contactInfo=Info=? AND password=?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return "Admin login successful: " + rs.getString("name");
            } else {
                return "Invalid admin credentials!";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error during admin login.";
        }
    }

    //RESOLVE REPORT ENDPOINT
    @PutMapping("/resolve/{id}/resolve")
    public String resolveReport(@PathVariable int id) {
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = "UPDATE Reports SET status= 'Resolved' WHERE reportId=?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);
            int rows = stmt.executeUpdate();
            return rows > 0 ? "Report resolved successfully!" : "Report not found";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error resolving report.";
        }
    }

    //SEND NOTIFICATION ENDPOINT
    @PostMapping("/notification")
    public String sendNotification(@RequestBody Notification notification) {
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = "INSERT INTO Notifications (recipient, senderId, message, timeSent)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, notification.getRecipientId());
            stmt.setInt(2, notification.getSenderId());
            stmt.setString(3, notification.getMessage());
            stmt.executeUpdate();
            return "Notification sent successfully!";
        } catch(Exception e) {
            e.printStackTrace();
            return "Error sending notification.";
        }
    }

    //BASIC ANALYTICS ENDPOINT
    @GetMapping("/analytics/summary")
    public String analyticsSummary() {
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = "SELECT COUNT(*) AS totalReports, SUM(quantity) AS totalWaste FROM WasteEntries";
            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();
            if( rs.next()) {
                return "Analytics Summmary = Total Reports: " + rs.getInt("totalRequests") + 
                "Total Waste Collected: " + rs.getInt("totalWaste");
            } else {
                return "No data available.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error fetching analytics";
        }
    }
    
}
