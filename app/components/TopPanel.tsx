import React from 'react';
import {useDispatch,useSelector} from "react-redux";
import {RootState,Dispatch} from "../redux/store";
import {clearData,load} from "../redux/jsonSlice"

//Component that holds options regarding global alterations of data
//and persistence of it (supported operations are clearing,loading from file and downloading)
const TopPanel: React.FC = function() {
  const data = useSelector((state :RootState) => state.data.data);
  const dispatch = useDispatch<Dispatch>();

  const dispatchFileContentToRedux = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const sentData = e.target?.result;
        dispatch(load({sentData}));
      };

      reader.readAsText(file);
    }
  };

  const runLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    input.onchange = dispatchFileContentToRedux;
    document.body.appendChild(input);
    input.click(); 
    document.body.removeChild(input);
  };

  const runDownload = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "outputfile.json";
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
 
  return (
    <article>
      <form role="group">
        <fieldset>
          <button type={"button"} onClick={() => dispatch(clearData())}>clear</button>
          <button type={"button"} onClick={() => runLoad()}>load</button>
          <button type={"button"} onClick={() => runDownload(JSON.stringify(data))}>download</button>
        </fieldset>
      </form>
    </article>  
  );
}
export default TopPanel;
