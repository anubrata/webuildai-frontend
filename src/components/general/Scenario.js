import React from "react";
import PropTypes from "prop-types";

class Scenario extends React.Component {

    objToArray = (obj) => {
        var sortedArray = [];
        console.log("Object: ", obj);
        for (let i in obj) {
            console.log(i);
            let feat = obj[i];
            sortedArray.push([i, feat]);
        }

        return sortedArray;
    }

    renderFeatures = () => {

    var sorted_features = [...this.objToArray(this.props.features)].sort((a, b) => {
      return a[0] - b[0];
    });

    console.log("Sorted features: ", sorted_features);

    return sorted_features.map((feature) => {
      return (
        <div key={feature[0]}>
          <div>
            <p className="pc-feature-icon"> {feature[1].icon} </p>
            <p className="feature-value"> {feature[1].value} </p>
            {feature[1].unit && <p className="feature-value"> &nbsp;{feature[1].unit} </p>}
          </div>
          <p className="feature-name" style={{marginBottom:"7%", marginTop:"2%"}}>  {feature[1].name} </p>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="card default">
        <div className="card-content">
          <h5 className="pc-header" style={{textAlign: "center", marginBottom:"7%"}}>{this.props.categoryName} {this.props.location}</h5>
          {this.renderFeatures()}
        </div>
      </div>
    )
  }
}

Scenario.propTypes = {
  features: PropTypes.any.isRequired,
}

export default Scenario;