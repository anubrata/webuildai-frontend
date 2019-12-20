import React from "react";
import PropTypes from "prop-types";
import Scenario from "../general/Scenario";

class PairwiseComparison extends React.Component {
  
  sortFn = (a, b) => {
    return a.id - b.id;
  }

  render() {
    console.log(this.props.left.features);
    return (
      <div style={{width:"70%", marginLeft:"15%"}} >
        <div className="scenario_1" id="<%= pc.id %>-1" style={{width:"45%", float:"left", marginRight:"5%"}}>
          <div className="row">
            <Scenario features={this.props.left.features} categoryName={this.props.categoryName} location="A"/>
          </div>
        </div>

        <div className="scenario_2" id="<%=pc.id%>-2" style={{width:"45%",float:"right"}}>
          <div className="row">
            <Scenario features={this.props.right.features} categoryName={this.props.categoryName} location="B"/>
          </div>
        </div>
      </div>
    );
  }
}

PairwiseComparison.propTypes = {
  left: PropTypes.object.isRequired,
  right: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
}

export default PairwiseComparison;