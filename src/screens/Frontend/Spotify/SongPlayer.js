
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';

const SongPlayer = ({ route, navigation }) => {
  const { song, songsList } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const sound = new Sound(song.url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      setDuration(sound.getDuration());
    });

    setCurrentSong(sound);

    const interval = setInterval(() => {
      if (isPlaying && sound) {
        sound.getCurrentTime((time) => {
          setPosition(time);
        });
      }
    }, 1000);

    return () => {
      sound.release();
      clearInterval(interval);
    };
  }, [song]);

  const playPause = () => {
    if (currentSong) {
      if (isPlaying) {
        currentSong.pause();
      } else {
        currentSong.play((success) => {
          if (!success) {
            console.log('Playback failed');
          }
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
useEffect(() => {
  if (currentSong) {
    // Update position every second
    const interval = setInterval(() => {
      currentSong.getCurrentTime((time) => {
        setPosition(time); // Update slider's current position
      });
    }, 1000);

    return () => clearInterval(interval); 
  }
}, [currentSong]);


  const handleSeek = (value) => {
    if (currentSong) {
      currentSong.setCurrentTime(value);
      setPosition(value);
    }
  };

  const skipToNext = () => {
    const nextIndex = parseInt(song.id) % songsList.length;
    navigation.replace('SongPlayer', { song: songsList[nextIndex], songsList });
  };

  const skipToPrevious = () => {
    const prevIndex = (parseInt(song.id) - 2 + songsList.length) % songsList.length;
    navigation.replace('SongPlayer', { song: songsList[prevIndex], songsList });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <ScrollView>
      <LinearGradient
      colors={['#a34c0d', '#592804', '#241001', '#000000']}
      style={{ flex: 1, paddingTop: 50 }}
      >
        {/* Top Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/image/left.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>

          <Image
            source={require('../../../assets/image/spotify.png')}
            style={{
              width: 100,
              height: 30,
              resizeMode: 'contain',
            }}
          />
          <View style={{ width: 24 }} />
        </View>

        {/* Album Artwork */}
        <Image
          source={{ uri: song.artwork }}
          style={{
            width: '80%',
            height: 300,
            alignSelf: 'center',
            marginVertical: 20,
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.8,
            shadowRadius: 10,
            elevation: 15,
          }}
        />

        {/* Song Details */}
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 5,
          }}
        >
          {song.title}
        </Text>
        <Text
          style={{
            color: '#b3b3b3',
            textAlign: 'center',
            fontSize: 16,
            marginBottom: 20,
          }}
        >
          {song.artist}
        </Text>

        {/* Slider */}
        <Slider
  value={position}
  minimumValue={0}
  maximumValue={currentSong ? currentSong.getDuration() : 0}
  onValueChange={handleSeek} // Allow seeking
  style={{ width: '80%', alignSelf: 'center', marginVertical: 20 }}
  minimumTrackTintColor="#1DB954"
  maximumTrackTintColor="#535353"
  thumbTintColor="#1DB954"
/>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40 }}>
          <Text style={{ color: 'white', fontSize: 14 }}>{formatTime(position)}</Text>
          <Text style={{ color: 'white', fontSize: 14 }}>{formatTime(duration)}</Text>
        </View>

        {/* Playback Controls */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginVertical: 30,
          }}
        >
          <TouchableOpacity onPress={skipToPrevious}>
            <Image
              source={require('../../../assets/image/previous.png')}
              style={{ width: 40, height: 40, tintColor: 'white' }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playPause}>
            <Image
              source={
                isPlaying
                  ? require('../../../assets/image/pause.png')
                  : require('../../../assets/image/play.png')
              }
              style={{ width: 40, height: 40, tintColor: 'white' }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Image
              source={require('../../../assets/image/next.png')}
              style={{ width: 40, height: 40, tintColor: 'white' }}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default SongPlayer;
