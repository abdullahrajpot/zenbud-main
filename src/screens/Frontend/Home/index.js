// import React from 'react'
// import { Text, View, StyleSheet, Image, Alert, BackHandler } from 'react-native'
// import { useAuthContext } from '../../../contexts/AuthContext'
// import { Button } from 'react-native-paper';
// import { useFocusEffect } from '@react-navigation/native';

// export default function Home(){
//   const {logOut}=useAuthContext();

//   const handleBackPress = () => {
//     Alert.alert('Exit App', 'Are you sure you want to exit?', [
//       {
//         text: 'Cancel',
//         onPress: () => null,
//         style: 'cancel',
//       },
//       {
//         text: 'Exit',
//         onPress: () => BackHandler.exitApp(),
//       },
//     ]);
//     return true;
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       BackHandler.addEventListener('hardwareBackPress', handleBackPress);

//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
//       };
//     }, []),
//   );

  
//     return (
//       <View style={styles.flexContainer}>
//         <Text style={{fontSize:30}}>Name: Abdullah Tariq </Text>
//         <Text style={{fontSize:30}}>RollNo: 182866 </Text>
//         <Button mode="contained" onPress={logOut} style={styles.button}>
//             Sign out
//           </Button>

//     {/* <Image
//     style={styles.image}
//     source= {require("./src/assets/")}
//     /> */}
//       </View>
//     )
//   }



// const styles = StyleSheet.create({
// flexContainer:{
//   flex:1,
//   // backgroundColor:"gray",
//   justifyContent:'center',
//   alignItems:'center'
  
// },
// image:{
//   width:"80%",
//   height:"60%",

// }



// })



import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Avatar, Title } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useTaskContext } from '../../../contexts/TaskContext';
import Animated, { FadeInDown, FadeInUp, BounceIn } from 'react-native-reanimated';

export default function Home() {
  const { user } = useAuthContext();
  const { tasks } = useTaskContext();


  const handleBackPress = () => {
        Alert.alert('Exit App', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };
    
      useFocusEffect(
        React.useCallback(() => {
          BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
          return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
          };
        }, []),
      );

  const getPendingTasks = () => {
    return tasks.filter((task) => task.status === 'Pending');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View>
  {/* Icon in the Top-Left Corner */}
  <View style={styles.iconContainer}>
    <Image
      source={require('../../../assets/image/zendark.png')} // Replace with your icon image
      style={styles.icon}
    />
        <Avatar.Icon size={60} icon="account-circle" style={styles.avatar} />

  </View>

  {/* User Details Section */}
  <View style={styles.header}>
    <StatusBar translucent backgroundColor="transparent" />
    <View style={styles.idSection}>
      <Title style={styles.greeting}>Hi {user.name}</Title>
      <Text style={styles.subText}>Welcome Back!</Text>
    </View>
    {/* <Avatar.Icon size={60} icon="account-circle" style={styles.avatar} /> */}
  </View>
</View>


      {/* Promotional Section */}
      <Animated.View
        entering={FadeInDown.delay(200)}
        style={styles.promoSection}
      >
        <Image
          source={require('../../../assets/image/main2.jpg')} // Replace with your promotional image
          style={styles.promoImage}
        />
        <Text style={styles.promoTitle}>Welcome to Our App!</Text>
        <Text style={styles.promoText}>
          Manage your tasks efficiently with our modern features and intuitive
          design.
        </Text>
      </Animated.View>

      {/* Pending Tasks Section */}
      <Animated.View
        entering={FadeInUp.delay(400)}
        style={styles.tasksSection}
      >
        <Text style={styles.sectionTitle}>Your Pending Tasks</Text>
        {getPendingTasks().map((task, index) => (
          <LinearGradient
            key={index}
            colors={['#dd5201', '#000000']}
            start={{ x: 2, y: 2 }}
            end={{ x: 0, y: 0 }}
            style={styles.taskCard}
          >
            {/* Task Info */}
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDescription}>{task.description}</Text>
            </View>
            {/* Deadline Display */}
            <Text style={styles.deadlineText}>{task.date}</Text>
          </LinearGradient>
        ))}
      </Animated.View>

      {/* Promotional Features Section */}
      <Animated.View
        entering={BounceIn.delay(600)}
        style={styles.featuresSection}
      >
        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        {[
          'Easy task management',
          'Track your progress',
          'Beautiful dark theme',
          'Real-time notifications',
        ].map((feature, index) => (
          <LinearGradient
            key={index}
            colors={['#000000', '#dd5201']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featureCard}
          >
            <Text style={styles.featureText}>{feature}</Text>
          </LinearGradient>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  iconContainer: {
    paddingHorizontal: 10, // Adjust left margin as needed
    marginTop: 30,   
    flexDirection:'row',
    justifyContent:'space-between'      // Adjust top margin as needed
  },
  icon: {
    width: 160, // Adjust size as needed
    height: 80,
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
    backgroundColor: '#dd5201',
    marginTop:22
  },
  promoSection: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  promoImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#dd5201',
    marginBottom: 10,
  },
  promoTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  promoText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  tasksSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  taskCard: {
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative', // Allows positioning for deadline
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  taskDescription: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  deadlineText: {
    color: '#ff4500',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  featuresSection: {
    marginTop: 140,
    paddingHorizontal: 20,
    bottom:100
  },
  featureCard: {
    borderRadius: 12,
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  featureText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});
