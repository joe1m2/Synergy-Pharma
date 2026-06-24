package com.synergypharma.controller;

import com.synergypharma.dto.AuthDTO;
import com.synergypharma.entity.Role;
import com.synergypharma.service.AuthService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/auth/login
     * Public endpoint — authenticate and get a JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthDTO.AuthResponse> login(@RequestBody AuthDTO.LoginRequest request) {
        Map<String, String> result = authService.login(request.email(), request.password());
        return ResponseEntity.ok(new AuthDTO.AuthResponse(
                result.get("token"),
                result.get("role"),
                result.get("email")
        ));
    }

    /**
     * POST /api/auth/register
     * Public — create a new user account (defaults to USER). Admin can assign other roles.
     */
    @PostMapping("/register")
    public ResponseEntity<AuthDTO.AuthResponse> register(
            @RequestBody AuthDTO.RegisterRequest request,
            org.springframework.security.core.Authentication authentication) {
        Role role = Role.USER;
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            try {
                if (request.role() != null && !request.role().isBlank()) {
                    role = Role.valueOf(request.role().toUpperCase());
                }
            } catch (IllegalArgumentException e) {
                role = Role.USER;
            }
        }
        Map<String, String> result = authService.register(
                request.fullName(), request.email(), request.password(), role
        );
        return ResponseEntity.ok(new AuthDTO.AuthResponse(
                result.get("token"),
                result.get("role"),
                result.get("email")
        ));
    }

    /**
     * GET /api/auth/me
     * Returns current user info from the JWT principal.
     */
    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> me(
            org.springframework.security.core.Authentication authentication) {
        return ResponseEntity.ok(Map.of(
                "email", authentication.getName(),
                "role", authentication.getAuthorities().iterator().next().getAuthority()
        ));
    }

}
