package com.example.be.service.food;

import com.example.be.model.Food;
import com.example.be.service.IGeneralService;


import java.util.List;


public interface IFoodService extends IGeneralService<Food> {
    List<Food> search(  String keyword, String promotion,String address, String typeSort,Integer limit1);
    Integer countFood(  String keyword, String promotion,String address, String typeSort,Integer limit1);
}
