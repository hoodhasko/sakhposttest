import React, { memo, useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { HeroBanner } from '../../types/hero';
import { BannerItem } from './BannerItem';

interface BannerCarouselProps {
  banners: HeroBanner[];
}

const Dot = memo(
  ({
    index,
    itemWidth,
    scrollX,
  }: {
    index: number;
    itemWidth: number;
    scrollX: SharedValue<number>;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * itemWidth,
        index * itemWidth,
        (index + 1) * itemWidth,
      ];

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.35, 1, 0.35],
        Extrapolation.CLAMP,
      );
      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.8, 1.15, 0.8],
        Extrapolation.CLAMP,
      );

      return {
        opacity,
        transform: [{ scale }],
      };
    }, [index, itemWidth]);

    return <Animated.View style={[styles.dot, animatedStyle]} />;
  },
);

Dot.displayName = 'Dot';

export const BannerCarousel = memo(({ banners }: BannerCarouselProps) => {
  const { width } = useWindowDimensions();
  const itemWidth = width;
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const dots = useMemo(
    () =>
      banners.map((banner, index) => (
        <Dot
          key={banner.id}
          index={index}
          itemWidth={itemWidth}
          scrollX={scrollX}
        />
      )),
    [banners, itemWidth, scrollX],
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        bounces={false}
        decelerationRate="fast"
        horizontal
        onScroll={onScroll}
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {banners.map(banner => (
          <BannerItem banner={banner} key={banner.id} width={itemWidth} />
        ))}
      </Animated.ScrollView>
      <View style={styles.pagination}>{dots}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagination: {
    alignItems: 'center',
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    columnGap: 8,
  },
  dot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    height: 8,
    width: 8,
  },
});

BannerCarousel.displayName = 'BannerCarousel';
