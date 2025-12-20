package com.app.services;

import java.util.List;

import com.app.dto.UserProfileDto;
import com.app.pojos.UserProfile;

public interface IUserProfileService {

	
	UserProfile addUserProfile(UserProfileDto userProfileDto);
	
	UserProfile updateUserProfile(Integer id, UserProfileDto userProfileDto);
	
	void deleteUserProfile(Integer id);
	
	UserProfile getUserProfileById(Integer id);
	
	UserProfile getUserProfileByUserId(Integer userId);
	
	List<UserProfile> getAllUserProfiles();

	boolean userHasProfile(Integer userId);
}
