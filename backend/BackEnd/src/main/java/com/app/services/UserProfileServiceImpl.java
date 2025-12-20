package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.UserProfileRepository;
import com.app.dao.UserRespository;
import com.app.dto.UserProfileDto;
import com.app.pojos.User;
import com.app.pojos.UserProfile;

@Service
@Transactional
public class UserProfileServiceImpl implements IUserProfileService {

	@Autowired
	private UserProfileRepository userProfileRepository;
	
	@Autowired
	private UserRespository userRepository;

	@Override
	public UserProfile addUserProfile(UserProfileDto userProfileDto) {
		UserProfile userProfile = new UserProfile();
		userProfile.setBio(userProfileDto.getBio());
		userProfile.setEmergencyContact(userProfileDto.getEmergencyContact());
		userProfile.setEmergencyContactName(userProfileDto.getEmergencyContactName());
		userProfile.setBloodType(userProfileDto.getBloodType());
		userProfile.setMedicalConditions(userProfileDto.getMedicalConditions());
		userProfile.setFitnessGoals(userProfileDto.getFitnessGoals());
		userProfile.setPreferences(userProfileDto.getPreferences());
		
		// Set user if provided
		if (userProfileDto.getUserId() != null) {
			User user = userRepository.findById(userProfileDto.getUserId())
					.orElseThrow(() -> new RuntimeException("User not found with ID: " + userProfileDto.getUserId()));
			userProfile.setUser(user);
		}
		
		return userProfileRepository.save(userProfile);
	}

	@Override
	public UserProfile updateUserProfile(Integer id, UserProfileDto userProfileDto) {
		UserProfile userProfile = userProfileRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("User profile not found with ID: " + id));
		
		userProfile.setBio(userProfileDto.getBio());
		userProfile.setEmergencyContact(userProfileDto.getEmergencyContact());
		userProfile.setEmergencyContactName(userProfileDto.getEmergencyContactName());
		userProfile.setBloodType(userProfileDto.getBloodType());
		userProfile.setMedicalConditions(userProfileDto.getMedicalConditions());
		userProfile.setFitnessGoals(userProfileDto.getFitnessGoals());
		userProfile.setPreferences(userProfileDto.getPreferences());
		
		// Update user if provided
		if (userProfileDto.getUserId() != null) {
			User user = userRepository.findById(userProfileDto.getUserId())
					.orElseThrow(() -> new RuntimeException("User not found with ID: " + userProfileDto.getUserId()));
			userProfile.setUser(user);
		}
		
		return userProfileRepository.save(userProfile);
	}

	@Override
	public void deleteUserProfile(Integer id) {
		if (!userProfileRepository.existsById(id)) {
			throw new RuntimeException("User profile not found with ID: " + id);
		}
		userProfileRepository.deleteById(id);
	}

	@Override
	public UserProfile getUserProfileById(Integer id) {
		return userProfileRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("User profile not found with ID: " + id));
	}

	@Override
	public UserProfile getUserProfileByUserId(Integer userId) {
		return userProfileRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("User profile not found for user ID: " + userId));
	}

	@Override
	public List<UserProfile> getAllUserProfiles() {
		return userProfileRepository.findAll();
	}

	@Override
	public boolean userHasProfile(Integer userId) {
		return userProfileRepository.existsByUserId(userId);
	}
}
