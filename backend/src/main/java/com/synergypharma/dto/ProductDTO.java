package com.synergypharma.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private Long id;
    private String name;
    private String genericName;
    private String description;
    private String sku;
    private String strength;
    private String dosageForm;
    private String packagingUnit;
    private String imageUrl;
    private String brochureUrl;
    private Long categoryId;
    private String categoryName;
    private Long manufacturerId;
    private String manufacturerName;
    private boolean active;
}
