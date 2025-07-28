package com.example.projectwork.entity;

import jakarta.persistence.*;

@Entity
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getter so ProjectDeadlineNotifier can access user
    public User getUser() {
        return user;
    }

    public Project getProject() {
        return project;
    }

    // Add setters if not present
    public void setUser(User user) {
        this.user = user;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
