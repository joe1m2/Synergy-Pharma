package com.synergypharma.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RFQDTO {

    private Long id;
    private String referenceNumber;

    @NotBlank(message = "Contact name is required")
    @Size(max = 200)
    private String contactName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @Size(max = 30)
    private String phone;

    @NotBlank(message = "Organization is required")
    @Size(max = 300)
    private String organization;

    private String additionalNotes;

    private String status;

    @NotEmpty(message = "At least one item is required")
    @Valid
    private List<RFQItemDTO> items;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RFQItemDTO {

        private Long productId;

        @NotBlank(message = "Product name is required")
        private String productName;

        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        private Integer quantity;

        private String unit;
        private String specifications;
    }
}
