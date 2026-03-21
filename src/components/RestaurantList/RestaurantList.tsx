import React, { memo, useCallback, useMemo } from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import {
  ListRenderItem,
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

const storiesMock = [
  {
    id: 'story-1',
    title: 'Top picks',
    imageUrl:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'story-2',
    title: 'Free delivery',
    imageUrl:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'story-3',
    title: 'Lunch deals',
    imageUrl:
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'story-4',
    title: 'New here',
    imageUrl:
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'story-5',
    title: 'Fastest',
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=240&q=80',
  },
];

const StoriesRow = memo(({ progress }: { progress: SharedValue<number> }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
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
    <Animated.View style={[styles.storiesContainer, animatedStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesContent}
      >
        {storiesMock.map(story => (
          <View key={story.id} style={styles.storyItem}>
            <Text numberOfLines={1} style={styles.storyTitle}>
              {story.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
});

StoriesRow.displayName = 'StoriesRow';

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
          [2, topInset + 8],
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
          <StoriesRow progress={progress} />
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
  storiesContainer: {
    marginBottom: 8,
  },
  storiesContent: {
    columnGap: 12,
    paddingHorizontal: 16,
  },
  storyItem: {
    alignItems: 'center',
    backgroundColor: '#E6EBF3',
    borderRadius: 16,
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 76,
  },
  storyTitle: {
    color: '#425067',
    fontSize: 12,
    fontWeight: '600',
  },
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
