import React from "react";
import PropTypes from "prop-types";
import Scenario from "../general/Scenario";

class PairwiseComparison extends React.Component {
  render() {
    return (
      <div style={{width:"70%", marginLeft:"15%"}} >
        <div className="scenario_1" id="<%= pc.id %>-1" style={{width:"45%", float:"left", marginRight:"5%"}}>
          <div className="row">
            <Scenario id={this.props.left.group_id} features={this.props.left.features.sort()} categoryName={this.props.categoryName} location="A"/>
          </div>
        </div>

        <div className="scenario_2" id="<%=pc.id%>-2" style={{width:"45%",float:"right"}}>
          <div className="row">
            <Scenario id={this.props.right.group_id} features={this.props.right.features.sort()} categoryName={this.props.categoryName} location="B"/>
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