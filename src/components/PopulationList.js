import React, { Component } from 'react';
import { observer } from 'mobx-react';
import get from 'lodash.get';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faUsers } from '@fortawesome/free-solid-svg-icons';

import Population from 'domain/population';
import { POPULATION_TABLE_SCHEMA } from 'domain/const/population';

import DataTable from './DataTable';

const cellRenderer = (rowData, dataKey) => {
  const value = get(rowData, dataKey)

  let displayValue;
  switch(dataKey) {
    case 'family.hasChildren':
    case 'isAlive':
    case 'isMated':
    case 'isWorker': {
      displayValue = value ? <CheckCircle/> : <TimesCircle/>
      break;
    }
    default: {
      displayValue = value;
    }
  }
  return (
    <div>{displayValue}</div>
  )
}

@observer
class PopulationList extends Component {

  population = new Population();

  render() {
    return (
      <section className="section">
        <p className="is-size-3">
          <FontAwesomeIcon icon={faUsers}/>
          <strong>&nbsp;Population List ({this.population.people.length})</strong>
        </p>
        <DataTable
          tableKey="population-list"
          data={this.population.people}
          schema={POPULATION_TABLE_SCHEMA}
          cellRenderer={cellRenderer}
        />
      </section>
    );
  }
}

const CheckCircle = () => (<FontAwesomeIcon className="has-text-success" icon={faCheckCircle}/>);
const TimesCircle = () => (<FontAwesomeIcon className="has-text-danger" icon={faTimesCircle}/>);

export default PopulationList;
