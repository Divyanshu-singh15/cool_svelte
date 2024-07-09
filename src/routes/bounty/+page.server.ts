import { DefaultProvider, bsv } from 'scrypt-ts'
import { Root } from './src/contracts/root'
import { NeucronSigner } from 'neucron-signer'

const provider = new DefaultProvider({ network: bsv.Networks.mainnet })
const signer = new NeucronSigner(provider)
let instance;
/** @type {import('./$types').Actions} */
export const actions = {


    bountydeploy: async ({request}) => {
        const data = await request.formData();

        const email = data.get('email');
		const password = data.get('password');
        const amount = parseInt(data.get('amount'));
        let square: BigInt = BigInt(data.get('square'));


        await signer.login(email, password);
        await Root.loadArtifact();

        instance = new Root(square);
        await instance.connect(signer);

        try{
            const deployTx = await instance.deploy(amount);
        console.log('smart lock deployed : https://whatsonchain.com/tx/' + deployTx.id);
        return {deploysuccess: true, txid: deployTx.id}

        }catch{
            return {deploysuccess: false, txid: null}
        }
        
        
    },


    bountyunlock: async ({request}) => {
        const data = await request.formData();
        const root = parseInt(data.get('root'));

        console.log("meow", instance)

        try{
            await new Promise((f) => setTimeout(f, 5000))
        const { tx: callTx } = await instance.methods.unlock(root)
        console.log('contract unlocked successfully : https://whatsonchain.com/tx/' + callTx.id)

        return {unlocksuccess: true, txid: callTx.id}
        }catch{
            return {unlocksuccess: false, txid: null}
        }
        
    }

}