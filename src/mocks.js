
export const mockFeatures = {
  "features_by_description": {
    "Customer’s Cancellation Rate": [
      {
        "id": 10,
        "name": "Customer's cancellation rate that day",
        "icon": "🚫",
        "weight": 0
      },
      {
        "id": 11,
        "name": "Customer's cancellation rate",
        "icon": "🚫🗓 ",
        "weight": 0
      }
    ],
  "Neighborhood": [
    {
      "id": 30,
      "name": "Drop-off neighborhood preference",
      "icon": "🏘️",
      "weight": 0
    }
  ],
    "Customer Tipping": [
      {
        "id": 6,
        "name": "Customer's average tip perentage",
        "icon": "💰",
        "weight": "38"
      }
    ],
  "Customer Feedback": [
    {
      "id": 8,
      "name": "Average rating customer gave their drivers",
      "icon": "👍🗓 ",
      "weight": 0
    },
    {
      "id": 7,
      "name": "Rating customer gave their most recent driver",
      "icon": "👍",
      "weight": 0
    }
  ],
    "Customer’s App Usage": [
      {
        "id": 9,
        "name": "How long the customer had an account",
        "icon": "📱🗓",
        "weight": 0
      }
    ]
  }
};

export const mockPairwiseComparisons =
{
  "pairwiseComparisons": [
    {
      "choice": null,
      "scenario_1": {
        "features": [
          {
            "feat_id": 30,
            "feat_name": "Drop-off neighborhood preference",
            "feat_unit": "(1: Least preferable - 5: Most preferable)",
            "feat_icon": "🏘️",
            "feat_category": 0,
            "feat_value": "3",
            "feat_type": "continuous",
            "feat_min": 1,
            "feat_max": 5
          },
          {
            "feat_id": 6,
            "feat_name": "Customer's average tip perentage",
            "feat_unit": "%",
            "feat_icon": "💰",
            "feat_category": 0,
            "feat_value": "16",
            "feat_type": "continuous",
            "feat_min": 0,
            "feat_max": 25
          }
        ],
        "group_id": {
          "id": 11397,
          "created_at": "2019-11-17T05:57:09.823Z",
          "updated_at": "2019-11-17T05:57:09.823Z"
        }
      },
      "scenario_2": {
        "features": [
          {
            "feat_id": 30,
            "feat_name": "Drop-off neighborhood preference",
            "feat_unit": "(1: Least preferable - 5: Most preferable)",
            "feat_icon": "🏘️",
            "feat_category": 0,
            "feat_value": "2",
            "feat_type": "continuous",
            "feat_min": 1,
            "feat_max": 5
          },
          {
            "feat_id": 6,
            "feat_name": "Customer's average tip perentage",
            "feat_unit": "%",
            "feat_icon": "💰",
            "feat_category": 0,
            "feat_value": "16",
            "feat_type": "continuous",
            "feat_min": 0,
            "feat_max": 25
          }
        ],
        "group_id": {
          "id": 11398,
          "created_at": "2019-11-17T05:57:09.827Z",
          "updated_at": "2019-11-17T05:57:09.827Z"
        }
      },
      "id": 10229
    },
    {
      "choice": null,
      "scenario_1": {
        "features": [
          {
            "feat_id": 30,
            "feat_name": "Drop-off neighborhood preference",
            "feat_unit": "(1: Least preferable - 5: Most preferable)",
            "feat_icon": "🏘️",
            "feat_category": 0,
            "feat_value": "2",
            "feat_type": "continuous",
            "feat_min": 1,
            "feat_max": 5
          },
          {
            "feat_id": 6,
            "feat_name": "Customer's average tip perentage",
            "feat_unit": "%",
            "feat_icon": "💰",
            "feat_category": 0,
            "feat_value": "12",
            "feat_type": "continuous",
            "feat_min": 0,
            "feat_max": 25
          }
        ],
        "group_id": {
          "id": 11399,
          "created_at": "2019-11-17T05:57:09.941Z",
          "updated_at": "2019-11-17T05:57:09.941Z"
        }
      },
      "scenario_2": {
        "features": [
          {
            "feat_id": 30,
            "feat_name": "Drop-off neighborhood preference",
            "feat_unit": "(1: Least preferable - 5: Most preferable)",
            "feat_icon": "🏘️",
            "feat_category": 0,
            "feat_value": "2",
            "feat_type": "continuous",
            "feat_min": 1,
            "feat_max": 5
          },
          {
            "feat_id": 6,
            "feat_name": "Customer's average tip perentage",
            "feat_unit": "%",
            "feat_icon": "💰",
            "feat_category": 0,
            "feat_value": "6",
            "feat_type": "continuous",
            "feat_min": 0,
            "feat_max": 25
          }
        ],
        "group_id": {
          "id": 11400,
          "created_at": "2019-11-17T05:57:09.945Z",
          "updated_at": "2019-11-17T05:57:09.945Z"
        }
      },
      "id": 10230
    },
    {
      "choice": null,
      "scenario_1": {
        "features": [
          {
            "feat_id": 30,
            "feat_name": "Drop-off neighborhood preference",
            "feat_unit": "(1: Least preferable - 5: Most preferable)",
            "feat_icon": "🏘️",
            "feat_category": 0,
            "feat_value": "4",
            "feat_type": "continuous",
            "feat_min": 1,
            "feat_max": 5
          },
          {
            "feat_id": 6,
            "feat_name": "Customer's average tip perentage",
            "feat_unit": "%",
            "feat_icon": "💰",
            "feat_category": 0,
            "feat_value": "6",
            "feat_type": "continuous",
            "feat_min": 0,
            "feat_max": 25
          }
        ],
        "group_id": {
          "id": 11401,
          "created_at": "2019-11-17T05:57:10.074Z",
          "updated_at": "2019-11-17T05:57:10.074Z"
        }
      },
      "scenario_2": {
        "features": [
          {
            "feat_id": 30,
            "feat_name": "Drop-off neighborhood preference",
            "feat_unit": "(1: Least preferable - 5: Most preferable)",
            "feat_icon": "🏘️",
            "feat_category": 0,
            "feat_value": "5",
            "feat_type": "continuous",
            "feat_min": 1,
            "feat_max": 5
          },
          {
            "feat_id": 6,
            "feat_name": "Customer's average tip perentage",
            "feat_unit": "%",
            "feat_icon": "💰",
            "feat_category": 0,
            "feat_value": "7",
            "feat_type": "continuous",
            "feat_min": 0,
            "feat_max": 25
          }
        ],
        "group_id": {
          "id": 11402,
          "created_at": "2019-11-17T05:57:10.077Z",
          "updated_at": "2019-11-17T05:57:10.077Z"
        }
      },
      "id": 10231
    },
  ],
  "mlServerUrl": "http://localhost:5000",
  "participantId": 2
};

export const mockSamples = {
  scenarios: [
    {
      id: 1,
      features: [{
          "feat_id": 30,
          "feat_name": "Drop-off neighborhood preference",
          "feat_unit": "(1: Least preferable - 5: Most preferable)",
          "feat_icon": "🏘️",
          "feat_category": 0,
          "feat_value": "4",
          "feat_type": "continuous",
          "feat_min": 1,
          "feat_max": 5
        },
        {
          "feat_id": 6,
          "feat_name": "Customer's average tip perentage",
          "feat_unit": "%",
          "feat_icon": "💰",
          "feat_category": 0,
          "feat_value": "10",
          "feat_type": "continuous",
          "feat_min": 0,
          "feat_max": 25
      }],
      model_rank: 0,
      human_rank: 0,
      score: 0,
    },
    {
      id: 2,
      features: [{
          "feat_id": 30,
          "feat_name": "Drop-off neighborhood preference",
          "feat_unit": "(1: Least preferable - 5: Most preferable)",
          "feat_icon": "🏘️",
          "feat_category": 0,
          "feat_value": "2",
          "feat_type": "continuous",
          "feat_min": 1,
          "feat_max": 5
        },
        {
          "feat_id": 6,
          "feat_name": "Customer's average tip perentage",
          "feat_unit": "%",
          "feat_icon": "💰",
          "feat_category": 0,
          "feat_value": "15",
          "feat_type": "continuous",
          "feat_min": 0,
          "feat_max": 25
      }],
      model_rank: 0,
      human_rank: 0,
      score: 0,
    }
  ],
  participant_id: 2,
  request_type: 'request',
  feedback_round: 1,
  ranklistId: 2,
 };

export const mockFeatureWeights = { status: 'ok', featureWeights: [1, 2]};

export const mockOrder = [1, 2];

export const mockScores = [1, 2];

export const mockModelWeights = { status: 'ok', weights: [1, 2] };