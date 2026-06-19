package com.mealplanner.meal_planner_backend.services;

import com.mealplanner.meal_planner_backend.entities.DailyPlan;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TodaysPlanReport extends Report{

    private final List<DailyPlan> plans;

    public TodaysPlanReport(List<DailyPlan> plans) {
        super("Today's Meal Plan Report");
        this.plans = plans;
    }

    // Defines columns
    @Override
    public List<String> getColumns() {
        return Arrays.asList("Title", "Meal", "Calories");
    }

    // Fills rows
    @Override
    public List<List<Object>> generateReportData() {
        List<List<Object>> rows = new ArrayList<>();

        for (DailyPlan plan : plans) {
            // Convert enum to title case
            String rawType = plan.getIdea().getMealType().toString().toLowerCase();
            String titleCaseType = rawType.substring(0, 1).toUpperCase() + rawType.substring(1);

            rows.add(Arrays.asList(
                    plan.getIdea().getTitle(),
                    titleCaseType,
                    plan.getIdea().getCalories()
            ));
        }
        return rows;
    }
}
