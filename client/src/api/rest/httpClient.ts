import axios from 'axios';
import { config } from '../../config';

const httpClient = axios.create({
    baseURL: config.apiUrl,
});

export default httpClient;
