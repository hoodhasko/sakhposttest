import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Restaurant } from '../../types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RESTAURANT_CARD_HEIGHT = 124;

export const RestaurantCard = memo(({ restaurant }: RestaurantCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {restaurant.name}
        </Text>
        <Text style={styles.meta}>
          ⭐ {restaurant.rating.toFixed(1)} · {restaurant.cuisine}
        </Text>
        <Text style={styles.meta}>
          {restaurant.deliveryTime} · Delivery {restaurant.deliveryFee}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    height: RESTAURANT_CARD_HEIGHT,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#0A1020',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  image: {
    height: '100%',
    width: 112,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    rowGap: 7,
  },
  name: {
    color: '#0B1220',
    fontSize: 18,
    fontWeight: '700',
  },
  meta: {
    color: '#4D5A72',
    fontSize: 13,
    fontWeight: '500',
  },
});

RestaurantCard.displayName = 'RestaurantCard';
