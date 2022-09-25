import { createRouter, createWebHistory } from "vue-router";
import InvoiceView from "@/views/InvoiceView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "invoice",
      component: InvoiceView,
      props: true,
    },
  ],
});

export default router;
