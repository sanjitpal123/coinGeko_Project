import axios from "axios";
import { COINGECKO_API } from "./Constantapi";
const aioxInstance=axios.create({
    baseURL:COINGECKO_API,
});
export default aioxInstance;