package com.synergypharma.service;

import com.synergypharma.dto.PartnerInquiryDTO;
import com.synergypharma.entity.PartnerInquiry;
import com.synergypharma.exception.ResourceNotFoundException;
import com.synergypharma.repository.PartnerInquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PartnerService {

    private final PartnerInquiryRepository partnerInquiryRepository;

    @Transactional
    public PartnerInquiryDTO submitInquiry(PartnerInquiryDTO dto) {
        PartnerInquiry inquiry = PartnerInquiry.builder()
                .companyName(dto.getCompanyName())
                .contactName(dto.getContactName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .country(dto.getCountry())
                .partnerType(PartnerInquiry.PartnerType.valueOf(dto.getPartnerType()))
                .message(dto.getMessage())
                .status(PartnerInquiry.InquiryStatus.NEW)
                .build();
        return toDTO(partnerInquiryRepository.save(inquiry));
    }

    public Page<PartnerInquiryDTO> getAllInquiries(Pageable pageable) {
        return partnerInquiryRepository.findAll(pageable).map(this::toDTO);
    }

    public PartnerInquiryDTO getInquiryById(Long id) {
        return partnerInquiryRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("PartnerInquiry", "id", id));
    }

    @Transactional
    public PartnerInquiryDTO updateStatus(Long id, PartnerInquiry.InquiryStatus status) {
        PartnerInquiry inquiry = partnerInquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PartnerInquiry", "id", id));
        inquiry.setStatus(status);
        return toDTO(partnerInquiryRepository.save(inquiry));
    }

    @Transactional
    public void deleteInquiry(Long id) {
        if (!partnerInquiryRepository.existsById(id)) {
            throw new ResourceNotFoundException("PartnerInquiry", "id", id);
        }
        partnerInquiryRepository.deleteById(id);
    }

    public long countByStatus(PartnerInquiry.InquiryStatus status) {
        return partnerInquiryRepository.countByStatus(status);
    }

    private PartnerInquiryDTO toDTO(PartnerInquiry p) {
        return PartnerInquiryDTO.builder()
                .id(p.getId())
                .companyName(p.getCompanyName())
                .contactName(p.getContactName())
                .email(p.getEmail())
                .phone(p.getPhone())
                .country(p.getCountry())
                .partnerType(p.getPartnerType() != null ? p.getPartnerType().name() : null)
                .message(p.getMessage())
                .status(p.getStatus() != null ? p.getStatus().name() : null)
                .submittedAt(p.getSubmittedAt())
                .build();
    }
}
