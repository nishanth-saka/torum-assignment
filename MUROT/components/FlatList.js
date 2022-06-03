import React, {useRef, useCallback, useState} from 'react'
import { View, Text, FlatList, FlatListStylesheet, Image, TouchableOpacity } from 'react-native'
import FlatListHeader from './FlatListHeader';
import FlatListStyles from './FlatListStyles';
import FlatListRow from './FlatListRow';
import useDebounce from '../hooks/useDebounce';
import _ from 'lodash';


function FlatListComponent({data, isLoading, isFetched, showLoadMore, hasNextPage, fetchNextPage, isFetchingNextPage}) {
    var _FlatListRef = useRef();
    var onEndReachedCalledDuringMomentum = useRef(true);

    const [isScrolling, setIsScrolling] = useState(false);
    const [viewIndex, setViewIndex] = useState(0);
    
    const [loadNext, setLoadNext] = useState(0);

    

    useDebounce(() => fetchNextPage(), 1000, [loadNext])
        const _loadMore = () => {

          if(!onEndReachedCalledDuringMomentum.current){
            // this.fetchData();
            if(hasNextPage){
              
              // console.log(``);
              // console.log(`viewIndex: `);
              // console.log(viewIndex);
              // console.log(``);

              setLoadNext(!loadNext);
            }
            onEndReachedCalledDuringMomentum.current = true;
        }            
      };

    const _keyExtractor = useCallback(
        (item, index) => `${index}${item?.id}`,
        []
      )
    
    const _renderItem = useCallback(({item, index}) => {    
          var _data =  [];

        const k = 100;
        var price = item?.priceUsd;        
        
        var range = _.range(price - k/2,price + k/2);
        
        range = _.shuffle(range);        
        var slice = range.length > 20 ? range.length/10 : 5;
        _data = _.slice(range, range.length - slice, range.length );
        _data = [..._data];


        return <FlatListRow 
        item={item} 
        index={index} 
        isScrolling={isScrolling}
        viewIndex={viewIndex}
        chartData={_data}
        />
      }, [data])

    const _onMomentumScrollBegin = () => {
      onEndReachedCalledDuringMomentum.current = false;
    }

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
      let _currentViewIndex = _.last(viewableItems)?.index;
      
      // console.log(``);
      // console.log(`_currentViewIndex: `);
      // console.log(_currentViewIndex);
      // console.log(``);

      if(_currentViewIndex){
          setViewIndex(_currentViewIndex);
      }
  })

  // console.log(``);
  // console.log(``);
  // console.log(`FlatListComponent data:`);
  // console.log(`data:`);
  // console.log(data);
  // console.log(``)

    return (
      <View style={FlatListStyles.container}>
        {(isLoading) && <Text  style={FlatListStyles.headerText1}>Loading...</Text>}
        {isFetched && 
        <>
            <FlatList 
                initialNumToRender={3}
                maxToRenderPerBatch={5}
                removeClippedSubviews={true}
                contentContainerStyle={FlatListStyles.listContainer}
                ref={_FlatListRef}
                onViewableItemsChanged={onViewableItemsChanged.current}
                ListHeaderComponent={FlatListHeader}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                onEndReachedThreshold={0.5}
                onEndReached={_loadMore}   
                data={data}     
                onMomentumScrollBegin={_onMomentumScrollBegin}                     
                stickyHeaderIndices={[0]}
              />

            <TouchableOpacity style={[FlatListStyles.btn, {display: isFetchingNextPage ? 'flex' : 'none'}]}
                onPress={(args) => {

                }} />  
        </>                
        }  
      </View>
    )
}

export default FlatListComponent;

