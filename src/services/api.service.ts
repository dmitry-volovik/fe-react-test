import axios, {AxiosInstance} from 'axios';

function createClient():AxiosInstance {
  return axios.create();
}

export const apiService = createClient();
