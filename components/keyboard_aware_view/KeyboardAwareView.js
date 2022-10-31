import { View, Keyboard, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

export default function KeyboardAvoidingView({
  style,
  bottomPositionOnKeyboardOpen,
  active,
  onKeyboardOpen,
  onKeyboardClose,
  children,
}) {
  const [bottomPosition, setBottomPosition] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    const showHandler = Keyboard.addListener('keyboardDidShow', ({ endCoordinates }) => {
      onKeyboardOpen();
      if (!active) return;
      setBottomPosition(bottomPositionOnKeyboardOpen);
    });
    const hideHandler = Keyboard.addListener('keyboardDidHide', () => {
      onKeyboardClose();
      if (!active) return;
      setBottomPosition(0);
    });

    return () => {
      showHandler.remove();
      hideHandler.remove();
    };
  }, []);

  useEffect(() => {
    active ? setBottomPosition(bottomPositionOnKeyboardOpen) : setBottomPosition(0);
  }, [active]);

  return (
    <View
      onLayout={({ nativeEvent }) => setViewHeight(Dimensions.get('window').height - nativeEvent.layout.height)}
      style={{ width: '100%', ...style, bottom: bottomPosition }}>
      {children}
    </View>
  );
}
