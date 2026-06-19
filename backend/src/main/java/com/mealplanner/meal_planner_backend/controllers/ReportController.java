package com.mealplanner.meal_planner_backend.controllers;

import com.mealplanner.meal_planner_backend.services.Report;
import com.mealplanner.meal_planner_backend.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/todays-plan")
    public Report getTodaysPlan(@RequestParam Long userId) {
        return reportService.getTodaysPlanReport(userId);
    }

    @GetMapping("/recent-meals")
    public Report getRecentMeals(@RequestParam Long userId) {
        return reportService.getRecentMealsReport(userId);
    }

    @GetMapping("/most-used")
    public Report getMostUsedMeals(@RequestParam Long userId) {
        return reportService.getMostUsedMealsReport(userId);
    }
}
