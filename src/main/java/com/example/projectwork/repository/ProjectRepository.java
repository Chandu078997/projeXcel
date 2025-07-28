package com.example.projectwork.repository;

import com.example.projectwork.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByDomainId(Long domainId);
    List<Project> findBySubmissionDeadline(LocalDate deadline);
}
