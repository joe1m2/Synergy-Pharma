package com.synergypharma.service;

import com.synergypharma.dto.ManufacturerDTO;
import com.synergypharma.entity.Manufacturer;
import com.synergypharma.exception.ResourceNotFoundException;
import com.synergypharma.repository.ManufacturerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ManufacturerService {

    private final ManufacturerRepository manufacturerRepository;

    public List<ManufacturerDTO> getAllActiveManufacturers() {
        return manufacturerRepository.findByActiveTrueOrderByNameAsc().stream().map(this::toDTO).toList();
    }

    public List<ManufacturerDTO> getAllManufacturers() {
        return manufacturerRepository.findAll().stream().map(this::toDTO).toList();
    }

    public ManufacturerDTO getManufacturerById(Long id) {
        return manufacturerRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Manufacturer", "id", id));
    }

    @Transactional
    public ManufacturerDTO createManufacturer(ManufacturerDTO dto) {
        Manufacturer m = Manufacturer.builder()
                .name(dto.getName())
                .country(dto.getCountry())
                .description(dto.getDescription())
                .logoUrl(dto.getLogoUrl())
                .website(dto.getWebsite())
                .active(dto.isActive())
                .build();
        return toDTO(manufacturerRepository.save(m));
    }

    @Transactional
    public ManufacturerDTO updateManufacturer(Long id, ManufacturerDTO dto) {
        Manufacturer existing = manufacturerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manufacturer", "id", id));
        existing.setName(dto.getName());
        existing.setCountry(dto.getCountry());
        existing.setDescription(dto.getDescription());
        existing.setLogoUrl(dto.getLogoUrl());
        existing.setWebsite(dto.getWebsite());
        existing.setActive(dto.isActive());
        return toDTO(manufacturerRepository.save(existing));
    }

    @Transactional
    public void deleteManufacturer(Long id) {
        if (!manufacturerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Manufacturer", "id", id);
        }
        manufacturerRepository.deleteById(id);
    }

    private ManufacturerDTO toDTO(Manufacturer m) {
        return ManufacturerDTO.builder()
                .id(m.getId())
                .name(m.getName())
                .country(m.getCountry())
                .description(m.getDescription())
                .logoUrl(m.getLogoUrl())
                .website(m.getWebsite())
                .active(m.isActive())
                .build();
    }
}
