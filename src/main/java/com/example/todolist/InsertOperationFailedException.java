package com.example.todolist;

public class InsertOperationFailedException extends RuntimeException{
    public InsertOperationFailedException(String message){
        super(message);
    }
}
