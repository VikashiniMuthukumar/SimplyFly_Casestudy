package com.hexaware.simplyfly.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * FlightDTO carries flight details with validation.
 * 
 * @author Vikashini
 * @version 1.0
 */

public class FlightDTO {

	private Long flightId;

	@NotBlank
	@Size(max = 100, message = "Flight name must be at most 100 characters")
	private String name;

	@NotBlank
	@Size(max = 20, message = "Flight code must be at most 20 characters")
	private String flightCode;

	@NotNull
	@Min(value = 1, message = "Total seats must be at least 1")
	private Integer totalSeats;

	@NotNull
	@Min(value = 0, message = "Cabin baggage limit cannot be negative")
	private Integer cabinBaggageLimit;

	@NotNull
	@Min(value = 0, message = "Check-in baggage limit cannot be negative")
	private Integer checkInBaggageLimit;

	@JsonIgnore
	private List<RouteDTO> routes;

	public FlightDTO() {
	}

	public FlightDTO(Long flightId, String name, String flightCode, Integer totalSeats, Integer cabinBaggageLimit,
			Integer checkInBaggageLimit, /* Long owner_id, */
			List<RouteDTO> routes) {
		this.flightId = flightId;
		this.name = name;
		this.flightCode = flightCode;
		this.totalSeats = totalSeats;
		this.cabinBaggageLimit = cabinBaggageLimit;
		this.checkInBaggageLimit = checkInBaggageLimit;
		this.routes = routes;
	}

	public Long getFlightId() {
		return flightId;
	}

	public void setFlightId(Long flightId) {
		this.flightId = flightId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFlightCode() {
		return flightCode;
	}

	public void setFlightCode(String flightCode) {
		this.flightCode = flightCode;
	}

	public Integer getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(Integer totalSeats) {
		this.totalSeats = totalSeats;
	}

	public Integer getCabinBaggageLimit() {
		return cabinBaggageLimit;
	}

	public void setCabinBaggageLimit(Integer cabinBaggageLimit) {
		this.cabinBaggageLimit = cabinBaggageLimit;
	}

	public Integer getCheckInBaggageLimit() {
		return checkInBaggageLimit;
	}

	public void setCheckInBaggageLimit(Integer checkInBaggageLimit) {
		this.checkInBaggageLimit = checkInBaggageLimit;
	}

	public List<RouteDTO> getRoutes() {
		return routes;
	}

	public void setRoutes(List<RouteDTO> routes) {
		this.routes = routes;
	}

	@Override
	public String toString() {
		return "FlightDTO [flightId=" + flightId + ", name=" + name + ", flightCode=" + flightCode + ", totalSeats="
				+ totalSeats + ", cabinBaggageLimit=" + cabinBaggageLimit + ", checkInBaggageLimit="
				+ checkInBaggageLimit +", routes=" + routes + "]";
	}

}