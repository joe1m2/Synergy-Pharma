package com.synergypharma.repository;

import com.synergypharma.entity.ContactMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    Page<ContactMessage> findByReadFalse(Pageable pageable);

    Page<ContactMessage> findByInquiryType(ContactMessage.InquiryType inquiryType, Pageable pageable);

    long countByReadFalse();
}
