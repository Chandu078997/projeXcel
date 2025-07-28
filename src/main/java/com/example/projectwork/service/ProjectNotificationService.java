package com.example.projectwork.service;

import com.example.projectwork.entity.Project;
import com.example.projectwork.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectNotificationService {

    @Autowired
    private EmailService emailService;

    public void sendEnrollmentEmail(User user, Project project) {
        String subject = "Enrolled in Project: " + project.getTitle();
        String body = "Hi " + user.getName() + ",\n\n" +
                "You have successfully enrolled in the project: " + project.getTitle() + ".\n" +
                "Deadline: " + project.getSubmissionDeadline() + "\n\n" +
                "Best of luck!";
        emailService.sendEmail(user.getEmail(), subject, body);
    }

    public void sendSubmissionEmail(User user, Project project, String submissionLink) {
        String subject = "Project Submission Successful";
        String body = "Hi " + user.getName() + ",\n\n" +
                "Your submission for \"" + project.getTitle() + "\" was successful.\n" +
                "Link: " + submissionLink + "\nDeadline: " + project.getSubmissionDeadline() + "\n\n" +
                "Thank you!";
        emailService.sendEmail(user.getEmail(), subject, body);
    }

    public void sendDeadlineReminder(User user, Project project) {
        String subject = "Reminder: Project Deadline Approaching";
        String body = "Hi " + user.getName() + ",\n\n" +
                "The deadline for your project \"" + project.getTitle() + "\" is tomorrow (" +
                project.getSubmissionDeadline() + ").\n" +
                "Make sure to submit your work on time!";
        emailService.sendEmail(user.getEmail(), subject, body);
    }
}
