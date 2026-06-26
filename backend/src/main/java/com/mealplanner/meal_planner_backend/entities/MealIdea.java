package com.mealplanner.meal_planner_backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="meal_ideas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealIdea {

    public MealIdea(Long id, String title, MealType mealType, Integer calories, User user) {
        this.id = id;
        this.title = title;
        this.mealType = mealType;
        this.calories = calories;
        this.user = user;
        this.dailyPlans = new ArrayList<>();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;    // primary key

    @NotBlank(message = "Please fill in meal title")
    @Column(name = "title", nullable = false)
    private String title; // e.g. "Oatmeal with raisins"

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type")
    private MealType mealType; // uses enum

    @Min(value = 0, message = "Calories can't be negative")
    @Column(name = "calories")
    private Integer calories; // e.g. 250

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")   // foreign key
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "idea", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DailyPlan> dailyPlans;

}
