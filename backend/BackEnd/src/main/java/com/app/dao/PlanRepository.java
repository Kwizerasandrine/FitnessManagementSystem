package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Plan;

public interface PlanRepository extends JpaRepository<Plan, Integer> {

    List<Plan> findByTrainerName(String trainerName);

    List<Plan> findByTrainerNameIgnoreCase(String trainerName);

}
