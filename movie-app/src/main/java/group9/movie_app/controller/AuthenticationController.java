package group9.movie_app.controller;

import group9.movie_app.dto.AuthenticationRequest;
import group9.movie_app.dto.ChangePasswordRequest;
import group9.movie_app.dto.RegisterRequest;
import group9.movie_app.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
//sửa lại de handle được registration 
@Controller
@RequiredArgsConstructor
@RequestMapping("/movies-app")
public class AuthenticationController {

    private final AuthenticationService service;
//chay dc
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            var response = service.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
//chay dc
    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            var response = service.authenticate(request);
            return ResponseEntity.ok(response); // Return token if successful
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
//chay dc
    @PutMapping("/user-admin/password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            service.changePassword(request);
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}