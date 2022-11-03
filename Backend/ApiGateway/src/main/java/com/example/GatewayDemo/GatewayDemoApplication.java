package com.example.GatewayDemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@SpringBootApplication
@EnableEurekaClient
@CrossOrigin(origins = "*")
public class GatewayDemoApplication {

        public static void main(String[] args) {
                SpringApplication.run(GatewayDemoApplication.class, args);
        }
}
