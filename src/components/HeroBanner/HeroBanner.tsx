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
  animatedPosition: SharedValue<number>;
  collapsedPosition: number;
  expandedPosition: number;
  heroHeight: number;
}

export const HeroBanner = memo(
  ({
    banners,
    animatedPosition,
    collapsedPosition,
    expandedPosition,
    heroHeight,
  }: HeroBannerProps) => {
    const animatedHeroStyle = useAnimatedStyle(() => {
      const progress = interpolate(
        animatedPosition.value,
        [collapsedPosition, expandedPosition],
        [0, 1],
        Extrapolation.CLAMP,
      );

      return {
        transform: [
          {
            scale: interpolate(
              progress,
              [0, 1],
              [1, 0.9],
              Extrapolation.CLAMP,
            ),
          },
          {
            translateY: interpolate(
              progress,
              [0, 1],
              [0, -50],
              Extrapolation.CLAMP,
            ),
          },
        ] as never,
      };
    }, [collapsedPosition, expandedPosition]);

    const animatedOverlayStyle = useAnimatedStyle(() => {
      const progress = interpolate(
        animatedPosition.value,
        [collapsedPosition, expandedPosition],
        [0, 1],
        Extrapolation.CLAMP,
      );

      return {
        opacity: interpolate(progress, [0, 1], [0, 0.24], Extrapolation.CLAMP),
      };
    }, [collapsedPosition, expandedPosition]);

    return (
      <View style={[styles.container, { height: heroHeight }]}>
        <Animated.View style={[styles.bannerFrame, animatedHeroStyle]}>
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
