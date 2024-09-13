import React from 'react';
import {screen, fireEvent,act} from '@testing-library/react';
import {renderWithRedux, getStore, getStore2, getActions} from "./TestUtils";
import InputPanel from "../components/InputPanel";
import {createNext, setKey, deleteKey} from "../redux/jsonSlice";     
import {setCursor, setCursorKey} from "../redux/cursorSlice";

test('displays the current key foused by the cursor', () => {
  const store = getStore();
  renderWithRedux((
    <>
      <InputPanel />
    </>),store);
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  expect(target.value).toBe("vehicles");
});

test('allows editting currently focused key', () => {
  const store = getStore();
  renderWithRedux((
    <>
      <InputPanel />
    </>),store);
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  act(() => fireEvent.input(target,{target: {value: "modern vehicles"}}));
  expect(getActions(store)).toStrictEqual([
    setKey({path: [], oldKey : "vehicles", newKey: "modern vehicles"}),
    setCursorKey({key: "modern vehicles"})
  ]);
});


test('allows creation of a child of current node', () => {
  const store = getStore2();
  renderWithRedux((
    <>
      <InputPanel />
    </>),store);
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  expect(target.value).toBe("land");
  const newChild = screen.getByText("add new child");
  act(() => fireEvent.click(newChild));
  expect(getActions(store)).toStrictEqual([
    createNext({path: ["vehicles"], father: "land", newKey: "----", nextMode: "child"}),
    setCursor({path: ["vehicles","land"],level: 2, key: "----"})
  ]);
});

test('allows creation of a sibling of current node', () => {
  const store = getStore2();
  renderWithRedux((
    <>
      <InputPanel />
    </>),store);
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  expect(target.value).toBe("land");
  const newChild = screen.getByText("add new sibling");
  act(() => fireEvent.click(newChild));
  expect(getActions(store)).toStrictEqual([
    createNext({path: ["vehicles"],newKey: "----",nextMode: "sibling"}),
    setCursor({path: ["vehicles"], key: "----", level: 1})
  ]);
});

test('allows  cleaning the key of current node', () => {
  const store = getStore();
  renderWithRedux((
    <>
      <InputPanel />
    </>),store);
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  expect(target.value).toBe("vehicles");
  const erase = screen.getByText("x");
  act(() => fireEvent.click(erase));
  expect(getActions(store)).toStrictEqual([
    setKey({path: [], oldKey: "vehicles", newKey: ""}),
    setCursorKey({key: ""})
  ]);
});

test('deletes an empty key and its subtree', () => {
  const store = getStore2();
  renderWithRedux((
    <>
      <InputPanel />
    </>),store);
  const target =  screen.getByPlaceholderText("click at a word") as HTMLInputElement;
  expect(target.value).toBe("land");
  const del = screen.getByText("delete");
  act(() => fireEvent.click(del));
  expect(getActions(store)).toStrictEqual([
    deleteKey({path: ["vehicles"], key: "land"}),
    setCursor({path: [], key: "vehicles", level: 0})
  ]);
});
