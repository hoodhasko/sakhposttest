import React, { memo, useCallback, useMemo } from 'react';
import BottomSheet, {
  BottomSheetBackgroundProps,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Restaurant } from '../../types/restaurant';
import { RestaurantList } from '../RestaurantList/RestaurantList';

interface AnimatedSheetBackgroundProps extends BottomSheetBackgroundProps {
  progress: SharedValue<number>;
}

const AnimatedSheetBackground = memo(
  ({ style, progress }: AnimatedSheetBackgroundProps) => {
    const animatedStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        progress.value,
        [0, 0.7, 1],
        [24, 20, 0],
        Extrapolation.CLAMP,
      );

      return {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      };
    });

    return <Animated.View style={[style, styles.background, animatedStyle]} />;
  },
);

AnimatedSheetBackground.displayName = 'AnimatedSheetBackground';

interface BottomSheetContainerProps {
  restaurants: Restaurant[];
  animatedIndex: SharedValue<number>;
  animatedPosition: SharedValue<number>;
  progress: SharedValue<number>;
  onIndexChange?: (index: number) => void;
}

export const BottomSheetContainer = memo(
  ({
    restaurants,
    animatedIndex,
    animatedPosition,
    progress,
    onIndexChange,
  }: BottomSheetContainerProps) => {
    const snapPoints = useMemo(() => ['50%', '100%'], []);
    const animationConfigs = useBottomSheetSpringConfigs({
      damping: 40,
      stiffness: 260,
      overshootClamping: true,
    });

    const renderBackground = useCallback(
      (props: BottomSheetBackgroundProps) => {
        return <AnimatedSheetBackground {...props} progress={progress} />;
      },
      [progress],
    );

    return (
      <View pointerEvents="box-none" style={styles.container}>
        <BottomSheet
          animateOnMount
          animationConfigs={animationConfigs}
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
          backgroundComponent={renderBackground}
          enableDynamicSizing={false}
          handleIndicatorStyle={styles.handle}
          index={0}
          overDragResistanceFactor={4}
          snapPoints={snapPoints}
          style={styles.sheet}
          onChange={onIndexChange}
        >
          <RestaurantList progress={progress} restaurants={restaurants} />
        </BottomSheet>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 30,
  },
  background: {
    backgroundColor: '#F6F8FB',
  },
  handle: {
    backgroundColor: '#BEC7D4',
    width: 48,
  },
  sheet: {
    elevation: 30,
    shadowColor: '#0A1020',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    zIndex: 20,
  },
});

BottomSheetContainer.displayName = 'BottomSheetContainer';
