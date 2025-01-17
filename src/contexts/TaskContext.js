import React, { createContext, useContext, useEffect, useState } from 'react';
import firestore, { collection, getDocs, query, where } from '@react-native-firebase/firestore';
import { useAuthContext } from './AuthContext';

const TaskContext = createContext();

export default function TaskContextProvider({ children }) {
    const { user } = useAuthContext(); // Get the logged-in user
    const [tasks, setTasks] = useState([]); // State to store tasks
    const [loading, setLoading] = useState(true); // Loading state

    // Function to fetch tasks for the logged-in user
    const getTasks = async () => {
        try {
            setLoading(true); // Start loading
            if (!user) return; // Ensure user is available

            // Query to fetch tasks where `createdBy.uid` matches the logged-in user's UID
            const tasksQuery = query(
                collection(firestore(), 'Tasks'),
                where('createdBy.uid', '==', user.uid)
            );

            const querySnapshot = await getDocs(tasksQuery);
            const userTasks = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setTasks(userTasks); // Set tasks
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Function to remove a task by ID
    const removeTask = async (taskId) => {
        try {
            await firestore()
                .collection('Tasks')
                .doc(taskId)
                .delete(); // Delete the task from Firestore

            // Update the local state to remove the task
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            console.log('Task deleted successfully!');
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            await firestore()
                .collection('Tasks')
                .doc(taskId)
                .update({ status: newStatus });
            getTasks(); // Refresh tasks after update
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };
    

    useEffect(() => {
        if (user) {
            getTasks(); // Fetch tasks when user is available
        }
    }, [user]);

    return (
        <TaskContext.Provider value={{ tasks, getTasks, removeTask, loading, updateTaskStatus }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTaskContext = () => useContext(TaskContext);
