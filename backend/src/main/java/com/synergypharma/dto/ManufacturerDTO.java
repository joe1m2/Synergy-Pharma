package com.synergypharma.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ManufacturerDTO {

    private Long id;
    private String name;
    private String country;
    private String description;
    private String logoUrl;
    private String website;
    private boolean active;
}
