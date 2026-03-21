import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedValue } from 'react-native-reanimated';
import { BottomSheetContainer } from '../components/BottomSheetContainer/BottomSheetContainer';
import { HeroBanner } from '../components/HeroBanner/HeroBanner';
import { useHeroBanners } from '../hooks/useHeroBanners';
import { useRestaurants } from '../hooks/useRestaurants';

const COLLAPSED_SNAP_RATIO = 0.3;
const EXPANDED_SNAP_RATIO = 0.92;

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const animatedIndex = useSharedValue(0);
  const animatedPosition = useSharedValue(height * (1 - COLLAPSED_SNAP_RATIO));

  const { data: banners = [], isLoading: bannersLoading } = useHeroBanners();
  const { data: restaurants = [], isLoading: restaurantsLoading } =
    useRestaurants();

  const collapsedPosition = useMemo(() => {
    return height * (1 - COLLAPSED_SNAP_RATIO);
  }, [height]);

  const expandedPosition = useMemo(() => {
    return height * (1 - EXPANDED_SNAP_RATIO);
  }, [height]);

  const hasInitialLoader = bannersLoading && restaurantsLoading;

  return (
    <View style={styles.screen}>
      <View style={styles.backdrop}>
        <View style={styles.backdropGradientA} />
        <View style={styles.backdropGradientB} />
      </View>
      <HeroBanner
        animatedPosition={animatedPosition}
        banners={banners}
        collapsedPosition={collapsedPosition}
        expandedPosition={expandedPosition}
        topInset={insets.top}
      />
      <BottomSheetContainer
        animatedIndex={animatedIndex}
        animatedPosition={animatedPosition}
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
    backgroundColor: '#0B1020',
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#11182A',
  },
  backdropGradientA: {
    backgroundColor: '#19346A',
    borderRadius: 200,
    height: 300,
    opacity: 0.75,
    position: 'absolute',
    right: -90,
    top: -40,
    width: 300,
  },
  backdropGradientB: {
    backgroundColor: '#0E2448',
    borderRadius: 220,
    bottom: 360,
    height: 260,
    left: -110,
    opacity: 0.7,
    position: 'absolute',
    width: 260,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
