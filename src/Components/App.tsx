import { useReducer } from "react";
import stateReducer, {
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
import { Flipped, Flipper } from "react-flip-toolkit";

function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

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
        <ul>
          <li>One level nesting</li>
          <li>Add/remove steps</li>
          <li>Moving of steps</li>
        </ul>

        <div className="App-steps">
          <div className="mb-1">
            <label>Name</label>
            <br />
            <input
              name="name"
              title="Name"
              placeholder="Name"
              value={state?.name}
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <br />
            <textarea
              name="description"
              title="Description"
              placeholder="Description"
              value={state?.description}
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
          </div>

          <Flipper
            flipKey={state?.steps
              ?.map((v: any) => v.uniqueKey + v.subSteps.length)
              .join("")}
          >
            {state?.steps?.map((step: any, i: number) => {
              const stepUniqueKey = step.uniqueKey || getUniqueNumber();
              return (
                <Flipped flipId={stepUniqueKey} key={stepUniqueKey}>
                  <div key={stepUniqueKey}>
                    <hr />
                    <summary>
                      <h2>Step {i + 1}</h2>
                    </summary>
                    <details open className="mb-1">
                      <div>
                        <label>Step Name</label>
                        <br />
                        <input
                          name="name"
                          title="Step name"
                          placeholder="Step name"
                          value={step.name}
                          onChange={(e) =>
                            onChangeStep(i, e.target.name, e.target.value)
                          }
                        />
                      </div>

                      <div className="d-flex">
                        {step?.subSteps?.map((subStep: any, j: number) => {
                          const uniqueKey =
                            subStep.uniqueKey || getUniqueNumber();
                          return (
                            <Flipped key={uniqueKey} flipId={uniqueKey}>
                              <div className="mb-1 ml-3">
                                <summary>
                                  <h3>Sub task {`${j + 1}`}</h3>
                                </summary>
                                <details open className="mb-1">
                                  <div className="mb-1">
                                    <label>Sub step name</label>
                                    <br />
                                    <input
                                      name="name"
                                      title="Sub step name"
                                      placeholder="Sub step name"
                                      value={subStep.name}
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
                                  <div>
                                    <label>Sub step Description</label>
                                    <br />
                                    <textarea
                                      name="description"
                                      title="Sub Step description"
                                      placeholder="Sub Step description"
                                      value={subStep.description}
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
                                </details>
                                <div>
                                  <button
                                    disabled={step?.subSteps?.length === 1}
                                    onClick={() => removeSubStep(i, j)}
                                  >
                                    Remove sub-step
                                  </button>
                                  <button onClick={() => addSubStep(i, j)}>
                                    Add sub-step
                                  </button>
                                </div>
                              </div>
                            </Flipped>
                          );
                        })}
                      </div>
                    </details>
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
                  </div>
                </Flipped>
              );
            })}
          </Flipper>
        </div>
        <pre className="code">
          <code>{JSON.stringify(state, null, 4)}</code>
        </pre>
      </div>
    </div>
  );
}

export default App;
