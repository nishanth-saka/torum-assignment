import React, {useRef, useCallback, useState, useEffect} from 'react'
import { View, Text, FlatList, FlatListStylesheet, Image, TouchableOpacity } from 'react-native'
import FlatListHeader from './FlatListHeader';
import FlatListStyles from './FlatListStyles';
import FlatListRow from './FlatListRow';
import useDebounce from '../hooks/useDebounce';
import _ from 'lodash';
import { QueryClient, useInfiniteQuery, useQuery, useQueryClient } from 'react-query';


import FlatListDetails from './FlatListDetails';

function FlatListComponent({data, isLoading, isFetched, showLoadMore, hasNextPage, fetchNextPage, isFetchingNextPage}) {

  const _fetchData =  ({queryKey}) =>  {
    return fetch(`https://api.coincap.io/v2/assets/${queryKey}`).then(async(response) => {
      const results = await response.json();
      return { results };    
    })
  }
  
  const queryClient = useQueryClient();
  const prefetchTodos = async ({coindID}) => {
    setCurrentSelectedCoin(coindID);
    await queryClient.prefetchQuery([`${coindID}`], _fetchData)
  }

    var _FlatListRef = useRef();
    var onEndReachedCalledDuringMomentum = useRef(true);

    const [isScrolling, setIsScrolling] = useState(false);
    const [viewIndex, setViewIndex] = useState(0);
    const [rowSelected, setRowSelected] = useState([])
    const [loadNext, setLoadNext] = useState(0);
    const [showSheet, setShowSheet] = useState(false);
    const [currentSelectedRow, setCurrentSelectedRow] = useState(null);
    const [currentSelectedCoin, setCurrentSelectedCoin] = useState(null);

  useEffect(() => {
    // console.log(``);
    // console.log(`useEffect-rowSelected Array:`);
    // console.log(rowSelected?.length);
    // console.log(``);
  }, [rowSelected])

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
    
    const _getDataForGraph = (valueInt) => {
      var _data =  [];

        const k = 100;
        var price = valueInt;        
        
        var range = _.range(price - k/2,price + k/2);
        
        range = _.shuffle(range);        
        var slice = range.length > 20 ? range.length/10 : 5;
        _data = _.slice(range, range.length - slice, range.length );
        _data = [..._data];

        return _data;
    }
    
    const _renderItem = useCallback(({item, index}) => {    
        
        return <FlatListRow 
        item={item} 
        index={index} 
        isScrolling={isScrolling}
        viewIndex={viewIndex}
        chartData={_getDataForGraph(item?.priceUsd)}
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
        setShowSheet={setShowSheet}
        setCurrentSelectedRow={setCurrentSelectedRow}
        prefetchTodos={prefetchTodos}
        />
      }, [data])

    const _onMomentumScrollBegin = () => {
      onEndReachedCalledDuringMomentum.current = false;
    }

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
      let _currentViewIndex = _.last(viewableItems)?.index;
      if(_currentViewIndex){
          setViewIndex(_currentViewIndex);
      }
  })

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
                ListHeaderComponent={() => <FlatListHeader currentSelectedCoin={currentSelectedCoin} rowSelected={rowSelected} />}
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
        {showSheet && <FlatListDetails setShowSheet={setShowSheet} dataObject={currentSelectedRow} value={showSheet} getDataForGraph={_getDataForGraph}/> }
      </View>
    )
}

export default FlatListComponent;

