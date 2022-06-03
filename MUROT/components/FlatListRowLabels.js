import React, {Suspense, useCallback, memo} from 'react'
import { View, Text, Animated, Image, Easing } from 'react-native'
import FlatListStyles from './FlatListStyles'
import FlatListChart from './FlatListSvgChart'
import _ from 'lodash';
// const FlatListChart = React.lazy(() => import("./FlatListChart.js"));

const propsAreEqual = (preItem, nextItem) => {
  return preItem.item?.priceUsd === nextItem.item?.priceUsd;
  // return true;
}

function FlatListRowLabels(props) {
    const _keyExtractor = useCallback(
        (item, index) => `${index}`,
        []
    )   

  
    var data = props?.chartData;
        
    var _isGreen = _.first(data) >= _.last(data);

console.log(``);
console.log(`props?.index: ${props?.item?.priceUsd}`);
console.log(``);

  return (
    <View key={`${props?.index}`} style={FlatListStyles.rowLabels}>
        <Text style={[FlatListStyles.headerText1, {color:  !_isGreen ? '#54D0B8' : '#C80435'}]}>{`#${props?.index}: ${props?.item?.name}`}</Text>
        <Text style={FlatListStyles.headerText2}>{`${props?.item?.price ?? props?.item?.priceUsd}`}</Text>
        
        <Suspense fallback={<Text>Loading</Text>}>
            <FlatListChart {...props} />
        </Suspense>
        
    </View>
  )
}

export default memo(FlatListRowLabels, propsAreEqual)
