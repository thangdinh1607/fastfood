package com.example.be.repository;

import com.example.be.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {

    //khue

    @Query(value = "select * from user where name = ?1 ", nativeQuery = true)
    Optional<User> findByUserNames(String userName);



}
