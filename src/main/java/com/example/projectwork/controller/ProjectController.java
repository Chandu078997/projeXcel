/*
 * package com.example.projectwork.controller;
 
import com.example.projectwork.entity.Enrollment;
import com.example.projectwork.entity.Project;
import com.example.projectwork.entity.Submission;
import com.example.projectwork.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5174")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Fetch all projects by domain (for browsing)
    @GetMapping("/domain/{domainId}")
    public List<Project> getProjectsByDomain(@PathVariable Long domainId) {
        return projectService.getProjectsByDomain(domainId);
    }

    // Fetch single project details
    @GetMapping("/details/{projectId}")
    public Project getProjectDetails(@PathVariable Long projectId) {
        return projectService.getProjectDetails(projectId);
    }

    // Enroll user into a project
    @PostMapping("/enroll/{projectId}")
    public ResponseEntity<String> enrollInProject(
            @PathVariable Long projectId,
            @RequestParam Long userId) {
        String message = projectService.enrollInProject(projectId, userId);
        return ResponseEntity.ok(message);
    }

    // Fetch all projects the user is enrolled in
    @GetMapping("/enrolled")
    public List<Project> getEnrolledProjects(@RequestParam Long userId) {
        return projectService.getEnrolledProjects(userId);
    }


    // Submit work for a project (only if enrolled)
    @PostMapping("/submit/{projectId}")
    public ResponseEntity<String> submitProject(
            @PathVariable Long projectId,
            @RequestParam Long userId,
            @RequestParam String submissionLink) {
        String result = projectService.submitProject(projectId, userId, submissionLink);
        return ResponseEntity.ok(result);
    }

    // Fetch user's submissions for a project (to show their status)
    @GetMapping("/submissions/{projectId}")
    public List<Submission> getUserSubmissions(
            @PathVariable Long projectId,
            @RequestParam Long userId) {
        return projectService.getUserSubmissions(projectId, userId);
    }
    
    

}
*/package com.example.projectwork.controller;

import com.example.projectwork.entity.Project;
import com.example.projectwork.entity.Submission;
import com.example.projectwork.entity.User;
import com.example.projectwork.service.ProjectService;
import com.example.projectwork.service.ProjectNotificationService;
import com.example.projectwork.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5174")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    private ProjectNotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Fetch all projects by domain (for browsing)
    @GetMapping("/domain/{domainId}")
    public List<Project> getProjectsByDomain(@PathVariable Long domainId) {
        return projectService.getProjectsByDomain(domainId);
    }

    // Fetch single project details (with start date for progress tracking)
    @GetMapping("/details/{projectId}")
    public ResponseEntity<Project> getProjectDetails(@PathVariable Long projectId) {
        Project project = projectService.getProjectDetails(projectId);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project);
    }

    // Enroll user into a project (and send email)
    @PostMapping("/enroll/{projectId}")
    public ResponseEntity<String> enrollInProject(
            @PathVariable Long projectId,
            @RequestParam Long userId) {

        String message = projectService.enrollInProject(projectId, userId);

        // Fetch user & project to send email
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Project project = projectService.getProjectDetails(projectId);

        // Trigger email notification
        notificationService.sendEnrollmentEmail(user, project);

        return ResponseEntity.ok(message);
    }

    // Fetch all projects the user is enrolled in
    @GetMapping("/enrolled")
    public List<Project> getEnrolledProjects(@RequestParam Long userId) {
        return projectService.getEnrolledProjects(userId);
    }

    // Submit work for a project (only if enrolled) + email
    @PostMapping("/submit/{projectId}")
    public ResponseEntity<String> submitProject(
            @PathVariable Long projectId,
            @RequestParam Long userId,
            @RequestParam String submissionLink) {

        String result = projectService.submitProject(projectId, userId, submissionLink);

        // Fetch user & project to send email
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Project project = projectService.getProjectDetails(projectId);

        // Trigger submission email
        notificationService.sendSubmissionEmail(user, project, submissionLink);

        return ResponseEntity.ok(result);
    }

    // Fetch user's submissions for a project
    @GetMapping("/submissions/{projectId}")
    public List<Submission> getUserSubmissions(
            @PathVariable Long projectId,
            @RequestParam Long userId) {
        return projectService.getUserSubmissions(projectId, userId);
    }
}
