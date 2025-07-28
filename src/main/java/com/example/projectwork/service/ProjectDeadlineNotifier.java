package com.example.projectwork.service;

import com.example.projectwork.entity.Project;
import com.example.projectwork.entity.User;
import com.example.projectwork.entity.Enrollment;
import com.example.projectwork.repository.ProjectRepository;
import com.example.projectwork.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class ProjectDeadlineNotifier {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private ProjectNotificationService notificationService;

    // Runs every day at 9:00 AM
    @Scheduled(cron = "0 0 9 * * ?")
    public void sendDeadlineReminders() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        List<Project> projects = projectRepository.findBySubmissionDeadline(tomorrow);

        for (Project project : projects) {
            List<Enrollment> enrollments = enrollmentRepository.findByProject(project);
            for (Enrollment enrollment : enrollments) {
                User user = enrollment.getUser();
                notificationService.sendDeadlineReminder(user, project);
            }
        }
    }
}
