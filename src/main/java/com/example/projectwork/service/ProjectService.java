/*
 * package com.example.projectwork.service;
 
import com.example.projectwork.entity.Enrollment;
import com.example.projectwork.entity.Project;
import com.example.projectwork.entity.Submission;
import com.example.projectwork.entity.User;
import com.example.projectwork.repository.EnrollmentRepository;
import com.example.projectwork.repository.ProjectRepository;
import com.example.projectwork.repository.SubmissionRepository;
import com.example.projectwork.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;

    public ProjectService(ProjectRepository projectRepository,
                          SubmissionRepository submissionRepository,
                          UserRepository userRepository,
                          EnrollmentRepository enrollmentRepository) {
        this.projectRepository = projectRepository;
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

  
    public List<Project> getProjectsByDomain(Long domainId) {
        return projectRepository.findByDomainId(domainId);
    }

   
    public Project getProjectDetails(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

   
    public String enrollInProject(Long projectId, Long userId) {
        Optional<Enrollment> existing = enrollmentRepository.findByProjectIdAndUserId(projectId, userId);
        if (existing.isPresent()) {
            return "You are already enrolled in this project.";
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setProjectId(projectId);
        enrollment.setUserId(userId);
        enrollmentRepository.save(enrollment);

        return "Successfully enrolled in project!";
    }

 
    public List<Project> getEnrolledProjects(Long userId) {
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);
        return enrollments.stream()
                .map(e -> projectRepository.findById(e.getProjectId()).orElse(null))
                .filter(p -> p != null) // Avoid nulls if project is missing
                .toList();
    }

    
    public String submitProject(Long projectId, Long userId, String submissionLink) {
        // Must be enrolled
        if (enrollmentRepository.findByProjectIdAndUserId(projectId, userId).isEmpty()) {
            return "You must enroll in this project before submitting work.";
        }

        // Check duplicate submission
        if (submissionRepository.findTopByProjectIdAndUserIdOrderBySubmittedAtDesc(projectId, userId).isPresent()) {
            return "You have already submitted your work for this project.";
        }

        // Fetch user info
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Submission submission = new Submission();
        submission.setProjectId(projectId);
        submission.setUserId(userId);
        submission.setUserName(user.getName());
        submission.setUserEmail(user.getEmail());
        submission.setSubmissionLink(submissionLink);
        submission.setStatus("Pending Review");

        submissionRepository.save(submission);
        return "Project submitted successfully!";
    }

    // Get all submissions by a user for a given project 
    public List<Submission> getUserSubmissions(Long projectId, Long userId) {
        return submissionRepository.findByProjectIdAndUserId(projectId, userId);
    }

    //Update the status of a submission (Reviewed, Approved, etc.) 
    public void updateSubmissionStatus(Long submissionId, String status) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        submission.setStatus(status);
        submissionRepository.save(submission);
    }
}
*/package com.example.projectwork.service;

import com.example.projectwork.entity.Enrollment;
import com.example.projectwork.entity.Project;
import com.example.projectwork.entity.Submission;
import com.example.projectwork.entity.User;
import com.example.projectwork.repository.EnrollmentRepository;
import com.example.projectwork.repository.ProjectRepository;
import com.example.projectwork.repository.SubmissionRepository;
import com.example.projectwork.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Autowired
    private ProjectNotificationService notificationService;  // Added for email sending

    public ProjectService(ProjectRepository projectRepository,
                          SubmissionRepository submissionRepository,
                          UserRepository userRepository,
                          EnrollmentRepository enrollmentRepository) {
        this.projectRepository = projectRepository;
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    /** Fetch projects by domain */
    public List<Project> getProjectsByDomain(Long domainId) {
        return projectRepository.findByDomainId(domainId);
    }

    /** Get single project details (ensure startDate is always set) */
    public Project getProjectDetails(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (project.getStartDate() == null) {
            project.setStartDate(LocalDate.now());
            projectRepository.save(project);
        }

        return project;
    }

    /** Enroll a user into a project (sends email after enrollment) */
    public String enrollInProject(Long projectId, Long userId) {
        Optional<Enrollment> existing = enrollmentRepository.findByProjectIdAndUserId(projectId, userId);
        if (existing.isPresent()) {
            return "You are already enrolled in this project.";
        }

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setProject(project);
        enrollment.setUser(user);

        enrollmentRepository.save(enrollment);

        // Send confirmation email to the logged-in user's email
        notificationService.sendEnrollmentEmail(user, project);

        return "Successfully enrolled in project!";
    }

    /** Fetch all projects where the user is enrolled */
    public List<Project> getEnrolledProjects(Long userId) {
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);
        return enrollments.stream()
                .map(e -> e.getProject())
                .filter(p -> p != null)
                .collect(Collectors.toList());
    }

    /** Submit work */
    public String submitProject(Long projectId, Long userId, String submissionLink) {
        if (enrollmentRepository.findByProjectIdAndUserId(projectId, userId).isEmpty()) {
            return "You must enroll in this project before submitting work.";
        }

        if (submissionRepository.findTopByProjectIdAndUserIdOrderBySubmittedAtDesc(projectId, userId).isPresent()) {
            return "You have already submitted your work for this project.";
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Submission submission = new Submission();
        submission.setProjectId(projectId);
        submission.setUserId(userId);
        submission.setUserName(user.getName());
        submission.setUserEmail(user.getEmail());
        submission.setSubmissionLink(submissionLink);
        submission.setStatus("Pending Review");

        submissionRepository.save(submission);
        return "Project submitted successfully!";
    }

    /** Get all submissions by a user for a project */
    public List<Submission> getUserSubmissions(Long projectId, Long userId) {
        return submissionRepository.findByProjectIdAndUserId(projectId, userId);
    }

    /** Update status */
    public void updateSubmissionStatus(Long submissionId, String status) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        submission.setStatus(status);
        submissionRepository.save(submission);
    }
}
