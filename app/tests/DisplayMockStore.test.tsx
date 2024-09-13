import React from 'react';
import {screen, fireEvent,act} from '@testing-library/react';
import {renderWithRedux, getStore, getActions} from "./TestUtils";
import {setCursor} from "../redux/cursorSlice";
import Display from "../components/Display";

test('changes the style when the focus changes', () => {
  const store = getStore();
  renderWithRedux((<Display />), store);
  act(() => fireEvent.click(screen.getByText("vehicles")));
  expect(getActions(store)).toStrictEqual([
    setCursor({path: [], level: 0, key: "vehicles"})
  ]);
});
