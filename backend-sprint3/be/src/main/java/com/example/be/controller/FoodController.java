package com.example.be.controller;


import com.example.be.model.Food;
import com.example.be.service.food.IFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/food")

public class FoodController {
    @Autowired
    private IFoodService iFoodService;


    @GetMapping("")
    public ResponseEntity<List<Food>> getAllFood() {
        List<Food> foods = this.iFoodService.findAll();
        if (foods.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(foods, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> findById(@PathVariable Long id) {

        Food food = this.iFoodService.findById(id);
        if (food != null) {
            return new ResponseEntity<>(food, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/count")
    public Integer count(@RequestParam(defaultValue = "") String keyword,
                         @RequestParam(defaultValue = "") String promotion,
                         @RequestParam(defaultValue = "") String address,
                         @RequestParam(defaultValue = "food.name") String typeSort,
                         @RequestParam(defaultValue = "6") Integer limit1) {
        return this.iFoodService.countFood(keyword, promotion, address, typeSort, limit1);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> search(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "") String promotion,
            @RequestParam(defaultValue = "") String address,
            @RequestParam(defaultValue = "food.name") String typeSort,
            @RequestParam(defaultValue = "6") Integer limit1) {
        List<Food> foods = this.iFoodService.search(keyword, promotion, address, typeSort, limit1);
        if (foods.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(foods, HttpStatus.OK);
        }
    }
}
