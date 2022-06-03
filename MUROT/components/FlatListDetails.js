import React from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'

import FlatListStyles from './FlatListStyles';

const FlatListDetails = (props) => {
  return (
    <View key={`${props?.index}`} style={[FlatListStyles.row, {display: props?.value ? 'flex' : 'none'} ]}>
      
    </View>
  )
}

export default FlatListDetails;
