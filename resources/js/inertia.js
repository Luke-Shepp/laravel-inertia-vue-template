import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
// import { i18nVue } from 'laravel-vue-i18n';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import NProgress from 'nprogress';
import { Inertia } from '@inertiajs/inertia';

/*
 * Create app
 */

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}.vue`),
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(Toast)
            // .use(i18nVue, {
            //     resolve: lang => import(`../../lang/${lang}.json`),
            // })
            .mixin({ methods: { route } })
            .mount(el);
    },
});

/*
 * N-Progress start/end on Inertia requests
 */

let timeout = null;

Inertia.on('start', () => {
    timeout = setTimeout(() => NProgress.start(), 250);
})

Inertia.on('progress', (event) => {
    if (NProgress.isStarted() && event.detail.progress.percentage) {
        NProgress.set((event.detail.progress.percentage / 100) * 0.9);
    }
})

Inertia.on('finish', (event) => {
    clearTimeout(timeout);

    if (! NProgress.isStarted()) {
        return;
    } else if (event.detail.visit.completed) {
        NProgress.done();
    } else if (event.detail.visit.interrupted) {
        NProgress.set(0);
    } else if (event.detail.visit.cancelled) {
        NProgress.done();
        NProgress.remove();
    }
})
