import { usePage } from "@inertiajs/inertia-vue3";
import { useToast } from "vue-toastification";
import { Inertia } from "@inertiajs/inertia";

Inertia.on('success', () => {
    const toast = useToast();

    const successMessage = usePage().props.value.successMessage;
    if (successMessage) {
        toast.success(successMessage);
    }

    const errorMessage = usePage().props.value.errorMessage;
    if (errorMessage) {
        toast.error(errorMessage);
    }
});
