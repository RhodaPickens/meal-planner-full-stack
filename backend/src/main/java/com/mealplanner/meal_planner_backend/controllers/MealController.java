package com.mealplanner.meal_planner_backend.controllers;

import com.mealplanner.meal_planner_backend.dao.MealIdeaRepository;
import com.mealplanner.meal_planner_backend.entities.MealIdea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealIdeaRepository mealIdeaRepository;

    // injects repository
    @Autowired
    public MealController(MealIdeaRepository mealIdeaRepository) {
        this.mealIdeaRepository = mealIdeaRepository;
    }

    // sends meal ideas to React
    @GetMapping
    public List<MealIdea> getAllMeals() {
        return this.mealIdeaRepository.findAll();
    }
}
