import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ACTION_TYPES } from "../../store";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CircleOne from '../..//images/numbers-01.png';
import CircleTwo from '../../images/numbers-02.png';
import CircleThree from '../../images/numbers-03.png';
import CircleFour from '../../images/numbers-04.png';
import CircleFive from '../../images/numbers-05.png';
import DndIndicator from '../../images/dndIndicator.png';
import { API } from "../../api";
// import Scenario from "./Scenario";

class RLView extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      rankedList: [],
      changed: false,
      featureWeights: [],
      model_weights: [],
    }
  }

  componentDidMount() {
    const rl = [...this.props.rankedList];
    // console.log(this.props);
    const mw = [...this.props.model_weights]
    rl.sort((a, b) => a.model_rank - b.model_rank);
    this.setState({ rankedList: rl, model_weights: mw });
    this.getFeatureWeights();
  }

  getFeatureWeights = () => {
    API.getFeatureWeights(this.props.category, this.props.sessionId)
      .then((data) => {
        this.setState({ featureWeights: data.featureWeights});
      })
      .catch(error => console.log(error))
  }

  saveRankedList = (rankedList, callback) => {
    const data = {
      rankedList,
      round: this.props.round + 1,
      ranklistId: this.props.ranklistId,
      category: this.props.category,
    };
    API.saveHumanWeights(data)
    .then(response => response.json())
      .then(() => {
        if (callback) callback();
      })
      .catch(error => console.log(error))
  }

  onSubmit = () => {
    const newRl = this.state.rankedList.map((rl, i) => ({ ...rl, human_rank: i+1 }));
    this.props.setRankedList(newRl);
    let callback;
    if (this.props.round < 2) {
      // do another round of tuning
      callback = () => {
        // this.props.setPairwiseComparisons([...this.props.pairwiseComparisons] + JSON.parse(data.pairwiseComparisons));
        this.props.setRound(this.props.round + 1);
        this.props.history.push('new');
      }
    } else {
      // end the interaction: either move to social or reset
      if (this.props.category === 'request') {
        callback = () => {
          this.props.setRound(0);
          this.props.setCategory('driver');
          this.props.history.push('/social_preference_overview');
        }
      } else {
        callback = () => {
          this.endFlow(true)
        }
      }
    }
    this.saveRankedList(newRl, callback);
  }

  endFlow = (skipAutofill) => {
    console.log("skip", skipAutofill);
    if (!skipAutofill) {
      console.log('saving.....')
      const newRl = this.state.rankedList.map((rl) => ({ ...rl, human_rank: rl.model_rank }));
      this.props.setRankedList(newRl);
      this.saveRankedList(newRl);
    }
    if (this.props.category === 'request') {
      this.props.setRound(0);
      this.props.setCategory('driver');
      this.props.history.push('/social_preference_overview');
    } else {
      this.props.endFlow();
      this.props.history.push('done')
    }
  }

  renderFeatureWeightsFromModel = (index) => {
    return this.state.model_weights.map((weight, i) => {
      if (index === i) {
      return (
              <div key={`model-weight-${index}`}>
                <p>Model weight: {weight.toFixed(2)}</p>
              </div>
              );
      }
    });
  }

  renderWeights = () => {
    return this.state.featureWeights.map((feature, i) => {
      return (
              <div key={`${feature[0]}_feature_weight`}>
                <p className = "feature_weight_text">
                  Feature Name: {feature[0]} <br />
                  Weight: {feature[1]}% <br />
                </p>
                {this.renderFeatureWeightsFromModel(i)}
              </div>
              );
    });
  }

  renderFeatures = (rle) => {
    return Object.keys(rle.features).map((i, feat) => {
        return (
          <div key={`${rle.id}_feature_${i}`}>
            <p className="feature-value"> {feat.value} </p>
            {feat.unit && <p className="feature-value"> &nbsp;{feat.unit} </p>} 
          </div>
        );
    });
  }

  renderScore = (rle) => {

    return (
            <div key={`${rle.id}_rle_score`}>
              <br />
              <p>
                Model's score: {rle.score}
              </p>

            </div>
    )
  }

  renderFeatureNames = () => {
    if (this.state.rankedList.length === 0) {
      return <div></div>;
    }
    const elem = this.state.rankedList[0];
    return Object.keys(elem).map((i, feat) => {
        return (
          <div key={`${elem.id}_feature_${i}`}>
            <p className="rl-feature-name"> {feat.name} </p>
          </div>

        );
    });
  }

  renderScenarios = () => {
    return this.state.rankedList.map((rle, i) => {
      return (
        <Draggable draggableId={rle.id} index={i} key={rle.id}>
          {provided => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="rl-col">
              <img className="dnd-indicator"src={DndIndicator} />
              <div className="card default">
                <div className="card-content" style={{padding: "14px"}}>
                  <h5 className="pc-header">Scenario #{rle.id}</h5>
                  {this.renderFeatures(rle)}
                  {this.renderScore(rle)}
                </div>
              </div>
            </div>
          )}
        </Draggable>
      );
    });
  }

  renderRLHeader = () => {
    return (
      <div className="rl-row">
        <div className="rl-feature-col">
          <h3></h3>
        </div>
        <div className="rl-col">
          <h3 className="rl-header">Most Preferable</h3>
          <img className="rl-header-cirlce" src={CircleOne} />
        </div>
        <div className="rl-col">
          <h3 className="rl-header">Preferable</h3>
          <img className="rl-header-cirlce" src={CircleTwo} />
        </div>
        <div className="rl-col">
          <h3 className="rl-header">Neutral</h3>
          <img className="rl-header-cirlce" src={CircleThree} />
        </div>
        <div className="rl-col">
          <h3 className="rl-header">Not Preferable</h3>
          <img className="rl-header-cirlce" src={CircleFour} />
        </div>
        <div className="rl-col">
          <h3 className="rl-header">Least Preferable</h3>
          <img className="rl-header-cirlce" src={CircleFive} />
        </div>
      </div>
    );
  }

  onDragEnd = (e) => {
    const source = e.source;
    const dest = e.destination;
    if (!source || !dest) {
      return;
    }
    const rl = [...this.state.rankedList];
    rl.splice(dest.index, 0, rl.splice(source.index, 1)[0]);
    this.setState({rankedList: rl, changed: true });
  }

  render() {
    if (this.props.round == 2) {
      var description = <p className="about-text">
                        This is a list of scenarios that the AI has ranked from most preferable to least preferable.
                        We are done with the tuning round at this point, <b>please review and press next to go onto the
                        next part of the study.</b>
                        </p>;
      var title = <h3 className="title">{this.props.category === 'request' ? 'Work Preference ' : 'Work Distribution '} Model Round 3</h3>;
      var noChangesNeededButton = <a></a>;
      var submitButton = <a className="btn" id="submit_btn" onClick={this.onSubmit}> Next </a>;

      } else {
      var description = <p className="about-text">
                        This is a list of scenarios that the AI has ranked from most preferable to least preferable.
                        Please go through the list and see if the algorithm ranked these scenarios correctly. If not,
                        <b> please drag and drop the scenarios into the correct rank. </b>
                      </p>;
      var submitButton = <a className="btn" id="submit_btn" onClick={this.onSubmit} disabled={!this.state.changed} > Submit Changes </a>;
      var noChangesNeededButton = <a className="btn" id="lgtm_btn" onClick={() => this.endFlow(false)}> No Changes Needed </a>;
    }

    if (this.props.round != 2) {
      var title = <h3 className="title">{this.props.category === 'request' ? 'Work Preference ' : 'Work Distribution '} Model</h3>;
    }

    if (this.props.round == 1) {
      var description = <p className="about-text">
                      Using your input in the previous round, we have tuned your algorithm and has given it 5 new scenarios
                      that the AI has ranked from most preferable to least preferable. Please go through the list and see
                      if the algorithm ranked these scenarios correctly.
                      <b> This will be the last tuning round before we show you your model. </b>
                    </p>
      var title = <h3 className="title">{this.props.category === 'request' ? 'Work Preference ' : 'Work Distribution '} Model Round 2</h3>;
    };
    return (
      <div id="rl-page">
        {title}
        <hr className="feature-hr" />
        {description}

        <div className="feature_weights container">
          <div className="row">
            {this.renderWeights()}
          </div>
        </div>

        <DragDropContext onDragEnd={this.onDragEnd} isDragDisabled={this.props.round > 1}>
          <div>
            {this.renderRLHeader()}
              <Droppable droppableId="row" direction="horizontal" isDropDisabled={this.props.round > 1} >
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="rl-row">
                      <div className="rl-feature-col">
                        {this.renderFeatureNames()}
                      </div>
                      {this.renderScenarios()}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
          </div>
          <div className="row">
            {submitButton}
            {noChangesNeededButton}
          </div>
        </DragDropContext>
      </div >
    );
  }
}

RLView.propTypes = {
  category: PropTypes.string.isRequired,
  round: PropTypes.number.isRequired,
  rankedList: PropTypes.array.isRequired,
  ranklistId: PropTypes.number.isRequired,
  setRankedList: PropTypes.func.isRequired,
  setRound: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  endFlow: PropTypes.func.isRequired,
  featureWeights: PropTypes.object.isRequired,
  setFeatureWeights: PropTypes.func.isRequired,
};

const mapStoreStateToProps = (storeState, givenProps) => {
  return {
    ...givenProps,
    category: storeState.category,
    round: storeState.round,
    rankedList: storeState.rankedList,
    ranklistId: storeState.ranklistId,
    pairwiseComparisons: storeState.pairwiseComparisons,
    featureWeights: storeState.featureWeights,
    model_weights: storeState.model_weights,
    sessionId: storeState.sessionId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRankedList: (payload) => dispatch({ type: ACTION_TYPES.SET_RANKED_LIST, payload }),
    setRound: (payload) => dispatch({ type: ACTION_TYPES.SET_ROUND, payload }),
    setCategory: (payload) => dispatch({ type: ACTION_TYPES.SET_CATEGORY, payload }),
    setPairwiseComparisons: (payload) => dispatch({ type: ACTION_TYPES.SET_PAIRWISE_COMPARISONS, payload }),
    endFlow: (payload) => dispatch({ type: ACTION_TYPES.END_RL_FLOW, payload }),
    setFeatureWeights: (payload) => dispatch({type: ACTION_TYPES.SET_FEATURE_WEIGHTS, payload}),
  }
}

const RankedListView = connect(mapStoreStateToProps, mapDispatchToProps)(RLView);
export default RankedListView;