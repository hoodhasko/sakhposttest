import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  Text,
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
import {BottomSheetContainer} from '../components/bottom-sheet-container/bottom-sheet-container';
import {HeroBanner} from '../components/hero-banner/hero-banner';
import {useHeroBanners, useVendorsFilters} from '../hooks';

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
    return (
      <View pointerEvents="none" style={styles.loaderOverlay}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  if (hasLoadError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Ошибка загрузки данных</Text>
        <Text style={styles.errorDescription}>
          Проверьте подключение к интернету и повторите попытку
        </Text>
        <Pressable onPress={handleRetry} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Повторить</Text>
        </Pressable>
      </View>
    );
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
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#05070A',
    zIndex: 15,
  },
  errorContainer: {
    alignItems: 'center',
    backgroundColor: '#0E1628',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  errorDescription: {
    color: '#D0D6E2',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryButtonText: {
    color: '#101828',
    fontSize: 14,
    fontWeight: '700',
  },
});
