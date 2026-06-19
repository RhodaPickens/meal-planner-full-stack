package com.mealplanner.meal_planner_backend.dao;

import com.mealplanner.meal_planner_backend.entities.DailyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@Repository
public interface DailyPlanRepository extends JpaRepository<DailyPlan, Long> {

    // finds today's plan
    List<DailyPlan> findByUserIdAndPlanDate(Long userId, LocalDate planDate);
}
