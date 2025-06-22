package com.example.demo.controller;
import com.example.demo.model.News;
import com.example.demo.service.NewsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id) {
        return newsService.getNewsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<News> createNews(@RequestBody News news) {
        return ResponseEntity.ok(newsService.saveNews(news));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Long id, @RequestBody News newsDetails) {
        return newsService.getNewsById(id)
                .map(news -> {
                    news.setTitle(newsDetails.getTitle());
                    news.setContent(newsDetails.getContent());
                    return ResponseEntity.ok(newsService.saveNews(news));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        if (newsService.getNewsById(id).isPresent()) {
            newsService.deleteNews(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
