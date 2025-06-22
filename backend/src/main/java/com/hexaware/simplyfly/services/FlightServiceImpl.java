package com.hexaware.simplyfly.services;

/**
 * Service implementation for CRUD operations on Flight entities.
 * Author: Vikashini
 * Version: 1.0
 */

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.simplyfly.dto.FlightDTO;
import com.hexaware.simplyfly.entities.Flight;
import com.hexaware.simplyfly.entities.FlightOwner;
import com.hexaware.simplyfly.exceptions.FlightNotFoundException;
import com.hexaware.simplyfly.exceptions.FlightOwnerNotFoundException;
import com.hexaware.simplyfly.repositories.FlightOwnerRepository;
import com.hexaware.simplyfly.repositories.FlightRepository;

@Service
public class FlightServiceImpl implements IFlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private FlightOwnerRepository flightOwnerRepository;

    @Override
    public Flight createFlight(FlightDTO dto) throws FlightOwnerNotFoundException {
        Flight flight = new Flight();
        flight.setName(dto.getName());
        flight.setFlightCode(dto.getFlightCode());
        flight.setTotalSeats(dto.getTotalSeats());
        flight.setCabinBaggageLimit(dto.getCabinBaggageLimit());
        flight.setCheckInBaggageLimit(dto.getCheckInBaggageLimit());

        return flightRepository.save(flight);
    }

    @Override
    public Flight updateFlight(Long flightId, FlightDTO dto) throws FlightNotFoundException, FlightOwnerNotFoundException {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new FlightNotFoundException("Flight not found with ID: " + flightId));

        flight.setName(dto.getName());
        flight.setFlightCode(dto.getFlightCode());
        flight.setTotalSeats(dto.getTotalSeats());
        flight.setCabinBaggageLimit(dto.getCabinBaggageLimit());
        flight.setCheckInBaggageLimit(dto.getCheckInBaggageLimit());

        return flightRepository.save(flight);
    }

    @Override
    public Flight getFlightByCode(String flightCode) throws FlightNotFoundException {
        System.out.println("Searching for flight code: " + flightCode);
        return flightRepository.findByFlightCode(flightCode)
                .orElseThrow(() -> new FlightNotFoundException("Flight not found with code: " + flightCode));
    }


    @Override
    public boolean deleteFlight(Long flightId) throws FlightNotFoundException {
        if (!flightRepository.existsById(flightId)) {
            throw new FlightNotFoundException("Flight not found with ID: " + flightId);
        }
        flightRepository.deleteById(flightId);
        return true;
    }

    @Override
    public Flight getFlightById(Long flightId) throws FlightNotFoundException {
        return flightRepository.findById(flightId)
                .orElseThrow(() -> new FlightNotFoundException("Flight not found with ID: " + flightId));
    }

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
    
    @Override
    public List<String> getAllFlightCodes() {
        return flightRepository.findAll()
                               .stream()
                               .map(Flight::getFlightCode)
                               .toList();
    }
    
    @Override
    public Flight getFlightByCodeAndRoute(String code, String origin, String destination) {
        return flightRepository.findByFlightCodeAndRoute_OriginAndRoute_Destination(code, origin, destination);
    }



}