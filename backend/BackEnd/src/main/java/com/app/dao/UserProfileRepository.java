package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.User;
import com.app.pojos.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {

	Optional<UserProfile> findByUser(User user);
	
	Optional<UserProfile> findByUserId(Integer userId);
	
	boolean existsByUserId(Integer userId);
	
	@Query("SELECT up FROM UserProfile up LEFT JOIN FETCH up.user WHERE up.id = :id")
	Optional<UserProfile> findByIdWithUser(@Param("id") Integer id);
}
