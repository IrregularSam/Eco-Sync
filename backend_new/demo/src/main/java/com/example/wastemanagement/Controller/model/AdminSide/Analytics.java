package com.example.wastemanagement.Controller.model.AdminSide;

import com.example.wastemanagement.Controller.model.UserSide.WasteEntry;
import org.springframework.stereotype.Component;
import java.util.List;


@Component
public class Analytics {
    // Exmaple methods to analyze data

    // Calculate total waste quantity from all entries =
    public int calculateTotalWaste(List<WasteEntry> entries) {
        int total = 0;
        for(WasteEntry entry : entries) {
            total += entry.getQuantity();
        }
        return total;
    }
    
    //Find the most common waste type
    public String mostCommonWasteType(List<WasteEntry> entries) {
        java.util.Map<String, Integer> typeCount = new java.util.HashMap<>();
        for(WasteEntry entry : entries) {
            typeCount.put(entry.getWasteType(), typeCount.getOrDefault(entry.getWasteType(), 0) + 1);
        }

        String commonType = null;
        int maxCount = 0;
        for (String type : typeCount.keySet()) {
            if (typeCount.get(type) > maxCount) {
                maxCount = typeCount.get(type);
                commonType = type;
            }
        }
        return commonType;
    }

    //Method to calculate waste by type
    public static java.util.Map<String, Long> CalculateWasteByType(java.util.List<WasteEntry> entries) {
        return entries.stream().collect(java.util.stream.Collectors.groupingBy(WasteEntry::getWasteType, java.util.stream.Collectors.counting()));
    }

    //Count unresolved reports
    public int countPendingReports(List<WasteReport> reports) {
        int count = 0;
        for (WasteReport report : reports) {
            if (!report.getStatus().equalsIgnoreCase("Resolved")) {
                count++;
            }
        }
        return count;
    }

    //UTILITY METHOD
    public void displaySummary(List<WasteEntry> entries, List<WasteReport> reports) {
        System.out.println("=== Waste Management Analytics ===");
        System.out.println("Total Waste Collected: " + calculateTotalWaste(entries));
        System.out.println("Most Common Waste Type: " + mostCommonWasteType(entries));
        System.out.println("Pending  Reports: " + countPendingReports(reports));
    }
}
