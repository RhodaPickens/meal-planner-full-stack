package com.mealplanner.meal_planner_backend.services;

import com.mealplanner.meal_planner_backend.entities.DailyPlan;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RecentMealsReport extends Report {

    private final List<DailyPlan> history;

    public RecentMealsReport(List<DailyPlan> history) {
        super("Recently Eaten Meals");
        this.history = history;
    }

    @Override
    public List<String> getColumns() {
        return Arrays.asList("Date Eaten", "Meal Title");
    }

    @Override
    public List<List<Object>> generateReportData() {
        List<List<Object>> rows = new ArrayList<>();

        for (DailyPlan plan : history) {
            rows.add(Arrays.asList(
                    plan.getPlanDate().toString(),
                    plan.getIdea().getTitle()
            ));
        }
        return rows;
    }
}
