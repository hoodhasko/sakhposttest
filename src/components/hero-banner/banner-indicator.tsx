import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';

interface BannerIndicatorProps {
  isActive: boolean;
  progress: SharedValue<number>;
}

const INDICATOR_ACTIVE_WIDTH = 16;

export const BannerIndicator = memo(
  ({isActive, progress}: BannerIndicatorProps) => {
    const fillStyle = useAnimatedStyle(() => {
      return {
        width: isActive ? INDICATOR_ACTIVE_WIDTH * progress.value : 0,
      };
    }, [isActive, progress]);

    return (
      <View
        style={[
          styles.indicatorTrack,
          isActive
            ? styles.indicatorTrackActive
            : styles.indicatorTrackInactive,
        ]}>
        <Animated.View style={[styles.indicatorFill, fillStyle]} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  indicatorTrack: {
    backgroundColor: '#B5B9CC',
    borderRadius: 2,
    height: 4,
    overflow: 'hidden',
  },
  indicatorTrackActive: {
    backgroundColor: 'rgba(181, 185, 204, 0.35)',
    width: INDICATOR_ACTIVE_WIDTH,
  },
  indicatorTrackInactive: {
    width: 4,
  },
  indicatorFill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    height: 4,
  },
});
