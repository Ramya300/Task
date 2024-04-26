package com.example.todolist;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
      List<Task> data = taskRepository.findAll();
      if (data.isEmpty()) return new ArrayList<>();
      else return data;
    }

    public void deleteTask(Long task) {
        try{
            taskRepository.deleteById(task);
        } catch(Exception e){
            throw new DeleteOperationFailed("Failed to delete.");
        }

    }

    public void addTask(String newTask){
        Task task = new Task();
        task.setTask(newTask);
        try{
            taskRepository.save(task);
        }catch(Exception e){
            throw new InsertOperationFailed("Unable to insert the given task to the List.");
        }

    }

}
