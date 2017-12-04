import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import _orderBy from "lodash/orderBy";

import { Flex } from "../common/glamorous/index";
import Tab from "../common/tabs/Tab";
import Tabs from "../common/tabs/Tabs";
import MedBoardImg from "../../assets/images/medium-board.png";

class PopulationList extends React.Component {
  render() {
    const { population } = this.props;

    const census = population.getLivingPopulation();

    return (
      <Flex
        column
        zIndex={1000}
        width={680}
        height={475}
        className="primary-font"
        background={`url(${MedBoardImg}) no-repeat`}
      >
        <ReactTooltip html={true} />
        <Flex flex={0} padding="35px 0 0 35px">
          <div className="is-size-4 has-text-primary-dark">Population</div>
        </Flex>
        <Flex flex={1} margin="15px 30px 40px 20px">
          <Tabs stacked id="population-tabs" defaultActiveKey="all">
            <Tab eventKey="all" label="Everyone" icon="custom-population">
              {this._renderPopulationTab(census)}
            </Tab>
            <Tab eventKey="fam" label="Families" icon="custom-family">
              {this._renderFamiliesTab(population)}
            </Tab>
          </Tabs>
        </Flex>
      </Flex>
    );
  }

  _renderPopulationTab(census) {
    return (
      <Flex column height="100%" overflow="hidden">
        <Flex flex={0}>
          <table
            className="table has-text-black is-size-6"
            style={{ width: "100%", tableLayout: "fixed", marginBottom: 0, backgroundColor: 'inherit' }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Profession</th>
              </tr>
            </thead>
          </table>
        </Flex>
        <Flex flex={1} height="100%" overflow="auto">
          <table
            className="table has-text-black is-size-7"
            style={{ width: "100%", height: '100%', tableLayout: "fixed", backgroundColor: 'inherit' }}
          >
            <tbody>
              {_orderBy(census, ["age"], ["desc"]).map((person, index) => (
                <tr key={index}>
                  <td>{person.name}</td>
                  <td>{person.age}</td>
                  <td>{person.sex}</td>
                  <td>{person.profession}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Flex>
      </Flex>
    );
  }

  _renderFamiliesTab(population) {
    const families = population.getFamilies();
    return (
      <Flex column height="100%" overflow="hidden">
        <Flex flex={0}>
          <table
            className="table has-text-black is-size-6"
            style={{ width: "100%", tableLayout: "fixed", marginBottom: 0, backgroundColor: 'inherit' }}
          >
            <thead>
              <tr>
                <th>Parent 1</th>
                <th>Parent 2</th>
                <th>Children</th>
              </tr>
            </thead>
          </table>
        </Flex>
        <Flex flex={1} height="100%" overflow="auto">
          <table
            className="table has-text-black is-size-7"
            style={{ width: "100%", height: '100%', tableLayout: "fixed", backgroundColor: 'inherit' }}
          >
            <tbody>
              {families.map((family, index) => {
                const mate1 = population
                  .getPopulation()
                  .find(p => p.id === family.mateId1);
                const mate2 = population
                  .getPopulation()
                  .find(p => p.id === family.mateId2);

                const female = [mate1, mate2].find(p => p.sex === "Female");
                let children = [];
                if (female) {
                  children = female.children || [];
                }
                return (
                  <tr key={index}>
                    <td>
                      {mate1.name} ({mate1.age})
                    </td>
                    <td>
                      {mate2.name} ({mate2.age})
                    </td>
                    <td>
                      {children.map((child, childIndex) => (
                        <div key={childIndex}>
                          {child.name} ({child.age})
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Flex>
      </Flex>
    );
  }
}

PopulationList.propTypes = {
  population: PropTypes.object.isRequired
};

export default PopulationList;
