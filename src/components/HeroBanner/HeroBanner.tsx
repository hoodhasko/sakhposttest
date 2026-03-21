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
  topInset: number;
}

export const HeroBanner = memo(
  ({
    banners,
    animatedPosition,
    collapsedPosition,
    expandedPosition,
    topInset,
  }: HeroBannerProps) => {
    const animatedHeroStyle = useAnimatedStyle(() => {
      const progress = interpolate(
        animatedPosition.value,
        [collapsedPosition, expandedPosition],
        [0, 1],
        Extrapolation.CLAMP,
      );

      return {
        borderRadius: interpolate(
          progress,
          [0, 1],
          [26, 14],
          Extrapolation.CLAMP,
        ),
        transform: [
          {
            translateY: interpolate(
              progress,
              [0, 1],
              [0, -30],
              Extrapolation.CLAMP,
            ),
          },
          {
            scale: interpolate(
              progress,
              [0, 1],
              [1, 0.92],
              Extrapolation.CLAMP,
            ),
          },
        ],
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
        opacity: interpolate(progress, [0, 1], [0, 0.2], Extrapolation.CLAMP),
      };
    }, [collapsedPosition, expandedPosition]);

    return (
      <View style={[styles.container, { paddingTop: topInset + 12 }]}>
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
    height: 300,
    zIndex: 1,
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
