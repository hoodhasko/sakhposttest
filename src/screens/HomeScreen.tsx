import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { BottomSheetContainer } from '../components/BottomSheetContainer/BottomSheetContainer';
import { HeroBanner } from '../components/HeroBanner/HeroBanner';
import { useHeroBanners } from '../hooks/useHeroBanners';
import { useRestaurants } from '../hooks/useRestaurants';

const COLLAPSED_SNAP_RATIO = 0.52;
const EXPANDED_SNAP_RATIO = 1;

export const HomeScreen = () => {
  const { height } = useWindowDimensions();

  const animatedIndex = useSharedValue(0);
  const animatedPosition = useSharedValue(height * (1 - COLLAPSED_SNAP_RATIO));
  const [statusBarStyle, setStatusBarStyle] =
    useState<StatusBarStyle>('light-content');

  const { data: banners = [], isLoading: bannersLoading } = useHeroBanners();
  const { data: restaurants = [], isLoading: restaurantsLoading } =
    useRestaurants();

  const collapsedPosition = useMemo(() => {
    return height * (1 - COLLAPSED_SNAP_RATIO);
  }, [height]);

  const expandedPosition = useMemo(() => {
    return height * (1 - EXPANDED_SNAP_RATIO);
  }, [height]);

  const progress = useDerivedValue(() => {
    return interpolate(
      animatedPosition.value,
      [collapsedPosition, expandedPosition],
      [0, 1],
      Extrapolation.CLAMP,
    );
  }, [collapsedPosition, expandedPosition]);

  const handleSheetIndexChange = useCallback((index: number) => {
    setStatusBarStyle(index >= 1 ? 'dark-content' : 'light-content');
  }, []);

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        progress.value,
        [0, 1],
        [0, 0.3],
        Extrapolation.CLAMP,
      ),
    };
  }, [progress]);

  const hasInitialLoader = bannersLoading && restaurantsLoading;
  const heroHeight = useMemo(() => height * 0.5, [height]);

  return (
    <View style={styles.screen}>
      <StatusBar animated barStyle={statusBarStyle} />
      <HeroBanner
        banners={banners}
        heroHeight={heroHeight}
        progress={progress}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.backdrop, animatedBackdropStyle]}
      />
      <BottomSheetContainer
        animatedIndex={animatedIndex}
        animatedPosition={animatedPosition}
        onIndexChange={handleSheetIndexChange}
        progress={progress}
        restaurants={restaurants}
      />
      {hasInitialLoader ? (
        <View pointerEvents="none" style={styles.loaderOverlay}>
          <ActivityIndicator color="#FFFFFF" size="small" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E1628',
    flex: 1,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#05070A',
    zIndex: 15,
  },
});
