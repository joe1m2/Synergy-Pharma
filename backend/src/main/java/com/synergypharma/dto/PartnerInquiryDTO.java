package com.synergypharma.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartnerInquiryDTO {

    private Long id;

    @NotBlank(message = "Company name is required")
    @Size(max = 200)
    private String companyName;

    @NotBlank(message = "Contact name is required")
    @Size(max = 100)
    private String contactName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @Size(max = 30)
    private String phone;

    @Size(max = 100)
    private String country;

    @NotBlank(message = "Partner type is required")
    private String partnerType;

    private String message;

    private String status;

    private LocalDateTime submittedAt;
}
