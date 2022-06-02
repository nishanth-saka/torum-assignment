import React, {memo, useCallback} from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FlatListRowPreviewImage from './FlatListRowPreviewImage'
import FlatListRowProfileImage from './FlatListRowProfileImage'
import FlatListStyles from './FlatListStyles'
import FlatListRowLabels from './FlatListRowLabels';

function FlatListRow(props) {   

  // console.log(``);
  // console.log(``);
  // console.log(`FlatListRow props`);
  // console.log(props);
  // console.log(``);
  
  const _keyExtractor = useCallback(
    (item, index) => `${index}`,
    []
  )

    return (      
        <View key={_keyExtractor} style={FlatListStyles.row}>
          {/* <Text style={FlatListStyles.headerText1}>{`${props?.item?.name}: ${props?.item?.price}`}</Text> */}
          
          <FlatListRowPreviewImage {...props} />
          <FlatListRowLabels {...props} />
          
          <FlatListRowProfileImage {...props} />
          
          
      </View>     
    ) 
}

export default memo(FlatListRow)
