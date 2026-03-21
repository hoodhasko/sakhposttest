import React, { memo, useCallback, useMemo } from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import {
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Restaurant } from '../../types/restaurant';
import {
  RESTAURANT_CARD_HEIGHT,
  RestaurantCard,
} from '../RestaurantCard/RestaurantCard';

interface RestaurantListProps {
  restaurants: Restaurant[];
  progress: SharedValue<number>;
  topInset: number;
}

const ITEM_SIZE = RESTAURANT_CARD_HEIGHT + 12;

const quickFilters = [
  {
    id: 'filter-1',
    title: 'Popular',
    active: true,
  },
  {
    id: 'filter-2',
    title: 'Free delivery',
  },
  {
    id: 'filter-3',
    title: 'Fastest',
  },
  {
    id: 'filter-4',
    title: 'Rating 4.5+',
  },
  {
    id: 'filter-5',
    title: 'Open now',
  },
];

const QuickFiltersRow = memo(
  ({ progress }: { progress: SharedValue<number> }) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          progress.value,
          [0.35, 0.8],
          [0, 44],
          Extrapolation.CLAMP,
        ),
        marginBottom: interpolate(
          progress.value,
          [0.35, 0.8],
          [0, 4],
          Extrapolation.CLAMP,
        ),
        opacity: interpolate(
          progress.value,
          [0.4, 0.8],
          [0, 1],
          Extrapolation.CLAMP,
        ),
        transform: [
          {
            translateY: interpolate(
              progress.value,
              [0.4, 0.8],
              [20, 0],
              Extrapolation.CLAMP,
            ),
          },
        ] as never,
      };
    });

    return (
      <Animated.View style={[styles.filtersContainer, animatedStyle]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {quickFilters.map(filter => (
            <Pressable
              key={filter.id}
              style={[
                styles.filterItem,
                filter.active ? styles.filterItemActive : null,
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.filterTitle,
                  filter.active ? styles.filterTitleActive : null,
                ]}
              >
                {filter.title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>
    );
  },
);

QuickFiltersRow.displayName = 'QuickFiltersRow';

const AnimatedHeader = memo(
  ({
    children,
    progress,
    topInset,
  }: {
    children?: React.ReactNode;
    progress: SharedValue<number>;
    topInset: number;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        paddingTop: interpolate(
          progress.value,
          [0.75, 1],
          [2, topInset + 4],
          Extrapolation.CLAMP,
        ),
      };
    }, [progress, topInset]);

    return (
      <Animated.View style={[styles.headerWrapper, animatedStyle]}>
        {children}
      </Animated.View>
    );
  },
);

AnimatedHeader.displayName = 'AnimatedHeader';

export const RestaurantList = memo(
  ({ restaurants, progress, topInset }: RestaurantListProps) => {
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
  headerWrapper: {
    paddingTop: 2,
  },
  filtersContainer: {
    overflow: 'hidden',
  },
  filtersContent: {
    columnGap: 12,
    paddingHorizontal: 16,
  },
  filterItem: {
    alignItems: 'center',
    backgroundColor: '#E6EBF3',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  filterItemActive: {
    backgroundColor: '#111A2E',
  },
  filterTitle: {
    color: '#425067',
    fontSize: 12,
    fontWeight: '700',
  },
  filterTitleActive: {
    color: '#FFFFFF',
  },
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

RestaurantList.displayName = 'RestaurantList';
