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
}

export const HeroBanner = memo(
  ({ banners, progress, heroHeight }: HeroBannerProps) => {
    const animatedHeroStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: interpolate(
              progress.value,
              [0, 1],
              [1, 0.92],
              Extrapolation.CLAMP,
            ),
          },
          {
            translateY: interpolate(
              progress.value,
              [0, 1],
              [0, -30],
              Extrapolation.CLAMP,
            ),
          },
        ] as never,
      };
    }, [progress]);

    const animatedOverlayStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          progress.value,
          [0, 1],
          [0, 0.24],
          Extrapolation.CLAMP,
        ),
      };
    }, [progress]);

    return (
      <View style={[styles.container, { height: heroHeight }]}>
        <Animated.View
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
          style={[styles.bannerFrame, animatedHeroStyle]}
        >
          <BannerCarousel banners={banners} />
          <Animated.View
            pointerEvents="none"
            style={[styles.overlay, animatedOverlayStyle]}
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
    flex: 1,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#05070A',
  },
});

HeroBanner.displayName = 'HeroBanner';
