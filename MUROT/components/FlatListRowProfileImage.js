import React from 'react'
import { View, Text, FlatList, FlatListStylesheet, Image, TouchableOpacity } from 'react-native'
import FlatListStyles from './FlatListStyles'
import _ from 'lodash';

export default function FlatListRowProfileImage(props) {
  var _selectedRows = props?.rowSelected ?? [];
  var _showImage = _.findIndex(_selectedRows, function(o) { return o.id === props?.item?.id; });

  return(
    <Image 
      style={[FlatListStyles.profileImage]}
      source={{
        uri: `${props?.item?.icon  ?? `https://picsum.photos/id/${props.index}/200/300`}`
      }}
    />
  )
}
