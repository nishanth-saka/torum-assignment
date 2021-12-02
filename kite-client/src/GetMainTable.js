import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import StickyTable from "react-sticky-table-thead";

export const GetMainTable = (props) => {
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns:props?.columns, data:props?.tableRowsArray});

    return(
      <StickyTable height={'90%'}width={'100%'}> 

        <table {...getTableProps()} style={{ 
          width: '100%',
          height: '100px',
          overflow:'scroll',
        }}>
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
                      onClick={(e) => {
                        let _stockCode = row?.original?.scripCode;
                        let _dateString = row?.original?.date.split(' - ')[0];
                        let _date = moment(_dateString, 'MMM DD, YYYY').add(-1, 'days').format('YYYY-MM-DD');

                        if(_stockCode && moment(_date).isValid()){
                          console.log(`ON SELECT: _stockCode: ${_stockCode} ~ _dateString: ${_date}`);                          
                          props.getDaysData(_stockCode, _date)
                        }
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
    )
  }