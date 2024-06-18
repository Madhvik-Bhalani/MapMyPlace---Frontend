const baseUrl = process.env.REACT_APP_API_URL;

export const SignupUrls = {
    signup: () => {
        return baseUrl + '/users/signup';
    }
}

export const SigninUrls = {
    signin: () => {
        return baseUrl + `/users/signin`;
    }
}

export const PasswordUrls = {
    forgotPassword: () => {
        return baseUrl + `/password/forgot-password`;
    },
    resetPassword: () => {
        return baseUrl + `/password/reset-password`;
    },
    changePassword: () => {
        return baseUrl + `/password/change-password`;
    },

}

export const UserUrls = {
    getUserData: () => {
        return baseUrl + `/users/fetch-user`;
    },
    editProfile: () => {
        return baseUrl + `/users/edit-profile`;
    },
    deleteAccount: () => {
        return baseUrl + `/users/delete-account`;
    },
    addFavFacility: () => {
        return baseUrl + `/users/add-fav-facility`;
    },
    removeFavFacility: () => {
        return baseUrl + `/users/remove-fav-facility`;
    },
    addHomeAddress: () => {
        return baseUrl + `/users/add-home-address`;
    }
}

export const MapUrls = {
    fetchMapData: () => {
        return baseUrl + `/map/fetch-map-data`;
    },
}