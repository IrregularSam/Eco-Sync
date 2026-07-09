package com.example.wastemanagement.Controller;

import com.example.wastemanagement.Controller.model.UserSide.WasteEntry;
import com.example.wastemanagement.Controller.model.AdminSide.WasteReport;

import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/users")
public class UserAppController {

    //LOGIN
    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        try(Connection conn = DatabaseConnection.getConnection()) {
            String sql = "SELECT * FROM Users WHERE email=/? AND password=?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return "Login successful for user: " + rs.getString("name");
            } else {
                return "Invalid credentials!";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error during login";
        }
    }

    //LOG WASTE ENTRY ENDPOINT
    @PostMapping("/waste-entry")
    public String logWaste(@RequestBody WasteEntry entry) {
        try(Connection conn = DatabaseConnection.getConnection()) {
            String sql = "INSERT INTO WasteEntry (userId, wasteType, quantity, timestamp) VALUES (?, ?, ?, NOW())";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, entry.getUserId());
            stmt.setString(2, entry.getWasteType());
            stmt.setInt(3, entry.getQuantity());
            stmt.executeUpdate();
            return "waste entry logged successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error logging waste entry.";
        }
    }

    //SUBMIT REPORT ENDPOINT
    @PostMapping("/report")
    public String submitReport(@RequestBody WasteReport report) {
        try(Connection conn = DatabaseConnection.getConnection()) {
            String sql = "INSERT INTO Report (userId, location, issueType, status, timestamp) VALUE (?, ?, ?, 'Pending', NOW())";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, report.getUserId());
            stmt.setString(2, report.getLocation());
            stmt.setString(3, report.getIssueType());
            stmt.executeUpdate();
            return "Report submitted auccessfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error submitting report.";
        }
    }

    @GetMapping("/hello")
    public String hello() {
        return "Welcome to waste management";
    }
    
}

