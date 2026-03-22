import React, {memo, useCallback, useMemo} from 'react';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {ListVendorsFiltersItem} from '@models/index';
import {RestaurantCard} from './restaurant-card';
import {AnimatedHeader} from './animated-header';
import {QuickFiltersRow} from './quick-filters-row';
import {GolosText} from '@components/ui';

interface RestaurantListProps {
  restaurants: ListVendorsFiltersItem[];
  progress: SharedValue<number>;
  topInset: number;
}

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

    const headerComponent = useMemo(() => {
      return (
        <AnimatedHeader progress={progress} topInset={topInset}>
          <View style={styles.header}>
            <QuickFiltersRow progress={progress} />

            <GolosText fs={20} lh={28} wight={600}>
              Недалеко от вас
            </GolosText>
          </View>
        </AnimatedHeader>
      );
    }, [progress, topInset]);

    return (
      <>
        {headerComponent}

        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          data={restaurants}
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
  },
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
});
