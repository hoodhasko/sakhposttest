import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  cancelAnimation,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {HeroBannerResponseItem} from '../../types/hero';
import {BannerItem} from './BannerItem';

interface BannerCarouselProps {
  banners: HeroBannerResponseItem[];
  isAutoplayPaused: boolean;
}

const AUTOPLAY_INTERVAL_MS = 5000;
const INDICATOR_WIDTH = 16;

const Indicator = memo(
  ({
    isActive,
    progress,
  }: {
    isActive: boolean;
    progress: SharedValue<number>;
  }) => {
    const fillStyle = useAnimatedStyle(() => {
      return {
        width: isActive ? INDICATOR_WIDTH * progress.value : 0,
      };
    }, [isActive, progress]);

    return (
      <View
        style={[
          styles.indicatorTrack,
          isActive
            ? styles.indicatorTrackActive
            : styles.indicatorTrackInactive,
        ]}>
        <Animated.View style={[styles.indicatorFill, fillStyle]} />
      </View>
    );
  },
);

Indicator.displayName = 'Indicator';

export const BannerCarousel = memo(
  ({banners, isAutoplayPaused}: BannerCarouselProps) => {
    const {width} = useWindowDimensions();
    const itemWidth = width;
    const scrollRef = useRef<ScrollView | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoplayProgress = useSharedValue(0);

    useEffect(() => {
      if (isAutoplayPaused || banners.length < 2) {
        cancelAnimation(autoplayProgress);
        autoplayProgress.value = 0;
        return;
      }

      autoplayProgress.value = 0;
      autoplayProgress.value = withTiming(1, {
        duration: AUTOPLAY_INTERVAL_MS,
      });
    }, [autoplayProgress, banners.length, currentIndex, isAutoplayPaused]);

    useEffect(() => {
      if (banners.length < 2 || isAutoplayPaused) {
        return;
      }

      const timer = setTimeout(() => {
        const nextIndex = (currentIndex + 1) % banners.length;
        scrollRef.current?.scrollTo({
          animated: true,
          x: nextIndex * itemWidth,
          y: 0,
        });
        setCurrentIndex(nextIndex);
      }, AUTOPLAY_INTERVAL_MS);

      return () => {
        clearTimeout(timer);
      };
    }, [banners.length, currentIndex, isAutoplayPaused, itemWidth]);

    const handleMomentumEnd = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (itemWidth <= 0) {
          return;
        }

        const nextIndex = Math.round(
          event.nativeEvent.contentOffset.x / itemWidth,
        );
        setCurrentIndex(Math.max(0, Math.min(nextIndex, banners.length - 1)));
      },
      [banners.length, itemWidth],
    );

    const indicators = useMemo(() => {
      return banners.map((banner, index) => (
        <Indicator
          isActive={currentIndex === index}
          key={banner.id}
          progress={autoplayProgress}
        />
      ));
    }, [autoplayProgress, banners, currentIndex]);

    return (
      <View style={styles.container}>
        <ScrollView
          bounces={false}
          decelerationRate="fast"
          horizontal
          onMomentumScrollEnd={handleMomentumEnd}
          pagingEnabled
          ref={scrollRef}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          {banners.map(banner => (
            <BannerItem banner={banner} key={banner.id} width={itemWidth} />
          ))}
        </ScrollView>
        <View style={styles.paginationContainer}>
          <View style={styles.paginationInner}>{indicators}</View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationContainer: {
    alignItems: 'center',
    bottom: 48,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  paginationInner: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 8,
    columnGap: 6,
    flexDirection: 'row',
    padding: 4,
  },
  indicatorTrack: {
    backgroundColor: '#B5B9CC',
    borderRadius: 2,
    height: 4,
    overflow: 'hidden',
  },
  indicatorTrackActive: {
    width: INDICATOR_WIDTH,
    backgroundColor: 'rgba(181, 185, 204, 0.35)',
  },
  indicatorTrackInactive: {
    width: 4,
  },
  indicatorFill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    height: 4,
  },
});

BannerCarousel.displayName = 'BannerCarousel';
