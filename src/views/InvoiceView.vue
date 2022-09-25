<template>
  <main id="mobile-box" v-if="mobile">
    <Accordion>
      <template #title><h2>Header</h2></template>
      <template #content>
        <h1>Faktura</h1>
        <img src="../assets/img/logo.jpg" alt="Fallqvist Special logo" />
        <br />
      </template>
    </Accordion>
    <Accordion>
      <template #title><h2>Address</h2></template>
      <template #content
        ><article id="company-address">
          <h3 class="company-name">Exempelföretag Ab</h3>
          <p class="company-street">Företagsgatan 2</p>
          <p class="company-zip-city">
            <span>123 45</span> <span>Hemstad</span>
          </p>
        </article>
        <article id="customer-address">
          <h3 class="customer-name">Kundföretag Ab</h3>
          <p class="customer-contact-name">Bert Betalarsson</p>
          <p class="customer-street">Köpvägen 12</p>
          <p class="customer-zip-city">
            <span>123 45</span> <span>Köpstad</span>
          </p>
        </article></template
      >
    </Accordion>
    <Accordion>
      <template #title><h2>Info</h2></template>
      <template #content
        ><article>
          <h3>Fakturanummer</h3>
          <p>1234</p>
        </article>
        <article>
          <h3>Kundnummer</h3>
          <p>10</p>
        </article>
        <article>
          <h3>Referensnummer</h3>
          <p>A00342</p>
        </article>
        <article>
          <h3>Fakturadatum</h3>
          <p>2022-09-13</p>
        </article>
        <article>
          <h3>Förfallodag</h3>
          <p>2022-09-14</p>
        </article></template
      >
    </Accordion>
    <Accordion>
      <template #title><h2>Additional info</h2></template>
      <template #content
        ><h3>Tilläggsinformation</h3>
        <p>14 dagars returrätt gäller för oanvända varor.</p></template
      >
    </Accordion>
    <Accordion>
      <template #title>
        <h2>Product list</h2>
      </template>
      <template #content>
        <br />
        <table>
          <tr>
            <th id="description-header">Beskrivning</th>
            <th id="quantity-header">Antal</th>
            <th>Enhet</th>
            <th>Á pris</th>
          </tr>
          <tr v-for="(entry, index) in addedEntries" :key="entry.id">
            <td>{{ entry.description }}</td>
            <td>
              <input
                id="quantity"
                type="number"
                name="quantity"
                v-model="entry.quantity"
              />
            </td>
            <td>{{ entry.unit }}</td>
            <td>{{ entry.pricePerItem.toFixed(2) }} kr</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>Moms %</th>
            <th>Moms kr</th>
            <th id="total-cost-header">Belopp</th>
            <th id="delete-header"></th>
          </tr>
          <tr v-for="(entry, index) in addedEntries" :key="entry.id">
            <td>{{ entry.vat }}%</td>
            <td>{{ entryTotalVat(entry).toFixed(2) }} kr</td>
            <td>{{ entryTotalCost(entry).toFixed(2) }} kr</td>
            <td><button @click="deleteEntry(index)">X</button></td>
          </tr>
        </table>
        <br />
      </template>
    </Accordion>
    <Accordion>
      <template #title><h2>Totals</h2></template>
      <template #content>
        <br />
        <div id="total-no-vat">
          <span>Belopp utan moms - </span>
          <span>{{ totalNoVat().toFixed(2) }} kr</span>
        </div>
        <div id="total-vat">
          <span>Moms totalt - </span>
          <span>{{ totalVat().toFixed(2) }} kr</span>
        </div>
        <div id="sum">
          <span>Summa att betala - </span>
          <span>{{ totalSumWithVat().toFixed(2) }} kr</span>
        </div>
        <br />
      </template>
    </Accordion>
    <Accordion>
      <template #title><h2>Tax info</h2></template>
      <template #content><h4>Godkänd för F-skatt</h4></template>
    </Accordion>
    <Accordion>
      <template #title><h2>Footer</h2></template>
      <template #content
        ><article id="company-info">
          <h4>Exempelföretag Ab</h4>
          <p class="company-street">Företagsgatan 2</p>
          <p class="company-zip-city">
            <span>123 45</span> <span>Hemstad</span>
          </p>
          <p class="company-country">Sverige</p>
          <p class="company-org-no">Org.nr. 123456-7890</p>
          <p class="company-vat-no">Momsreg.nr. SE1234567890</p>
        </article>

        <article id="contact">
          <h4>Kontaktuppgifter</h4>
          <p class="company-contact-name">Freddy Företagare</p>
          <p class="company-phone">Telefon: +46-123456789</p>
          <p class="company-email">Epost: freddy@foretag.se</p>
          <p class="company-website">www.foretag.se</p>
        </article>

        <article id="pay-info">
          <h4>Betalningsuppgifter</h4>
          <p class="company-plusgiro">Plusgiro 1234567-8</p>
          <p class="company-bankgiro">Bankgiro 123-4567</p>
          <p class="company-iban">IBAN SE00 0000 0000 0000</p>
          <p class="company-swift-bic">SWIFT/BIC SEHHCXX1001</p>
        </article></template
      >
    </Accordion>
  </main>

  <main id="desktop-box" v-if="desktop">
    <header>
      <h1>Faktura</h1>
      <img src="../assets/img/logo.jpg" alt="Fallqvist Special logo" />
    </header>

    <section id="address">
      <article id="company-address">
        <h3 class="company-name">Exempelföretag Ab</h3>
        <p class="company-street">Företagsgatan 2</p>
        <p class="company-zip-city"><span>123 45</span> <span>Hemstad</span></p>
      </article>
      <article id="customer-address">
        <h3 class="customer-name">Kundföretag Ab</h3>
        <p class="customer-contact-name">Bert Betalarsson</p>
        <p class="customer-street">Köpvägen 12</p>
        <p class="customer-zip-city">
          <span>123 45</span> <span>Köpstad</span>
        </p>
      </article>
    </section>

    <section id="info">
      <article>
        <h3>Fakturanummer</h3>
        <p>1234</p>
      </article>
      <article>
        <h3>Kundnummer</h3>
        <p>10</p>
      </article>
      <article>
        <h3>Referensnummer</h3>
        <p>A00342</p>
      </article>
      <article>
        <h3>Fakturadatum</h3>
        <p>2022-09-13</p>
      </article>
      <article>
        <h3>Förfallodag</h3>
        <p>2022-09-14</p>
      </article>
    </section>

    <section id="additional-info">
      <h3>Tilläggsinformation</h3>
      <p>14 dagars returrätt gäller för oanvända varor.</p>
    </section>

    <div class="horizontal-line"></div>

    <section id="product-list">
      <table>
        <tr>
          <th id="description-header">Beskrivning</th>
          <th id="quantity-header">Antal</th>
          <th>Enhet</th>
          <th>Á pris</th>
          <th>Moms %</th>
          <th>Moms kr</th>
          <th id="total-cost-header">Belopp</th>
          <th id="delete-header"></th>
        </tr>
        <tr v-for="(entry, index) in addedEntries" :key="entry.id">
          <td>{{ entry.description }}</td>
          <td>
            <input
              id="quantity"
              type="number"
              name="quantity"
              v-model="entry.quantity"
            />
          </td>
          <td>{{ entry.unit }}</td>
          <td>{{ entry.pricePerItem.toFixed(2) }} kr</td>
          <td>{{ entry.vat }}%</td>
          <td>{{ entryTotalVat(entry).toFixed(2) }} kr</td>
          <td>{{ entryTotalCost(entry).toFixed(2) }} kr</td>
          <td><button @click="deleteEntry(index)">X</button></td>
        </tr>
      </table>
    </section>

    <section id="totals">
      <div id="total-no-vat">
        <span>Belopp utan moms</span>
        <span>{{ totalNoVat().toFixed(2) }} kr</span>
      </div>
      <div id="total-vat">
        <span>Moms totalt</span>
        <span>{{ totalVat().toFixed(2) }} kr</span>
      </div>
      <div id="sum">
        <span>Summa att betala</span>
        <span>{{ totalSumWithVat().toFixed(2) }} kr</span>
      </div>
    </section>

    <div id="taxes-info">
      <h4>Godkänd för F-skatt</h4>
    </div>

    <div class="horizontal-line-thin"></div>

    <footer>
      <article id="company-info">
        <h4>Exempelföretag Ab</h4>
        <p class="company-street">Företagsgatan 2</p>
        <p class="company-zip-city"><span>123 45</span> <span>Hemstad</span></p>
        <p class="company-country">Sverige</p>
        <p class="company-org-no">Org.nr. 123456-7890</p>
        <p class="company-vat-no">Momsreg.nr. SE1234567890</p>
      </article>

      <article id="contact">
        <h4>Kontaktuppgifter</h4>
        <p class="company-contact-name">Freddy Företagare</p>
        <p class="company-phone">Telefon: +46-123456789</p>
        <p class="company-email">Epost: freddy@foretag.se</p>
        <p class="company-website">www.foretag.se</p>
      </article>

      <article id="pay-info">
        <h4>Betalningsuppgifter</h4>
        <p class="company-plusgiro">Plusgiro 1234567-8</p>
        <p class="company-bankgiro">Bankgiro 123-4567</p>
        <p class="company-iban">IBAN SE00 0000 0000 0000</p>
        <p class="company-swift-bic">SWIFT/BIC SEHHCXX1001</p>
      </article>
    </footer>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { addedEntries } from "../stores/addedEntries.js";
import Accordion from "../components/Accordion.vue";

const desktop = ref(false);
const mobile = ref(false);

const media = window.matchMedia("(min-width: 821px)");
media.onchange = (e) => {
  if (e.matches) {
    desktop.value = true;
    mobile.value = false;
  } else {
    mobile.value = true;
    desktop.value = false;
  }
};

onMounted(() => {
  if (media.matches) {
    desktop.value = true;
    mobile.value = false;
  } else {
    mobile.value = true;
    desktop.value = false;
  }
});

const entryTotalVat = (entry) => {
  return entry.pricePerItem * entry.quantity * (entry.vat / 100);
};

const entryTotalCost = (entry) => {
  return entry.pricePerItem * entry.quantity;
};

const totalNoVat = () => {
  let total = 0;
  addedEntries.value.forEach((entry) => {
    total += entryTotalCost(entry);
  });

  return total;
};

const totalVat = () => {
  let total = 0;
  addedEntries.value.forEach((entry) => {
    total += entryTotalVat(entry);
  });

  return total;
};

const totalSumWithVat = () => {
  let total = 0;
  addedEntries.value.forEach((entry) => {
    total += entryTotalVat(entry) + entryTotalCost(entry);
  });

  return total;
};

const deleteEntry = (index) => {
  addedEntries.value.splice(index, 1);
};
</script>

<style scoped>
button:hover {
  cursor: pointer;
}

#mobile-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;
}

#mobile-box img {
  max-width: 100px;
}

#mobile-box table {
  border-collapse: collapse;
  width: 100%;
}

#mobile-box table td,
th {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #dddddd;
}

#desktop-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 10px;
  max-width: 1080px;
  width: 100%;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
}

header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 100px;
}

header img {
  max-width: 150px;
  width: 100%;
}

#address {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-right: 5%;
  margin-bottom: 100px;
}

#address h3 {
  margin: 0 0 10px 0;
}

#info {
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

#info h3,
p {
  margin: 0 0 10px 0;
}

#additional-info h3 {
  margin: 0 0 10px 0;
}

#additional-info p {
  margin: 0 0 50px 0;
}

#product-list {
  margin-bottom: 20px;
}

#product-list table {
  border-collapse: collapse;
  width: 100%;
}

#product-list table td,
th {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #dddddd;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

#description-header {
  width: 25%;
}

#quantity-header {
  width: 10%;
}

#quantity {
  width: 50%;
}

#total-cost-header {
  width: 12%;
}

#delete-header {
  width: 3%;
}

#totals {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

#totals div {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  font-weight: bold;
}

#taxes-info h4 {
  margin: 100px 0 10px 0;
}

footer {
  display: flex;
  justify-content: space-between;
}

footer h4 {
  margin: 20px 0 10px 0;
}

.horizontal-line {
  width: 100%;
  border-top: 5px solid black;
  margin: 10px 0;
}

.horizontal-line-thin {
  width: 100%;
  border-top: 2px solid black;
  margin: 10px 0;
}

@media only screen and (min-width: 376px) {
  #desktop-box {
    margin: 20px 20px;
    width: 95%;
    padding: 30px;
  }

  #address {
    margin-right: 25%;
  }
}
</style>
