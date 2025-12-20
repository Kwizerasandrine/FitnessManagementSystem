package com.app.contollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LocationDto;
import com.app.dto.Response;
import com.app.pojos.Location;
import com.app.pojos.LocationType;
import com.app.services.ILocationService;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "*")
public class LocationController {

	@Autowired
	private ILocationService locationService;

	// Create new location
	@PostMapping
	public ResponseEntity<?> addLocation(@RequestBody LocationDto locationDto) {
		try {
			Location location = locationService.addLocation(locationDto);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(new Response("success", "Location created successfully", location));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Update location
	@PutMapping("/{id}")
	public ResponseEntity<?> updateLocation(@PathVariable Integer id, @RequestBody LocationDto locationDto) {
		try {
			Location location = locationService.updateLocation(id, locationDto);
			return ResponseEntity.ok(new Response("success", "Location updated successfully", location));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Delete location
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteLocation(@PathVariable Integer id) {
		try {
			locationService.deleteLocation(id);
			return ResponseEntity.ok(new Response("success", "Location deleted successfully", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get location by ID
	@GetMapping("/{id}")
	public ResponseEntity<?> getLocationById(@PathVariable Integer id) {
		try {
			Location location = locationService.getLocationById(id);
			return ResponseEntity.ok(new Response("success", "Location retrieved successfully", location));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get location by code
	@GetMapping("/code/{code}")
	public ResponseEntity<?> getLocationByCode(@PathVariable String code) {
		try {
			Location location = locationService.getLocationByCode(code);
			return ResponseEntity.ok(new Response("success", "Location retrieved successfully", location));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get location by name
	@GetMapping("/name/{name}")
	public ResponseEntity<?> getLocationByName(@PathVariable String name) {
		try {
			Location location = locationService.getLocationByName(name);
			return ResponseEntity.ok(new Response("success", "Location retrieved successfully", location));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get all locations with pagination and sorting
	@GetMapping
	public ResponseEntity<?> getAllLocations(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "name") String sortBy) {
		try {
			Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
			Page<Location> locations = locationService.getAllLocations(pageable);
			return ResponseEntity.ok(new Response("success", "Locations retrieved successfully", locations));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get all provinces
	@GetMapping("/provinces")
	public ResponseEntity<?> getAllProvinces() {
		try {
			List<Location> provinces = locationService.getAllProvinces();
			return ResponseEntity.ok(new Response("success", "Provinces retrieved successfully", provinces));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get locations by type
	@GetMapping("/type/{type}")
	public ResponseEntity<?> getLocationsByType(@PathVariable String type) {
		try {
			LocationType locationType = LocationType.valueOf(type.toUpperCase());
			List<Location> locations = locationService.getLocationsByType(locationType);
			return ResponseEntity.ok(new Response("success", "Locations retrieved successfully", locations));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new Response("error", "Invalid location type: " + type, null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get children of a location (optionally filtered by type)
	@GetMapping("/{id}/children")
	public ResponseEntity<?> getChildrenByParentId(@PathVariable Integer id, @RequestParam(required = false) String type) {
		try {
			List<Location> children;
			if (type != null && !type.isEmpty()) {
				LocationType locationType = LocationType.valueOf(type.toUpperCase());
				children = locationService.getChildrenByParentIdAndType(id, locationType);
			} else {
				children = locationService.getChildrenByParentId(id);
			}
			return ResponseEntity.ok(new Response("success", "Children locations retrieved successfully", children));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new Response("error", "Invalid location type: " + type, null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get location with parent hierarchy
	@GetMapping("/{id}/with-parent")
	public ResponseEntity<?> getLocationWithParent(@PathVariable Integer id) {
		try {
			Location location = locationService.getLocationWithParent(id);
			return ResponseEntity.ok(new Response("success", "Location with parent retrieved successfully", location));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get location with children
	@GetMapping("/{id}/with-children")
	public ResponseEntity<?> getLocationWithChildren(@PathVariable Integer id) {
		try {
			Location location = locationService.getLocationWithChildren(id);
			return ResponseEntity.ok(new Response("success", "Location with children retrieved successfully", location));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Search locations by name
	@GetMapping("/search")
	public ResponseEntity<?> searchLocationsByName(@RequestParam String name) {
		try {
			List<Location> locations = locationService.searchLocationsByName(name);
			return ResponseEntity.ok(new Response("success", "Locations found", locations));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new Response("error", e.getMessage(), null));
		}
	}
}
