<script lang="ts">
  import { PrivateKey } from "@bsv/sdk";

  let WIF: string;
  let address: String;

  function createKeys() {
    const privKey = PrivateKey.fromRandom();
    WIF = privKey.toWif();
    address = privKey.toAddress();
  }
</script>

<section>
  <div class="p-10">
    <button on:click={createKeys} class="bg-black text-white px-3 py-2 mb-2"
      >Generate New Wallet Keys</button
    >
    <p>Private Key WIF format is: <span class="font-semibold">{WIF}</span></p>
    <p>Your Bitcoit address is: <span class="font-semibold">{address}</span></p>
  </div>
</section>