<template>
  <main id="side-panel">
    <header>
      <button @click="printInvoice()">Print</button>
      <button @click="resetInvoice()">Reset</button>
    </header>

    <section id="create">
      <h2>Create new entry</h2>
      <hr />
      <form>
        <div id="description">
          <label for="description-input">Description</label>
          <input
            v-model="entryDescription"
            type="text"
            id="description-input"
            placeholder="Describe the entry..."
          />
        </div>
        <div id="price-per-unit">
          <label for="price-per-unit-input">Price/unit</label>
          <input
            v-model="entryPricePerUnit"
            type="number"
            id="price-per-unit-input"
            placeholder="Price in kronor..."
          />
          <select v-model="entryUnit" name="unit" id="unit">
            <option selected disabled hidden>Unit</option>
            <option value="h">Hours</option>
            <option value="st">Pieces</option>
          </select>
        </div>
        <div id="form-bottom">
          <button @click.prevent="createEntry()">Create</button>
          <div id="vat">
            <label for="vat-input"
              >VAT
              <input
                v-model="entryVatPercent"
                type="number"
                id="vat-input"
                placeholder="0"
              />
              %</label
            >
          </div>
        </div>
      </form>
    </section>

    <section id="entry-list-section">
      <div id="entry-list-header">
        <h2>Entries</h2>
        <transition name="fade">
          <button @click="addEntry()" v-if="entrySelected">Add =></button>
        </transition>
      </div>
      <hr />
      <table id="entry-list">
        <tr>
          <th>Description</th>
          <th>Price / unit</th>
          <th>VAT %</th>
          <th id="button-column"></th>
        </tr>
        <tr
          class="selectable"
          v-for="(entry, index) in entries"
          :key="entry.id"
          ref="refEntries"
          @click.prevent="selectEntry(index)"
        >
          <td>{{ entry.description }}</td>
          <td>{{ entry.pricePerItem.toFixed(2) }} kr/{{ entry.unit }}</td>
          <td>{{ entry.vat }}% VAT</td>
          <td>
            <button @click="deleteEntry(index)">X</button>
          </td>
        </tr>
      </table>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { addedEntries } from "../stores/addedEntries.js";
import { entries } from "../stores/entries.js";

let entryDescription = ref("");
let entryPricePerUnit = ref();
let entryUnit = ref("Unit");
let entryVatPercent = ref();

let entrySelected = ref(false);
const refEntries = ref([]);
const hasDeleted = ref(false);

let indexes = ref([]);

const createEntry = () => {
  let entry = {
    id: Date.now(),
    description: entryDescription.value,
    quantity: 1,
    unit: entryUnit.value,
    pricePerItem: entryPricePerUnit.value,
    vat: entryVatPercent.value,
  };

  entries.value.push(entry);
};

const addEntry = () => {
  indexes.value.forEach((entry, index) => {
    addedEntries.value.push(entries.value[indexes.value[index]]);
  });
};

const selectEntry = (index) => {
  if (!hasDeleted.value) {
    if (indexes.value.includes(index)) {
      indexes.value.splice(indexes.value.indexOf(index), 1);
      refEntries.value[index].style.fontWeight = "normal";
    } else if (entries.value.includes(entries.value[index])) {
      indexes.value.push(index);
      refEntries.value[index].style.fontWeight = "bold";
    }

    if (indexes.value.length > 0) {
      entrySelected.value = true;
    } else {
      entrySelected.value = false;
    }
  } else {
    hasDeleted.value = false;
  }
};

const deleteEntry = (index) => {
  entries.value.splice(index, 1);
  refEntries.value.splice(index, 1);

  if (indexes.value.includes(index)) {
    indexes.value.splice(indexes.value.indexOf(index), 1);
  }

  hasDeleted.value = true;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

hr {
  border-style: solid;
  border-color: #7d7d7d;
}

button:hover {
  cursor: pointer;
}

#side-panel {
  width: 100%;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

header {
  width: 100%;
  height: 50px;
  background-color: #7d7d7d;
  display: flex;
  justify-content: flex-start;
}

header button {
  margin: 10px 5px;
  border-radius: 5px;
  border: 1px solid #7d7d7d;
}

#create {
  width: 95%;
  background-color: rgba(125, 125, 125, 0.75);
  border-radius: 10px;
}

#create h2 {
  text-align: center;
  color: white;
  margin: 15px 0;
}

#create form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

label {
  font-size: 1.2em;
  color: white;
}

input,
select {
  padding: 8px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 0 1px gray;
}

#description {
  width: 95%;
  display: flex;
  flex-direction: column;
}

#description label {
  margin: 10px 0 10px 3px;
}

#price-per-unit {
  width: 95%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

#price-per-unit-input {
  width: 30%;
}

#unit {
  width: 22%;
}

#form-bottom {
  width: 95%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

#form-bottom input {
  width: 30%;
}

#form-bottom button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 0 1px gray;
}

#form-bottom #vat {
  width: 40%;
  text-align: right;
}

#entry-list-section {
  width: 95%;
  background-color: rgba(125, 125, 125, 0.75);
  border-radius: 10px;
}

#entry-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#entry-list-header h2 {
  color: white;
  margin: 15px 0 7px 15px;
  font-size: 1.3em;
}

#entry-list-header button {
  margin: 15px 15px 3px 0;
  border-radius: 5px;
  border: 1px solid #7d7d7d;
  padding: 6px;
}

#entry-list {
  width: 95%;
  border-collapse: collapse;
  margin: auto;
  margin-bottom: 25px;
}

#entry-list td,
th {
  text-align: left;
  padding: 8px;
  border-inline: 1px solid black;
}

#entry-list th {
  border-bottom: 5px solid black;
  font-size: 1.1em;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

#button-column {
  width: 13%;
}

.selectable:hover {
  background-color: aquamarine;
  cursor: pointer;
}

@media only screen and (min-width: 821px) {
  #side-panel {
    max-width: 400px;
  }
  #entry-list {
    font-size: 0.6em;
  }
}

@media only screen and (min-width: 910px) {
  #entry-list {
    font-size: 1em;
  }
}
</style>
