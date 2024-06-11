import AxiosService from '../../../Services/AxiosServices.jsx'
import { PasswordUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const forgotassword = async (forgotPasswordata) => {

    const forgotPasswordRes = await axiosService.post(PasswordUrls.forgotPassword(), forgotPasswordata);

    if (forgotPasswordRes.data || forgotPasswordRes.response.data) {
        return forgotPasswordRes.data || forgotPasswordRes.response.data;
    }
}