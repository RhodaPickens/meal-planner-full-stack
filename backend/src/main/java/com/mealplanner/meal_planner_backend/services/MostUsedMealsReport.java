package com.mealplanner.meal_planner_backend.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class MostUsedMealsReport extends Report {

    private final Map<String, Long> mealCounts;

    public MostUsedMealsReport(Map<String, Long> mealCounts) {
        super("Most Used Meals");
        this.mealCounts = mealCounts;
    }

    @Override
    public List<String> getColumns() {
        return Arrays.asList("Meal Title", "Times Logged");
    }

    @Override
    public List<List<Object>> getReportData() {
        List<List<Object>> rows = new ArrayList<>();

        mealCounts.forEach((title, count) -> {
            rows.add(Arrays.asList(title, count));
        });
        return rows;
    }
}
