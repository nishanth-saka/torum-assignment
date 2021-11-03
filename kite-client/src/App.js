import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import StickyTable from "react-sticky-table-thead";


 let _sampleArray = [
   {
     name: 'BERGEPAINT',
     code: 130426884
   },{
    name: 'RCOM',
    code: 3375873
  },{
    name: 'DLF',
    code: 136414212
  },{
    name: 'AAPLLTD',
    code: 136642052
  }   
 ];

var _scrips = [
  5351937,142593,60161,1342721,263681,
  1147137,1793,4923649,3525377,4882689,
  1378561,1986305,3329,4583169,5533185,
  7707649,2821633,1420545,2198529,1540609,3580673,1878785,5633,1805569,5431553,375041,3478273,5449217,481025,6401,912129,3861249,4451329,2616577,5058817,63489,8705,1267969,3792129,3774721,4617985,10241,2903809,867585,2089985,2835457,2315777,2756865,513025,4976129,4565249,4957697,3350017,1184257,2533633,1553409,123393,2079745,4431361,871169,3939585,3458561,557057,5165569,2199297,375553,2539777,4417537,20225,3495937,4341505,2995969,1148673,3456257,3020289,4280065,4524801,3801089,3736833,1951489,25601,1045249,303361,2942977,3899905,325121,3685889,1427969,665089,346369,4492033,3485953,5227265,42497,34817,1332737,82945,4264193,7534081,954113,37889,3500289,2120961,2307585,724225,2941697,5235969,39425,5535489,6599681,6483969,290305,40193,3676417,41729,1613313,2753281,1391361,4299521,1456129,46337,3892225,3554561,976129,5160705,4419329,3726593,2370561,4562177,4659713,4329729,1575937,720385,49409,2332417,2679041,1376769,6422529,2722305,4505089,3840257,51969,6247169,52737,5166593,54273,4716033,60417,3811585,5248513,4421121,4538369,386049,3691009,2974209,1436161,223745,144897,425729,1554945,3477761,67329,7685889,5436929,4803073,3077633,70401,1033473,71169,3611137,5479937,2031617,670977,1062913,4785153,3586049,460033,1510401,267265,903681,2415617,1467393,5256193,923649,5440513,770561,2632961,4541953,3603201,4267265,4999937,3848705,4268801,78849,78081,81153,2344449,3712257,2895105,2606337,85761,332545,86529,3440897,87297,88833,89601,3553281,579329,3917569,210433,1195009,2928385,1214721,3714817,800513,4587777,94209,3080705,94977,4589313,3522817,97281,1455873,2261249,643329,256513,2985473,548865,1099265,4590849,416769,5170177,98049,101121,107265,103425,590337,20737,1449473,5404929,3729153,3888385,1577985,3430401,5318657,5460993,2556161,5006337,108033,109057,981505,4127489,2714625,112129,4718337,2009089,120577,2911489,1058817,563969,122113,122881,3901185,4502017,1481985,2081793,4931841,3402241,4424449,2214401,2189313,126721,2127617,1553153,6404353,5207041,131329,4966657,806145,558337,134657,1321729,3344897,3887105,998657,140033,3458049,1296897,5550849,6434817,5013761,207105,143105,6093825,6343937,1524993,1790465,175617,382465,3890689,698369,3859713,2027265,2029825,5586689,2150401,1591297,87553,2763265,2271745,149249,5161985,5567745,999937,4978433,152321,5142017,7452929,1384193,320001,3838977,1634561,2931713,5421569,3905025,5177345,3369473,158465,2946817,3812865,628225,3835393,3406081,160001,3849985,7683073,160769,5204225,1258753,2187777,163073,3742209,69121,716545,1394945,524545,175361,5565441,1316353,6953217,2054145,177665,1292545,5179649,183041,891393,4898049,24577,5215745,1537537,5506049,2858241,2955009,3876097,4513793,7971329,1215745,2620929,3003137,647937,4474113,1025793,3909377,189185,189953,4348417,4063745,595969,730625,2855681,2403329,1131777,3558401,193793,4376065,4760577,3831297,3639809,1459457,1040385,486657,4741121,3031553,1549057,1471489
]
  ;

let _scripCode = 1321729; //  RCOM-3375873, DLF-136414212
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
          accessor: 'sig',
        },
       {
         Header: 'SUPER',
         accessor: 'str',
       },
      ,
     ];
   const [tableColumns, setTableColumns] = new useState(columns);
   const [tableRows, setTableRows] = new useState([]);

   useEffect(() => {
    let _updateRows = [];
    //  _.forEach(_scrips, async(obj, index) => {             
    //   await getHistoryData(obj, _updateRows, index);
    //  })

      getHistoryData(_scripCode, _updateRows);

   }, [tableColumns])

   function getSignal(date, scripCode, close, rsi, sma, str, volume, rsiArray, volumeArray, superArray, indexInt){
    console.log('indexInt', indexInt);
    console.log('scripCode', scripCode);
    console.log('Prev STR', superArray[superArray.length - 2] == -1 ? 'DOWN' : '-');
    // console.log('date', date);
    // console.log('close', close);
    // console.log('rsi', rsi);
    // console.log('volume', volume);
    console.log('');

     let _return = null;
     let _meanRSI = _.mean(rsiArray);
     let _meanVolume = _.mean(volumeArray);
     let _isSuperTrend = (superArray[superArray.length - 2] == -1 && superArray[superArray.length - 1] == 1) ? true : false;
     
     if(rsi == undefined || sma == undefined){
      return _return;
     }

     if(close > sma && 
        rsi >= 60 &&
        _meanRSI <= 55 &&
      volume > 1000 &&
      volume > _meanVolume && 
      _isSuperTrend){
     
      _return = 'BUY';
     }  

     return _return;
   }

   function getTrendText(strObj, prevObj){
    let _strText = '-';

    if(strObj && strObj.Up){
      
      //_strText = `Up: ${strObj.Up.toFixed(0)} | Down: ${strObj.Down.toFixed(0)} | Active: ${strObj.ActiveTrend.toFixed(0)} | Dir: ${strObj.Direction}`;
      _strText = `Prev: ${prevObj?.Direction == 1 ? 'Up' : 'Down'} / Current: ${strObj.Direction == 1 ? 'Up' : 'Down'}`;
    }
    return _strText;
   }

   async function getHistoryData (scripCode, updateRows, index){
     let _getHistoryURL = `https://kite-connect-nodejs.herokuapp.com/getHistoricalData?instrument_token=${scripCode}`;
     return await axios.get(_getHistoryURL)
     .then(async(response) => {
      
      if(response?.data){
        let _responseArray = response.data;

        console.log(`#${index}/${_scrips.length} ${scripCode} Rows: `);
        console.log(_responseArray);
        console.log('');

        let _prevIndex = 0;
        _responseArray = _.compact(_responseArray);
        let _rsiArray = [];
        let _volumeArray = [];
        let _superArray = [];
        
        let _tableRowsArray = _.map(_responseArray, (obj, index) => {
          _rsiArray.push(obj.valueRSI);
          _volumeArray.push(obj.volume);

          if(_rsiArray.length > 10){
            _rsiArray = [obj.valueRSI];
          }
         
          if(_volumeArray.length > 10){
            _volumeArray = [obj.volume];
          }

          _superArray.push(obj.valueSTR?.Direction)
          
          let _signal = getSignal(obj.date, scripCode, obj.close, obj.valueRSI, obj.valueSMA, obj.valueSTR, obj.volume, _rsiArray, _volumeArray, _superArray, index);

         
          let _prevSuper = _responseArray[index -1];
          if((obj.valueSTR?.Up && _signal)){
            

            _prevIndex = obj.index;
            let _row = {
              index: scripCode,
              date: moment(obj.momentDate).format('MMM DD, YYYY'),
              close: obj.close.toFixed(1),
              sma: obj.valueSMA.toFixed(1),        
              vwap: obj.valueVWAP.toFixed(1),              
              rsi: obj.valueRSI.toFixed(1),              
              vol: obj.volume,              
              sig: _signal ?? '-',
              str: obj.valueSTR ? getTrendText(obj.valueSTR) : '-'      
            }

            return _row;  

            if(moment(obj.momentDate).year() == moment(new Date()).year() &&
              moment(obj.momentDate).month() == moment(new Date()).month()){
              return _row;                       
            }

          } else {
            let _row = {
              index: scripCode,
              date: moment(obj.momentDate).format('MMM DD, YYYY'),
              close: obj.close.toFixed(1),
              sma: obj.valueSMA?.toFixed(1),        
              vwap: obj.valueVWAP?.toFixed(1),              
              rsi: obj.valueRSI?.toFixed(1),              
              vol: obj.volume,              
              sig: '-',
              str: obj.valueSTR ? getTrendText(obj.valueSTR, _prevSuper?.valueSTR) : '-'      
            }
            return _row;
          }

        })

        _tableRowsArray = _.compact(_tableRowsArray);
        updateRows.push(_tableRowsArray);
        console.log(`#${index}/${_scrips.length} updateRows:`, _.flatten(updateRows));
        // setTableRows(_.sortBy(_.flatten(updateRows), 'index')); 
        
          setTableRows(_.compact(updateRows));
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
              {headerGroup.headers.map((column, index) => (
                <th
                key={index}
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
              <tr key={index}>
                {Object.keys(row.original).map((cell, index) => {                  
                  return (
                    <td      
                      key={index}                
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: row.original?.sig === 'BUY' ? 'papayawhip' : 'lightgray',
                        textAlign:'left',                        
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