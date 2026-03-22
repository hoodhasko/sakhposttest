import React, {useCallback, useMemo, useState} from 'react';
import {
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useHeroBanners, useVendorsFilters} from '@app/hooks';
import {
  ErrorState,
  LoadingState,
  HeroBanner,
  BottomSheetContainer,
} from './components';

const COLLAPSED_SNAP_RATIO = 0.4;
const EXPANDED_SNAP_RATIO = 1;
const SHEET_OVERLAP_PX = 14;

export const HomeScreen = () => {
  const {height} = useWindowDimensions();
  const {top: topInset} = useSafeAreaInsets();

  const animatedIndex = useSharedValue(0);
  const animatedPosition = useSharedValue(height * (1 - COLLAPSED_SNAP_RATIO));
  const [statusBarStyle, setStatusBarStyle] =
    useState<StatusBarStyle>('light-content');
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  const {
    data: banners = [],
    isError: bannersError,
    isLoading: bannersLoading,
    refetch: refetchBanners,
  } = useHeroBanners();
  const {
    data: restaurants = [],
    isError: vendorsError,
    isLoading: restaurantsLoading,
    refetch: refetchVendors,
  } = useVendorsFilters();

  const collapsedPosition = useMemo(() => {
    return height * (1 - COLLAPSED_SNAP_RATIO) - SHEET_OVERLAP_PX;
  }, [height]);

  const expandedPosition = useMemo(() => {
    return height * (1 - EXPANDED_SNAP_RATIO) - SHEET_OVERLAP_PX;
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

  useAnimatedReaction(
    () => progress.value > 0.01,
    (next, prev) => {
      if (next !== prev) {
        runOnJS(setIsAutoplayPaused)(next);
      }
    },
    [progress],
  );

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: 0,
    };
  }, []);

  const hasInitialLoader = bannersLoading && restaurantsLoading;
  const hasLoadError = bannersError || vendorsError;
  const heroHeight = useMemo(() => {
    return height * (1 - COLLAPSED_SNAP_RATIO) + SHEET_OVERLAP_PX;
  }, [height]);

  const handleRetry = useCallback(() => {
    refetchBanners();
    refetchVendors();
  }, [refetchBanners, refetchVendors]);

  if (hasInitialLoader) {
    return <LoadingState />;
  }

  if (hasLoadError) {
    return <ErrorState onRetry={handleRetry} />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar animated barStyle={statusBarStyle} />

      <HeroBanner
        banners={banners}
        heroHeight={heroHeight}
        isAutoplayPaused={isAutoplayPaused}
        progress={progress}
        topInset={topInset}
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
        topInset={topInset}
        topOverlap={SHEET_OVERLAP_PX}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E1628',
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#05070A',
    zIndex: 15,
  },
});
