import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
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
  const heroHeight = useMemo(() => height * 0.5, [height]);

  return (
    <View style={styles.screen}>
      <HeroBanner
        animatedPosition={animatedPosition}
        banners={banners}
        collapsedPosition={collapsedPosition}
        expandedPosition={expandedPosition}
        heroHeight={heroHeight}
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
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
