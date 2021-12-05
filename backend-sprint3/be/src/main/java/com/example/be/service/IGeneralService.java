package com.example.be.service;


import java.util.List;
import java.util.Optional;

public interface IGeneralService<T> {
    List<T> findAll();

   T findById(Long id);

    void save(T t);

    void remove(Long id);
}
