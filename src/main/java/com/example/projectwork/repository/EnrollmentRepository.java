package com.example.projectwork.repository;

import com.example.projectwork.entity.Enrollment;
import com.example.projectwork.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Optional<Enrollment> findByProjectIdAndUserId(Long projectId, Long userId);
    List<Enrollment> findByUserId(Long userId);

    // Add this for ProjectDeadlineNotifier
    List<Enrollment> findByProject(Project project);
}
