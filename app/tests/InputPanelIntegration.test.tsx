import React from 'react';
import { render, screen, RenderResult, fireEvent,act} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../redux/jsonSlice';
import cursorReducer from '../redux/cursorSlice';
import Display from "../components/Display";
import InputPanel from "../components/InputPanel";

const getStore = () => configureStore({
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
      },
      waiting: false,
      cancelID: 0
    },
    cursor: {
      key: "",
      level: 0,
      path: []
    }
  }
});
  
const renderWithRedux = (component: React.ReactElement) : RenderResult => {
  return render(<Provider store={getStore()}>{component}</Provider>);
};

test('allows puting keys at focus', () => {
  renderWithRedux((
    <>
      <Display />
      <InputPanel />
    </>));
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  const node = screen.getByText("terrestres");
  act(() => fireEvent.click(node));
  expect(target.value).toBe("terrestres");
  const node2 = screen.getByText("trem");
  act(() => fireEvent.click(node2));
  expect(target.value).toBe("trem");
});

test('allows editting keys at focus', () => {
  renderWithRedux((
    <>
      <Display />
      <InputPanel />
    </>));
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  const node = screen.getByText("carro");
  act(() => fireEvent.click(node));
  expect(target.value).toBe("carro");
  act(()  => fireEvent.input(target,{target: {value: "car"}}));
  const node2 = screen.getByText("maritimos");
  act(() => fireEvent.click(node2));
  expect(target.value).toBe("maritimos");
  expect(screen.getByText("car")).toBeInTheDocument();
});


test('allows creation of a child of current node', () => {
  renderWithRedux((
    <>
      <Display />
      <InputPanel />
    </>));
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  const node = screen.getByText("terrestres");
  act(() => fireEvent.click(node));
  expect(target.value).toBe("terrestres");
  const newChild = screen.getByText("add new child");
  act(() => fireEvent.click(newChild));
  expect(target.value).toBe("----");
  act(() => fireEvent.input(target,{target: {value: "bike"}}));
  expect(target.value).toBe("bike");
});

test('allows creation of a sibling of current node', () => {
  renderWithRedux((
    <>
      <Display />
      <InputPanel />
    </>));
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  const node = screen.getByText("terrestres");
  act(() => fireEvent.click(node));
  expect(target.value).toBe("terrestres");
  const newChild = screen.getByText("add new sibling");
  act(() => fireEvent.click(newChild));
  expect(target.value).toBe("----");
  act(() => fireEvent.input(target,{target: {value: "bike"}}));
  expect(target.value).toBe("bike");
});

test('allows  cleaning the key of current node', () => {
  renderWithRedux((
    <>
      <Display />
      <InputPanel />
    </>));
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  const node = screen.getByText("terrestres");
  act(() => fireEvent.click(node));
  expect(target.value).toBe("terrestres");
  const erase = screen.getByText("x");
  act(() => fireEvent.click(erase));
  expect(target.value).toBe("");
});

test('renames empty branch', () => {
  renderWithRedux((
    <>
      <Display />
      <InputPanel />
    </>));
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  const node = screen.getByText("terrestres");
  act(() => fireEvent.click(node));
  expect(target.value).toBe("terrestres");
  const erase = screen.getByText("x");
  act(() => fireEvent.click(erase));
  expect(target.value).toBe("");
  act(() => fireEvent.click(screen.getByText("maritimos")));
  expect(screen.getByText("----")).toBeInTheDocument();
});

test('deletes empty leaf', () => {
  renderWithRedux((
    <>
      <Display />
      <InputPanel />
    </>));
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  const node = screen.getByText("carro");
  act(() => fireEvent.click(node));
  expect(target.value).toBe("carro");
  const erase = screen.getByText("x");
  act(() => fireEvent.click(erase));
  expect(target.value).toBe("");
  act(() => fireEvent.click(screen.getByText("maritimos")));
  expect(screen.queryByText("carro")).not.toBeInTheDocument();
});


test('deletes an empty key and its subtree', () => {
  renderWithRedux((
    <>
      <Display />
      <InputPanel />
    </>));
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  const node = screen.getByText("coletivos");
  act(() => fireEvent.click(node));
  expect(target.value).toBe("coletivos");
  const erase = screen.getByText("delete");
  act(() => fireEvent.click(erase));
  const node2 = screen.getByText("individuais");
  act(() => fireEvent.click(node2));
  expect(screen.queryByText("trem")).not.toBeInTheDocument();
  expect(screen.queryByText("coletivos")).not.toBeInTheDocument();
});
