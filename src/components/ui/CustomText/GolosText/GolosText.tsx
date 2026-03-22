import React, {FC, memo} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

import {BASE_COLORS} from '@config/constants';

interface GolosTextProps extends TextProps {
  wight?: keyof typeof fontFamily;
  fs?: number;
  c?: string;
  lh?: number;
  flex?: number;
}

export const GolosText: FC<GolosTextProps> = memo(
  ({children, wight = 400, fs, c, lh, flex, ...props}) => {
    return (
      <Text
        allowFontScaling={false}
        {...props}
        style={[
          styles.text,
          {
            fontFamily: fontFamily[wight] || 'GolosText-Regular',
            fontSize: fs,
            color: c,
            lineHeight: lh,
            flex,
          },
          props.style,
        ]}>
        {children}
      </Text>
    );
  },
);

const styles = StyleSheet.create({
  text: {
    color: BASE_COLORS.SUI_COLOR_TEXT,
    fontSize: 14,
    lineHeight: 18,
  },
});

const fontFamily = {
  400: 'GolosText-Regular',
  500: 'GolosText-Medium',
  600: 'GolosText-SemiBold',
  700: 'GolosText-Bold',
  800: 'GolosText-ExtraBold',
  900: 'GolosText-Black',
};
