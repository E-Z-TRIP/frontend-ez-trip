import { View } from 'react-native';
import { Video } from 'expo-av';
import { useRef, useState } from 'react';

export default function VideoBackground({ source, layerOpacity, children }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Video
        source={source}
        style={{ flex: 1 }}
        useNativeControls={false}
        resizeMode='cover'
        isLooping
        shouldPlay
        onLoad={(status) => console.log(status)}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View
        style={{
          position: 'absolute',
          flex: 1,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: 'black',
          opacity: layerOpacity,
        }}></View>
      {children({ position: 'absolute', flex: 1, top: 0, left: 0, bottom: 0, right: 0 })}
    </View>
  );
}
