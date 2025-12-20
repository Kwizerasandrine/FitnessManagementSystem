package com.app.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Location;
import com.app.pojos.User;

public interface UserRespository extends JpaRepository<User, Integer> {

	User findByEmail(String email);

	User findByEmailIgnoreCase(String email);

	List<User> findByLocation(Location location);

	List<User> findByLocationId(Integer locationId);

	List<User> findByLocation_Code(String code);

	List<User> findByLocation_Name(String name);

	Page<User> findByLocation_Code(String code, Pageable pageable);

	@Query("SELECT u FROM User u WHERE u.location.code = :provinceCode " +
			"OR u.location.parent.code = :provinceCode " +
			"OR u.location.parent.parent.code = :provinceCode " +
			"OR u.location.parent.parent.parent.code = :provinceCode " +
			"OR u.location.parent.parent.parent.parent.code = :provinceCode")
	List<User> findByProvinceCode(@Param("provinceCode") String provinceCode);

	@Query("SELECT u FROM User u WHERE u.location.name = :provinceName " +
			"OR u.location.parent.name = :provinceName " +
			"OR u.location.parent.parent.name = :provinceName " +
			"OR u.location.parent.parent.parent.name = :provinceName " +
			"OR u.location.parent.parent.parent.parent.name = :provinceName")
	List<User> findByProvinceName(@Param("provinceName") String provinceName);

	List<User> findByRole(String role);

	Page<User> findByRole(String role, Pageable pageable);
}
