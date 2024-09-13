'use client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Display from "./components/Display";
import TopPanel from "./components/TopPanel";
import InputPanel from "./components/InputPanel";
import '@picocss/pico/css/pico.classless.min.css';
import "./styles.css"
export default function Home() {
  return (
    <Provider store={store}>
      <main className="">
        <TopPanel />
        <Display />
        <InputPanel />
      </main>
    </Provider>
      
  );
}
