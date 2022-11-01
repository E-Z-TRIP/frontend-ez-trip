import { View, Text, Dimensions } from 'react-native';
import { useRef, useEffect } from 'react';
import styles from './style.css';
import BackgroundImageLayer from '../../components/background_image_layer/BackgroundImageLayer';
import mountImg from '../../assets/images/Mountain.png';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import RouteSvg from './RouteSvg/RouteSvg';
import AnimatedProgressRoute from './RouteSvg/Trip_Progress_Route';

export default function NexStep() {
  const animatedSvgRef = useRef();

  return (
    <>
      <BackgroundImageLayer source={mountImg} layerOpacity={0.1} style={styles.imageBackground} />
      <View
        style={{
          ...styles.mainContainer,
        }}>
        <AnimatedProgressRoute ref={(ref) => (animatedSvgRef.current = ref)} />
      </View>
      <BottomToolbar />
    </>
  );
}
