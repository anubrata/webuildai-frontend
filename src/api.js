import { mockFeatures, mockPairwiseComparisons, mockSamples, mockFeatureWeights, mockOrder, mockModelWeights, mockScores } from "./mocks";
import { TESTING_ADMINS, HEADERS } from "./constants";

const API_URL = 'http://localhost:5000';
// const session = 1;

const headers = HEADERS

const PROD_API = {
    // NEW: GOOD
    getFeatures: (category, session) => fetch(`${API_URL}/get_features_for_user?category=${category}&session=${session}`, {
      method: 'GET',
      headers,
    }).then(response => response.json()),

    // NEW: GOOD
    createFeature: (feature, session) => fetch(`${API_URL}/new_feature`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ feature, session })
    }).then(response => response.json()),

    // NEW: GOOD
    saveFeatureWeights: (new_features, feature_weights, session) => fetch(`${API_URL}/save_feature_weights`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ new_features, feature_weights, session })
    }).then(response => response.json()),

    // NEW: GOOD
    generatePairwiseComparisons: (category, num_comps, session) => fetch(`${API_URL}/generate_pairwise_comparisons`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ category, num_comps, session })
    }).then(response => response.json()),

    // NEW: GOOD
    updateChoice: ({ pairwise_id, choice, reason }) => fetch(`${API_URL}/update_choice`, {
        method: 'POST',
        headers,
        body: JSON.stringify({pairwise_id, choice, reason }),
      }).then(response => response.json()),

    // THE REST OF THESE ARE UNTOUCHED + need to be modified
    createWeight: ({ feature_id, weight, category }) => fetch(`${API_URL}/features/new_weight`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ feature_id, weight, category })
    }).then(response => response.json()),

    getParticipantId: () => fetch(`${API_URL}/sessions/get_id`, {
      method: 'GET',
      headers,
    }).then(response => response.json()),

    logout: () => fetch(`${API_URL}/sessions/logout`, {
      method: "POST",
      headers,
    }).then(response => response.json()),

    login: (request) => fetch(`${API_URL}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify(request),
    }).then(response => response.json()),

    testReset: (id) => {
      if (TESTING_ADMINS.includes(id)) {
        return fetch(`${API_URL}/testing/reset`, {
          method: "POST",
          headers,
        }).then(response => response.json())
      }
      return Promise.resolve({ status: "error"})
    },

    /* These functions have been modified */
    getRLPairwiseComparisons: ({ category, round, session }) => fetch(`${API_URL}/ranked_list/new?category=${category}&round=${round}&session=${session}`, {
      method: 'GET',
      headers,
    }).then(response => response.json()),

    generateRLSamples: ({ category, round, session }) => fetch(`${API_URL}/ranked_list/generate_samples`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ category, round, session })
    }).then(response => response.json()),

    saveHumanWeights: (data, session) => fetch(`${API_URL}/ranked_list/save_human_weights?session=${session}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }).then(response => response.json()),

    getFeatureWeights: (category, session) => fetch(`${API_URL}/ranked_list/obtain_weights?category=${category}&session=${session}`, {
      method: 'GET',
      headers,
    }).then(response => response.json()),

    evaluateModel: (samples, session) => fetch(`${API_URL}/ranked_list/evaluate?session_id=${session}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data: samples })
    }).then(response => response.json()),

    trainModel: (data, session) => fetch(`${API_URL}/ranked_list/train?session=${session}`, {
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

// export const API = MOCK_API;
export const API = PROD_API;