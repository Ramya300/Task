package com.example.todolist;

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
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/newTask")
    public ResponseEntity<String> newTask(@RequestBody String newTask) {
        taskService.addTask(newTask);
        return ResponseEntity.ok().build();
    }
}