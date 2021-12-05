package com.example.be.repository;

import com.example.be.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFoodRepository extends JpaRepository<Food,Long> {
    @Query(value = "{call search (:keyword,:promotion,:address,:typeSort,:limit1)}", nativeQuery = true)
    List<Food> search(
                        @Param("keyword") String keyword,
                      @Param("promotion") String promotion,
                        @Param("address") String address,
                      @Param("typeSort") String typeSort,
                      @Param("limit1") Integer limit1);

    @Query(value = "{call countFood (:keyword,:promotion,:address,:typeSort,:limit1)}", nativeQuery = true)
    Integer countFood(
            @Param("keyword") String keyword,
            @Param("promotion") String promotion,
            @Param("address") String address,
            @Param("typeSort") String typeSort,
            @Param("limit1") Integer limit1);
}
