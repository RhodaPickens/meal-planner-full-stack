package com.mealplanner.meal_planner_backend.services;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public abstract class Report {
    private String title;
    private LocalDateTime generatedAt;

    public Report(String title) {
        this.title = title;
        this.generatedAt = LocalDateTime.now();
    }

    // which columns to create
    public abstract List<String> getColumns();
    // fills in rows
    public abstract List<List<Object>> generateReportData();

}
