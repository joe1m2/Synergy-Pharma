package com.synergypharma.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactMessageDTO {

    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 200)
    private String senderName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @Size(max = 30)
    private String phone;

    @NotBlank(message = "Subject is required")
    @Size(max = 100)
    private String subject;

    @NotBlank(message = "Message is required")
    private String message;

    private String inquiryType;

    private boolean read;

    private LocalDateTime receivedAt;
}
