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
        taskRepository.deleteById(task);
    }

    public void addTask(String newTask){
        Task task = new Task();
        task.setTask(newTask);
        taskRepository.save(task);
    }

}
