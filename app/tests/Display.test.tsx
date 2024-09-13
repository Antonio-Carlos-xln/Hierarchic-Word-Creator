import React from 'react';
import { render, screen, RenderResult, fireEvent,act} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../redux/jsonSlice';
import cursorReducer from '../redux/cursorSlice';
import Display from "../components/Display"

const store = configureStore({
  reducer: {
    data: dataReducer,
    cursor: cursorReducer
  },
  preloadedState: {
    data: {
      data: {
        vehicles : {
          land: {
            collective:{
              bus : null,
              train: null
            },
            individuals:{
              car:null,
              motorcycle: null
            }
          },
          sea: {
            cargo:{
              tugboat:null,
              container:null
            },
            passanger:{
              ferry:null,
              transatlantic:null
            }
          }
        }
      }
    },
    cursor: {
      key: "",
      level: 0,
      path: []
    }
  }
});
  
const renderWithRedux = (component: React.ReactElement) : RenderResult => {
  return render(<Provider store={store}>{component}</Provider>);
};

test('renders all elements', () => {
  renderWithRedux((<Display />) );
  expect(screen.getByText("|")).toBeInTheDocument();
  expect(screen.getByText("vehicles")).toBeInTheDocument();
  expect(screen.getByText("land")).toBeInTheDocument();
  expect(screen.getByText("sea")).toBeInTheDocument();
  expect(screen.getAllByText("--|")).toHaveLength(2);
  expect(screen.getAllByText("----|")).toHaveLength(4);
  expect(screen.getAllByText("------|")).toHaveLength(8);
});


test('changes the style when the focus changes', () => {
  renderWithRedux((<Display />) );
  const node = screen.getByText("|");
  act(() => fireEvent.click(screen.getByText("vehicles")));
  expect(node.className).toBe("hierarchicwordcreator-current-level");
  const list = screen.getAllByText("--|");
  act(() => fireEvent.click(screen.getByText("land")));
  expect(screen.getByText("|").className).toBe("");
  expect(list[0].className).toBe("hierarchicwordcreator-current-level");
  expect(list[1].className).toBe("hierarchicwordcreator-current-level");
  const list2 = screen.getAllByText("----|");
  act(() => fireEvent.click(screen.getByText("collective")));
  expect(screen.getByText("|").className).toBe("");
  expect(list2[0].className).toBe("hierarchicwordcreator-current-level");
  expect(list2[3].className).toBe("hierarchicwordcreator-current-level");
});
