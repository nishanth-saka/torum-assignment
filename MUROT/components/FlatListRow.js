import React, {memo, useCallback} from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FlatListRowPreviewImage from './FlatListRowPreviewImage'
import FlatListRowProfileImage from './FlatListRowProfileImage'
import FlatListStyles from './FlatListStyles'
import FlatListRowLabels from './FlatListRowLabels';

function FlatListRow(props) {   

  // console.log(``);
  // console.log(``);
  // console.log(`props?.index`);
  // console.log(props?.index);
  // console.log(``);
  
  const _keyExtractor = useCallback(
    (item, index) => `${index}`,
    []
  )

  const _rowSelect = (arg1) => {
    // console.log(``);
    // console.log(`props:`);
    // console.log(props?.item);
    // console.log(``);
  }

    return (      
        <TouchableOpacity key={_keyExtractor} style={FlatListStyles.row}
          onPress={_rowSelect}
        >
          {/* <Text style={FlatListStyles.headerText1}>{`${props?.item?.name}: ${props?.item?.price}`}</Text> */}
          
          <FlatListRowPreviewImage {...props} />
          <FlatListRowLabels {...props} />
          
          <FlatListRowProfileImage {...props} />
          
          
      </TouchableOpacity>     
    ) 
}

export default memo(FlatListRow)
