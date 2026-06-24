package com.synergypharma.controller;

import com.synergypharma.dto.ContactMessageDTO;
import com.synergypharma.service.ContactService;
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
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    /**
     * POST /api/contact
     * Public — submit the contact form.
     */
    @PostMapping
    public ResponseEntity<ContactMessageDTO> submit(@Valid @RequestBody ContactMessageDTO dto) {
        return ResponseEntity.status(201).body(contactService.submitContact(dto));
    }

    // ── Admin Endpoints ────────────────────────────────────────────────────────

    /**
     * GET /api/contact?page=0&size=20
     * Admin — all contact messages, newest first.
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<ContactMessageDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "receivedAt"));
        return ResponseEntity.ok(contactService.getAllMessages(pageable));
    }

    /**
     * GET /api/contact/unread
     * Admin — only unread messages.
     */
    @GetMapping("/unread")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<ContactMessageDTO>> getUnread(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "receivedAt"));
        return ResponseEntity.ok(contactService.getUnreadMessages(pageable));
    }

    /**
     * GET /api/contact/unread-count
     * Admin — count of unread messages (for dashboard badge).
     */
    @GetMapping("/unread-count")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> countUnread() {
        return ResponseEntity.ok(Map.of("count", contactService.countUnread()));
    }

    /**
     * GET /api/contact/{id}
     * Admin — single contact message.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactMessageDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getMessageById(id));
    }

    /**
     * PATCH /api/contact/{id}/read
     * Admin — mark a message as read.
     */
    @PatchMapping("/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactMessageDTO> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }

    /**
     * DELETE /api/contact/{id}
     * Admin — delete a contact message.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}
