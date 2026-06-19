package com.mealplanner.meal_planner_backend.dao;

import com.mealplanner.meal_planner_backend.entities.MealIdea;
import com.mealplanner.meal_planner_backend.entities.MealType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@Repository
public interface MealIdeaRepository extends JpaRepository<MealIdea, Long> {

    List<MealIdea> findByUserId(Long userId);
}
