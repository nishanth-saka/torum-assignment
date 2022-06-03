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



const FlatListWallet = (props) => {
  console.log(``);
  console.log(``);
  console.log(``);
  console.log(``);
  console.log(`FlatListWallet props`);
  console.log(props);
  console.log(``);
    let dataArray = props?.rowsSelected ?? [];
  return (
    <View key={`${props?.index}`} style={[FlatListStyles.row, {
      display: props?.value ? 'flex' : 'none',
      backgroundColor: '#2A292D'
      } ]}>
        <FlatListHeader headerText={`Wallter: ${dataArray.length}`}/>
        
      <ScrollView style={FlatListStyles.scrollContainer}>
        {dataArray.map((value, index) => 
        <TouchableOpacity key={`${index}`} style={[FlatListStyles.container, {padding: 20, borderRadius: 20, backgroundColor: '#2A292D'}]}>
          <Text style={[FlatListStyles.headerText1, {padding: 0, color:  '#fff'}]}>{`${value?.id}`}</Text>
          <Text style={FlatListStyles.headerText2}>{`${value?.priceUsd}`}</Text>
        </TouchableOpacity>)}
      </ScrollView>
      <TouchableOpacity style={[FlatListStyles.btn, {width: 40, height: 40, top: 20, right: 10, backgroundColor:  '#C80435'}]}
                onPress={(args) => {
                    props.setShowWallet(false);                
                }} />
    </View>
  )
}

export default memo(FlatListWallet, propsAreEqual)
