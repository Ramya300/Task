package com.example.todolist;

public class InsertOperationFailed extends RuntimeException{
    public InsertOperationFailed(String message){
        super(message);
    }
}
