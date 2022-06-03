import React from 'react'
import { LineChart, Grid } from 'react-native-svg-charts';
import _ from 'lodash';
import { memo } from 'react/cjs/react.production.min';
 
class LineChartFlatList extends React.PureComponent {
    constructor(props){
        super(props)
    }



    render() {
        
        
        var data = this.props?.chartData;
        
        var _isGreen = _.first(data) >= _.last(data);

        // console.log(`ID: ${this.props?.item?.id}`);
        // console.log(`_.first(data): ${_.first(data)} _.last(data): ${_.last(data)}`);
        // console.log(``);

        return (
            <LineChart
                style={{ width: 300, height: 300 }}
                data={data}
                svg={{ stroke: !_isGreen ? '#54D0B8' : '#C80435', strokeWidth: 10, strokeOpacity: 0.55}}
                contentInset={{ top: 20, bottom: 20 }}
                animate={true}
                animationDuration={2200}
            >
                <Grid />
            </LineChart>
        )
    }
}

export default LineChartFlatList;