package com.synergypharma.controller;

import com.synergypharma.dto.NewsDTO;
import com.synergypharma.service.FileStorageService;
import com.synergypharma.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;
    private final FileStorageService fileStorageService;

    /**
     * GET /api/news?page=0&size=9
     * Public — paginated published news articles.
     */
    @GetMapping
    public ResponseEntity<Page<NewsDTO>> getNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "publishedDate"));
        return ResponseEntity.ok(newsService.getPublishedNews(pageable));
    }

    /**
     * GET /api/news/latest
     * Public — top 4 latest news items for the homepage.
     */
    @GetMapping("/latest")
    public ResponseEntity<List<NewsDTO>> getLatest() {
        return ResponseEntity.ok(newsService.getLatestNews());
    }

    /**
     * GET /api/news/{slug}
     * Public — single news article by slug.
     */
    @GetMapping("/{slug}")
    public ResponseEntity<NewsDTO> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(newsService.getNewsBySlug(slug));
    }

    // ── Admin Endpoints ────────────────────────────────────────────────────────

    /**
     * POST /api/news
     * Admin — create a news article.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NewsDTO> create(@RequestBody NewsDTO dto) {
        return ResponseEntity.status(201).body(newsService.createNews(dto));
    }

    /**
     * PUT /api/news/{id}
     * Admin — update a news article.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NewsDTO> update(@PathVariable Long id, @RequestBody NewsDTO dto) {
        return ResponseEntity.ok(newsService.updateNews(id, dto));
    }

    /**
     * DELETE /api/news/{id}
     * Admin — delete a news article.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /api/news/{id}/image
     * Admin — upload featured image for a news article.
     */
    @PostMapping("/{id}/image")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NewsDTO> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        NewsDTO news = newsService.getNewsById(id);
        String imageUrl = fileStorageService.storeFile(file, "news");
        news.setImageUrl(imageUrl);
        return ResponseEntity.ok(newsService.updateNews(id, news));
    }
}
