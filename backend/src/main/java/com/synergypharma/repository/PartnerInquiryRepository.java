package com.synergypharma.repository;

import com.synergypharma.entity.PartnerInquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerInquiryRepository extends JpaRepository<PartnerInquiry, Long> {

    Page<PartnerInquiry> findByStatus(PartnerInquiry.InquiryStatus status, Pageable pageable);

    Page<PartnerInquiry> findByPartnerType(PartnerInquiry.PartnerType partnerType, Pageable pageable);

    long countByStatus(PartnerInquiry.InquiryStatus status);
}
