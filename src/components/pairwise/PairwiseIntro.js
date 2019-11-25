import React from "react";
import PropTypes from "prop-types";
import PersonalPref from "../../images/Personal_Pref.png";
import SocialRanking from "../../images/Social_Ranking.png";
import { connect } from "react-redux";
import { ACTION_TYPES } from '../../store';
import LoadingSpinner from '../general/LoadingSpinner';
import { API } from "../../api";
import styles from '../../styles/PairwiseIntro.module.css';

class PWIntro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  createAndFetchPairwiseComparisons = () => {
      API.generatePairwiseComparisons({ category: this.props.category })
      .then((data) => {
        this.setState({loading: false});
        console.log('generated pairwise', data);
        // data.isAdmin, data.pairwiseComparisons
        this.props.setPairwiseComparisons(data.pairwiseComparisons);
        this.props.setParticipantId(data.participantId);
        this.props.setMLServerUrl(data.mlServerUrl);
      })
      .then(() => {
        this.props.history.push('choose');
      })
      .catch(error => console.log(error))
  }

  onClick = () => {
    this.setState({loading: true});
    this.createAndFetchPairwiseComparisons();
  }

  renderSelectedFeatures = () => {
    const features = this.props.features.map((feature, i) => (
      <p className="scenario-names" key={i}>{feature.name}</p>
    ));
    return (<div>{features}</div>);
  }

  render() {
    let part = "";
    let partDescription = "";
    let image = PersonalPref;
    if (this.props.category === 'request') {
      part = <p className={styles.subheader}> Part 1. Personal Preference </p>;
      partDescription = <p className={styles.text}>
                          Please assume that the algorithm notifies you of two potential requests.
                          <b> Please choose which request you would prefer the algorithm to match you with. </b>
                          The information below are features you believe that algorithm should consider.
                        </p>
    } else {
      part = <p className={styles.subheader}> Part 2. Social Ranking </p>;
      image = SocialRanking;
      partDescription = <p className={styles.text}>
                          Please assume that you are the algorithm and you have to assign a request to a driver.
                          <b> Please choose which driver you would prefer the algorithm to give the request. </b>
                          The information below are features you believe that algorithm should consider.
                        </p>
    }

    return (
      <div id="pg_1" >
        <p className={styles.title}>Training Your {this.props.category === 'request' ? "Work Preference" : "Work Distribution"} Model</p>
        <hr />
        <br />
        <p className={styles.text}>
          We are now going to give you some sets of hypothetical scenarios based on your chosen features.
          Each set will have two options, and it is up to your discretion to choose which is the better option.
          Your decisions will be used to help train our own matching algorithm.
        </p>
        <br /> <br /> <br />
        <br /> <br /> <br />
        <div className={styles.imgBlock} >
          <div className={styles.textContainer} >
            {part}
            {partDescription}
          </div>
          <img src={image} className={styles.img} />
        </div>
        <p className={styles.subheader}>Scenarios will include: </p>
        {this.renderSelectedFeatures()}
        {
          this.state.loading ? <LoadingSpinner /> : (
            <a className={styles.nextBtn} id="start_btn_1" onClick={this.onClick} style={{ marginBottom:"5%", }}> Start </a>
          )
        }
      </div>
    );
  }
}

PWIntro.propTypes = {
  history: PropTypes.any.isRequired,
  features: PropTypes.any.isRequired,
  category: PropTypes.string.isRequired,
};

const mapStoreStateToProps = (state, givenProps) => {
  return {
    history: givenProps.history,
    features: state.selectedFeatures,
    category: state.category,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPairwiseComparisons: (payload) => dispatch({ type: ACTION_TYPES.SET_PAIRWISE_COMPARISONS, payload }),
    setParticipantId: (payload) => dispatch({ type: ACTION_TYPES.SET_PARTICIPANT_ID, payload }),
    setMLServerUrl: (payload) => dispatch({ type: ACTION_TYPES.SET_ML_SERVER_URL, payload }),
  };
}

const PairwiseIntro = connect(mapStoreStateToProps, mapDispatchToProps)(PWIntro);

export default PairwiseIntro;