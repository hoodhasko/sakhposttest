import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {HeroBannerResponseItem as BannerResponseItem} from '@models/index';
import {BannerCarousel} from './banner-carousel';

interface CarouselProps {
  banners: BannerResponseItem[];
  progress: SharedValue<number>;
  carouselHeight: number;
  isAutoplayPaused: boolean;
  topInset: number;
}

export const Carousel = memo(
  ({
    banners,
    progress,
    carouselHeight,
    isAutoplayPaused,
    topInset,
  }: CarouselProps) => {
    const animatedCarouselStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              progress.value,
              [0, 0.55, 1],
              [0, topInset, topInset],
              Extrapolation.CLAMP,
            ),
          },
          {
            scaleX: interpolate(
              progress.value,
              [0, 0.55, 1],
              [1, 1, 0.85],
              Extrapolation.CLAMP,
            ),
          },
          {
            scaleY: interpolate(
              progress.value,
              [0, 0.55, 1],
              [1, 1, 0.9],
              Extrapolation.CLAMP,
            ),
          },
        ] as never,
      };
    }, [progress, topInset]);

    return (
      <View style={[styles.container, {height: carouselHeight}]}>
        <Animated.View
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
          style={[styles.bannerFrame, animatedCarouselStyle]}>
          <BannerCarousel
            banners={banners}
            isAutoplayPaused={isAutoplayPaused}
          />
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0E1628',
  },
  bannerFrame: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    flex: 1,
    overflow: 'hidden',
  },
});
