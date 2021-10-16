import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import _ from 'lodash';
 
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
          Header: 'RSI',
          accessor: 'rsi',
        },
        {
          Header: 'VOL',
          accessor: 'vol',
        },
        {
          Header: 'STR',
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
      getHistoryData();
   }, [tableColumns])

   function getSignal(close, rsi, sma, str){
     let _return = null;

     if(close > sma){
      if(rsi >= 40){
        if(str.Direction == -1){
          _return = '-';
        }
       }   
     }

     return _return;
   }
   function getHistoryData(){
     let _getHistoryURL = 'https://kite-connect-nodejs.herokuapp.com/getHistoricalData';
     axios.get(_getHistoryURL)
     .then((response) => {
      
      if(response?.data){
        let _responseArray = response.data;
        let _prevSignal = null;
        let _tableRowsArray = _.map(_responseArray, (obj, index) => {
          let _signal = getSignal(obj.close, obj.valueRSI, obj.valueSMA, obj.valueSTR);
          if(obj.valueSTR?.Up && _signal){
            console.log('obj.valueSTR', obj.valueSTR);
            let _row = {
              index: index,
              date: obj.date,
              close: obj.close.toFixed(1),
              sma: obj.valueSMA.toFixed(1),        
              rsi: obj.valueRSI.toFixed(1),              
              vol: obj.volume,              
              str: `Up: ${obj.valueSTR?.Up?.toFixed(1)} | Down: ${obj.valueSTR?.Down?.toFixed(1)} | Direction: ${obj.valueSTR?.Direction} `,
              // sig: _signal,     
            }
            return _row;            
          } else {
            // let _row = {
            //   index: index,
            //   date: obj.date,
            //   close: obj.close.toFixed(1),
            //   sma: obj.valueSMA?.toFixed(1),        
            //   rsi: obj.valueRSI?.toFixed(1),              
            //   sig: '-',              
            //   str: '-'
            // }
            // return _row;
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
     <div style={{display:'flex', flex:1}}>
       <table {...getTableProps()} style={{ width:'100%', backgroundColor:'white'}}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                    position: 'sticky',
                    textAlign:'left'
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
                  // console.log(index, cell, row.original[cell]);   
                  return (
                    <td      
                      key={index}                
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
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
     </div>
     
   )
 }
  
export default App;