package com.synergypharma.repository;

import com.synergypharma.entity.RFQ;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RFQRepository extends JpaRepository<RFQ, Long> {

    Optional<RFQ> findByReferenceNumber(String referenceNumber);

    Page<RFQ> findByStatus(RFQ.RFQStatus status, Pageable pageable);

    Page<RFQ> findByEmailOrderBySubmittedAtDesc(String email, Pageable pageable);
}
