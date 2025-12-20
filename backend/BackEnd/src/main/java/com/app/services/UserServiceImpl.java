package com.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.UserRespository;
import com.app.dto.Credentials;
import com.app.dto.ImageDto;
import com.app.pojos.User;

@Transactional
@Service
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRespository userDao;

	@Autowired
	private com.app.dao.LocationRepository locationDao;
	// @Autowired
	// private StorageService storageService;
	// @Autowired
	// private PasswordEncoder passwordEncoder;

	@Override
	public User getById(int id) {
		Optional<User> user = userDao.findById(id);
		return user.orElse(null);
	}

	@Override
	public User getByEmail(String email) {
		User user = userDao.findByEmail(email);
		return user;
	}

	@Override
	public List<User> getAllUsers() {
		return userDao.findAll();
	}

	@Override
	public User authenticateUser(Credentials cred) {
		System.out.println("Email:" + cred.getEmail() + " " + cred.getPassword());
		User user = userDao.findByEmailIgnoreCase(cred.getEmail());
		System.out.println(user);
		if (user != null)
			if (cred.getPassword().equals(user.getPassword()))
				return user;
		return null;
	}

	@Override
	public String saveUser(Credentials cred) {
		int counter = 0;
		List<User> list = this.getAllUsers();
		for (User tableUser : list) {
			if (tableUser.getRole().equals("admin"))
				counter = counter + 1;
		}
		System.out.println("counter :" + counter);
		for (User tableUser : list) {
			if (tableUser.getEmail().equalsIgnoreCase(cred.getEmail()))
				return "email already taken";
		}

		User tbUser = new User();
		BeanUtils.copyProperties(cred, tbUser);
		// String encPassword = passwordEncoder.encode(tbUser.getPassword());
		tbUser.setPassword(cred.getPassword());
		tbUser.setId(0);

		// Priority 1: Use the role passed from frontend if valid
		if (cred.getRole() != null && !cred.getRole().isEmpty()) {
			tbUser.setRole(cred.getRole().toLowerCase());
		}
		// Priority 2: Auto-assign admin for first user, otherwise user
		else {
			if (counter > 0) {
				tbUser.setRole("user");
			} else {
				tbUser.setRole("admin");
			}
		}

		// Set location if provided
		if (cred.getLocationId() > 0) {
			Optional<com.app.pojos.Location> location = locationDao.findById(cred.getLocationId());
			if (location.isPresent()) {
				tbUser.setLocation(location.get());
			}
		}

		userDao.save(tbUser);
		return "success";
	}

	@Override
	public String updateUser(Credentials cred) {

		User tbUser = getById(cred.getId());
		tbUser.setContact(cred.getContact());
		tbUser.setContact(cred.getContact());
		// tbUser.setAddress(cred.getAddress()); // Address replaced by Location
		tbUser.setHeight(cred.getHeight());
		tbUser.setHeight(cred.getHeight());
		tbUser.setAge(cred.getAge());
		tbUser.setWeight(cred.getWeight());
		tbUser.setJoiningDate(cred.getJoiningDate());
		tbUser.setGender(cred.getGender());
		userDao.save(tbUser);
		return "success";
	}

	@Override
	public void changePassword(Credentials cred) {
		User tbUser = userDao.findByEmailIgnoreCase(cred.getEmail());
		// String encPassword = passwordEncoder.encode(cred.getPassword());
		tbUser.setPassword(cred.getPassword());
		userDao.save(tbUser);
	}

	@Override
	public String forgotPassword(Credentials cred) {
		User user = userDao.findByEmailIgnoreCase(cred.getEmail());
		System.out.println(user);
		if (user == null) {
			return "No Such Email Found!!!!";
		}
		// Email exists, allow password reset
		return "Success";
	}

	@Override
	public void deleteUser(Credentials cred) {
		userDao.deleteById(cred.getId());
	}

	@Override
	public User getUserInfo(int userId) {
		System.err.println(userDao.getById(userId));
		return userDao.getById(userId);
	}

	@Override
	public void addUserImage(ImageDto imageDto) {
		User user = userDao.getById(imageDto.getId());
		// String fileName = storageService.store(imageDto.getThumbnail());
		// String fileName = amazonClient.uploadFile(imageDto.getThumbnail());
		// user.setAvatar(fileName);
		userDao.save(user);
	}

	@Override
	public void updateUserRole(Credentials cred) {
		User user = getById(cred.getId());
		user.setRole("admin");
		userDao.save(user);
	}

	@Override
	public List<User> getUsersByLocationId(int locationId) {
		return userDao.findByLocationId(locationId);
	}

	@Override
	public List<User> getUsersByProvinceCode(String provinceCode) {
		return userDao.findByProvinceCode(provinceCode);
	}

	@Override
	public List<User> getUsersByProvinceName(String provinceName) {
		return userDao.findByProvinceName(provinceName);
	}

	@Autowired
	private EmailService emailService;

	@Override
	public String generateTwoFactorCode(String email) {
		User user = userDao.findByEmailIgnoreCase(email);
		if (user == null) {
			return "User not found";
		}

		// Generate 6-digit code
		String code = String.format("%06d", new java.util.Random().nextInt(999999));

		// Set expiry to 10 minutes from now
		user.setTwoFactorCode(code);
		user.setTwoFactorExpiry(java.time.LocalDateTime.now().plusMinutes(10));
		userDao.save(user);

		// Send email
		String subject = "Your 2FA Verification Code";
		String text = "Your verification code is: " + code + "\n\nThis code will expire in 10 minutes.";

		try {
			emailService.sendSimpleMessage(email, subject, text);
			System.out.println("Email sent successfully to " + email);
		} catch (Exception e) {
			System.err.println("Failed to send email: " + e.getMessage());
			// Fallback to console for development/testing if email fails
			System.out.println("==========================================");
			System.out.println("2FA CODE FOR " + email + ": " + code);
			System.out.println("==========================================");
		}

		return "success";
	}

	@Override
	public User verifyTwoFactorCode(Credentials cred) {
		User user = userDao.findByEmailIgnoreCase(cred.getEmail());
		if (user == null) {
			return null;
		}

		if (user.getTwoFactorCode() == null || user.getTwoFactorExpiry() == null) {
			return null;
		}

		if (java.time.LocalDateTime.now().isAfter(user.getTwoFactorExpiry())) {
			return null; // Expired
		}

		if (user.getTwoFactorCode().equals(cred.getTwoFactorCode())) {
			// Clear code after successful verification
			user.setTwoFactorCode(null);
			user.setTwoFactorExpiry(null);
			userDao.save(user);
			return user;
		}

		return null; // Invalid code
	}
}
