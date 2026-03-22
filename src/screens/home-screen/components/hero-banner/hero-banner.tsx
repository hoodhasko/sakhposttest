import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {HeroBannerResponseItem} from '@models/index';
import {BannerCarousel} from './banner-carousel';

interface HeroBannerProps {
  banners: HeroBannerResponseItem[];
  progress: SharedValue<number>;
  heroHeight: number;
  isAutoplayPaused: boolean;
  topInset: number;
}

export const HeroBanner = memo(
  ({
    banners,
    progress,
    heroHeight,
    isAutoplayPaused,
    topInset,
  }: HeroBannerProps) => {
    const animatedHeroStyle = useAnimatedStyle(() => {
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
      <View style={[styles.container, {height: heroHeight}]}>
        <Animated.View
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
          style={[styles.bannerFrame, animatedHeroStyle]}>
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
