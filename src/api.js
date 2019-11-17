import { mockFeatures, mockPairwiseComparisons, mockSamples, mockFeatureWeights, mockOrder, mockModelWeights, mockScores } from "./mocks";
import { TESTING_ADMINS } from "./constants";


const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const PROD_API = {
    createWeight: ({ feature_id, weight, category }) => fetch('/api/v1/features/new_weight', {
      method: 'POST',
      headers,
      body: JSON.stringify({ feature_id, weight, category })
    }).then(response => response.json()),

    getFeatures: ({ category }) => fetch(`/api/v1/features/get_all_features_shuffled?category=${category}`, {
      method: 'GET',
      headers,
    }).then(response => response.json()),

    createFeature: (feat) => fetch('/api/v1/features/new_feature', {
      method: 'POST',
      headers,
      body: JSON.stringify(feat)
    }).then(response => response.json()),

    getParticipantId: () => fetch('/api/v1/sessions/get_id', {
      method: 'GET',
      headers,
    }).then(response => response.json()),

    logout: () => fetch('/api/v1/sessions/logout', {
      method: "POST",
      headers,
    }).then(response => response.json()),

    login: (request) => fetch("/api/v1/sessions/login", {
      method: "POST",
      headers,
      body: JSON.stringify(request),
    }).then(response => response.json()),

    testReset: (id) => {
      if (TESTING_ADMINS.includes(id)) {
        return fetch('/api/v1/testing/reset', {
          method: "POST",
          headers,
        }).then(response => response.json())
      }
      return Promise.resolve({ status: "error"})
    },

    updateChoice: ({ pairwise_id, choice, reason }) => fetch('/api/v1/pairwise_comparisons/update_choice', {
        method: 'POST',
        headers,
        body: JSON.stringify({pairwise_id, choice, reason }),
      }).then(response => response.json()),

    generatePairwiseComparisons: ({ category }) => fetch('/api/v1/pairwise_comparisons/generate_pairwise_comparisons', {
      method: 'POST',
      headers,
      body: JSON.stringify({ category })
    }).then(response => response.json()),

    getRLPairwiseComparisons: ({ category, round }) => fetch(`/api/v1/ranked_list/new?category=${category}&round=${round}`, {
      method: 'GET',
      headers,
    }).then(response => response.json()),

    generateRLSamples: ({ category, round }) => fetch('/api/v1/ranked_list/generate_samples', {
      method: 'POST',
      headers,
      body: JSON.stringify({ category, round })
    }).then(response => response.json()),

    saveHumanWeights: (data) => fetch('/api/v1/ranked_list/save_human_weights', {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }).then(response => response.json()),

    getFeatureWeights: ({ category }) => fetch(`/api/v1/ranked_list/obtain_weights?category=${category}`, {
      method: 'GET',
      headers,
    }).then(response => response.json()),

    evaluateModel: (samples) => fetch("/api/v1/evaluate", {
      method: 'POST',
      headers,
      body: JSON.stringify({ data: samples })
    }).then(response => response.json()),

    trainModel: (data) => fetch(this.props.mlServerUrl + "/train", {
            method: 'POST',
            headers,
            body: JSON.stringify({ data })
        }).then(response => response.json())
};

const MOCK_API = {
  createWeight: ({feature_id, weight, category}) => Promise.resolve({ status: "created weight" }),
  getFeatures: ({ category }) => Promise.resolve(mockFeatures),
  createFeature: (feat) => Promise.resolve({ status: "created feature"}),
  getParticipantId: () => Promise.resolve(2),
  logout: () => Promise.resolve({ status: 'logged out!'}),
  login: (request) => Promise.resolve({ status: "ok" }),
  testReset: (id) => Promise.resolve({ status: 'reset successfully!' }),
  updateChoice: ({ pairwise_id, choice, reason }) => Promise.resolve({ status: 'updated choice'}),
  generatePairwiseComparisons: ({ category }) => Promise.resolve(mockPairwiseComparisons),
  getRLPairwiseComparisons: ({ category, round }) => Promise.resolve(mockPairwiseComparisons),
  generateRLSamples: ({ category, round })  => Promise.resolve(mockSamples),
  saveHumanWeights: (data) => Promise.resolve({ status: 'saved successfully '}),
  getFeatureWeights: ({ category }) => Promise.resolve(mockFeatureWeights),
  evaluateModel: (samples) => Promise.resolve({ order: mockOrder, scores: mockScores }),
  trainModel: (data) => Promise.resolve(mockModelWeights),
};

export const API = MOCK_API; // or PROD_API