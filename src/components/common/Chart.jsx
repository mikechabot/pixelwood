import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import _max from "lodash/max";
import _maxBy from "lodash/maxBy";
import _min from "lodash/min";
import _isEqual from "lodash/isEqual";

import Icon from "./Icon";
import Button from "./Button";
import { Flex } from "./glamorous";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 6,
          suggestedMax: 10
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ]
  },
  tooltips: {
    enabled: false
  },
  responsive: true,
  maintainAspectRatio: false
};

function _getOptions() {
  return options;
}

const STORAGE_KEY = "filter";

const FILTERS = [
  { key: "LAST_YEAR", value: 1, label: "Last Year" },
  { key: "LAST_3_YEARS", value: 3, label: "Last 3 Years" },
  { key: "LAST_5_YEARS", value: 5, label: "Last 5 Years" },
  { key: "LAST_10_YEARS", value: 10, label: "Last 10 Years" },
  { key: "LAST_50_YEARS", value: 50, label: "Last 50 Years" },
  { key: "LAST_100_YEARS", value: 100, label: "Last 100 Years" }
];

function _maxYearFilter(maxYear, filterValue, entry) {
  return entry.year > maxYear - filterValue;
}

function _getX(entry, index) {
  return entry.x;
}

function _getY(entry, index) {
  return entry.y;
}

function _getData(data, filter, map) {
  return data.filter(filter).map(map);
}

const DEFAULT_DATASET = {
  fill: false,
  lineTension: 0.5,
  pointRadius: 0
};

function _getDataset(data, options) {
  const dataset = DEFAULT_DATASET;

  const { legend, theme, yearFilter } = options;

  dataset.label = legend;
  dataset.backgroundColor = `${theme || "#209cee"}`;
  dataset.borderColor = `${theme || "#209cee"}`;
  dataset.data = _getData(data, yearFilter, _getY);

  return [dataset];
}

function _getMax(chartData, yOffset) {
  return chartData.datasets[0].data.length !== 0
    ? _max(chartData.datasets[0].data) + yOffset
    : 10;
}

function _setSuggestedMaxOption(options, max) {
  options.scales.yAxes[0].ticks.suggestedMax = max;
}

function _setStepSizeOption(options, max) {
  let stepSize = Math.ceil(parseInt(max / 6, 10) / 100) * 100;
  if (max < 50) {
    stepSize = 5;
  } else if (max <= 100) {
    stepSize = 15;
  }
  options.scales.yAxes[0].ticks.stepSize = stepSize;
}

class Chart extends React.Component {
  constructor(props) {
    super(props);

    let filter = FILTERS[1];
    const savedState = window.localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      filter = JSON.parse(savedState).filter;
    }

    this.state = {
      filter: filter
    };
  }
  componentDidMount() {
    const savedState = window.localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const filter = JSON.parse(savedState).filter;
      this.setState({ filter });
    }
  }
  componentWillUnmount() {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ filter: this.state.filter })
    );
  }
  render() {
    const {
      height,
      width,
      label,
      legend,
      dataset,
      theme,
      yOffset
    } = this.props;

    if (!dataset || dataset.length === 0)
      return (
        <Flex height={height} width={500} hAlignCenter>
          <Flex column hAlignCenter vAligCenter>
            <div className="fa-stack fa-lg">
              <i className="fa fa-line-chart fa-stack-1x" />
              <i className="fa fa-ban fa-stack-2x has-text-danger fa-rotate-90" />
            </div>
            <div className="has-text-primary-dark">No data captured. Start playing!</div>
          </Flex>
        </Flex>
      );

    const yearFilter = this._getYearFilter(dataset);

    const chartData = {};

    chartData.labels = _getData(dataset, yearFilter, _getX);
    chartData.datasets = _getDataset(dataset, { legend, theme, yearFilter });

    let max = _getMax(chartData, yOffset);

    const options = _getOptions();
    _setSuggestedMaxOption(options, max);
    _setStepSizeOption(options, max);

    return (
      <div style={{ height, width }} className="primary-font">
        {this._renderFilters()}
        <h2>{label}</h2>
        <Line data={chartData} options={options} />
      </div>
    );
  }

  _renderFilters() {
    return (
      <Flex hAlignCenter flexWrap="wrap">
        {FILTERS.map((filter, index) => {
          return (
            <Button
              onClick={() => this.setState({ filter: filter })}
              key={index}
              small
              className={`is-text primary-font ${
                _isEqual(this.state.filter, filter) ? " is-active is-info" : ""
              }`}
            >
              {filter.label}
            </Button>
          );
        })}
      </Flex>
    );
  }

  _getYearFilter(dataset) {
    const maxYear = _maxBy(dataset, e => e.year).year;
    return _maxYearFilter.bind(this, maxYear, this.state.filter.value);
  }
}

Chart.propTypes = {
  label: PropTypes.string,
  legend: PropTypes.string.isRequired,
  dataset: PropTypes.array.isRequired,
  theme: PropTypes.string
};

export default Chart;
