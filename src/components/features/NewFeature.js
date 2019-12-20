import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { ACTION_TYPES } from '../../store';
import ContinuousFeatureModal from './ContinuousFeatureModal';
import CategoricalFeatureModal from './CategoricalFeatureModal';
import { API } from '../../api';

class NewFeat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowForm: false,
      shouldShowContinuous: false,
    }
  }

  componentWillMount() {
    API.getParticipantId().then(data => {
      console.log("received:", data);
      this.props.setParticipantId(data.participantId);
    })
  }

  createNewFeat = (feat, isCategorical) => {
    feat = { ...feat, cat: isCategorical ? 1 : 0 };
    // this will also update the weight
    console.log(feat);
    API.createFeature(feat)
    .then((data) => {
      console.log('made feature', data);
      // TODO: can use feature data here
    })
    .catch(e => console.log(e))
  }

  onSubmit = (isCategorical) => {
    return (newFeature) => {
      this.createNewFeat(isCategorical, newFeature);
      this.onClose();
    }
  }

  onClose = () => {
    this.setState({shouldShowForm: false});
  }

  showCategorical = () => {
    this.setState({shouldShowForm: true, shouldShowContinuous: false});
  }

  showContinuous = () => {
    this.setState({shouldShowForm: true, shouldShowContinuous: true});
  }

  render() {
    return <div>
      <h2>New Feature</h2>
      <button className="btn" onClick={this.showCategorical}>Categorical</button>
      <button className="btn" onClick={this.showContinuous}>Continuous</button>
      {this.state.shouldShowForm && (
        this.state.shouldShowContinuous ? (
          <ContinuousFeatureModal
            onSubmit={this.onSubmit(false)}
            onClose={this.onClose}
            displayDescription={this.props.participantId === 2}
          />
        ) : (
          <CategoricalFeatureModal
            onSubmit={this.onSubmit(true)}
            onClose={this.onClose}
            displayDescription={this.props.participantId === 2}
          />
        )
      )}
    </div>
  }
}

NewFeat.propTypes = {
  setParticipantId: PropTypes.func.isRequired,
  participantId: PropTypes.number.isRequired,
}

const mapStoreStateToProps = (storeState, props) => {
  return {
    participantId: storeState.participantId,
    sessionId: storeState.sessionId,
    ...props
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setParticipantId: (id) => dispatch({type: ACTION_TYPES.SET_PARTICIPANT_ID, payload: id})
  }
}

const NewFeature = connect(mapStoreStateToProps, mapDispatchToProps)(NewFeat);
export default NewFeature;