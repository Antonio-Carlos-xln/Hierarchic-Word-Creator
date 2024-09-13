import React from 'react';
import {useSelector} from "react-redux";
import DisplayNode from "./DisplayNode";
import {RootState} from "../redux/store";
import {NestedData} from "../redux/jsonSlice";

/*Every element is rendered as 3 HTMLelements
 - a first span to hold its position in the hierarchy, 
visually represented with dashes, this spn will also blik when an 
element of the same level is currenly focused;
 - a second span to hold the actual key text
 - a simple breakline
*/
const renderKeys = (obj: NestedData, level: number = 0, path: Array<string> = []): Array<JSX.Element> => {
  let jsxElements: Array<JSX.Element> = [];

  const keys = Object.keys(obj);
  for(let c = 0;c<keys.length;c++){  
    const key =  keys[c];
    jsxElements.push(
      <>
        <DisplayNode key={`${key}at${path.toString()}-tick`} nodeType ={"tick"} content={""} level={level} path={path} />
        <DisplayNode key={`${key}at${path.toString()}-content`} nodeType ={"content"} content={key} level={level} path={path}/>
        <br />
      </>
    );

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      jsxElements = jsxElements.concat(renderKeys(obj[key], level + 1, [...path,key]));
    }
  }

  return jsxElements;
};

//Component that handles the display of the structure, showing any alterations done in the data
//it also allows the selection of the currently node currently focused by the cursor 
const Display: React.FC = function Display() {
  const data = useSelector((state : RootState) => state.data.data);
  return (
    <section>
      <p>
        {renderKeys(data,0,[])}
      </p>
    </section>
  );
}
export default Display;
