import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { HeroBanner as HeroBannerModel } from '../../types/hero';
import { BannerCarousel } from './BannerCarousel';

interface HeroBannerProps {
  banners: HeroBannerModel[];
  progress: SharedValue<number>;
  heroHeight: number;
  topInset: number;
}

export const HeroBanner = memo(
  ({ banners, progress, heroHeight, topInset }: HeroBannerProps) => {
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
              [1, 1, 0.95],
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
      <View style={[styles.container, { height: heroHeight }]}>
        <Animated.View
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
          style={[styles.bannerFrame, animatedHeroStyle]}
        >
          <BannerCarousel banners={banners} />
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
    flex: 1,
    overflow: 'hidden',
  },
});

HeroBanner.displayName = 'HeroBanner';
