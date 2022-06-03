import React, {Suspense, useCallback, memo} from 'react'
import { View, Text, Animated, Image, Easing } from 'react-native'
import FlatListStyles from './FlatListStyles'
import FlatListChart from './FlatListSvgChart'

// const FlatListChart = React.lazy(() => import("./FlatListChart.js"));

const areEqual =  (prevProps, nextProps) => {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return true;
}

function FlatListRowLabels(props) {
    const _keyExtractor = useCallback(
        (item, index) => `${index}`,
        []
    )   

  


console.log(``);
console.log(`props?.index: ${props?.index}`);
console.log(``);

  return (
    <View key={`${props?.index}`} style={FlatListStyles.rowLabels}>
        <Text style={FlatListStyles.headerText1}>{`#${props?.index}: ${props?.item?.name}`}</Text>
        <Text style={FlatListStyles.headerText2}>{`${props?.item?.price ?? props?.item?.priceUsd}`}</Text>
        
        <Suspense fallback={<Text>Loading</Text>}>
            <FlatListChart {...props} />
        </Suspense>
        
    </View>
  )
}

export default memo(FlatListRowLabels, areEqual)
