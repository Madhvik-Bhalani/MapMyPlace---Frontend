import AxiosService from '../../../Services/AxiosServices.jsx'
import { MapUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const fetchMapData = async (headers) => {

    const resData = await axiosService.get(MapUrls.fetchMapData(), headers);

    if (resData.data || resData.response.data) {
        return resData.data || resData.response.data;
    }
}