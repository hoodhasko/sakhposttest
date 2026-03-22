import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {BASE_COLORS} from '@config/constants';
import {CustomSvgProps} from '@assets/svg/types';

export const StarFilledSvg: FC<CustomSvgProps> = ({
  color = BASE_COLORS.SUI_COLOR_WARNING,
  size = 16,
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M6.83 1.893l.844 1.704c.115.237.422.464.681.508l1.531.256c.98.165 1.21.88.504 1.587l-1.19 1.2c-.201.204-.312.596-.25.876l.341 1.486c.27 1.176-.35 1.63-1.382 1.016L6.474 9.67c-.26-.155-.686-.155-.95 0l-1.435.856c-1.027.615-1.651.155-1.383-1.016l.341-1.486c.063-.28-.048-.672-.25-.876l-1.19-1.2c-.7-.706-.475-1.422.504-1.587l1.531-.256c.255-.044.562-.271.677-.508l.845-1.704c.46-.924 1.21-.924 1.665 0z"
        fill={color}
      />
    </Svg>
  );
};
