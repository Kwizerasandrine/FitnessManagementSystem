package com.app.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.app.dao.LocationRepository;
import com.app.pojos.Location;
import com.app.pojos.LocationType;

@Component
public class LocationDataLoader implements CommandLineRunner {

	@Autowired
	private LocationRepository locationRepository;

	@Override
	public void run(String... args) throws Exception {
		if (locationRepository.count() == 0) {
			System.out.println("Loading Rwandan Location Data...");
			loadLocations();
			System.out.println("Rwandan Location Data Loaded Successfully!");
		}
	}

	private void loadLocations() {
		// 1. Create Provinces
		Location kigaliCity = createLocation("Kigali City", "KIGALI", LocationType.PROVINCE, null);
		Location northern = createLocation("Northern Province", "NORTH", LocationType.PROVINCE, null);
		Location southern = createLocation("Southern Province", "SOUTH", LocationType.PROVINCE, null);
		Location eastern = createLocation("Eastern Province", "EAST", LocationType.PROVINCE, null);
		Location western = createLocation("Western Province", "WEST", LocationType.PROVINCE, null);

		// 2. Create Districts for Kigali City
		Location gasabo = createLocation("Gasabo", "GASABO", LocationType.DISTRICT, kigaliCity);
		Location kicukiro = createLocation("Kicukiro", "KICUKIRO", LocationType.DISTRICT, kigaliCity);
		Location nyarugenge = createLocation("Nyarugenge", "NYARUGENGE", LocationType.DISTRICT, kigaliCity);

		// 3. Create Sectors for Gasabo (Sample)
		Location kacyiru = createLocation("Kacyiru", "KACYIRU", LocationType.SECTOR, gasabo);
		Location remera = createLocation("Remera", "REMERA", LocationType.SECTOR, gasabo);
		Location kimironko = createLocation("Kimironko", "KIMIRONKO", LocationType.SECTOR, gasabo);

		// 4. Create Cells for Kacyiru (Sample)
		Location kamatamu = createLocation("Kamatamu", "KAMATAMU", LocationType.CELL, kacyiru);
		Location kibaza = createLocation("Kibaza", "KIBAZA", LocationType.CELL, kacyiru);

		// 5. Create Villages for Kamatamu (Sample)
		createLocation("Amahoro", "AMAHORO", LocationType.VILLAGE, kamatamu);
		createLocation("Ubumwe", "UBUMWE", LocationType.VILLAGE, kamatamu);
		createLocation("Agaciro", "AGACIRO", LocationType.VILLAGE, kamatamu);
		
		// Add more sample data for other provinces
		
		// Northern Province Districts (Sample)
		Location musanze = createLocation("Musanze", "MUSANZE", LocationType.DISTRICT, northern);
		Location gicumbi = createLocation("Gicumbi", "GICUMBI", LocationType.DISTRICT, northern);
		
		// Southern Province Districts (Sample)
		Location huye = createLocation("Huye", "HUYE", LocationType.DISTRICT, southern);
		Location muhanga = createLocation("Muhanga", "MUHANGA", LocationType.DISTRICT, southern);
		
		// Eastern Province Districts (Sample)
		Location rwamagana = createLocation("Rwamagana", "RWAMAGANA", LocationType.DISTRICT, eastern);
		Location bugesera = createLocation("Bugesera", "BUGESERA", LocationType.DISTRICT, eastern);
		
		// Western Province Districts (Sample)
		Location rubavu = createLocation("Rubavu", "RUBAVU", LocationType.DISTRICT, western);
		Location rusizi = createLocation("Rusizi", "RUSIZI", LocationType.DISTRICT, western);
	}

	private Location createLocation(String name, String code, LocationType type, Location parent) {
		Location location = new Location();
		location.setName(name);
		location.setCode(code);
		location.setLocationType(type);
		location.setParent(parent);
		return locationRepository.save(location);
	}
}
