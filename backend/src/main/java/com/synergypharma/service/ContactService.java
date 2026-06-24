package com.synergypharma.service;

import com.synergypharma.dto.ContactMessageDTO;
import com.synergypharma.entity.ContactMessage;
import com.synergypharma.exception.ResourceNotFoundException;
import com.synergypharma.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    @Transactional
    public ContactMessageDTO submitContact(ContactMessageDTO dto) {
        ContactMessage message = ContactMessage.builder()
                .senderName(dto.getSenderName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .inquiryType(dto.getInquiryType() != null
                        ? ContactMessage.InquiryType.valueOf(dto.getInquiryType())
                        : ContactMessage.InquiryType.GENERAL)
                .read(false)
                .build();
        return toDTO(contactMessageRepository.save(message));
    }

    public Page<ContactMessageDTO> getAllMessages(Pageable pageable) {
        return contactMessageRepository.findAll(pageable).map(this::toDTO);
    }

    public Page<ContactMessageDTO> getUnreadMessages(Pageable pageable) {
        return contactMessageRepository.findByReadFalse(pageable).map(this::toDTO);
    }

    public ContactMessageDTO getMessageById(Long id) {
        return contactMessageRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("ContactMessage", "id", id));
    }

    @Transactional
    public ContactMessageDTO markAsRead(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactMessage", "id", id));
        message.setRead(true);
        return toDTO(contactMessageRepository.save(message));
    }

    @Transactional
    public void deleteMessage(Long id) {
        if (!contactMessageRepository.existsById(id)) {
            throw new ResourceNotFoundException("ContactMessage", "id", id);
        }
        contactMessageRepository.deleteById(id);
    }

    public long countUnread() {
        return contactMessageRepository.countByReadFalse();
    }

    private ContactMessageDTO toDTO(ContactMessage m) {
        return ContactMessageDTO.builder()
                .id(m.getId())
                .senderName(m.getSenderName())
                .email(m.getEmail())
                .phone(m.getPhone())
                .subject(m.getSubject())
                .message(m.getMessage())
                .inquiryType(m.getInquiryType() != null ? m.getInquiryType().name() : null)
                .read(m.isRead())
                .receivedAt(m.getReceivedAt())
                .build();
    }
}
