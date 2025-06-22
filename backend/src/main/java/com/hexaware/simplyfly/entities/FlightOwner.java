package com.hexaware.simplyfly.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

/**
 * Entity representing a Flight Owner who is linked to a User and can have multiple flights.
 * 
 * Author: Vikashini
 * Version: 1.0
 */

@Entity
public class FlightOwner {
    @Id
    @Column(name = "owner_id")
    private Long owner_id;

    @OneToOne
    @JsonManagedReference
    @MapsId
    private User user;


	public FlightOwner() {
		super();
	}

	public FlightOwner(Long owner_id, User user, List<Flight> flights) {
		super();
		this.owner_id = owner_id;
		this.user = user;
	}

	public Long getOwner_id() {
		return owner_id;
	}

	public void setOwner_id(Long owner_id) {
		this.owner_id = owner_id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "FlightOwner [owner_id=" + owner_id + ", user=" + user +  "]";
	}

	
}
