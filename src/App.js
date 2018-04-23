import React from 'react';
import { Flex } from './components/common/glamorous/';
import Champion from './components/Champion';

const NUMBER_OF_CHAMPIONS = 4;

class App extends React.Component {
    render() {
        return (
            <div className="section">
                <Flex flexWrap="wrap" flex={1} width="100%">
                    {this._renderChampions()}
                </Flex>
            </div>
        );
    }

    _renderChampions() {
        let champions = [];
        for (let i = 0; i < NUMBER_OF_CHAMPIONS; i++) {
            champions.push(<Champion key={i} id={`champ-${i}`} />);
        }
        return champions;
    }
}

export default App;
