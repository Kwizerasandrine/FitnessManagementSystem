package com.app.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.app.dto.LocationDto;
import com.app.pojos.Location;
import com.app.pojos.LocationType;

public interface ILocationService {

	// Create new location
	Location addLocation(LocationDto locationDto);
	
	// Update existing location
	Location updateLocation(Integer id, LocationDto locationDto);
	
	// Delete location
	void deleteLocation(Integer id);
	
	// Get location by ID
	Location getLocationById(Integer id);
	
	// Get location by code
	Location getLocationByCode(String code);
	
	// Get location by name
	Location getLocationByName(String name);
	
	// Get all locations
	List<Location> getAllLocations();
	
	// Get all locations with pagination
	Page<Location> getAllLocations(Pageable pageable);
	
	// Get all locations by type
	List<Location> getLocationsByType(LocationType locationType);
	
	// Get all provinces (root locations)
	List<Location> getAllProvinces();
	
	// Get children of a location
	List<Location> getChildrenByParentId(Integer parentId);
	
	// Get children of a location by type
	List<Location> getChildrenByParentIdAndType(Integer parentId, LocationType locationType);
	
	// Get location with parent hierarchy
	Location getLocationWithParent(Integer id);
	
	// Get location with children
	Location getLocationWithChildren(Integer id);
	
	// Search locations by name
	List<Location> searchLocationsByName(String name);
}
