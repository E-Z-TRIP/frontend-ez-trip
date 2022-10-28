import { View, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';

export default function KeyboardAvoidingView({ style, bottomPositionOnKeyboardOpen, children }) {
  const [bottomPosition, setBottomPosition] = useState(0);

  useEffect(() => {
    const showHandler = Keyboard.addListener('keyboardDidShow', () => setBottomPosition(bottomPositionOnKeyboardOpen));
    const hideHandler = Keyboard.addListener('keyboardDidHide', () => setBottomPosition(0));
    return () => {
      showHandler.remove();
      hideHandler.remove();
    };
  }, []);

  return <View style={{ width: '100%', ...style, bottom: bottomPosition }}>{children}</View>;
}
