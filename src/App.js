import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { store, persistor } from "./store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import RankedListFlow from './components/ranked_list/RankedListFlow';
import LoadingSpinner from "./components/general/LoadingSpinner";
import FeatureSelection from './components/features/FeatureSelection';
import PairwiseComparisonFlow from './components/pairwise/PairwiseComparisonFlow'
import Overview from './components/general/Overview'
import Login from "./components/general/Login";
import NewFeature from './components/features/NewFeature';
import Header from "./components/general/Header";

const Routes = ({ match, history }) => {
  console.log(history);
  return (
    <React.Fragment>
      <Header history={history} />
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/feature_selection' component={FeatureSelection} />

        <Route path='/work_preference_overview' render={(props) => <Overview {...props} model={"preference"} />} />
        <Route path='/social_preference_overview' render={(props) => <Overview {...props} model={"distribution"} />} />

        <Route path='/pairwise_comparisons' component={PairwiseComparisonFlow} />
        <Route path='/ranked_list' component={RankedListFlow} />
        <Route path='/new_feature' component={NewFeature} />
      </Switch>
    </React.Fragment>
  );
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <BrowserRouter >
            <Routes {...this.props} />
          </BrowserRouter >
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
