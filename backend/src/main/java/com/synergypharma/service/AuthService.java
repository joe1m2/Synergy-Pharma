package com.synergypharma.service;

import com.synergypharma.entity.User;
import com.synergypharma.entity.Role;
import com.synergypharma.exception.ResourceNotFoundException;
import com.synergypharma.repository.UserRepository;
import com.synergypharma.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Authenticate an existing user and return a JWT.
     */
    public Map<String, String> login(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        String token = jwtService.generateToken(user);
        return Map.of("token", token, "role", user.getRole().name(), "email", user.getEmail());
    }

    /**
     * Register a new user (Phase 1 — admin-only registration).
     */
    @Transactional
    public Map<String, String> register(String fullName, String email, String password, Role role) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered: " + email);
        }
        User user = User.builder()
                .fullName(fullName)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(role)
                .enabled(true)
                .build();
        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return Map.of("token", token, "role", user.getRole().name(), "email", user.getEmail());
    }
}
