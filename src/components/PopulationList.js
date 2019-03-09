import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import get from 'lodash.get';

import DataTable from './DataTable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faUsers } from '@fortawesome/free-solid-svg-icons';

import population from 'domain/population';
import { POPULATION_TABLE_SCHEMA } from 'domain/const/population';

const CheckCircle = () => (<FontAwesomeIcon className="has-text-success" icon={faCheckCircle}/>);
const TimesCircle = () => (<FontAwesomeIcon className="has-text-danger" icon={faTimesCircle}/>);

@observer
class CellRenderer extends Component {
  render() {
    switch (this.props.dataKey) {
      case 'hasChildren':
      case 'isAlive':
      case 'isMated':
      case 'isWorker': {
        return (
          <div>
            {
              get(this.props.rowData, this.props.dataKey)
                ? <CheckCircle/>
                : <TimesCircle/>
            }
          </div>
        )
        break;
      }
      default: {
        return (
          <div>{get(this.props.rowData, this.props.dataKey)}</div>
        )
      }
    }
    return (
      <div>Unmapped dataKey</div>
    );
  }
}

@observer
class PopulationList extends Component {
  render() {
    return (
      <section className="section">
        <p className="is-size-3">
          <FontAwesomeIcon icon={faUsers}/>
          <strong>&nbsp;Population List ({population.people.length})</strong>
        </p>
        <DataTable
          tableKey="population-list"
          data={population.people}
          schema={POPULATION_TABLE_SCHEMA}
          cellRenderer={CellRenderer}
        />
      </section>
    );
  }
}

CellRenderer.propTypes = {
  rowData: PropTypes.instanceOf(Object).isRequired,
  dataKey: PropTypes.string.isRequired,
}


export default PopulationList;
