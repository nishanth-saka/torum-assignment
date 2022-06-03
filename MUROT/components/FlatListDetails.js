import React, {useEffect, useState, memo} from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { QueryClient, useInfiniteQuery, useQuery, useQueryClient } from 'react-query';

import _ from 'lodash';

import FlatListStyles from './FlatListStyles';
import FlatListHeader from './FlatListHeader'

const propsAreEqual = (preItem, nextItem) => {
  return preItem.dataObject?.vwap24Hr === nextItem.dataObject?.vwap24Hr;
  // return true;
}



const FlatListDetails = (props) => {
  const [detailsObj, setDetailsObj] = useState();
  const queryClient = useQueryClient();
  var value = props?.dataObject?.vwap24Hr;
  var data = props?.getDataForGraph(value);
      
  var _isGreen = _.first(data) >= _.last(data);

  const queryData = async() => 
  await queryClient?.getQueryData(props?.dataObject?.id?.toLowerCase());

  useEffect(() => {
    setTimeout(() => {
      queryData().then((dataResponse) => {
        setDetailsObj(dataResponse?.results?.data)
      }, [props])  
    }, 500);  
  });
      

  const dataArray = detailsObj ? Object.keys(detailsObj) : [];
  console.log(``);
  console.log(`queryData:`);
  console.log(dataArray);
  console.log(``);

  return (
    <View key={`${props?.index}`} style={[FlatListStyles.row, {
      display: props?.value ? 'flex' : 'none',
      backgroundColor: '#2A292D'
      } ]}>
        <FlatListHeader headerText={detailsObj?.name}/>
        
      <ScrollView style={FlatListStyles.scrollContainer}>
        {dataArray.map((value, index) => 
        <TouchableOpacity key={`${index}`} style={[FlatListStyles.container, {padding: 20, borderRadius: 20, backgroundColor: '#2A292D'}]}>
          <Text style={[FlatListStyles.headerText1, {padding: 0, color:  '#fff'}]}>{`${value}`}</Text>
          <Text style={FlatListStyles.headerText2}>{`${detailsObj[value]}`}</Text>
        </TouchableOpacity>)}
      </ScrollView>
      <TouchableOpacity style={[FlatListStyles.btn, {width: 40, height: 40, top: 20, right: 10, backgroundColor: !_isGreen ? '#54D0B8' : '#C80435'}]}
                onPress={(args) => {
                  props.setShowSheet(false);
                }} />
    </View>
  )
}

export default memo(FlatListDetails, propsAreEqual)
