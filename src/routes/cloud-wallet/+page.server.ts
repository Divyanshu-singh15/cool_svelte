// import { createPool, sql } from '@vercel/postgres'
// import { POSTGRES_URL } from '$env/static/private'
import NeucronSDK from "neucron-sdk";

/** @type {import('./$types').Actions} */
export const actions = {

    login: async ({request}) => {
		const data = await request.formData();

        const email = data.get('email');
		const password = data.get('password');

        // console.log("email:", email)
    
        const neucron = new NeucronSDK();

        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;
        const paymailModule = neucron.paymail;

        // const signUpResponse = await authModule.signUp({ email: "sales@timechainlabs.io", password: "string" });
        // console.log(signUpResponse);

        const loginResponse = await authModule.login({ email: email, password: password });
        // console.log(loginResponse);

        // const walletKeys = await walletModule.getWalletKeys({});
        // console.log(walletKeys);
        const paymail = await paymailModule.getPaymailList()
        // console.log("huhu",paymail.data.details.Wallets[0].paymail_id)


        // For Default wallet balance
        const DefaultWalletBalance = await walletModule.getWalletBalance({});
        // console.log(DefaultWalletBalance);

        const addresses = await walletModule.getAddressesByWalletId({});
        // console.log(addresses);

        const options = {
            outputs: [
            {
                address: 'rohan@dev.neucron.io',
                note: 'gurudakshina',
                amount: 10
            }
            ]
        };

        // const payResponse = await neucron.pay.txSpend(options)
        // console.log(payResponse)

        // const walletHistory = await walletModule.getWalletHistory({ });
        // console.log(walletHistory);


        // console.log('initiating wallet')
        // const walletCreation1 = await walletModule.createWallet({ walletName: 'Hello tsoc1' });
        // console.log(walletCreation1);

        // const walletBalance = await walletModule.getWalletBalance({ walletId: walletCreation1.walletID });
        // console.log(walletBalance);

        // const addresses = await walletModule.getAddressesByWalletId({ walletId: walletCreation1.walletID });
        // console.log(addresses);

        // const mnemonic = await walletModule.getMnemonic({ walletId: walletCreation1.walletID });
        // console.log(mnemonic);

        // const allUtxos = await walletModule.getAllUtxos({ walletId: walletCreation1.walletID });
        // console.log(allUtxos);

        // const xPubKeys = await walletModule.getXPubKeys({ walletId: walletCreation1.walletID });
        // console.log(xPubKeys);
    return { success: true, balance: DefaultWalletBalance.data.balance.summary, paymail: paymail.data.details.Wallets[0].paymail_id};
	},

    pay: async ({request}) => {
		const data = await request.formData();

        const email = data.get('email');
		const password = data.get('password');
        const amount = data.get('amount');
        const paymail = data.get('paymail')
        
        console.log("bojack", typeof amount)
        const neucron = new NeucronSDK();

        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;

        // const signUpResponse = await authModule.signUp({ email: "sales@timechainlabs.io", password: "string" });
        // console.log(signUpResponse);

        const loginResponse = await authModule.login({ email: email, password: password });
        console.log(loginResponse);

        // const walletKeys = await walletModule.getWalletKeys({});
        // console.log(walletKeys);


        // For Default wallet balance
        const DefaultWalletBalance = await walletModule.getWalletBalance({});
        console.log(DefaultWalletBalance);

        const addresses = await walletModule.getAddressesByWalletId({});
        console.log(addresses);

        const options = {
            outputs: [
            {
                address: paymail,
                note: 'gurudakshina',
                amount: parseInt(amount)
            }
            ]
        };

        const payResponse = await neucron.pay.txSpend(options)
        console.log(payResponse)

        // const walletHistory = await walletModule.getWalletHistory({ });
        // console.log(walletHistory);


        // console.log('initiating wallet')
        // const walletCreation1 = await walletModule.createWallet({ walletName: 'Hello tsoc1' });
        // console.log(walletCreation1);

        // const walletBalance = await walletModule.getWalletBalance({ walletId: walletCreation1.walletID });
        // console.log(walletBalance);

        // const addresses = await walletModule.getAddressesByWalletId({ walletId: walletCreation1.walletID });
        // console.log(addresses);

        // const mnemonic = await walletModule.getMnemonic({ walletId: walletCreation1.walletID });
        // console.log(mnemonic);

        // const allUtxos = await walletModule.getAllUtxos({ walletId: walletCreation1.walletID });
        // console.log(allUtxos);

        // const xPubKeys = await walletModule.getXPubKeys({ walletId: walletCreation1.walletID });
        // console.log(xPubKeys);
    return { success: true, payresponse: payResponse.data.txid };
	}
}