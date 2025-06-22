package com.hexaware.simplyfly.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.hexaware.simplyfly.entities.UserLogin;
import com.hexaware.simplyfly.services.UserLoginService;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:4200")
public class UserLoginRestController {

	
    @Autowired
    private UserLoginService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserLogin user) {
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
        userService.register(user);
        return ResponseEntity.ok("Registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLogin user) {
        boolean valid = userService.validateUser(user.getUsername(), user.getPassword());
        if (valid) return ResponseEntity.ok("Login successful");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
