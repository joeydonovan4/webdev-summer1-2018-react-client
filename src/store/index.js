import { createStore } from "redux";
import { widgetReducer } from "../reducers/widgetReducer";

const store = createStore(widgetReducer);
export default store;