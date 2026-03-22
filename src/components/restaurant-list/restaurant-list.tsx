import React, {memo, useCallback, useMemo} from 'react';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {ListVendorsFiltersItem} from '../../types';
import {RESTAURANT_CARD_HEIGHT, RestaurantCard} from '../restaurant-card';
import {AnimatedHeader} from './animated-header';
import {QuickFiltersRow} from './quick-filters-row';

interface RestaurantListProps {
  restaurants: ListVendorsFiltersItem[];
  progress: SharedValue<number>;
  topInset: number;
}

const ITEM_SIZE = RESTAURANT_CARD_HEIGHT + 12;

export const RestaurantList = memo(
  ({restaurants, progress, topInset}: RestaurantListProps) => {
    const keyExtractor = useCallback(
      (item: ListVendorsFiltersItem) => String(item.id),
      [],
    );

    const renderItem = useCallback<ListRenderItem<ListVendorsFiltersItem>>(
      ({item}) => {
        return <RestaurantCard restaurant={item} />;
      },
      [],
    );

    const getItemLayout = useCallback(
      (
        _: ArrayLike<ListVendorsFiltersItem> | null | undefined,
        index: number,
      ) => ({
        index,
        length: ITEM_SIZE,
        offset: ITEM_SIZE * index,
      }),
      [],
    );

    const headerComponent = useMemo(() => {
      return (
        <AnimatedHeader progress={progress} topInset={topInset}>
          <QuickFiltersRow progress={progress} />
          <View style={styles.header}>
            <Text style={styles.title}>Restaurants nearby</Text>
          </View>
        </AnimatedHeader>
      );
    }, [progress, topInset]);

    return (
      <BottomSheetFlatList
        ListHeaderComponent={headerComponent}
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
    );
  },
);

const styles = StyleSheet.create({
  header: {
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 2,
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
