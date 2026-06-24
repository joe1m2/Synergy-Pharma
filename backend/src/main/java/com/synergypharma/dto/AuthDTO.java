package com.synergypharma.dto;

/**
 * Authentication DTOs — request/response records for auth endpoints.
 */
public final class AuthDTO {

    private AuthDTO() {}

    public record LoginRequest(String email, String password) {}

    public record RegisterRequest(String fullName, String email, String password, String role) {}

    public record AuthResponse(String token, String role, String email) {}
}
