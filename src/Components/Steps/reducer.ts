import update from "immutability-helper";

// actions names
export const ADD_STEP = "ADD_STEP";
export const REMOVE_STEP = "REMOVE_STEP";
export const ADD_SUB_STEP = "ADD_SUB_STEP";
export const REMOVE_SUB_STEP = "REMOVE_SUB_STEP";
export const MOVE_STEP = "MOVE_STEP";
export const CHANGE_VALUE = "CHANGE_VALUE";
export const CHANGE_STEP_VALUE = "CHANGE_STEP_VALUE";
export const CHANGE_SUB_VALUE = "CHANGE_SUB_VALUE";
export const RESET = "RESET";

// unique id generator for each step
export const getUniqueNumber = (length = 16) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace(".", "")
  );
};

// generator empty sub-step when adding a new sub-step
export const emptySubStep = () => ({
  uniqueKey: getUniqueNumber(),
  name: "Enter sub-step name",
  description: "Enter sub-step description",
});

// generator empty step when adding new step
export const emptyStep = () => ({
  uniqueKey: getUniqueNumber(),
  name: "Enter step name",
  description: "Enter step description",
  subSteps: [emptySubStep()],
});

// outer object and array of steps
export const initialState = {
  name: "Enter title",
  description: "Enter description",
  steps: [emptyStep()],
};

export default function stateReducer(state: any, { type, payload }: any) {
  switch (type) {
    case CHANGE_VALUE: {
      const newState = update(state, {
        [payload.name]: { $set: payload.value },
      });
      return newState;
    }

    case CHANGE_STEP_VALUE: {
      const newState = update(state, {
        steps: {
          [payload.stepId]: { [payload.name]: { $set: payload.value } },
        },
      });
      return newState;
    }

    case CHANGE_SUB_VALUE: {
      const newState = update(state, {
        steps: {
          [payload.stepId]: {
            subSteps: {
              [payload.subId]: { [payload.name]: { $set: payload.value } },
            },
          },
        },
      });
      return newState;
    }

    case ADD_STEP: {
      return payload !== undefined
        ? update(state, {
            steps: { $splice: [[payload + 1, 0, emptyStep()]] },
          })
        : update(state, { steps: { $push: [emptyStep()] } });
    }

    case REMOVE_STEP: {
      return update(state, { steps: { $splice: [[payload, 1]] } });
    }

    case MOVE_STEP: {
      const movingItem = state.steps[payload.from];
      const newState = update(state, {
        steps: {
          $splice: [
            [payload.from, 1],
            [payload.to, 0, movingItem],
          ],
        },
      });
      return newState;
    }

    case ADD_SUB_STEP: {
      const newState = update(state, {
        steps: {
          [payload.stepId]: {
            subSteps:
              payload.subId !== undefined
                ? { $splice: [[payload.subId + 1, 0, emptySubStep()]] }
                : { $push: [emptySubStep()] },
          },
        },
      });
      return newState;
    }

    case REMOVE_SUB_STEP: {
      const newState = update(state, {
        steps: {
          [payload.stepId]: {
            subSteps: { $splice: [[payload.subId, 1]] },
          },
        },
      });
      return newState;
    }

    case RESET: {
      return payload ?? state;
    }

    default:
      return state;
  }
}
