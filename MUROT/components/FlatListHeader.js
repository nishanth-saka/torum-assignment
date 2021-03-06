import React, {useMemo} from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { memo } from 'react/cjs/react.production.min';
import FlatListStyles from './FlatListStyles';

const FlatListHeader = ({showSheet, rowSelected, headerText, setShowSheet, setShowWallet}) => {
    return (
        <View style={[FlatListStyles.header, {alignItems: 'center'}]}>
          <Text style={[FlatListStyles.headerText1, {alignSelf: 'center', fontSize: 20}]}>{ headerText ?? `3RYPT`}</Text>
          <TouchableOpacity onPress={() => {
              if(showSheet){
                setShowSheet(false);                
              }
              
              setShowWallet(true)
              console.log('Walltet!')  
            }}>
            <Text style={[FlatListStyles.headerText1, {fontSize: 20}]}>{`${rowSelected?.[0] ? `Wallet: ${rowSelected.length}` : ``}`}</Text>
          </TouchableOpacity>
          
        </View>
      )
}

export default memo(FlatListHeader)
