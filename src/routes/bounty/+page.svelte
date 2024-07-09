<script lang="ts">
  /** @type {import('./$types').ActionData} */
  export let form;
  let unlockbutton = false;
  if (form?.deploysuccess === true){
    unlockbutton = true;
  }
</script>

  


                                            <!-- This is for deploying the bounty -->
  <div
    class="mt-10 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
  >
    <form method="POST" action="?/bountydeploy">
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            type="text"
            placeholder="Enter Email"
            name="email"
          />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="password"
            type="text"
            placeholder="Enter Password"
            name="password"
          />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="amount"
            >
              Amount
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="amount"
              type="number"
              placeholder="Enter Amount"
              name="amount"
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="square"
            >
              Square
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="square"
              type="number"
              placeholder="Enter Square"
              name="square"
            />
          </div>
        <!-- <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Email
              </label>
            </div> -->
        <button
          type="submit"
          class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 ml-2 px-2 rounded "
        >
          Deploy Bounty
        </button>
      </div>
    </form>
    {#if form?.deploysuccess}
      <!-- this message is ephemeral; it exists because the page was rendered in
             response to a form submission. it will vanish if the user reloads -->
             <p class="pt-2 text-green-600 font-semibold">
                contract deployed successfully : 
                <a href={'smart lock deployed : https://whatsonchain.com/tx/' + form?.txid} class="text-blue-600 hover:text-blue-800 visited:text-purple-600">
                  Click here to see the block
                </a>
              </p>
    {/if}
  </div>

                            <!-- The following is to unlock the bounty -->
  <div
    class="mt-10 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
  >
    <form method="POST" action="?/bountyunlock">
      {#if !unlockbutton}
        <p>No bounty deployed yet. Kindly deploy the bounty smart contract first then use the following to unlock it</p>
        {/if}
        {#if unlockbutton}
        <p class="pt-2 text-green-600 font-semibold">Smart Contract deployed. Kindly enter the root and press the button to unlock.</p>
        {/if}
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              Root
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="root"
              type="number"
              placeholder="Enter Root"
              name="root"
            />
          </div>
        
        <button
          type="submit"
          class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 ml-2 px-2 rounded "
        >
          Unlock Bounty
        </button>
    </form>
    {#if form?.unlocksuccess}
      <!-- this message is ephemeral; it exists because the page was rendered in
             response to a form submission. it will vanish if the user reloads -->
             <p class="pt-2 text-green-600 font-semibold">
                contract unlocked successfully : 
                <a href={'https://whatsonchain.com/tx/' + form?.txid} class="text-blue-600 hover:text-blue-800 visited:text-purple-600">
                  Click here to see the block
                </a>
              </p>              
    {/if}
  </div>
  