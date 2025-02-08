
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Vibration,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';

const PomodoroTimer = ({ navigation }) => {
  const [workTime, setWorkTime] = useState(25); 
  const [breakTime, setBreakTime] = useState(5); 
  const [remainingTime, setRemainingTime] = useState(workTime * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [intervalType, setIntervalType] = useState('Work'); 

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerRef.current);
          handleIntervalEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handlePlayPause = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      startTimer();
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setRemainingTime(intervalType === 'Work' ? workTime * 60 : breakTime * 60);
    Animated.timing(progressAnimation).stop();
    progressAnimation.setValue(0);
  };

  const handleIntervalEnd = () => {
    Vibration.vibrate(500);

    // Play a sound
    const sound = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (!error) {
        sound.play();
      }
    });

    if (intervalType === 'Work') {
      setIntervalType('Break');
      setRemainingTime(breakTime * 60);
    } else {
      setIntervalType('Work');
      setRemainingTime(workTime * 60);
    }

    progressAnimation.setValue(0);

    // Auto-start the next interval
    startTimer();
  };

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: remainingTime * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [remainingTime, intervalType]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const progressStrokeWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View  style={styles.gradientContainer}>

      <StatusBar translucent backgroundColor="transparent" />

      <Text style={styles.header}>Pomodoro Timer</Text>

      <View style={styles.timerContainer}>
        <View style={styles.outerCircle}>
          <Animated.View
            style={[
              styles.progressOutline,
              { transform: [{ rotate: progressStrokeWidth }] },
            ]}
          />
          <View style={styles.innerCircle}>
            <Text style={styles.timerText}>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          </View>
        </View>
        <Text style={styles.taskLabel}>
          {intervalType === 'Work' ? 'Work Time' : 'Break Time'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addTimerButton}
        onPress={() => {
          navigation.navigate('TimerSetting', {
            workTime,
            breakTime,
            updateTimes: (newWorkTime, newBreakTime) => {
              setWorkTime(newWorkTime);
              setBreakTime(newBreakTime);
              setRemainingTime(newWorkTime * 60); 
            },
          });
        }}
        >
        <Icon name="add-circle" size={60} color="#ffffff" />
      </TouchableOpacity>
        </View>
  );
};

export default PomodoroTimer;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#000000'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  progressOutline: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 8,
    borderColor: '#dd5201',
  },
  innerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  taskLabel: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,

  },
  button: {
    backgroundColor: '#dd5201',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  addTimerButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
});
