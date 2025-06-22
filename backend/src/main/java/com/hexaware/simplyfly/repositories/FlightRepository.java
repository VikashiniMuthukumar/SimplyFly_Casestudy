package com.hexaware.simplyfly.repositories;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for the Flight entity.
 * Provides built-in CRUD methods and custom update operations.
 *
 * Author: Vikashini
 * Version: 1.0
 */

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hexaware.simplyfly.entities.Flight;
import com.hexaware.simplyfly.entities.UserLogin;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

	@Modifying
	@Query("UPDATE Flight f SET f.cabinBaggageLimit = :limit WHERE f.flightId = :flightId")
	int updateCabinBaggageLimit(@Param("limit") int limit, @Param("flightId") Long flightId);
	
	@Query("SELECT f FROM Flight f WHERE f.flightCode = :flightCode")
	Optional<Flight> findByFlightCode(@Param("flightCode") String string);
	
	@Query("SELECT f.flightCode FROM Flight f")
	List<String> findAllFlightCodes();
	
	Flight findByFlightCodeAndRoute_OriginAndRoute_Destination(String flightCode, String origin, String destination);
	List<Flight> findByOwner(UserLogin owner);
}
