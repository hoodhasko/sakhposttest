import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ListVendorsFiltersItem} from '../../types';

interface RestaurantCardProps {
  restaurant: ListVendorsFiltersItem;
}

export const RESTAURANT_CARD_HEIGHT = 124;

export const RestaurantCard = memo(({restaurant}: RestaurantCardProps) => {
  const imageUrl =
    restaurant.image?.url_lg ||
    restaurant.image?.url ||
    restaurant.logo?.url_lg ||
    restaurant.logo?.url;

  const ratingText = restaurant.rating ?? '—';

  return (
    <View style={styles.card}>
      {imageUrl ? (
        <Image source={{uri: imageUrl}} style={styles.image} />
      ) : null}
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {restaurant.general_info.name}
        </Text>
        <Text style={styles.meta}>⭐ {ratingText}</Text>
        <Text style={styles.meta}>Available now</Text>
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
