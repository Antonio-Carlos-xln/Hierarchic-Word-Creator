import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import {render, RenderResult} from "@testing-library/react";   
import {AppStore} from "../redux/store";

const mock = configureMockStore([]);
export type MockStore = ReturnType<typeof mock>;
export const getStore = () => mock({
      data: {
      data: {
        vehicles : {
          land: null,
          sea: null
          }
      }
},
    cursor: {
      key: "vehicles",
      level: 0,
      path: []
    }
  })  as unknown as AppStore;

export const getStore2 = () => mock({
      data: {
      data: {
        vehicles : {
          land: null,
          sea: null
          }
      }
},
    cursor: {
      key: "land",
      level: 1,
      path: ["vehicles"]
    }
  })  as unknown as AppStore;


export const renderWithRedux = (component: React.ReactElement, store: AppStore) : RenderResult => {
  return render(<Provider store={store}>{component}</Provider>);
};

export const getActions = (store: AppStore) => {
  return (store as unknown as MockStore).getActions();
}
  
