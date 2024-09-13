import { createSlice } from '@reduxjs/toolkit';

interface CursorState{
  key: string|null,
  level: number,
  path: Array<string>
}

const initialState: CursorState = { key : null, level : 0, path : []}
//The cursor is what tells the rest of the application what node the 
//user wants to edit, where its located in the tree structure and its depth 
const cursorSlice = createSlice({
  name: 'cursor',
  initialState,
  reducers: {
    setCursorKey: (state,action) => {
      state.key = action.payload.key;
    },
    
    setLevel: (state,action) => {
      state.level = action.payload.level;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setCursor: (state,action) => {
      state.key = action.payload.key;
      state.path = action.payload.path;
      state.level = action.payload.level;
    }
  },
});

export const {
               setCursorKey,
               setLevel,
               setPath,
               setCursor
             } = cursorSlice.actions;
export default cursorSlice.reducer;
