import React from 'react';
import {useDispatch,useSelector} from "react-redux";
import {setCursor} from "../redux/cursorSlice";
import {RootState,Dispatch} from "../redux/store";

const handleClick =  (path: Array<string>, key: string, level: number, dispatch: Dispatch) => {
  dispatch(setCursor({path,level,key}));
}

//The division in two nodes intends to respect separations of concerns and it is a mean of optimisation, 
//avoiding re rendering all elements at every change in the cursor

const createContentNode: (content: string, level: number, path: Array<string>, dispatch: Dispatch) => JSX.Element  = function(content, level, path, dispatch){
  return(<span onClick={()=>handleClick(path,content,level,dispatch)}><mark>{content}</mark></span>);
}

const createTickNode: (level: number, path: Array<string>, clevel: number) => JSX.Element = function(level, path, clevel){
  const atCurrentLevel = (level === clevel)? "hierarchicwordcreator-current-level" : "" ;
  return(<span className={atCurrentLevel}>{"-".repeat(level*2) + "|"}</span>);
}

type displayNodeType = "content"|"tick";
interface displayNodeState{
  nodeType: displayNodeType,
  content: string,
  level: number,//Its depth in the heirarchy data structure (tree structure)
  path: Array<string>//All parents until the curent element
};

const DisplayNode: React.FC<displayNodeState> = function({nodeType,content,level,path} : displayNodeState ) {
  const dispatch = useDispatch<Dispatch>();
  //The level the cursor is currently focusing;
  //every element must know this, so they can know whether to blink or not
  const clevel = useSelector((state: RootState) => state.cursor.level);
  return (
    <>
      {(nodeType === "content")?createContentNode(content, level, path, dispatch) : createTickNode(level, path, clevel)}
    </>   
  );
}
export default DisplayNode;
