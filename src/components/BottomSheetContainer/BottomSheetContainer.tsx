import React, { memo, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
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
    const snapPoints = useMemo(() => ['50%', '100%'], []);

    return (
      <View pointerEvents="box-none" style={styles.container}>
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
          style={styles.sheet}
        >
          <RestaurantList restaurants={restaurants} />
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
