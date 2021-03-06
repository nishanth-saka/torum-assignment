import React from 'react'
import { View, Text, FlatList, FlatListStylesheet, Image, TouchableOpacity } from 'react-native'
import FlatListStyles from './FlatListStyles'

export default function FlatListRowPreviewImage(props) {
    return(
        <TouchableOpacity>
          
          <Image 
              style={FlatListStyles.previewImage}
              source={{
                uri: `${props?.item?.icon ?? `https://picsum.photos/id/${props.index}/200/300`}`
              }}
            />
            <View style={FlatListStyles.overlay} />

        </TouchableOpacity>
      )
}
