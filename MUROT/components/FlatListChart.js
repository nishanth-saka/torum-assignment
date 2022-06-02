import React, {memo} from 'react'
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import FlatListStyles from './FlatListStyles'

function FlatListChart(props) {
    const {viewIndex} = props;
  console.log(``);
  console.log(``);
  console.log(`viewIndex:`);
  console.log(viewIndex);
  console.log(``);
  console.log(``);
  console.log(``);

  const _labels =  ["January", "February", "March", "April", "May", "June"];
  const _data =   [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100
];

  return (
    <View  style={FlatListStyles.chart}>
        <Text>Bezier Line Chart</Text>
        <LineChart
            data={{
            labels: _labels,            
            datasets: [
                {data:_data}
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
                borderRadius: 16
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
    </View>
  )
}

export default memo(FlatListChart)