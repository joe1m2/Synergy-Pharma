package com.synergypharma.service;

import com.synergypharma.dto.NewsDTO;
import com.synergypharma.entity.News;
import com.synergypharma.exception.ResourceNotFoundException;
import com.synergypharma.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NewsService {

    private final NewsRepository newsRepository;

    public Page<NewsDTO> getPublishedNews(Pageable pageable) {
        return newsRepository.findByPublishedTrueOrderByPublishedDateDesc(pageable).map(this::toDTO);
    }

    public List<NewsDTO> getLatestNews() {
        return newsRepository.findTop4ByPublishedTrueOrderByPublishedDateDesc()
                .stream().map(this::toDTO).toList();
    }

    public NewsDTO getNewsBySlug(String slug) {
        return newsRepository.findBySlug(slug)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("News", "slug", slug));
    }

    public NewsDTO getNewsById(Long id) {
        return newsRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("News", "id", id));
    }

    @Transactional
    public NewsDTO createNews(NewsDTO dto) {
        News news = fromDTO(dto);
        return toDTO(newsRepository.save(news));
    }

    @Transactional
    public NewsDTO updateNews(Long id, NewsDTO dto) {
        News existing = newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News", "id", id));
        existing.setTitle(dto.getTitle());
        existing.setSlug(dto.getSlug());
        existing.setSummary(dto.getSummary());
        existing.setContent(dto.getContent());
        existing.setImageUrl(dto.getImageUrl());
        existing.setCategory(News.NewsCategory.valueOf(dto.getCategory()));
        existing.setPublished(dto.isPublished());
        existing.setPublishedDate(dto.getPublishedDate());
        existing.setAuthor(dto.getAuthor());
        return toDTO(newsRepository.save(existing));
    }

    @Transactional
    public void deleteNews(Long id) {
        if (!newsRepository.existsById(id)) {
            throw new ResourceNotFoundException("News", "id", id);
        }
        newsRepository.deleteById(id);
    }

    private NewsDTO toDTO(News n) {
        return NewsDTO.builder()
                .id(n.getId())
                .title(n.getTitle())
                .slug(n.getSlug())
                .summary(n.getSummary())
                .content(n.getContent())
                .imageUrl(n.getImageUrl())
                .category(n.getCategory().name())
                .published(n.isPublished())
                .publishedDate(n.getPublishedDate())
                .author(n.getAuthor())
                .build();
    }

    private News fromDTO(NewsDTO dto) {
        return News.builder()
                .title(dto.getTitle())
                .slug(dto.getSlug())
                .summary(dto.getSummary())
                .content(dto.getContent())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory() != null ? News.NewsCategory.valueOf(dto.getCategory()) : News.NewsCategory.COMPANY_NEWS)
                .published(dto.isPublished())
                .publishedDate(dto.getPublishedDate())
                .author(dto.getAuthor())
                .build();
    }
}
