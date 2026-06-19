package com.mealplanner.meal_planner_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="meal_ideas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealIdea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;    // primary key

    @Column(name = "title", nullable = false)
    private String title; // e.g. "Oatmeal with raisins"

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type")
    private MealType mealType; // uses enum

    @Column(name = "calories")
    private Integer calories; // e.g. 250

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")   // foreign key
    private User user;

}
