package com.synergypharma.service;

import com.synergypharma.dto.RFQDTO;
import com.synergypharma.entity.Product;
import com.synergypharma.entity.RFQ;
import com.synergypharma.entity.RFQItem;
import com.synergypharma.exception.ResourceNotFoundException;
import com.synergypharma.repository.ProductRepository;
import com.synergypharma.repository.RFQRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RFQService {

    private final RFQRepository rfqRepository;
    private final ProductRepository productRepository;

    @Transactional
    public RFQDTO submitRFQ(RFQDTO dto) {
        RFQ rfq = RFQ.builder()
                .referenceNumber("RFQ-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .contactName(dto.getContactName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .organization(dto.getOrganization())
                .additionalNotes(dto.getAdditionalNotes())
                .status(RFQ.RFQStatus.PENDING)
                .build();

        if (dto.getItems() != null) {
            dto.getItems().forEach(itemDto -> {
                Product product = itemDto.getProductId() != null
                        ? productRepository.findById(itemDto.getProductId()).orElse(null)
                        : null;

                RFQItem item = RFQItem.builder()
                        .rfq(rfq)
                        .product(product)
                        .productName(itemDto.getProductName())
                        .quantity(itemDto.getQuantity())
                        .unit(itemDto.getUnit())
                        .specifications(itemDto.getSpecifications())
                        .build();

                rfq.getItems().add(item);
            });
        }

        return toDTO(rfqRepository.save(rfq));
    }

    public Page<RFQDTO> getAllRFQs(Pageable pageable) {
        return rfqRepository.findAll(pageable).map(this::toDTO);
    }

    public RFQDTO getRFQById(Long id) {
        return rfqRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("RFQ", "id", id));
    }

    @Transactional
    public RFQDTO updateStatus(Long id, RFQ.RFQStatus status) {
        RFQ rfq = rfqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RFQ", "id", id));
        rfq.setStatus(status);
        if (status == RFQ.RFQStatus.QUOTED || status == RFQ.RFQStatus.CLOSED) {
            rfq.setProcessedAt(LocalDateTime.now());
        }
        return toDTO(rfqRepository.save(rfq));
    }

    private RFQDTO toDTO(RFQ rfq) {
        return RFQDTO.builder()
                .id(rfq.getId())
                .referenceNumber(rfq.getReferenceNumber())
                .contactName(rfq.getContactName())
                .email(rfq.getEmail())
                .phone(rfq.getPhone())
                .organization(rfq.getOrganization())
                .additionalNotes(rfq.getAdditionalNotes())
                .status(rfq.getStatus().name())
                .items(rfq.getItems().stream().map(item ->
                        RFQDTO.RFQItemDTO.builder()
                                .productId(item.getProduct() != null ? item.getProduct().getId() : null)
                                .productName(item.getProductName())
                                .quantity(item.getQuantity())
                                .unit(item.getUnit())
                                .specifications(item.getSpecifications())
                                .build()
                ).toList())
                .build();
    }
}
