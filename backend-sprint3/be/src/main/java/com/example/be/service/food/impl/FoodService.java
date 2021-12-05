package com.example.be.service.food.impl;

import com.example.be.model.Food;
import com.example.be.repository.IFoodRepository;
import com.example.be.service.food.IFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService implements IFoodService {

    @Autowired
    private IFoodRepository iFoodRepository;

    @Override
    public List<Food> findAll() {
        return this.iFoodRepository.findAll();
    }

    @Override
    public Food findById(Long id) {
        return this.iFoodRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Food food) {
        this.iFoodRepository.save(food);
    }

    @Override
    public void remove(Long id) {
        this.iFoodRepository.deleteById(id);
    }

    @Override
    public List<Food> search(String keyword, String promotion,String address, String typeSort, Integer limit1) {
        return iFoodRepository.search(keyword, promotion,address, typeSort, limit1);
    }

    @Override
    public Integer countFood(String keyword, String promotion, String address, String typeSort, Integer limit1) {
        return iFoodRepository.countFood(keyword, promotion,address, typeSort, limit1);
    }
}
