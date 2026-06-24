package com.synergypharma.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsDTO {

    private Long id;
    private String title;
    private String slug;
    private String summary;
    private String content;
    private String imageUrl;
    private String category;
    private boolean published;
    private LocalDate publishedDate;
    private String author;
}
