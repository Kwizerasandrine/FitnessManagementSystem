package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Location;
import com.app.pojos.LocationType;

public interface LocationRepository extends JpaRepository<Location, Integer> {

	// Find location by code
	Optional<Location> findByCode(String code);
	
	// Find location by name
	Optional<Location> findByName(String name);
	
	// Find all locations by type (e.g., all provinces)
	List<Location> findByLocationType(LocationType locationType);
	
	// Find all locations by type with pagination
	Page<Location> findByLocationType(LocationType locationType, Pageable pageable);
	
	// Find children of a specific location
	List<Location> findByParent(Location parent);
	
	// Find all root locations (provinces - no parent)
	List<Location> findByParentIsNull();
	
	// Check if location code exists
	boolean existsByCode(String code);
	
	// Check if location name exists
	boolean existsByName(String name);
	
	// Find locations by parent ID
	List<Location> findByParentId(Integer parentId);
	
	// Custom query to find location with its parent hierarchy
	@Query("SELECT l FROM Location l LEFT JOIN FETCH l.parent WHERE l.id = :id")
	Optional<Location> findByIdWithParent(@Param("id") Integer id);
	
	// Custom query to find location with its children
	@Query("SELECT l FROM Location l LEFT JOIN FETCH l.children WHERE l.id = :id")
	Optional<Location> findByIdWithChildren(@Param("id") Integer id);
	
	// Find locations by name containing (case-insensitive search)
	List<Location> findByNameContainingIgnoreCase(String name);
	
	// Find locations by type and parent
	List<Location> findByLocationTypeAndParent(LocationType locationType, Location parent);
}
