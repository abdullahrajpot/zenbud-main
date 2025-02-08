import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Avatar, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useTaskContext } from '../../../contexts/TaskContext';

export default function Display() {
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const { tasks } = useTaskContext();

  const handleNavigateToTasks = (status) => {
    navigation.navigate('TaskList', { status }); // Pass the status to the TaskList screen
  };
  const getTaskCountByStatus = (status) => {
    return tasks.filter((task) => task.status === status).length;
  };

  const getPendingTasksCount = () => {
    return tasks.filter((task) => task.status === 'Pending').length;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <StatusBar translucent backgroundColor="transparent" />

        <View style={styles.idSection}>
          <Title style={styles.greeting}>Hi {user.name}</Title>
          <Text style={styles.subText}> {getPendingTasksCount()} Tasks are pending</Text>
        </View>
        <Avatar.Icon size={60} icon="account-circle" style={styles.avatar} />
      </View>

      {/* Task Card Section */}
      <LinearGradient
        colors={['#dd5201', '#000000']}
        start={{ x: 2, y: 2 }}
        end={{ x: 0, y: 0 }}
        style={styles.taskCard}
      >
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>Manage your tasks</Text>
          <Text style={styles.taskDescription}>Mike and Anita</Text>
        </View>
        <TouchableOpacity
          style={styles.taskTimeContainer}
          onPress={() => {
            navigation.navigate('AddTasks');
          }}
        >
          <Text style={styles.taskTime}>Now</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Monthly Review Section */}
      <View style={styles.monthlyReview}>
        <Text style={styles.sectionTitle}>Monthly Review</Text>

        <View style={styles.statsContainer}>
          {/* Individual Stat Cards */}
          {[
            { label: 'Done', status: 'Done' },
            { label: 'In Progress', status: 'In Progress' },
            { label: 'Ongoing', status: 'Ongoing' },
            { label: 'Waiting for Review', status: 'Pending' },
          ].map((stat, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleNavigateToTasks(stat.status)} // Navigate to TaskList with the status\

            >
              <LinearGradient
                colors={['#dd5201', '#000000']}
                start={{ x: 2, y: 2 }}
                end={{ x: 0, y: 0 }}
                // style={styles.statCard}
                style={[
                  styles.statCard,
                  (stat.label === 'Done' || stat.label === 'Waiting for Review') && styles.largeStatCard,
                ]}
              >
                <Text style={styles.statNumber}>{getTaskCountByStatus(stat.status)}</Text>

                {/* <Text style={styles.statNumber}>{stat.value}</Text> */}
                <Text style={styles.statLabel}>{stat.label}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const smokeColor = '#dd5201';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  idSection: {
    marginTop: 10,
  },
  greeting: {
    color: 'white',
    fontSize: 26,
    fontFamily: 'Poppins-Bold', 
  },
  subText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Poppins-Regular', 
  },
  avatar: {
    backgroundColor: smokeColor,
  },
  taskCard: {
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold', 
  },
  taskDescription: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  taskTimeContainer: {
    backgroundColor: smokeColor,
    padding: 10,
    borderRadius: 10,
  },
  taskTime: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Bold', 
  },
  monthlyReview: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Bold', 
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 15
  },
  statCard: {
    borderRadius: 12,
    width: '150',
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  largeStatCard: {
    height: 130,
    width: 160, 
    marginTop: 0
  },
  statNumber: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-Bold', 
  },
  statLabel: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Regular', 
    marginTop: 5,
  },
});
