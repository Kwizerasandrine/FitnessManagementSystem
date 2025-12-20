package com.app.pojos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "table_user_profile")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "user")
public class UserProfile extends BaseEntity {

	@Column(length = 1000)
	private String bio;
	
	private String emergencyContact;
	
	private String emergencyContactName;
	
	private String bloodType;
	
	private String medicalConditions;
	
	private String fitnessGoals;
	
	private String preferences;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinColumn(name = "user_id", unique = true)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "userProfile"})
	private User user;
}
