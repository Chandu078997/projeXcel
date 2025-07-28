
/*

package com.example.projectwork.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

  
  //  @RequestMapping(value = {"/", "/{x:[\\w\\-]+}", "/*
  /////*/
//{x:[\\w\\-]+}"})
    //public String index() {
      //  // React build will be in src/main/resources/static/
        //return "forward:/index.html";
   // }
//}












package com.example.projectwork.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "Welcome! Backend is working on port 8082.";
    }

    @GetMapping("/home")
    public String home() {
        return "You are logged in! Backend is running.";
    }
    
}
