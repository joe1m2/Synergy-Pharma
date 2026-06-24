package com.synergypharma.controller;

import com.synergypharma.dto.RFQDTO;
import com.synergypharma.entity.RFQ;
import com.synergypharma.service.RFQService;
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
@RequestMapping("/api/rfq")
@RequiredArgsConstructor
public class RFQController {

    private final RFQService rfqService;

    /**
     * POST /api/rfq
     * Public — submit a new Request for Quotation.
     */
    @PostMapping
    public ResponseEntity<RFQDTO> submit(@Valid @RequestBody RFQDTO dto) {
        return ResponseEntity.status(201).body(rfqService.submitRFQ(dto));
    }

    // ── Admin Endpoints ────────────────────────────────────────────────────────

    /**
     * GET /api/rfq?page=0&size=20
     * Admin — paginated list of all RFQs.
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<RFQDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        return ResponseEntity.ok(rfqService.getAllRFQs(pageable));
    }

    /**
     * GET /api/rfq/{id}
     * Admin — single RFQ by ID.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RFQDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(rfqService.getRFQById(id));
    }

    /**
     * PATCH /api/rfq/{id}/status
     * Admin — update the status of an RFQ.
     * Body: { "status": "QUOTED" }
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RFQDTO> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        RFQ.RFQStatus status = RFQ.RFQStatus.valueOf(body.get("status").toUpperCase());
        return ResponseEntity.ok(rfqService.updateStatus(id, status));
    }
}
