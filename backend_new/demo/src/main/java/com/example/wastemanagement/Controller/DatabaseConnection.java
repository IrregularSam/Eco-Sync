package com.example.wastemanagement.Controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DatabaseConnection {
    // Embedded SQLite database file created locally
    private static final String URL = "jdbc:sqlite:ecosync.db";

    public static Connection getConnection() {
        try {
            Connection conn = DriverManager.getConnection(URL);
            initializeDatabase(conn);
            return conn;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static void initializeDatabase(Connection conn) {
        try (Statement stmt = conn.createStatement()) {
            // Create Users table
            stmt.execute("CREATE TABLE IF NOT EXISTS Users (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "name TEXT NOT NULL, " +
                    "email TEXT UNIQUE NOT NULL, " +
                    "password TEXT NOT NULL, " +
                    "address TEXT, " +
                    "location TEXT, " +
                    "role TEXT)");

            // Create BoardAdmin table
            stmt.execute("CREATE TABLE IF NOT EXISTS BoardAdmin (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "name TEXT NOT NULL, " +
                    "contactInfo TEXT UNIQUE NOT NULL, " +
                    "password TEXT NOT NULL)");

            // Create WasteEntry table
            stmt.execute("CREATE TABLE IF NOT EXISTS WasteEntry (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "userId INTEGER, " +
                    "wasteType TEXT, " +
                    "quantity INTEGER, " +
                    "timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");

            // Create Reports table
            stmt.execute("CREATE TABLE IF NOT EXISTS Reports (" +
                    "reportId INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "userId INTEGER, " +
                    "location TEXT, " +
                    "issueType TEXT, " +
                    "status TEXT, " +
                    "timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");

            // Create Notifications table
            stmt.execute("CREATE TABLE IF NOT EXISTS Notifications (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "recipient INTEGER, " +
                    "senderId INTEGER, " +
                    "message TEXT, " +
                    "timeSent DATETIME DEFAULT CURRENT_TIMESTAMP)");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
