import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface AnimatedHeaderProps {
  children?: React.ReactNode;
  progress: SharedValue<number>;
  topInset: number;
}

export const AnimatedHeader = memo(
  ({children, progress, topInset}: AnimatedHeaderProps) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        paddingTop: interpolate(
          progress.value,
          [0.75, 1],
          [2, topInset + 4],
          Extrapolation.CLAMP,
        ),
      };
    }, [progress, topInset]);

    return (
      <Animated.View style={[styles.headerWrapper, animatedStyle]}>
        {children}
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  headerWrapper: {
    paddingTop: 2,
  },
});
