import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const songsList = [
  {
    title: 'Death Bed',
    artist: 'Powfu',
    artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
    url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
    duration: '2:53',
    id: '1',
  },
  {
    title: 'Bad Liar',
    artist: 'Imagine Dragons',
    artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
    url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
    duration: '4:20',
    id: '2',
  },
  {
    title: 'Faded',
    artist: 'Alan Walker',
    artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
    url: 'https://samplesongs.netlify.app/Faded.mp3',
    duration: '3:32',
    id: '3',
  },
  {
    title: 'Hate Me',
    artist: 'Ellie Goulding',
    artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
    url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
    duration: '3:42',
    id: '4',
  },
  {
    title: 'Solo',
    artist: 'Clean Bandit',
    artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
    url: 'https://samplesongs.netlify.app/Solo.mp3',
    duration: '3:48',
    id: '5',
  },
  {
    title: 'Without Me',
    artist: 'Halsey',
    artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
    url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
    duration: '4:20',
    id: '6',
  },
];

const Music = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songsList);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredSongs(songsList);
    } else {
      const filtered = songsList.filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [search]);

  return (
    <LinearGradient
      colors={['#a34c0d', '#592804', '#241001', '#000000']}
      style={{ flex: 1 }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 60,
          marginHorizontal: 20,
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
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Find in Playlist"
          placeholderTextColor="white"
          style={{
            flex: 1,
            height: 40,
            marginHorizontal: 10,
            backgroundColor: '#b06a41',
            borderRadius: 5,
            color: 'white',
            paddingHorizontal: 15,
          }}
        />
      </View>

      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SongPlayer', {
                song: item,
                songsList: filteredSongs,
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: 20,
              backgroundColor: '#341a0a',
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Image
              source={{ uri: item.artwork }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>
                {item.title || 'Unknown Title'}
              </Text>
              <Text style={{ color: 'grey', fontSize: 12 }}>
                {item.artist || 'Unknown Artist'}
              </Text>
            </View>
            <Text style={{ color: 'white', fontSize: 12 }}>
              {item.duration || '00:00'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
};

export default Music;
