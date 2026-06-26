package com.mealplanner.meal_planner_backend.services;

import com.mealplanner.meal_planner_backend.dao.DailyPlanRepository;
import com.mealplanner.meal_planner_backend.entities.DailyPlan;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final DailyPlanRepository dailyPlanRepository;

    // injects repository
    public ReportService(DailyPlanRepository dailyPlanRepository) {
        this.dailyPlanRepository = dailyPlanRepository;
    }

    public Report getTodaysPlanReport(Long userId) {

        // Get rows matching today's date for this user
        List<DailyPlan> todaysPlans = dailyPlanRepository.findByUserIdAndPlanDate(userId, LocalDate.now());

        return new TodaysPlanReport(todaysPlans);
    }

    public Report getRecentMealsReport(Long userId) {

        // Gets past history
        List<DailyPlan> userHistory = dailyPlanRepository.findByUserId(userId);
        List<DailyPlan> recentTen = new ArrayList<>();

        // gets newest items from list
        int count = 0;
        for (int i = userHistory.size() - 1; i >= 0; i--) {
            if (count < 10) {
                recentTen.add(userHistory.get(i));
                count++;
            } else {
                break;
            }
        }
        return new RecentMealsReport(recentTen);
    }

    public Report getMostUsedMealsReport(Long userId) {

        List<DailyPlan> userHistory = dailyPlanRepository.findByUserId(userId);
        Map<String, Long> mealCounts = new HashMap<>();

        // Count meals
        for (DailyPlan plan : userHistory) {
            String title = plan.getIdea().getTitle();

            // if already have that title in hashmap then increment count
            if(mealCounts.containsKey(title)) {
                long currentCount = mealCounts.get(title);
                mealCounts.put(title, currentCount + 1);
            } else {    // if new meal add to hashmap with starting count of 1
                mealCounts.put(title, 1L);
            }
        }
        return new MostUsedMealsReport(mealCounts);
    }

}
