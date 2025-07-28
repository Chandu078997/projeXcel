
/*
package com.example.projectwork.repository;

import com.example.projectwork.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByProjectId(Long projectId);
    int countByProjectId(Long projectId);  // For WhatsApp limit (5)
}
*/

package com.example.projectwork.repository;
import com.example.projectwork.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    Optional<Submission> findTopByProjectIdAndUserIdOrderBySubmittedAtDesc(Long projectId, Long userId);

    int countByProjectId(Long projectId);

	List<Submission> findByProjectIdAndUserId(Long projectId, Long userId);
}
