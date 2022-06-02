import React from 'react'
import { View, Text, FlatList, FlatListStylesheet, Image, TouchableOpacity } from 'react-native'
import FlatListStyles from './FlatListStyles'

export default function FlatListRowPreviewImage(props) {

  // console.log(``);
  // console.log(`PREVIEW: `);
  // console.log(`${props?.item?.urls?.small}`);
  // console.log(``);

    return(
        <React.Fragment>
          
          <Image 
              style={FlatListStyles.previewImage}
              source={{
                uri: `${props?.item?.icon ?? `https://images.unsplash.com/photo-1638913660695-b490171d17c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjg2Nzh8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1NDExNTA2Mg&ixlib=rb-1.2.1&q=80&w=400`}`
              }}
            />
            <View style={FlatListStyles.overlay} />

        </React.Fragment>
      )
}
