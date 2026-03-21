import React, { memo, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { Restaurant } from '../../types/restaurant';
import { RestaurantList } from '../RestaurantList/RestaurantList';

interface BottomSheetContainerProps {
  restaurants: Restaurant[];
  animatedIndex: SharedValue<number>;
  animatedPosition: SharedValue<number>;
}

export const BottomSheetContainer = memo(
  ({
    restaurants,
    animatedIndex,
    animatedPosition,
  }: BottomSheetContainerProps) => {
    const snapPoints = useMemo(() => ['30%', '60%', '92%'], []);

    return (
      <BottomSheet
        animateOnMount
        animatedIndex={animatedIndex}
        animatedPosition={animatedPosition}
        backgroundStyle={styles.background}
        enableDynamicSizing={false}
        handleIndicatorStyle={styles.handle}
        index={0}
        overDragResistanceFactor={4}
        snapPoints={snapPoints}
      >
        <RestaurantList restaurants={restaurants} />
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F6F8FB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    backgroundColor: '#BEC7D4',
    width: 48,
  },
});

BottomSheetContainer.displayName = 'BottomSheetContainer';
