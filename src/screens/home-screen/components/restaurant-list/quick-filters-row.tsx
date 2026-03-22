import React, {memo} from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface QuickFiltersRowProps {
  progress: SharedValue<number>;
}

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

export const QuickFiltersRow = memo(({progress}: QuickFiltersRowProps) => {
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
        contentContainerStyle={styles.filtersContent}>
        {quickFilters.map(filter => (
          <Pressable
            key={filter.id}
            style={[
              styles.filterItem,
              filter.active ? styles.filterItemActive : null,
            ]}>
            <Text
              numberOfLines={1}
              style={[
                styles.filterTitle,
                filter.active ? styles.filterTitleActive : null,
              ]}>
              {filter.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  filtersContainer: {
    overflow: 'hidden',
  },
  filtersContent: {
    columnGap: 12,
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
});
