import React,{useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState, Dispatch} from "../redux/store";
import {createNext, setKey, deleteKey, nextMode, getCurrentNode} from "../redux/jsonSlice"
import {setCursor, setCursorKey} from "../redux/cursorSlice"

//Fixed policy to deal with nullable strings
const orEmpty = (s: string | null) =>   {
  return s? s : "";
}

//The component that handles most of user interaction with the data structure
const InputPanel: React.FC = function() {
  const data = useSelector((state: RootState) => state.data.data);
  const key = useSelector((state: RootState) => state.cursor.key);
  const path = useSelector((state: RootState) => state.cursor.path);
  const level = useSelector((state: RootState) => state.cursor.level);
  const dispatch = useDispatch<Dispatch>();

  const ref = useRef<HTMLInputElement|null>(null);

  useEffect(() => {
    if(ref){
      if(ref.current){
        ref.current.focus();
      }
    }
  }, [key]);
  
  //Helpers that allow every eent to dispatch all the required actions
  const createNextElement = (path: Array<string>, key: string, mode: nextMode) => {
    if(mode === "child"){
      dispatch(createNext({path,father: key, newKey: "----", nextMode: mode}));
      dispatch(setCursor({path: [...path, key], level: level + 1, key: "----"}));
    }
    if(mode === "sibling"){
      dispatch(createNext({path, newKey: "----", nextMode: mode}));
      dispatch(setCursor({path, level, key: "----"}));
    }
  }

  const emptyCurrentKey = ()  =>  {
    dispatch(setKey({path,oldKey: key,newKey: ""}));
    dispatch(setCursorKey({key: ""}));
  }

  const editCurrentKey = (oldKey: string, newKey: string) => {
    dispatch(setKey({path,oldKey,newKey}));
    dispatch(setCursorKey({key: newKey}));
  }

  const deleteCurrentKey = () => {
    dispatch(deleteKey({path,key}));
    if(path.length === 0){
      dispatch(setCursor({path: [], key: Object.keys(data)[0], level: 0}));
      return;       
    }
    const shortenedPath = path.slice(0,-1);
    if(!shortenedPath){
      dispatch(setCursor({path: shortenedPath, level: level - 1, key: Object.keys(data).at(-1)}));
    }
    const base = getCurrentNode(data, shortenedPath);
    const newKey  = base[shortenedPath.at(-1) || ""] || Object.keys(data)[0];
    dispatch(setCursor({path: shortenedPath,level: level -1, key: newKey}));
    return;
   }
  
  return (
    <article>
      <form>
        <fieldset role="group">
          <button type={"button"} onClick={() => emptyCurrentKey()}>x</button>
          <input 
            ref={ref}
            type={"text"}
            placeholder={"click at a word"}
            value={orEmpty(key)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => editCurrentKey(orEmpty(key), event.target.value)} 
          />
        </fieldset>
        <fieldset role="group">
          <button type={"button"} onClick={() => createNextElement(path, orEmpty(key), "child")}>add new child</button>
          <button type={"button"} onClick={() => createNextElement(path, "", "sibling")}>add new sibling</button>
          <button type={"button"} onClick={() => deleteCurrentKey()}>delete</button>
        </fieldset>
      </form>
    </article>  
  );
}
export default InputPanel;
