import axios from "axios";
import actions from "app/config/store/actions";
const {AuthActions, DogActions, ProfileActions} = actions;

const apiInstance = () => {
    return axios.create({
        baseURL: "http://localhost:3001/api"
    });
};

const Api = {
    login: (dispatch) => {
        return async function (payload) {
            try {
                const res = await apiInstance().post("/users/login", payload);
                localStorage.setItem("userId", res.data.id);
                dispatch(AuthActions.SET_USER_ID(res.data.id));
            } catch (error) {
                throw error;
            }
        };
    },
    getDogs: (dispatch) => {
        return async function (userId) {
            try {
                const res = await apiInstance().get(`/users/${userId}/dogs/getUserEligibleDogs`);
                dispatch(DogActions.SET_DOG_DATA(res.data));
            } catch (error) {
                throw error;
            }
        };
    },
    likeDog: async (payload, userId) => {
        try {
            await apiInstance().post(`/users/${userId}/favorites`, payload);
        } catch (error) {
            throw error;
        }
    },
    getProfile: (dispatch) => {
        return async function (userId) {
            try {
                const userRes = await apiInstance().get(`/users/${userId}`);
                const dogRes = await apiInstance().get(`/users/${userId}/dogs`);

                console.log(dogRes);
                dispatch(ProfileActions.SET_USER(userRes.data[0]));
                dispatch(ProfileActions.SET_DOGS(dogRes.data));
            } catch (error) {
                throw error;
            }
        };
    },
    updateUserProfile: (dispatch) => {
        return async function (userId, payload) {
            try {
                const res = await apiInstance().put(`/users/${userId}`, payload);
                dispatch(ProfileActions.SET_USER(res.data[0]));
            } catch (error) {
                throw error;
            }
        };
    }
};

export default Api;
