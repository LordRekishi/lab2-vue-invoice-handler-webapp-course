import { ref } from "vue";

export const addedEntries = ref([
  {
    id: 0,
    description: "Arbete",
    quantity: 5,
    unit: "h",
    pricePerItem: 60,
    vat: 25,
  },
  {
    id: 1,
    description: "Produkt",
    quantity: 10,
    unit: "st",
    pricePerItem: 105,
    vat: 25,
  },
]);
