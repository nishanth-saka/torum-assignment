import React, {memo, useRef, useEffect} from 'react'
import { View, Text, Animated } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import FlatListStyles from './FlatListStyles'

  const areEqual =  (prevProps, nextProps) => {
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
    return true;
  }

function FlatListChart(props) {
  // const {viewIndex} = props;
  const _labels =  ["January", "February", "March", "April", "May", "June"];  

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
  })

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true 
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000
    }).start();
  };

  
console.log(``);
console.log(`FlatListChart props`);
console.log(props?.chartData);
console.log(``);


  return (
    <Animated.View  style={[FlatListStyles.chart, {
        opacity: fadeAnim
      }]}>
        <Text>Bezier Line Chart</Text>
        <LineChart
            data={{
            labels: _labels,            
            datasets: [
                {data: props?.chartData}
            ]
            }}            
            width={300} // from react-native
            height={80}
            withVerticalLabels={false}
            withHorizontalLines={false}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: `rgba(69,85,117,0.8)`,
            // backgroundGradientFrom: "#fb8c00",
            // backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 0) => `#dddccc00`,
            style: {
                borderRadius: 16,
                flex: 1
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                // stroke: "#ffa726"
            }
            }}
            bezier
            style={{
            // marginVertical: 8,
            borderRadius: 16
            }}
        />
    </Animated.View>
  )
}

export default memo(FlatListChart, areEqual)