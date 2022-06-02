import React, {Suspense, useCallback, memo} from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FlatListStyles from './FlatListStyles'
// import FlatListChart from './FlatListChart'

const FlatListChart = React.lazy(() => import("./FlatListChart.js"));


function FlatListRowLabels(props) {
    const _keyExtractor = useCallback(
        (item, index) => `${index}`,
        []
    )   

// console.log(``);
// console.log(`props?.isScrolling: ${props?.isScrolling}`);
// console.log(``);

  return (
    <View style={FlatListStyles.rowLabels}>
        <Text style={FlatListStyles.headerText1}>{`${props?.item?.name}`}</Text>
        <Text style={FlatListStyles.headerText2}>{`${props?.item?.price ?? props?.item?.priceUsd}`}</Text>
        
        <Suspense fallback={<Text>Loading</Text>}>
            <FlatListChart {...props} />
        </Suspense>
        
    </View>
  )
}

export default memo(FlatListRowLabels)
