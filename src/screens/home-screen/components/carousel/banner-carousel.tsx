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
import {
  cancelAnimation,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {HeroBannerResponseItem as BannerResponseItem} from '@models/index';
import {BannerIndicator} from './banner-indicator';
import {BannerItem} from './banner-item';

interface BannerCarouselProps {
  banners: BannerResponseItem[];
  isAutoplayPaused: boolean;
}

const AUTOPLAY_INTERVAL_MS = 5000;

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
        <BannerIndicator
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
});
