import React from 'react'
import { View, Text, FlatList, FlatListStylesheet, Image, TouchableOpacity } from 'react-native'
import FlatListStyles from './FlatListStyles'

export default function FlatListRowProfileImage(props) {
  return(
    <Image 
      style={FlatListStyles.profileImage}
      source={{
        uri: `${props?.item?.icon  ?? `https://picsum.photos/id/${props.index}/200/300`}`
      }}
    />
  )
}
