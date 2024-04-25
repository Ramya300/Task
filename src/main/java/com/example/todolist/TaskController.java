package com.example.todolist;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/taskList")
    public ResponseEntity<List<Task>> taskList() {
       List<Task> data = taskService.getAllTasks();
       return ResponseEntity.ok(data);
    }

    @DeleteMapping("/deleteTask")
    public ResponseEntity<String> deleteTask(@RequestParam(name = "index") Long id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete task: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/newTask")
    public ResponseEntity<String> newTask (@RequestBody String newTask) {
        try {
            taskService.addTask(newTask);
            return ResponseEntity.ok().build();
        } catch(Exception e){
            return new ResponseEntity<>("Unable to Insert'" + newTask , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}