import React from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';

import 'react-virtualized/styles.css';

const DEFAULT_ROW_HEIGHT = 30;
const HEADER_HEIGHT = 35;

const DataTable = ({
  data,
  schema,
  tableKey,
  cellRenderer
}) => {
  const Component = cellRenderer;
  return (
    <AutoSizer disableHeight>
      {({width}) => (
        <Table
          ref={tableKey}
          headerHeight={HEADER_HEIGHT}
          height={345}
          noRowsRenderer={() => <div>Population is empty</div>}
          rowHeight={DEFAULT_ROW_HEIGHT}
          rowGetter={({index}) => data[index]}
          rowCount={data.length}
          width={width}>
          {
            schema.map(column => (
              <Column
                key={column.propKey}
                label={column.label}
                dataKey={column.propKey}
                width={column.width || 200}
                cellRenderer={({rowData, dataKey}) => <Component rowData={rowData} dataKey={dataKey}/>}
              />
            ))
          }
        </Table>
      )}
    </AutoSizer>
  )
}


export default DataTable;
