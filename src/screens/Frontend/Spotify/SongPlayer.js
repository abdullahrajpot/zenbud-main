// import React, {useState} from 'react';
// import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
// import Modal from 'react-native-modal';
// import LinearGradient from 'react-native-linear-gradient';
// import Slider from '@react-native-community/slider';
// import TrackPlayer, {State} from 'react-native-track-player';
// const SongPlayer = ({
//   songsList,
//   currentIndex,
//   progress,
//   playbackState,
//   isVisible,
//   onClose,
//   onChange
// }) => {
//   const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex);
//   const format = seconds => {
//     let mins = parseInt(seconds / 60)
//       .toString()
//       .padStart(2, '0');
//     let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
//     return `${mins}:${secs}`;
//   };
//   return (
//     <Modal isVisible={isVisible} style={{margin: 0}}>
//       <LinearGradient
//         colors={['#067a02', '#064f03', '#032901', '#000000']}
//         style={{flex: 1}}>
//         <TouchableOpacity
//           style={{marginTop: 20, marginLeft: 20}}
//           onPress={() => {
//             onClose();
//           }}>
//           <Image
//             source={require('../../../assets/image/down-arrow.png')}
//             style={{
//               width: 30,
//               height: 30,
//               tintColor: 'white',
//             }}
//           />
//         </TouchableOpacity>

//         <Image
//           source={{uri: songsList[currentSongIndex].artwork}}
//           style={{
//             width: '80%',
//             height: '35%',
//             alignSelf: 'center',
//             marginTop: 20,
//             borderRadius: 5,
//           }}
//         />
//         <Text
//           style={{
//             fontSize: 30,
//             color: 'white',
//             fontWeight: '600',
//             marginLeft: 20,
//             marginTop: 20,
//           }}>
//           {songsList[currentSongIndex].title}
//         </Text>
//         <Text
//           style={{
//             fontSize: 16,
//             color: 'white',
//             fontWeight: '600',
//             marginLeft: 20,
//           }}>
//           {songsList[currentSongIndex].artist}
//         </Text>
//         <Slider
//           style={{width: '90%', height: 40, alignSelf: 'center'}}
//           minimumValue={progress.position}
//           maximumValue={progress.duration}
//           minimumTrackTintColor="#FFFFFF"
//           maximumTrackTintColor="#fff"
//         />
//         <View
//           style={{
//             width: '90%',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignSelf: 'center',
//           }}>
//           <Text style={{color: 'white'}}>{format(progress.position)}</Text>
//           <Text style={{color: 'white'}}>{format(progress.duration)}</Text>
//         </View>
//         <View
//           style={{
//             width: '100%',
//             justifyContent: 'space-evenly',
//             alignItems: 'center',
//             flexDirection: 'row',
//             alignSelf: 'center',
//             marginTop: 30,
//           }}>
//           <TouchableOpacity onPress={async()=>{
//             if(currentSongIndex>0){
//               await TrackPlayer.skip(currentSongIndex - 1);
//               await TrackPlayer.play();
//               setCurrentSongIndex(currentSongIndex - 1);
//               onChange(currentSongIndex-1)
//             }

//           }}>
//             <Image
//               source={require('../../../assets/image/previous.png')}
//               style={{width: 35, height: 35, tintColor: 'white'}}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               width: 60,
//               height: 60,
//               borderRadius: 30,
//               backgroundColor: 'white',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             onPress={async() => {
//               if (State.Playing == playbackState) {
//                 await TrackPlayer.pause();
//               } else {
//                 await TrackPlayer.skip(currentIndex);
//                 await TrackPlayer.play();
//               }
//             }}>
//             <Image
//               source={
//                 State.Playing == playbackState
//                   ? require('../../../assets/image/pause2.png')
//                   : require('../../../assets/image/play.png')
//               }
//               style={{width: 30, height: 30}}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={async () => {
//               await TrackPlayer.skip(currentSongIndex + 1);
//               await TrackPlayer.play();
//               setCurrentSongIndex(currentSongIndex + 1);
//               onChange(currentSongIndex+1)
//             }}>
//             <Image
//               source={require('../../../assets/image/next.png')}
//               style={{width: 35, height: 35, tintColor: 'white'}}
//             />
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </Modal>
//   );
// };

// export default SongPlayer;



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
          maximumValue={duration}
          onValueChange={handleSeek}
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
