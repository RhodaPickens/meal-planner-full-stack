package com.mealplanner.meal_planner_backend.controllers;

import com.mealplanner.meal_planner_backend.dao.DailyPlanRepository;
import com.mealplanner.meal_planner_backend.entities.DailyPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/plans")
public class DailyPlanController {

    private final DailyPlanRepository dailyPlanRepository;

    @Autowired
    public DailyPlanController(DailyPlanRepository dailyPlanRepository) {
        this.dailyPlanRepository = dailyPlanRepository;
    }

    // Saves a meal to today's plan
    @PostMapping
    public DailyPlan addMealToPlan(@RequestBody DailyPlan newPlanItem) {
        return dailyPlanRepository.save(newPlanItem);
    }

    // Fetch today's plan items for a specific user
    @GetMapping
    public List<DailyPlan> getTodaysPlan(@RequestParam Long userId) {
        return dailyPlanRepository.findByUserIdAndPlanDate(userId, java.time.LocalDate.now());
    }

    // Deletes meal from plan
    @DeleteMapping("/{id}")
    public void removeMealFromPlan(@PathVariable Long id) {
        dailyPlanRepository.deleteById(id);
    }
}
