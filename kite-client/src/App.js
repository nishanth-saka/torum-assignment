import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import StickyTable from "react-sticky-table-thead";
import {GetMainTable} from './GetMainTable';
import {GetDetailsTable} from './GetDetailsTable';

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
  7707649,2821633,1420545,2198529,1540609,
  3580673,1878785,5633,1805569,5431553,375041,3478273,
  5449217,481025,6401,912129,3861249,4451329,2616577,5058817,
  63489,8705,1267969,3792129,3774721,4617985,10241,2903809,867585,
  2089985,2835457,2315777,2756865,513025,4976129,4565249,4957697,
  // 3350017,1184257,2533633,1553409,123393,2079745,4431361,871169,3939585,3458561,557057,5165569,2199297,375553,2539777,4417537,20225,3495937,4341505,2995969,1148673,3456257,3020289,4280065,4524801,3801089,3736833,1951489,25601,1045249,303361,2942977,3899905,325121,3685889,1427969,665089,346369,4492033,3485953,5227265,42497,34817,1332737,82945,4264193,7534081,954113,37889,3500289,2120961,2307585,724225,2941697,5235969,39425,5535489,6599681,6483969,290305,40193,3676417,41729,1613313,2753281,1391361,4299521,1456129,46337,3892225,3554561,976129,5160705,4419329,3726593,2370561,4562177,4659713,4329729,1575937,720385,49409,2332417,2679041,1376769,6422529,2722305,4505089,3840257,51969,6247169,52737,5166593,54273,4716033,60417,3811585,5248513,4421121,4538369,386049,3691009,2974209,1436161,223745,144897,425729,1554945,3477761,67329,7685889,5436929,4803073,3077633,70401,1033473,71169,3611137,5479937,2031617,670977,1062913,4785153,3586049,460033,1510401,267265,903681,2415617,1467393,5256193,923649,5440513,770561,2632961,4541953,3603201,4267265,4999937,3848705,4268801,78849,78081,81153,2344449,3712257,2895105,2606337,85761,332545,86529,3440897,87297,88833,89601,3553281,579329,3917569,210433,1195009,2928385,1214721,3714817,800513,4587777,94209,3080705,94977,4589313,3522817,97281,1455873,2261249,643329,256513,2985473,548865,1099265,4590849,416769,5170177,98049,101121,107265,103425,590337,20737,1449473,5404929,3729153,3888385,1577985,3430401,5318657,5460993,2556161,5006337,108033,109057,981505,4127489,2714625,112129,4718337,2009089,120577,2911489,1058817,563969,122113,122881,3901185,4502017,1481985,2081793,4931841,3402241,4424449,2214401,2189313,126721,2127617,1553153,6404353,5207041,131329,4966657,806145,558337,134657,1321729,3344897,3887105,998657,140033,3458049,1296897,5550849,6434817,5013761,207105,143105,6093825,6343937,1524993,1790465,175617,382465,3890689,698369,3859713,2027265,2029825,5586689,2150401,1591297,87553,2763265,2271745,149249,5161985,5567745,999937,4978433,152321,5142017,7452929,1384193,320001,3838977,1634561,2931713,5421569,3905025,5177345,3369473,158465,2946817,3812865,628225,3835393,3406081,160001,3849985,7683073,160769,5204225,1258753,2187777,163073,3742209,69121,716545,1394945,524545,175361,5565441,1316353,6953217,2054145,177665,1292545,5179649,183041,891393,4898049,24577,5215745,1537537,5506049,2858241,2955009,3876097,4513793,7971329,1215745,2620929,3003137,647937,4474113,1025793,3909377,189185,189953,4348417,4063745,595969,730625,2855681,2403329,1131777,3558401,193793,4376065,4760577,3831297,3639809,1459457,1040385,486657,4741121,3031553,1549057,1471489
];
  
let _singleType = false; //true //false
let _scripCode = 60161; //  RCOM-3375873, DLF-136414212, TATASTEEL - 895745
 function App() { 
   const columns = [
      {
        Header: 'Index',
        accessor: 'index', // accessor is the "key" in the data
      },
      {
        Header: 'STOCK',
        accessor: 'scripCode', // accessor is the "key" in the data
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
      //  {
      //   Header: 'VWAP',
      //   accessor: 'vwap',
      // },
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
   const [detailsRows, setDetailsRows] = new useState([]);
   const [rsi40, setRSI40] = new useState(0);

   useEffect(() => {
    let _updateRows = [];

    if(!_singleType){
      getHistoryData(_scrips[rsi40], _updateRows, rsi40);        
    } else {
      getHistoryData(_scripCode, _updateRows, 1);
    }

   }, [tableColumns])

   function getSignal(date, scripCode, close, closeArray, rsi, sma, smaArray, str, volume, rsiArray, volumeArray, superArray, indexInt){
     let _return = null;
     let _isRSISignal = false;
     let _meanVolume = _.mean(volumeArray);
     let _isSuperTrend = getTrendText(indexInt, str,null) === 'Up' ? true : false; //(superArray[superArray.length -1] == 1 && superArray[superArray.length -2] != 1) ? true : false;
     let _isSMA = true;
   
     if(rsi == undefined || sma == undefined){
      return _return;
     }

     _isRSISignal = getRSISignal(rsiArray, indexInt);           


     if(close <= sma){
      return _return;
     }

     if(volume < 1000){
      return _return;
     }

     
     

     if(!_isSuperTrend){
      return _return;
     }
    
    if(!_isRSISignal){
      return _return;
    }
 
    return 'BUY';
   }

   function getTrendText(index, strObj, prevObj){
    let _strText = 'Down';

    if(strObj?.Direction == 1){
      _strText = 'Up';
    }
    
    return _strText;
   }

   async function getHistoryData (scripCode, updateRows, index){
     let _getHistoryURL = `https://kite-connect-nodejs.herokuapp.com/getHistoricalData?instrument_token=${scripCode}`;
     return await axios.get(_getHistoryURL)
     .then(async(response) => {
      
      if(response?.data){
        let _responseArray = response.data;

        // console.log(`#${index}/${_scrips.length} ${scripCode} Rows: `);
        // console.log(_responseArray);
        // console.log('');

        let _prevIndex = 0;
        _responseArray = _.compact(_responseArray);
        let _rsiArray = [];
        let _smaArray = [];
        let _closeArray = [];
        let _volumeArray = [];
        let _superArray = [];
        
        let _tableRowsArray = _.map(_responseArray, (obj, index) => {
          _rsiArray.push(obj.valueRSI);
          _smaArray.push(obj.valueSMA);
          _closeArray.push(obj.close);
          _volumeArray.push(obj.volume);

          if(_volumeArray.length > 10){
            _volumeArray = [obj.volume];
          }

          _superArray.push(obj.valueSTR?.Direction)
          
          let _signal = getSignal(obj.date, scripCode, obj.close, _closeArray, obj.valueRSI,
            obj.valueSMA, _smaArray, obj.valueSTR, obj.volume, _rsiArray, _volumeArray, _superArray, index);

         
          let _prevSuper = _responseArray[index -1];
          if(_signal){
            _prevIndex = obj.index;
            let _row = {
              index: index,
              scripCode: scripCode,
              date: moment(obj.momentDate).format('MMM DD, YYYY - hh:mm'),
              close: obj.close.toFixed(1),
              sma: obj.valueSMA.toFixed(1),        
              // vwap: obj.valueVWAP.toFixed(1),              
              rsi: obj.valueRSI.toFixed(1),              
              vol: obj.volume,              
              sig: _signal ?? '-',
              str: obj.valueSTR ? getTrendText(index, obj.valueSTR) : '-',
              scripCode: scripCode
            }

            // if(_singleType){
            //   return _row;  
            // }
            // return _row;  
            // if(moment(obj.momentDate).year() == moment(new Date()).year() &&
            //   moment(obj.momentDate).month() == moment(new Date()).add(-1, 'month').month()){
            // // if(moment(obj.momentDate).year() == moment(new Date()).year()){
            //   return _row;                       
            // }

            return _row;  

          } else {
            let _row = {
              index: index,
              scripCode: scripCode,
              date: moment(obj.momentDate).format('MMM DD, YYYY - hh:mm'),
              close: obj.close.toFixed(1),
              sma: obj.valueSMA?.toFixed(1),        
              // vwap: obj.valueVWAP?.toFixed(1),              
              rsi: obj.valueRSI?.toFixed(1),              
              vol: obj.volume,              
              sig: '-',
              str: obj.valueSTR ? getTrendText(index, obj.valueSTR, _prevSuper?.valueSTR) : '-'              
            }

            if(_singleType){
              return _row;  
            }
          }

        })

        _tableRowsArray = _.compact(_tableRowsArray);
        updateRows.push(_tableRowsArray);
        console.log(`#${index}/${_scrips.length} updateRows:`, _.flatten(updateRows));
        // console.log(`#${index}/${_scrips.length}`);

        let _currentSuperIndex = index;
          _currentSuperIndex += 1;

          setTableRows(_.sortBy(_.flatten(updateRows), function (obj) {
            return parseInt(obj.index, 10);
        })); 
          
          if(!_singleType && _currentSuperIndex < _scrips.length){
            setTimeout(() => {    
              getHistoryData(_scrips[_currentSuperIndex], _.sortBy(_.flatten(updateRows)), _currentSuperIndex);                  
            }, 500);
          }

       
        
          // setTableRows(_.compact(updateRows));
        }
     })
     .catch((ex) => {
      console.log('');
      console.log('getHistoryData ex');
      console.log(ex);
      console.log('');
     })
   }

  function getRSISignal (rsiArray, index) {
    let _length = 13;
    let _currentRSI = rsiArray[index];
    let _prevRSI = rsiArray[index-1];
    let _rsiArray = rsiArray.length > _length ? rsiArray.slice(rsiArray.length - _length, rsiArray.length) : [];
    let _rsiMean = _.mean(_rsiArray);
    
    
    // 

    if(_.isNaN(_rsiMean)){
      return false;
    }

    if(!_prevRSI){      
      return false;
    }
    
    // console.log(`#${index} | _currentRSI: ${_currentRSI} || _prevRSI: ${_prevRSI} ||| _rsiMean: ${_rsiMean}`);

    if(_prevRSI <= 40 && _currentRSI >= 60){
      return true;
    }

    return false;    
  }


  async function getDaysData (scripCode, date){
    let _getHistoryURL = `https://kite-connect-nodejs.herokuapp.com/getDayData?instrument_token=${scripCode}&todayDate=${date}`;
    console.log(`scripCode: ${scripCode}`);
    console.log(`date: ${date}`);
    console.log(`_getHistoryURL: ${_getHistoryURL}`);
    console.log('');
    

    return await axios.get(_getHistoryURL)
    .then(async(response) => {
     
     if(response?.data){
       let _responseArray = response.data;

       // console.log(`#${index}/${_scrips.length} ${scripCode} Rows: `);
       console.log(_responseArray);
       console.log('');
       

       let _prevIndex = 0;
       _responseArray = _.compact(_responseArray);
       let _rsiArray = [];
       let _smaArray = [];
       let _closeArray = [];
       let _volumeArray = [];
       let _superArray = [];
    let _updateRows = [];
       
       let _tableRowsArray = _.map(_responseArray, (obj, index) => {
         _rsiArray.push(obj.valueRSI);
         _smaArray.push(obj.valueSMA);
         _closeArray.push(obj.close);
         _volumeArray.push(obj.volume);

         if(_volumeArray.length > 10){
           _volumeArray = [obj.volume];
         }

         _superArray.push(obj.valueSTR?.Direction)
         
         let _signal = getSignal(obj.date, scripCode, obj.close, _closeArray, obj.valueRSI,
           obj.valueSMA, _smaArray, obj.valueSTR, obj.volume, _rsiArray, _volumeArray, _superArray, index);

        
         let _prevSuper = _responseArray[index -1];

         

         if(_signal){
           _prevIndex = obj.index;
           let _row = {
             index: index,
             scripCode: scripCode,
             date: moment(obj.momentDate).format('MMM DD, YYYY - hh:mm'),
             close: obj.close.toFixed(1),
             sma: obj.valueSMA.toFixed(1),        
             // vwap: obj.valueVWAP.toFixed(1),              
             rsi: obj.valueRSI.toFixed(1),              
             vol: obj.volume,              
             sig: _signal ?? '-',
             str: obj.valueSTR ? getTrendText(index, obj.valueSTR) : '-',
             scripCode: scripCode
           }

           // if(_singleType){
           //   return _row;  
           // }
           // return _row;  
           // if(moment(obj.momentDate).year() == moment(new Date()).year() &&
           //   moment(obj.momentDate).month() == moment(new Date()).add(-1, 'month').month()){
           // // if(moment(obj.momentDate).year() == moment(new Date()).year()){
           //   return _row;                       
           // }

           return _row;  

         } else {
           let _row = {
             index: index,
             scripCode: scripCode,
             date: moment(obj.momentDate).format('MMM DD, YYYY - hh:mm'),
             close: obj.close.toFixed(1),
             sma: obj.valueSMA?.toFixed(1),        
             // vwap: obj.valueVWAP?.toFixed(1),              
             rsi: obj.valueRSI?.toFixed(1),              
             vol: obj.volume,              
             sig: '-',
             str: obj.valueSTR ? getTrendText(index, obj.valueSTR, _prevSuper?.valueSTR) : '-'              
           }

           return _row;  
         }

       })

       _tableRowsArray = _.compact(_tableRowsArray);
      //  _updateRows.push(_tableRowsArray);
      //  // console.log(`#${index}/${_scrips.length} _updateRows:`, _.flatten(updateRows));
      // //  console.log(`#${index}/${_scrips.length}`);

        setDetailsRows(_.sortBy(_.flatten(_tableRowsArray), function (obj) {
              return parseInt(obj.index, 10);
          })); 
       
         setDetailsRows(_.compact(_tableRowsArray));
       }
    })
    .catch((ex) => {
     console.log('');
     console.log('getHistoryData ex');
     console.log(ex);
     console.log('');
    })
  }

 
   return (
     <div style={{display:'flex'}}>
       <div style={{flex: 1, alignItems:'center', alignContent:'center'}}>
          <GetMainTable columns={columns} tableRowsArray={tableRows} getDaysData={getDaysData}/>
       </div>
       <div style={{flex: 1, alignItems:'center', alignContent:'center'}}>
       <GetDetailsTable columns={columns} tableRowsArray={detailsRows} />
       </div>
        
     </div>
     
   )
 }
  
export default App;