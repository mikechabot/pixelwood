import React, { Component } from 'react';
import { observer } from 'mobx-react';
import get from 'lodash.get';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faUsers } from '@fortawesome/free-solid-svg-icons';

import Population from 'domain/population';

@observer
class PopulationList extends Component {

  population = new Population();

  getMate(person) {
    if (person.mateId) {
      return this.population.people
        .find(mate => person.id === mate.mateId);
    }
  }

  render() {
    return (
      <section className="section">
        <p className="is-size-3">
          <FontAwesomeIcon icon={faUsers}/>
          <strong>&nbsp;Population List ({this.population.people.length})</strong>
        </p>
        <table className="table is-striped">
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>isWorker?</th>
            <th>isAlive?</th>
            <th>isMated?</th>
            <th>Mate</th>
            <th>hasChildren</th>
            <th>Number of Children</th>
          </tr>
          </thead>
          <tbody>
          {
            this.population.people
              .map((citizen, index) => (
                <tr key={citizen.id}>
                  <td>{index}</td>
                  <td>{citizen.fullName}</td>
                  <td>{citizen.age}</td>
                  <td>{citizen.sex}</td>
                  <td>{citizen.isWorker ? <CheckCircle/> : <TimesCircle/>}</td>
                  <td>{citizen.isAlive ? <CheckCircle/> : <TimesCircle/>}</td>
                  <td>{citizen.isMated ? <CheckCircle/> : <TimesCircle/>}</td>
                  <td>{get(citizen, 'mate.fullName')}</td>
                  <td>{get(citizen, 'family.hasChildren') ? <CheckCircle/> : <TimesCircle/>}</td>
                  <td>{get(citizen, 'family.children.length')}</td>
                </tr>
              ))
          }
          </tbody>
        </table>
      </section>
    );
  }
}

const CheckCircle = () => (<FontAwesomeIcon className="has-text-success" icon={faCheckCircle}/>);
const TimesCircle = () => (<FontAwesomeIcon className="has-text-danger" icon={faTimesCircle}/>);

export default PopulationList;
