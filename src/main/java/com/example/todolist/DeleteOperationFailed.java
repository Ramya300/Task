package com.example.todolist;


public class DeleteOperationFailed extends RuntimeException{

    public DeleteOperationFailed(String message){
        super(message);
    }
}
