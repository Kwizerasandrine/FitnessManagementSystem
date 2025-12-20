package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "table_location")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"parent", "children", "users"})
public class Location extends BaseEntity {

	@Column(nullable = false)
	private String name;
	
	@Column(unique = true, nullable = false)
	private String code;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private LocationType locationType;
	
	// Self-referential relationship: Many locations can have one parent
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_id")
	@com.fasterxml.jackson.annotation.JsonIgnore
	private Location parent;
	
	// One location can have many children
	@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@com.fasterxml.jackson.annotation.JsonIgnore
	private List<Location> children;
	
	// One location can have many users
	@OneToMany(mappedBy = "location", cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	@com.fasterxml.jackson.annotation.JsonIgnore
	private List<User> users;
	
	public Location(String name, String code, LocationType locationType, Location parent) {
		this.name = name;
		this.code = code;
		this.locationType = locationType;
		this.parent = parent;
		this.children = new ArrayList<>();
		this.users = new ArrayList<>();
	}
	
	public void addChild(Location child) {
		if (this.children == null) {
			this.children = new ArrayList<>();
		}
		this.children.add(child);
		child.setParent(this);
	}
	
	public void removeChild(Location child) {
		if (this.children != null) {
			this.children.remove(child);
			child.setParent(null);
		}
	}
}
