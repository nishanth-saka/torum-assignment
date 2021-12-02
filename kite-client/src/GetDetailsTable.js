import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import StickyTable from "react-sticky-table-thead";

export const GetDetailsTable = (props) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns:props?.columns, data:props?.tableRowsArray});


    return(
        <StickyTable height={'100%'}width={'100%'}> 

        <table {...getTableProps()} style={{ 
          width: '100%',
          height: '100px',
          overflow:'scroll',
         
        }}>
        <thead>
          {headerGroups?.map((headerGroup, indexInt) => (
            <tr key={indexInt}  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                key={index}
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px #2980b9',
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
          {rows?.map((row, index) => {
            
            return (
              <tr key={index}>
                {Object.keys(row.original).map((cell, index) => {                  
                  return (
                    <td      
                      key={index}                
                      style={{
                        padding: '10px',
                        border: 'solid 1px #9fc5e8',
                        background: row.original?.sig === 'BUY' ? '#fff' : 'lightgray',
                        textAlign:'left',                        
                      }}
                      onClick={(e) => {
                        
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