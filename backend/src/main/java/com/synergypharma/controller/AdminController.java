package com.synergypharma.controller;

import com.synergypharma.entity.PartnerInquiry;
import com.synergypharma.entity.RFQ;
import com.synergypharma.repository.ContactMessageRepository;
import com.synergypharma.repository.NewsRepository;
import com.synergypharma.repository.PartnerInquiryRepository;
import com.synergypharma.repository.ProductRepository;
import com.synergypharma.repository.RFQRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ProductRepository productRepository;
    private final NewsRepository newsRepository;
    private final RFQRepository rfqRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final PartnerInquiryRepository partnerInquiryRepository;

    /**
     * GET /api/admin/dashboard
     * Returns summary statistics for the admin dashboard.
     */
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        long totalProducts = productRepository.count();
        long totalNews = newsRepository.count();
        long totalRFQs = rfqRepository.count();
        long pendingRFQs = rfqRepository.findByStatus(RFQ.RFQStatus.PENDING,
                org.springframework.data.domain.Pageable.unpaged()).getTotalElements();
        long unreadMessages = contactMessageRepository.countByReadFalse();
        long newPartnerInquiries = partnerInquiryRepository.countByStatus(PartnerInquiry.InquiryStatus.NEW);

        return ResponseEntity.ok(Map.of(
                "totalProducts", totalProducts,
                "totalNews", totalNews,
                "totalRFQs", totalRFQs,
                "pendingRFQs", pendingRFQs,
                "unreadMessages", unreadMessages,
                "newPartnerInquiries", newPartnerInquiries
        ));
    }
}
