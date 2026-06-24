package com.synergypharma.repository;

import com.synergypharma.entity.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {

    List<Manufacturer> findByActiveTrueOrderByNameAsc();

    Optional<Manufacturer> findByName(String name);
}
