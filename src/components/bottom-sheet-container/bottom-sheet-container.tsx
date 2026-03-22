import React, {memo, useMemo} from 'react';
import BottomSheet, {useBottomSheetSpringConfigs} from '@gorhom/bottom-sheet';
import {StyleSheet, View} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {ListVendorsFiltersItem} from '../../types';
import {RestaurantList} from '../restaurant-list/restaurant-list';

interface BottomSheetContainerProps {
  restaurants: ListVendorsFiltersItem[];
  animatedIndex: SharedValue<number>;
  animatedPosition: SharedValue<number>;
  progress: SharedValue<number>;
  topInset: number;
  topOverlap: number;
  onIndexChange?: (index: number) => void;
}

export const BottomSheetContainer = memo(
  ({
    restaurants,
    animatedIndex,
    animatedPosition,
    progress,
    topInset,
    topOverlap,
    onIndexChange,
  }: BottomSheetContainerProps) => {
    const snapPoints = useMemo(() => ['40%', '100%'], []);
    const animationConfigs = useBottomSheetSpringConfigs({
      damping: 40,
      stiffness: 260,
      overshootClamping: true,
    });

    return (
      <View pointerEvents="box-none" style={styles.container}>
        <BottomSheet
          animateOnMount
          animationConfigs={animationConfigs}
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
          backgroundStyle={styles.background}
          enableDynamicSizing={false}
          handleIndicatorStyle={styles.handle}
          index={0}
          overDragResistanceFactor={4}
          snapPoints={snapPoints}
          style={[styles.sheet, {marginTop: -topOverlap}]}
          onChange={onIndexChange}>
          <RestaurantList
            progress={progress}
            restaurants={restaurants}
            topInset={topInset}
          />
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
