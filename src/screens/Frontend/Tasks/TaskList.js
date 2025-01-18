import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTaskContext } from '../../../contexts/TaskContext';
import { Button, Menu, Divider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

export default function TaskList() {
    const { params } = useRoute();
    const { tasks, removeTask, updateTaskStatus } = useTaskContext(); // Add `updateTaskStatus` from context
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const status = params?.status; // Get the status passed from navigation
    const [menuVisible, setMenuVisible] = useState({});

    useEffect(() => {
        // Filter tasks based on status and search query
        const filtered = tasks.filter(
            (task) =>
                (!status || task.status === status) && // Match status
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) // Match search query
        );
        setFilteredTasks(filtered);
    }, [tasks, status, searchQuery]);

    const handleRemoveTask = (taskId) => {
        removeTask(taskId);
        Toast.show({
            type: 'success',
            text2: 'Task has been removed!',
            visibilityTime: 10000,
        }); // Call the removeTask function from context
    };

    const handleUpdateStatus = (taskId, newStatus) => {
        updateTaskStatus(taskId, newStatus); // Call the updateTaskStatus function from context
        setMenuVisible({ ...menuVisible, [taskId]: false }); // Close the menu
        Toast.show({
            type: 'success',
            text2: 'Status updated!',
            visibilityTime: 10000,
        });
    };

    const openMenu = (taskId) => {
        setMenuVisible({ ...menuVisible, [taskId]: true });
    };

    const closeMenu = (taskId) => {
        setMenuVisible({ ...menuVisible, [taskId]: false });
    };

    return (
        <View style={styles.container}>
                  <StatusBar translucent backgroundColor="transparent" />
            
            {/* Page Title */}
            <Text style={styles.title}>{status} Tasks</Text>

            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search tasks by title..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />

            {/* Task List */}
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <LinearGradient
                        colors={['#000', '#dd5201']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 2, y: 0 }}
                        style={styles.taskCard}
                    >
                        <View style={styles.left}>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <View style={styles.right}>
                                <Text style={styles.taskDate}>{item.date}</Text>
                            </View>
                            <Text style={styles.taskDescription}>{item.description}</Text>
                        </View>
                        <View style={styles.Buttons}>
                            <Button
                                mode="contained"
                                onPress={() => handleRemoveTask(item.id)}
                                style={styles.taskButton}
                                labelStyle={styles.buttonText}
                            >
                                Remove
                            </Button>

                            {/* Status Button with Menu */}
                            <Menu
                                visible={menuVisible[item.id] || false}
                                onDismiss={() => closeMenu(item.id)}
                                anchor={
                                    <Button
                                        mode="contained"
                                        style={styles.statusButton}
                                        labelStyle={styles.statusButtonText}
                                        onPress={() => openMenu(item.id)}
                                    >
                                        {item.status}
                                    </Button>
                                }
                            >
                                <Menu.Item
                                    onPress={() => handleUpdateStatus(item.id, 'Pending')}
                                    title="Pending"
                                />
                                <Divider />
                                <Menu.Item
                                    onPress={() => handleUpdateStatus(item.id, 'In Progress')}
                                    title="In Progress"
                                />
                                <Divider />
                                <Menu.Item
                                    onPress={() => handleUpdateStatus(item.id, 'Done')}
                                    title="Completed"
                                />
                            </Menu>
                        </View>
                    </LinearGradient>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No tasks found</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 26,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    searchBar: {
        backgroundColor: '#1a1a1a',
        borderRadius: 10,
        padding: 10,
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        marginBottom: 20,
    },
    taskCard: {
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    left: {
        marginBottom: 10,
    },
    taskTitle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 5,
    },
    taskDescription: {
        color: '#ccc',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    right: {
        marginBottom: 5,
        alignItems: 'flex-end',
        bottom: 20,
    },
    taskDate: {
        color: '#bbb',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
    },
    Buttons: {
        flexDirection: 'row',
    },
    taskButton: {
        borderRadius: 10,
        backgroundColor: '#1a1a1a',
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    statusButton: {
        borderRadius: 10,
        backgroundColor: '#dd5201',
        alignSelf: 'center',
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    statusButtonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
    },
    buttonText: {
        color: '#dd5201',
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        marginTop: 20,
    },
});
