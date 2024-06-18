import AxiosService from '../../../Services/AxiosServices.jsx'
import { PasswordUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const changePassword = async (ChangepasswordData,headers) => {

    const changePassRes = await axiosService.put(PasswordUrls.changePassword(), ChangepasswordData,headers);

    if (changePassRes.data || changePassRes.response.data) {
        return changePassRes.data || changePassRes.response.data;
    }
}