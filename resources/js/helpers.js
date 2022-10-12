import { useToast } from "vue-toastification";
// import { trans } from "laravel-vue-i18n";

export const axiosErrorHandler = error => {
    const toast = useToast();

    if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
    } else {
        // toast.error(trans('errors.server_error'));
        toast.error('Server Error.');
    }

    console.log(error);
};
