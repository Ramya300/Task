package com.example.todolist;


public class DeleteOperationFailedException extends RuntimeException{

    public DeleteOperationFailedException(String message){
        super(message);
    }
}
