package com.example.be.service.user.impl;


import com.example.be.model.user.User;
import com.example.be.repository.IUserRepository;
import com.example.be.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    IUserRepository iUserRepository;

    @Override
    public List<User> findAll() {
        return this.iUserRepository.findAll();
    }

    @Override
    public User findById(Long id) {
        return this.iUserRepository.findById(id).orElse(null);
    }

    @Override
    public void save(User user) {
        iUserRepository.save(user);
    }

    @Override
    public void remove(Long id) {
        iUserRepository.deleteById(id);
    }
}
