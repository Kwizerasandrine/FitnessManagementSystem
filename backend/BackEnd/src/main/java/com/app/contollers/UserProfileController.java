package com.app.contollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Response;
import com.app.dto.UserProfileDto;
import com.app.pojos.UserProfile;
import com.app.services.IUserProfileService;

@RestController
@RequestMapping("/api/user-profiles")
@CrossOrigin(origins = "*")
public class UserProfileController {

	@Autowired
	private IUserProfileService userProfileService;

	// Create new user profile
	@PostMapping
	public ResponseEntity<?> addUserProfile(@RequestBody UserProfileDto userProfileDto) {
		try {
			UserProfile userProfile = userProfileService.addUserProfile(userProfileDto);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(new Response("success", "User profile created successfully", userProfile));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Update user profile
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUserProfile(@PathVariable Integer id, @RequestBody UserProfileDto userProfileDto) {
		try {
			UserProfile userProfile = userProfileService.updateUserProfile(id, userProfileDto);
			return ResponseEntity.ok(new Response("success", "User profile updated successfully", userProfile));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Delete user profile
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUserProfile(@PathVariable Integer id) {
		try {
			userProfileService.deleteUserProfile(id);
			return ResponseEntity.ok(new Response("success", "User profile deleted successfully", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get user profile by ID
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserProfileById(@PathVariable Integer id) {
		try {
			UserProfile userProfile = userProfileService.getUserProfileById(id);
			return ResponseEntity.ok(new Response("success", "User profile retrieved successfully", userProfile));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get user profile by user ID
	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getUserProfileByUserId(@PathVariable Integer userId) {
		try {
			UserProfile userProfile = userProfileService.getUserProfileByUserId(userId);
			return ResponseEntity.ok(new Response("success", "User profile retrieved successfully", userProfile));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Get all user profiles
	@GetMapping
	public ResponseEntity<?> getAllUserProfiles() {
		try {
			List<UserProfile> userProfiles = userProfileService.getAllUserProfiles();
			return ResponseEntity.ok(new Response("success", "User profiles retrieved successfully", userProfiles));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new Response("error", e.getMessage(), null));
		}
	}

	// Check if user has profile
	@GetMapping("/user/{userId}/exists")
	public ResponseEntity<?> userHasProfile(@PathVariable Integer userId) {
		try {
			boolean hasProfile = userProfileService.userHasProfile(userId);
			return ResponseEntity.ok(new Response("success", "Profile existence checked", hasProfile));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new Response("error", e.getMessage(), null));
		}
	}
}
