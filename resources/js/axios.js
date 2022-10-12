import NProgress from 'nprogress';
import { axiosErrorHandler } from "@/helpers";

/*
 * N-Progress start/end on axios requests, and hook a global axios error handler
 */

axios.interceptors.request.use(function (config) {
    NProgress.start();
    return config;
}, function (error) {
    NProgress.done();
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    NProgress.done();
    return response;
}, function (error) {
    NProgress.done();
    axiosErrorHandler(error);
    return Promise.reject(error);
});
