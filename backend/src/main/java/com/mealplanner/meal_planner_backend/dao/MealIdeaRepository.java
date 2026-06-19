package com.mealplanner.meal_planner_backend.dao;

import com.mealplanner.meal_planner_backend.entities.MealIdea;
import com.mealplanner.meal_planner_backend.entities.MealType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealIdeaRepository extends JpaRepository<MealIdea, Long> {

    // searches for meal ideas filtered by meal type and calories
    List<MealIdea> findByMealTypeAndCaloriesLessThanEqual(MealType mealType, Integer calories);
}
