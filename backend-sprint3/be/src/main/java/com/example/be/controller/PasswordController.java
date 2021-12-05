package com.example.be.controller;


import com.example.be.dto.password.Message;
import com.example.be.dto.password.PasswordDto;
import com.example.be.model.user.User;
import com.example.be.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Pattern;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/api/password")
public class PasswordController {
    private static String REGEX = "^\\w{5,}$";

    @Autowired
    private IUserService userService;

    @PatchMapping("/{id}")
    public ResponseEntity<Message> updatePasswordAdmin1(@PathVariable Long id, @RequestBody PasswordDto passwordDto) {
        System.out.println(passwordDto.getNewPassword());
        System.out.println("debuggggg");
        User user = this.userService.findById(id);
        if (user != null) {
            if (!checkRegex(passwordDto)) {
                return new ResponseEntity<>(new Message("Mật khẩu không đúng định dạng"), HttpStatus.BAD_REQUEST);
            } else {
                Boolean comparePassword = compareRawPasswordAndEncoderPassword(passwordDto.getOldPassword(), user.getPassword());
                if (comparePassword) {
                    Boolean comparePassword1 = compareRawPasswordAndEncoderPassword(passwordDto.getNewPassword(), user.getPassword());
                    if (comparePassword1) {
                        return new ResponseEntity<>(new Message("Mật khẩu mới trùng với mật khẩu cũ"), HttpStatus.BAD_REQUEST);
                    } else {
                        String newPasswordEncoder = encoderPassword(passwordDto.getNewPassword());
                        user.setPassword(newPasswordEncoder);
                        this.userService.save(user);
                        return new ResponseEntity<>(new Message("Đổi mật khẩu thành công"), HttpStatus.OK);
                    }
                } else {
                    return new ResponseEntity<>(new Message("Sai mật khẩu"), HttpStatus.BAD_REQUEST);
                }
            }
        } else {
            return new ResponseEntity<>(new Message("không tìm thấy tài khoản"), HttpStatus.NOT_FOUND);
        }
    }

    //    Check sự trùng lặp mật khẩu
    Boolean compareRawPasswordAndEncoderPassword(String rawPassword, String encoderPassword) {
        BCryptPasswordEncoder cryptPasswordEncoder = new BCryptPasswordEncoder();
        return cryptPasswordEncoder.matches(rawPassword, encoderPassword);
    }

    Boolean checkRegex(PasswordDto passwordDto) {
        return Pattern.compile(REGEX).matcher(passwordDto.getOldPassword()).matches() &&
                Pattern.compile(REGEX).matcher(passwordDto.getNewPassword()).matches() &&
                Pattern.compile(REGEX).matcher(passwordDto.getConfirmPassword()).matches();
    }

    String encoderPassword(String password) {
        BCryptPasswordEncoder cryptPasswordEncoder = new BCryptPasswordEncoder();
        return cryptPasswordEncoder.encode(password);
    }
}
