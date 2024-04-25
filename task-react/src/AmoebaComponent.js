import React, {useEffect, useState} from "react";
import "./AmoebaComponent.css";

const AmoebaComponent = () => {
    const [randomTask, setRandomTask] = useState(null);
    const [items, setItems] = useState([]);
    const [randomIndex, setRandomIndex] = useState(null);
    const [inputVisible, setInputVisible] = useState(false);

    const handleAmoebaClick = () => {
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomTask = items[randomIndex];
        setRandomIndex(randomTask.id);
        setRandomTask(randomTask.task);
    };

    const handleDoneClick = async() =>{
        try{
            const response = await fetch('http://localhost:8080/deleteTask?index=' + randomIndex, {
            method: 'DELETE'
        });
            if(response.ok){
                handleRefresh();
                setRandomTask('');
            } else console.log("not yet deleted");
        }catch(error){
            console.log(error);
        }
    };

    const handleRefresh = async () => {
        await fetchTaskList();
        setRandomTask('');
        setInputVisible(false);
    }

    useEffect(() => {
        const taskList = async () => {
            await fetchTaskList();
        };
        taskList();
    }, []);

    const fetchTaskList = async () => {
        try {
            const response = await fetch('http://localhost:8080/taskList');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = async (event) => {
        try {
            if (event.target.value !== null) {
                const response = await fetch('http://localhost:8080/newTask?newTask=', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    body: event.target.value
                });

                if (response.ok) console.log("Inserted Successfully");
                else console.log("Can't insert your task");
            }
        }catch (error){
                console.log(error);
            }
        }

    const handleAddClick = () => {
        setInputVisible(!inputVisible);
    }

    return (
        <div className="main">
            <div className="list_div">
                <ul>
                    {items.map(item => (
                        <li key={item.id}>{item.task}</li>
                    ))}
                </ul>
                {inputVisible && (
                    <form >
                        <input type="text" name="add" onMouseLeave={handleInputChange} />
                    </form>
                )}
            </div>
            <div className="svg_div">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 225" onClick={handleAmoebaClick}>
                    <path fill="#EEEBE4">
                        <animate
                            attributeName="d"
                            dur="8s"
                            repeatCount="indefinite"
                            values="M123.63,4.78C58.88,12.27,34.28-11.9,13.02,15.7C-4.75,38.48-14.32,153.77,63.69,188.97
                            c68.24,30.8,138.63-9.43,172.27-78.99C255.75,69.05,193.75-5.76,123.63,4.78z;

                            M123.63,4.78C41.5,14.05,29.65-14.91,13.02,15.7C-7,52.55-6.32,204.81,63.69,188.97
                            c74.81-16.92,143.01-7.48,172.27-78.99C252.5,69.55,212.5-8.45,123.63,4.78z;

                            M123.63,4.78C41.5,14.05,16.11-16.94,13.02,15.7C3,121.55,0.78,223.54,63.69,188.97
                            c86.31-47.42,155.03-3.67,172.27-78.99C247.5,59.55,219.5-17.95,123.63,4.78z;

                            M123.63,4.78C41.5,14.05,29.65-14.91,13.02,15.7C-7,52.55-6.32,204.81,63.69,188.97
                            c74.81-16.92,143.01-7.48,172.27-78.99C252.5,69.55,212.5-8.45,123.63,4.78z;

                            M123.63,4.78C58.88,12.27,34.28-11.9,13.02,15.7C-4.75,38.48-14.32,153.77,63.69,188.97
                            c68.24,30.8,138.63-9.43,172.27-78.99C255.75,69.05,193.75-5.76,123.63,4.78z;">
                        </animate>
                    </path>
                </svg>
                {randomTask && <div className="random-task">{randomTask}</div>}
            </div>
            <div className="footer_div">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <div className="refresh_div">
                    <i className="material-icons refresh_icon" onClick={handleRefresh} role="button">refresh</i>
                    <i className="material-icons done_icon" onClick={handleDoneClick} role="button">done</i>
                    <i className="material-icons add_icon" onClick={handleAddClick} role="button">add</i>
                </div>
            </div>
        </div>
    );
};

export default AmoebaComponent;