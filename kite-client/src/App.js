import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import _ from 'lodash';
import StickyTable from "react-sticky-table-thead"

 
let _scripCode = 133392388; //  RCOM-3375873, DLF-136414212
 function App() {
   const data = React.useMemo(
     () => [
       {
         col1: 'Hello',
         col2: 'World',
       },
       {
         col1: 'react-table',
         col2: 'rocks',
       },
       {
         col1: 'whatever',
         col2: 'you want',
       },
     ],
     []
   )
 
   const columns = [
      {
        Header: 'Index',
        accessor: 'index', // accessor is the "key" in the data
      }, 
      {
         Header: 'Date',
         accessor: 'stockDate', // accessor is the "key" in the data
       },
       {
         Header: 'Close',
         accessor: 'close',
       },
       {
         Header: 'SMA',
         accessor: 'sma',
       },
       {
        Header: 'VWAP',
        accessor: 'vwap',
      },
       {
          Header: 'RSI',
          accessor: 'rsi',
        },        
        {
          Header: 'VOL',
          accessor: 'vol',
        },
        {
          Header: 'SIGNAL',
          accessor: 'str',
        },
      //  {
      //    Header: 'SIGNAL',
      //    accessor: 'sig',
      //  },
      ,
     ];

   const [tableColumns, setTableColumns] = new useState(columns);
   const [tableRows, setTableRows] = new useState([]);
 
   

   useEffect(() => {
      getHistoryData(_scripCode);
   }, [tableColumns])

   function getSignal(close, rsi, sma, str, vwap, prevIndex){
     let _return = null;

     if(close > sma){
      // if(rsi >= 40 && rsi < 50){
        if(rsi >= 40 && rsi < 60){
        // if(str.Direction == -1){
        //   if(vwap > close){
        //     _return = 'signal';
        //   }          
        // }

        if(vwap > close){
          _return = 'signal';
        }   

        // if(prevIndex === 'BUY' && rsi > 50){
        //   _return = 'SELL';  
        // } else {
        //   _return = 'BUY';
        // }
        
        // _return = 'signal';
      
       }   
     }

     return _return;
   }
   function getHistoryData(scripCode){
     let _getHistoryURL = `https://kite-connect-nodejs.herokuapp.com/getHistoricalData?instrument_token=${scripCode}`;
     axios.get(_getHistoryURL)
     .then((response) => {
      
      if(response?.data){
        let _responseArray = response.data;
        let _prevIndex = 0;
        _responseArray = _.compact(_responseArray);
        let _tableRowsArray = _.map(_responseArray, (obj, index) => {
        let _signal = getSignal(obj.close, obj.valueRSI, obj.valueSMA, obj.valueSTR, obj.valueVWAP, _prevIndex);
          
          // console.log(`_prevIndex: ${_prevIndex} - obj.index: ${obj.index} - DIFF: ${(obj.index - _prevIndex)}`);
          
          let _diffValue = (obj.index - _prevIndex);
          let _prevSign = '-';

          if((obj.valueSTR?.Up && _signal)){
            _prevIndex = obj.index;
            let _row = {
              index: obj.index,
              date: obj.date,
              close: obj.close.toFixed(1),
              sma: obj.valueSMA.toFixed(1),        
              vwap: obj.valueVWAP.toFixed(1),              
              rsi: obj.valueRSI.toFixed(1),              
              vol: obj.volume,              
              str: (_diffValue <= 1 && _prevSign !== 'BUY') ? '-' : 'BUY' //`Up: ${obj.valueSTR?.Up?.toFixed(1)} | Down: ${obj.valueSTR?.Down?.toFixed(1)} | Direction: ${obj.valueSTR?.Direction} `,              
            }

            return _row;            
          } else {
            let _row = {
              index: obj.index,
              date: obj.date,
              close: obj.close.toFixed(1),
              sma: obj.valueSMA?.toFixed(1),        
              vwap: obj.valueVWAP?.toFixed(1),              
              rsi: obj.valueRSI?.toFixed(1),              
              vol: obj.volume,              
              str: '-'
            }
            return _row;
          }
          
        })

        // console.log('Rows', _.compact(_tableRowsArray));
        setTableRows(_.compact(_tableRowsArray));
      }
     })
     .catch((ex) => {
      console.log('');
      console.log('getHistoryData ex');
      console.log(ex);
      console.log('');
     })
   }

   const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns:tableColumns, data:tableRows });
 
   return (
     <div style={{flex:1, alignItems:'center', alignContent:'center'}}>
               <StickyTable height={800}width={600}> 

       <table {...getTableProps()} style={{ backgroundColor:'white'}}>
        <thead>
          {headerGroups.map((headerGroup, indexInt) => (
            <tr key={indexInt}  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign:'left',                    
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            
            return (
              <tr>
                {Object.keys(row.original).map((cell, index) => {                  
                  return (
                    <td      
                      key={index}                
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: row.original?.str === 'BUY' ? 'papayawhip' : 'lightgray',
                        textAlign:'left'
                      }}
                    >
                      {row.original[cell] ?? ''}                      
                    </td>
                    
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      </StickyTable>
     </div>
     
   )
 }
  
export default App;