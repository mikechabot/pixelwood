import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import get from 'lodash.get';

import DataTable from './DataTable';
import { CheckCircle, TimesCircle } from './util/Icon';

import population from 'domain/population';
import { POPULATION_TABLE_SCHEMA } from 'domain/const/population';

@observer
class CellRenderer extends Component {
  render() {
    switch (this.props.dataKey) {
      case 'hasChildren':   // Fall through
      case 'isAlive':       // Fall through
      case 'isMated':       // Fall through
      case 'isWorker': {
        return (
          <div>
            {
              get(this.props.rowData, this.props.dataKey)
                ? <CheckCircle/>
                : <TimesCircle/>
            }
          </div>
        );
      }
      default: {
        return (
          <div>{get(this.props.rowData, this.props.dataKey)}</div>
        )
      }
    }
  }
}

@observer
class PopulationList extends Component {
  render() {
    return (
      <div>
        <p className="is-size-3">
          <FontAwesomeIcon icon={faUsers}/>
          <strong>&nbsp;Population List ({population.people.length})</strong>
        </p>
        <br />
        <div className="box">
          <DataTable
            tableKey="population-list"
            data={population.people}
            schema={POPULATION_TABLE_SCHEMA}
            cellRenderer={CellRenderer}
          />
        </div>
      </div>
    );
  }
}

CellRenderer.propTypes = {
  rowData: PropTypes.instanceOf(Object).isRequired,
  dataKey: PropTypes.string.isRequired,
}


export default PopulationList;
