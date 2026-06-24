package com.synergypharma.controller;

import com.synergypharma.dto.PartnerInquiryDTO;
import com.synergypharma.entity.PartnerInquiry;
import com.synergypharma.service.PartnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/partners")
@RequiredArgsConstructor
public class PartnerController {

    private final PartnerService partnerService;

    /**
     * POST /api/partners
     * Public — submit a partner inquiry.
     */
    @PostMapping
    public ResponseEntity<PartnerInquiryDTO> submit(@Valid @RequestBody PartnerInquiryDTO dto) {
        return ResponseEntity.status(201).body(partnerService.submitInquiry(dto));
    }

    // ── Admin Endpoints ────────────────────────────────────────────────────────

    /**
     * GET /api/partners?page=0&size=20
     * Admin — all partner inquiries, newest first.
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<PartnerInquiryDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "submittedAt"));
        return ResponseEntity.ok(partnerService.getAllInquiries(pageable));
    }

    /**
     * GET /api/partners/{id}
     * Admin — single partner inquiry.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PartnerInquiryDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(partnerService.getInquiryById(id));
    }

    /**
     * PATCH /api/partners/{id}/status
     * Admin — update inquiry status (NEW → IN_REVIEW → APPROVED / REJECTED).
     * Body: { "status": "IN_REVIEW" }
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PartnerInquiryDTO> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        PartnerInquiry.InquiryStatus status =
                PartnerInquiry.InquiryStatus.valueOf(body.get("status").toUpperCase());
        return ResponseEntity.ok(partnerService.updateStatus(id, status));
    }

    /**
     * DELETE /api/partners/{id}
     * Admin — delete a partner inquiry.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        partnerService.deleteInquiry(id);
        return ResponseEntity.noContent().build();
    }
}
