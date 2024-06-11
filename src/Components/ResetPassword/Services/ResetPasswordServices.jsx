import AxiosService from '../../../Services/AxiosServices.jsx'
import { PasswordUrls } from '../../../Services/Urls.jsx';

const axiosService = new AxiosService();

export const resetPassword = async (resetPasswordata) => {

    const newPasswordRes = await axiosService.post(PasswordUrls.resetPassword(), resetPasswordata);

    if (newPasswordRes.data || newPasswordRes.response.data) {
        return newPasswordRes.data || newPasswordRes.response.data;
    }
}