<script lang="ts">
    export let names
	let upid: number | null = null;
	let showFields: boolean = false;

function showUpdateFields(id: number | null): void {
	if (id == null){
		showFields = false;
	}else{
		showFields = true;
	}
    
    upid = id;
}

</script>

<div
	class="mt-10 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
>
	<div class="flex items-center justify-between mb-4">
		<div class="space-y-1">
			<h2 class="text-xl font-semibold">List of Users</h2>
			<p class="text-sm text-gray-500">
				Fetched {names.length} users
			</p>
		</div>
	</div>
	<div class="divide-y divide-gray-900/5">
		{#each names as user (user.id)}
			<div class="flex items-center justify-between py-3">
				<div class="flex items-center space-x-4">
					<div class="flex">
						<p class="font-medium pt-1 leading-none">{user.name}</p>
						<p class="font-medium pl-5 text-gray-500 pt-0">{user.email}</p>                        
					</div>
				</div>
				<div class="relative w-16 float-right right-0 flex">
					<form method="POST" action={`/profiles?/update`}>
						<input type="hidden" name="id" id="id" value={user.id}>
						{#if showFields && upid === user.id}
							<div class="absolute right-0 bottom-0">
								<input type="text" name="name" id="name"
								class="appearance-none block my-2 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								placeholder="Enter name" bind:value={user.name}>
								<input type="email" name="email" id="email"
								class="appearance-none my-2 block w-56 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								placeholder="Enter email" bind:value={user.email}>
								<button type="submit"
								class="bg-green-500 hover:bg-green-700 text-white font-bold mt-1 ml-2 px-2 rounded "
								>Update</button>
								<button type="button" 
								class="bg-gray-500 hover:bg-gray-700 text-white font-bold mt-1 ml-2 px-2 rounded "
								on:click={() => showUpdateFields(null)}
								>Cancel</button>
							</div>
						{/if}
						{#if !showFields}
							<button type="button" on:click={() => showUpdateFields(user.id)}>
								<img class="w-4 float-right mx-2" src="./update.svg" alt="update"/>
							</button>
						{/if}

					</form>
					<form method="POST" action="/profiles?/delete">
						<input type="hidden" name="id" id="id" value={user.id}>
						<button type="submit">
							<img class="w-4 float-right mx-2" src="./trash-can.svg" alt="delete"/>
						</button>
					</form>
				</div>
			</div>
		{/each}
	</div>
</div>


