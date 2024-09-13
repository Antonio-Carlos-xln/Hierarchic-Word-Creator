import React from 'react';
import { render, screen, RenderResult, fireEvent, act} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../redux/jsonSlice';
import cursorReducer from '../redux/cursorSlice';
import DisplayNode from '../components/DisplayNode';

const renderWithRedux = (component: React.ReactElement) : RenderResult => {
  return render(<Provider store={store}>{component}</Provider>);
};

const store = configureStore({
  reducer: {
    data: dataReducer,
    cursor: cursorReducer
  },
preloadedState: {
    data: {
      data: {
        veiculos : {
          terrestres: {
            coletivos:{
              onibus : null,
              trem: null
            },
            individuais:{
              carro:null,
              moto: null
            }
          },
          maritimos: {
            carga:{
              rebocador:null,
              cargueiro:null
            },
            passageiros:{
              barca:null,
              cruzeiro:null
            }
          }
        }
      }
    },
    cursor: {
      key: null,
      level: 0,
      path: []
    }
  }
});

test('renders contnet text', () => {
  renderWithRedux(<DisplayNode nodeType={"content"} content={"terrestres"} level={0} path={["veiculos"]} />);

  expect(screen.getByText("terrestres")).toBeInTheDocument();
});

test('changes the cursor when clicked', () => {
  renderWithRedux(<DisplayNode nodeType={"content"} content={"coletivos"} level={2} path={["veiculos","terrestres"]} /> );
  const el = screen.getByText("coletivos");
  act(() => fireEvent.click(el)); 
  screen.debug();
  expect(store.getState().cursor.level).toBe(2);
  expect(store.getState().cursor.path).toHaveLength(2);
  expect(store.getState().cursor.key).toBe("coletivos");
});

test('renders  tick elements', () => {
  renderWithRedux(<DisplayNode nodeType={"tick"} content={""} level={2} path={["veiculos","terrestres"]} /> );
  const el2 = screen.getByText("----|");
  expect(el2.textContent).toBe("----|");
});

