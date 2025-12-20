package com.app.dto;

import com.app.pojos.LocationType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LocationDto {
	
	private Integer id;
	private String name;
	private String code;
	private LocationType locationType;
	private Integer parentId;
	private String parentName;
}
