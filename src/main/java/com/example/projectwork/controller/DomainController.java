package com.example.projectwork.controller;

import com.example.projectwork.entity.Domain;
import com.example.projectwork.repository.DomainRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/domains")  // Matches frontend API call
@CrossOrigin(origins ={ "http://localhost:5174", "https://projexecelfrontend.netlify.app",   "https://projetxecelfrontend.netlify.app",     // Your deployed frontend
    "https://projexcel-production.up.railway.app","https://projexcel-1.onrender.com"}
            )  // Vite dev server port
public class DomainController {

    private final DomainRepository domainRepository;

    public DomainController(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

    @GetMapping
    public List<Domain> getAllDomains() {
        return domainRepository.findAll();
    }
}
