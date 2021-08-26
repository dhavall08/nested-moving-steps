import { useReducer } from "react";
import roadmapReducer, {
  ADD_STEP,
  ADD_SUB_STEP,
  CHANGE_STEP_VALUE,
  CHANGE_SUB_VALUE,
  CHANGE_VALUE,
  getUniqueNumber,
  initialState,
  MOVE_STEP,
  REMOVE_STEP,
  REMOVE_SUB_STEP,
} from "./Steps/reducer";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(roadmapReducer, initialState);

  function onChange(name: string, value: string) {
    dispatch({
      type: CHANGE_VALUE,
      payload: { name, value },
    });
  }

  function onChangeStep(stepId: number, name: string, value: string) {
    dispatch({
      type: CHANGE_STEP_VALUE,
      payload: { stepId, name, value },
    });
  }

  function onChangeSubStep(
    stepId: number,
    subId: number,
    name: string,
    value: string
  ) {
    dispatch({
      type: CHANGE_SUB_VALUE,
      payload: { stepId, subId, name, value },
    });
  }

  function moveStepUp(id: number) {
    dispatch({ type: MOVE_STEP, payload: { from: id, to: id - 1 } });
  }

  function moveStepDown(id: number) {
    dispatch({ type: MOVE_STEP, payload: { from: id, to: id + 1 } });
  }

  function addStep(id: number) {
    dispatch({ type: ADD_STEP, payload: id });
  }

  function removeStep(id: number) {
    dispatch({ type: REMOVE_STEP, payload: id });
  }

  function addSubStep(stepId: number, subId: number) {
    dispatch({ type: ADD_SUB_STEP, payload: { stepId, subId } });
  }

  function removeSubStep(stepId: number, subId: number) {
    dispatch({ type: REMOVE_SUB_STEP, payload: { stepId, subId } });
  }

  return (
    <div className="App">
      <div className="App-title">
        <h1>Multiple Steps</h1>
        <h2>One level nesting; add/remove steps, moving of steps</h2>

        <div className="App-steps">
          <input
            name="name"
            title="Name"
            placeholder="Name"
            value={state?.steps.name}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          <textarea
            name="description"
            title="Description"
            placeholder="Description"
            value={state?.steps.description}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />

          {state?.steps?.map((step: any, i: number) => {
            const stepUniqueKey = step.uniqueKey || getUniqueNumber();
            return (
              <div key={stepUniqueKey}>
                <hr />
                <summary>
                  <h2 className="text-title">Step {i + 1}</h2>

                  <div>
                    <button
                      disabled={state?.steps?.length === 1}
                      onClick={() => removeStep(i)}
                    >
                      Remove Step
                    </button>
                    <button onClick={() => addStep(i)}>Add Step</button>
                    <button disabled={i === 0} onClick={() => moveStepUp(i)}>
                      Move Step Up
                    </button>
                    <button
                      disabled={i === state?.steps?.length - 1}
                      onClick={() => moveStepDown(i)}
                    >
                      Move Step Down
                    </button>
                  </div>
                </summary>
                <details>
                  <p
                    className="font-12"
                    title="This key will be used to sync older roadmap data when user wants to update roadmap."
                  >
                    Unique Key: {stepUniqueKey}
                  </p>
                  <div>
                    <label>
                      Step Name
                      <input
                        name="name"
                        title="Step name"
                        value={step.Vertical}
                        onChange={(e) =>
                          onChangeStep(i, e.target.name, e.target.value)
                        }
                      />
                    </label>
                  </div>

                  {step?.subSteps?.map((subStep: any, j: number) => {
                    const uniqueKey = subStep.uniqueKey || getUniqueNumber();
                    return (
                      <div key={uniqueKey} className="ml-4">
                        <summary>
                          <h3 className="font-16 mb-0">
                            Sub task {`${j + 1}`}
                          </h3>
                          <div>
                            <button
                              disabled={step?.subSteps?.length === 1}
                              onClick={() => removeSubStep(i, j)}
                            >
                              Remove sub-step
                            </button>
                            <button
                              className="btn-icon mr-2"
                              onClick={() => addSubStep(i, j)}
                            >
                              Add sub-step
                            </button>
                          </div>
                        </summary>
                        <details>
                          <p
                            className="font-12"
                            title="This key will be used to sync older roadmap data when user wants to update roadmap."
                          >
                            Unique Key: {uniqueKey}
                          </p>
                          <div className="row" key={j}>
                            <div className="col-md-5 col-sm-12">
                              <input
                                name="name"
                                title="Sub step name"
                                value={subStep["Title"]}
                                onChange={(e) =>
                                  onChangeSubStep(
                                    i,
                                    j,
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-7 col-sm-12">
                              <textarea
                                name="description"
                                title="Sub step description"
                                value={subStep["Deliverable Description"]}
                                onChange={(e) =>
                                  onChangeSubStep(
                                    i,
                                    j,
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                                // maxHeight="none"
                                // resize="auto"
                              />
                            </div>
                          </div>
                        </details>
                      </div>
                    );
                  })}
                </details>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
