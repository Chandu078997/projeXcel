package com.example.projectwork.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "domain_id")
    private Domain domain;

    private String title;

    @Column(name = "shortDescription", length = 255)  // Mapped to camelCase column
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "skills_required")
    private String skillsRequired;

    @Column(name = "submission_deadline")
    private LocalDate submissionDeadline;

    @Column(name = "whatsapp_group_link")
    private String whatsappGroupLink;
    @Column(name = "start_date")
    private LocalDate startDate;

    // Getter and Setter
    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }


	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Domain getDomain() {
        return domain;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSkillsRequired() {
        return skillsRequired;
    }

    public void setSkillsRequired(String skillsRequired) {
        this.skillsRequired = skillsRequired;
    }

    public LocalDate getSubmissionDeadline() {
        return submissionDeadline;
    }

    public void setSubmissionDeadline(LocalDate submissionDeadline) {
        this.submissionDeadline = submissionDeadline;
    }

    public String getWhatsappGroupLink() {
        return whatsappGroupLink;
    }

    public void setWhatsappGroupLink(String whatsappGroupLink) {
        this.whatsappGroupLink = whatsappGroupLink;
    }
}
