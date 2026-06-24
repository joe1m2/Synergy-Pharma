package com.synergypharma.controller;

import com.synergypharma.dto.ManufacturerDTO;
import com.synergypharma.service.ManufacturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manufacturers")
@RequiredArgsConstructor
public class ManufacturerController {

    private final ManufacturerService manufacturerService;

    /**
     * GET /api/manufacturers
     * Public — list all active manufacturers (used in product filters).
     */
    @GetMapping
    public ResponseEntity<List<ManufacturerDTO>> getAll() {
        return ResponseEntity.ok(manufacturerService.getAllActiveManufacturers());
    }

    /**
     * GET /api/manufacturers/{id}
     * Public — single manufacturer.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ManufacturerDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(manufacturerService.getManufacturerById(id));
    }

    // ── Admin Endpoints ────────────────────────────────────────────────────────

    /**
     * POST /api/manufacturers
     * Admin — create a manufacturer.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ManufacturerDTO> create(@RequestBody ManufacturerDTO dto) {
        return ResponseEntity.status(201).body(manufacturerService.createManufacturer(dto));
    }

    /**
     * PUT /api/manufacturers/{id}
     * Admin — update a manufacturer.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ManufacturerDTO> update(@PathVariable Long id, @RequestBody ManufacturerDTO dto) {
        return ResponseEntity.ok(manufacturerService.updateManufacturer(id, dto));
    }

    /**
     * DELETE /api/manufacturers/{id}
     * Admin — delete a manufacturer.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        manufacturerService.deleteManufacturer(id);
        return ResponseEntity.noContent().build();
    }
}
