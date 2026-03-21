import React, { memo, useCallback } from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { Restaurant } from '../../types/restaurant';
import {
  RESTAURANT_CARD_HEIGHT,
  RestaurantCard,
} from '../RestaurantCard/RestaurantCard';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const ITEM_SIZE = RESTAURANT_CARD_HEIGHT + 12;

export const RestaurantList = memo(({ restaurants }: RestaurantListProps) => {
  const keyExtractor = useCallback((item: Restaurant) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Restaurant>>(({ item }) => {
    return <RestaurantCard restaurant={item} />;
  }, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<Restaurant> | null | undefined, index: number) => ({
      index,
      length: ITEM_SIZE,
      offset: ITEM_SIZE * index,
    }),
    [],
  );

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Restaurants nearby</Text>
      </View>
      <BottomSheetFlatList
        contentContainerStyle={styles.contentContainer}
        data={restaurants}
        getItemLayout={getItemLayout}
        initialNumToRender={8}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={8}
        removeClippedSubviews
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        updateCellsBatchingPeriod={50}
        windowSize={10}
      />
    </>
  );
});

const styles = StyleSheet.create({
  header: {
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  title: {
    color: '#0F1728',
    fontSize: 22,
    fontWeight: '800',
  },
  contentContainer: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
});

RestaurantList.displayName = 'RestaurantList';
