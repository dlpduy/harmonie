package com.project.harmonie_e_commerce.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
//    CREATE TABLE IF NOT EXISTS users (
//            id              INT             AUTO_INCREMENT              PRIMARY KEY,
//            fname           VARCHAR(20)	                                NOT NULL,
//    lname           VARCHAR(20)                                 NOT NULL,
//    dob             DATE                                        NOT NULL,
//    sex 	        ENUM('M', 'F', 'Other')                     NOT NULL,
//    phone           VARCHAR(10)     UNIQUE                      NOT NULL,
//    email           VARCHAR(50)    	UNIQUE                      NOT NULL,
//    creation_date   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,
//    password 		VARCHAR(65) 								NOT NULL
//);
    @NotBlank(message = "First name is required")
    private String fName;
    @NotBlank(message = "Last name is required")
    private String lName;
    private Date dob;
    @Enumerated(EnumType.STRING)
    private Sex sex;

    private String phone;
    private String email;
    @NotBlank(message = "Password is required")
    private String password;
    public enum Sex {
        M, F, OTHER
    }
}
