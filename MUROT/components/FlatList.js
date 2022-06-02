import React, {useRef, useCallback, useState} from 'react'
import { View, Text, FlatList, FlatListStylesheet, Image, TouchableOpacity } from 'react-native'
import FlatListHeader from './FlatListHeader';
import FlatListStyles from './FlatListStyles';
import FlatListRow from './FlatListRow';
import _ from 'lodash';

function FlatListComponent({data, isLoading, isFetched, showLoadMore, hasNextPage, fetchNextPage, isFetchingNextPage}) {
    var _FlatListRef = useRef();
    const [isScrolling, setIsScrolling] = useState(false);
    const [viewIndex, setViewIndex] = useState(0);

    const _loadMore = () => {
        if(hasNextPage){
          fetchNextPage();
            // setLoadMore(!showLoadMore);
        }    
      };

    const _keyExtractor = useCallback(
        (item, index) => `${index}${item?.id}`,
        []
      )
    
    const _renderItem = useCallback(({item, index}) => {    
        return <FlatListRow 
        item={item} 
        index={index} 
        isScrolling={isScrolling}
        viewIndex={viewIndex}
        />
      }, [data])

    const _onMomentumScrollBegin = () => {
      setIsScrolling(true)
    }

    const _onMomentumScrollEnd = () => {
      setIsScrolling(false)
    }

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
      let _currentViewIndex = _.last(viewableItems)?.index;
      
      console.log(``);
      console.log(`_currentViewIndex: `);
      console.log(_currentViewIndex);
      console.log(``);

      if(_currentViewIndex){
          setViewIndex(_currentViewIndex);
      }
  })

  console.log(``);
  console.log(``);
  console.log(`FlatListComponent data:`);
  console.log(`data:`);
  console.log(data);
  console.log(``)

    const _flattenData = data?.pages?.map(page => page.results).flat();
    return (
      <View style={FlatListStyles.container}>
        {(isLoading) && <Text  style={FlatListStyles.headerText1}>Loading...</Text>}
        {isFetched && 
        <>
            <FlatList 
                initialNumToRender={3}
                maxToRenderPerBatch={5}
                removeClippedSubviews={false}
                contentContainerStyle={FlatListStyles.listContainer}
                ref={_FlatListRef}
                onViewableItemsChanged={onViewableItemsChanged.current}
                ListHeaderComponent={FlatListHeader}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                onEndReachedThreshold={0.4}
                onEndReached={_loadMore}   
                data={data}     
                onMomentumScrollBegin={_onMomentumScrollBegin}                               
                onMomentumScrollEnd={_onMomentumScrollEnd}                               
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

