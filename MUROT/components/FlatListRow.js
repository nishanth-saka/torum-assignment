import React, {memo, useCallback, useRef} from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import FlatListRowPreviewImage from './FlatListRowPreviewImage'
import FlatListRowProfileImage from './FlatListRowProfileImage'
import FlatListStyles from './FlatListStyles'
import FlatListRowLabels from './FlatListRowLabels';
import _ from 'lodash';
import { useEffect } from 'react/cjs/react.production.min'

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
   

    let _rows = props.rowSelected ?? [];
    _rows.push(props?.item)

    props.setRowSelected(_.uniqBy([..._rows], 'id'));
    props.setShowSheet(props?.item);
    props.setCurrentSelectedRow(props?.item);   
    props.prefetchTodos({'coindID': props?.item?.id});
  }

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
