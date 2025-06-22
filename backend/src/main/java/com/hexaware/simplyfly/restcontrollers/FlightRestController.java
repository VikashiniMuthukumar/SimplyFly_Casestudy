package com.hexaware.simplyfly.restcontrollers;

import java.util.HashMap;

/**
 * REST controller for managing Flight entities.
 * Supports CRUD operations for flights.
 * 
 * Author: Vikashini
 * Version: 1.0
 */

import java.util.List;
import java.util.Map;

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

import com.hexaware.simplyfly.dto.FlightDTO;
import com.hexaware.simplyfly.entities.Flight;
import com.hexaware.simplyfly.exceptions.FlightNotFoundException;
import com.hexaware.simplyfly.exceptions.FlightOwnerNotFoundException;
import com.hexaware.simplyfly.services.IFlightService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin("http://localhost:4200")
@Slf4j
@RestController
@RequestMapping("/api/flights")
public class FlightRestController {

	@Autowired
	private IFlightService flightService;

	@PostMapping("/add")
	public ResponseEntity<Map<String, String>> createFlight(@Valid @RequestBody FlightDTO dto)
			throws FlightOwnerNotFoundException {
		log.info("Creating Flight with data: {}", dto);
		Flight flight = flightService.createFlight(dto);

		Map<String, String> response = new HashMap<>();
		response.put("message", "Flight created successfully");
		response.put("flightId", String.valueOf(flight.getFlightId()));

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@PutMapping("/{flightId}")
	public ResponseEntity<Map<String, String>> updateFlight(@PathVariable Long flightId,
			@Valid @RequestBody FlightDTO dto) throws FlightNotFoundException, FlightOwnerNotFoundException {

		log.info("Updating Flight with ID: {}", flightId);
		Flight flight = flightService.updateFlight(flightId, dto);

		Map<String, String> response = new HashMap<>();
		response.put("message", "Flight updated successfully");
		response.put("flightId", String.valueOf(flight.getFlightId()));

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@DeleteMapping("/{flightId}")
	public ResponseEntity<String> deleteFlight(@PathVariable Long flightId) throws FlightNotFoundException {
		log.warn("Deleting Flight with ID: {}", flightId);
		flightService.deleteFlight(flightId);
		log.info("Flight deleted with ID: {}", flightId);
		return ResponseEntity.ok("Flight deleted successfully for ID: " + flightId);
	}

	@GetMapping("/{flightId}")
	public ResponseEntity<Flight> getFlightById(@PathVariable Long flightId) throws FlightNotFoundException {
		log.info("Fetching Flight with ID: {}", flightId);
		Flight flight = flightService.getFlightById(flightId);
		log.info("Flight fetched: {}", flight);
		return ResponseEntity.ok(flight);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Flight>> getAllFlights() {
		log.info("Fetching all Flights");
		List<Flight> flights = flightService.getAllFlights();
		log.info("Total Flights fetched: {}", flights.size());
		return ResponseEntity.ok(flights);
	}

	@GetMapping("/byCode/{flightCode}")
	public ResponseEntity<Flight> getFlightByCode(@PathVariable String flightCode) throws FlightNotFoundException {
		return ResponseEntity.ok(flightService.getFlightByCode(flightCode));
	}

	@GetMapping("/codes")
	public ResponseEntity<List<String>> getAllFlightCodes() {
		List<String> codes = flightService.getAllFlightCodes();
		return ResponseEntity.ok(codes);
	}

	@GetMapping("/search")
	public ResponseEntity<Flight> getFlightByCodeAndRoute(@PathVariable String code, @PathVariable String origin,
			@PathVariable String destination) {
		Flight flight = flightService.getFlightByCodeAndRoute(code, origin, destination);
		if (flight == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(flight);
	}

}