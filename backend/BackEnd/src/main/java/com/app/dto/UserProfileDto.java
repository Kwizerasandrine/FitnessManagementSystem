package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserProfileDto {
	
	private Integer id;
	private String bio;
	private String emergencyContact;
	private String emergencyContactName;
	private String bloodType;
	private String medicalConditions;
	private String fitnessGoals;
	private String preferences;
	private Integer userId;
}
