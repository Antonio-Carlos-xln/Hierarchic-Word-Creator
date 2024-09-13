import { createSlice } from '@reduxjs/toolkit';
import {setCursor} from "./cursorSlice";
type nextMode = "child" | "sibling" ;

//type that describes the data to Typescript compier
//according thepredife=ined simplified json mode
export interface NestedData {
 [key: string]: NestedData | null;
}

//type of the state of this reeducer
interface jsonState {
  data: NestedData
}

const initialState: jsonState = {
  data: {
    root:null
  }
}

//Recursive helper function that removes empty nodes if they are leafs of the tree,
//but renames them to ----, if they are branches
//Deep copying is employed and backed by the native json module
const removeEmptyKeys = (data: NestedData|null)=>{
  if(!data)return;
  const keys = Object.keys(data);
  for(let c = 0;c < keys.length; c++){
    if(keys[c] === ""){
      if(!data[keys[c]]){
        delete data[keys[c]];
        continue;
      }
      const temp = JSON.stringify(data[keys[c]]);
      data["----"] = JSON.parse(temp);
      delete data[keys[c]];
    }else{
     removeEmptyKeys(data[keys[c]]);
    }
  }
}
//Helper function that traverses the structure with given path
//to allow direct acess to site o interest
export function getCurrentNode(data: NestedData | null, path: Array<string>): NestedData{
  let current = data;
  for(let c = 0;c<path.length;c++){
    if(current?.[path[c]]){
      current = current?.[path[c]];
    };
  }
  if(current === null){
    return {};
  }
  return current;
}

//The slicer that does all altering of the data
const jsonSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = {
       root: null
      };
    },
    setData: (state,action) => {
      state.data = action.payload.data;
    },
    setKey: (state,action) => {
      const current = getCurrentNode(state.data, action.payload.path);
      const temp = JSON.stringify(current[action.payload.oldKey]);
      delete current[action.payload.oldKey];
      current[action.payload.newKey] = JSON.parse(temp);
    },
    deleteKey: (state,action)=> {
      const current = getCurrentNode(state.data, action.payload.path);
      delete current[action.payload.key];
      if(Object.keys(state.data).length === 0){
        state.data["root"] = null;
      }
    },
    createNext : (state,action) => {
      if(action.payload.nextMode === "sibling"){
        const current = getCurrentNode(state.data, action.payload.path);
        current[action.payload.newKey] = null;
      }
      if(action.payload.nextMode === "child"){
        const current = getCurrentNode(state.data, action.payload.path);
        if(current[action.payload.father] === null){
          current[action.payload.father] = {};
          current![action.payload.father]![action.payload.newKey] = null;
        }else{
          current![action.payload.father]![action.payload.newKey] = null;
        }
      }
    },
    load: (state,action) => {
      try{
        state.data = JSON.parse(action.payload.sentData);
      }catch(e){
        state.data = {
         root: null
        }
      }
    },
  },
 extraReducers:(builder)=>{
   builder.addCase(setCursor, (state) => {
     removeEmptyKeys(state.data);
   });
 }
});

export const {
  clearData,
  setData,
  load,
  setKey,
  deleteKey,
  createNext,
  } = jsonSlice.actions;
export default jsonSlice.reducer;
export type {nextMode};
