package com.synergypharma.repository;

import com.synergypharma.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    Page<News> findByPublishedTrueOrderByPublishedDateDesc(Pageable pageable);

    List<News> findTop4ByPublishedTrueOrderByPublishedDateDesc();

    Optional<News> findBySlug(String slug);

    Page<News> findByCategoryAndPublishedTrue(News.NewsCategory category, Pageable pageable);
}
