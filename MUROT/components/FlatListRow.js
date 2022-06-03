import React, {memo, useCallback, useRef, createContext} from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import FlatListRowPreviewImage from './FlatListRowPreviewImage'
import FlatListRowProfileImage from './FlatListRowProfileImage'
import FlatListStyles from './FlatListStyles'
import FlatListRowLabels from './FlatListRowLabels';
import { useEffect } from 'react/cjs/react.production.min'
import _ from 'lodash';

const propsAreEqual = (preItem, nextItem) => {
  return preItem.item?.priceUsd === nextItem.item?.priceUsd;
  // return true;
}

function FlatListRow(props) {   

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const _keyExtractor = useCallback(
    (item, index) => `${index}`,
    []
  )

  const _rowSelect = (arg1) => {
    console.log(``);
    console.log(`props:`);
    console.log(props?.item);
    console.log(``);

    let _rows = props.rowSelected ?? [];
    _rows.push(props?.item)
    props.setRowSelected(_.uniqBy([..._rows], 'id'))
  }

 
// console.log(``);
// console.log(`item?.price:`);
// console.log(props?.item?.priceUsd);
// console.log(``);


    return (      
        
          <TouchableOpacity key={_keyExtractor} 
            onPress={_rowSelect} style={FlatListStyles.row}
          >
            <FlatListRowPreviewImage {...props} />
            <FlatListRowLabels {...props} />            
            <FlatListRowProfileImage {...props} />

        </TouchableOpacity>     
      
    ) 
}

export default memo(FlatListRow, propsAreEqual)
