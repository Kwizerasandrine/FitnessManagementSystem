package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.LocationRepository;
import com.app.dto.LocationDto;
import com.app.pojos.Location;
import com.app.pojos.LocationType;

@Service
@Transactional
public class LocationServiceImpl implements ILocationService {

	@Autowired
	private LocationRepository locationRepository;

	@Override
	public Location addLocation(LocationDto locationDto) {
		Location location = new Location();
		location.setName(locationDto.getName());
		location.setCode(locationDto.getCode());
		location.setLocationType(locationDto.getLocationType());
		
		// Set parent if provided
		if (locationDto.getParentId() != null) {
			Location parent = locationRepository.findById(locationDto.getParentId())
					.orElseThrow(() -> new RuntimeException("Parent location not found with ID: " + locationDto.getParentId()));
			location.setParent(parent);
		}
		
		return locationRepository.save(location);
	}

	@Override
	public Location updateLocation(Integer id, LocationDto locationDto) {
		Location location = locationRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Location not found with ID: " + id));
		
		location.setName(locationDto.getName());
		location.setCode(locationDto.getCode());
		location.setLocationType(locationDto.getLocationType());
		
		// Update parent if provided
		if (locationDto.getParentId() != null) {
			Location parent = locationRepository.findById(locationDto.getParentId())
					.orElseThrow(() -> new RuntimeException("Parent location not found with ID: " + locationDto.getParentId()));
			location.setParent(parent);
		} else {
			location.setParent(null);
		}
		
		return locationRepository.save(location);
	}

	@Override
	public void deleteLocation(Integer id) {
		if (!locationRepository.existsById(id)) {
			throw new RuntimeException("Location not found with ID: " + id);
		}
		locationRepository.deleteById(id);
	}

	@Override
	public Location getLocationById(Integer id) {
		return locationRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Location not found with ID: " + id));
	}

	@Override
	public Location getLocationByCode(String code) {
		return locationRepository.findByCode(code)
				.orElseThrow(() -> new RuntimeException("Location not found with code: " + code));
	}

	@Override
	public Location getLocationByName(String name) {
		return locationRepository.findByName(name)
				.orElseThrow(() -> new RuntimeException("Location not found with name: " + name));
	}

	@Override
	public List<Location> getAllLocations() {
		return locationRepository.findAll();
	}

	@Override
	public Page<Location> getAllLocations(Pageable pageable) {
		return locationRepository.findAll(pageable);
	}

	@Override
	public List<Location> getLocationsByType(LocationType locationType) {
		return locationRepository.findByLocationType(locationType);
	}

	@Override
	public List<Location> getAllProvinces() {
		return locationRepository.findByParentIsNull();
	}

	@Override
	public List<Location> getChildrenByParentId(Integer parentId) {
		return locationRepository.findByParentId(parentId);
	}

	@Override
	public List<Location> getChildrenByParentIdAndType(Integer parentId, LocationType locationType) {
		Location parent = locationRepository.findById(parentId)
				.orElseThrow(() -> new RuntimeException("Parent location not found with ID: " + parentId));
		return locationRepository.findByLocationTypeAndParent(locationType, parent);
	}

	@Override
	public Location getLocationWithParent(Integer id) {
		return locationRepository.findByIdWithParent(id)
				.orElseThrow(() -> new RuntimeException("Location not found with ID: " + id));
	}

	@Override
	public Location getLocationWithChildren(Integer id) {
		return locationRepository.findByIdWithChildren(id)
				.orElseThrow(() -> new RuntimeException("Location not found with ID: " + id));
	}

	@Override
	public List<Location> searchLocationsByName(String name) {
		return locationRepository.findByNameContainingIgnoreCase(name);
	}
}
