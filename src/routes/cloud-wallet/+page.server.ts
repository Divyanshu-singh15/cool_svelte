import type { RequestEvent } from '@sveltejs/kit';
import NeucronSDK from "neucron-sdk";

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request }: RequestEvent) => {
        const data = await request.formData();

        const email = data.get('email') as string;
        const password = data.get('password') as string;

        const neucron = new NeucronSDK();

        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;
        const paymailModule = neucron.paymail;

        const loginResponse = await authModule.login({ email, password });

        const paymail = await paymailModule.getPaymailList();

        const DefaultWalletBalance = await walletModule.getWalletBalance({});

        const addresses = await walletModule.getAddressesByWalletId({});

        return { 
            success: true, 
            balance: DefaultWalletBalance.data.balance.summary, 
            paymail: paymail.data.details.Wallets[0].paymail_id
        };
    },

    pay: async ({ request }: RequestEvent) => {
        const data = await request.formData();

        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const amount = data.get('amount') as string;
        const paymail = data.get('paymail') as string;

        const neucron = new NeucronSDK();

        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;

        const loginResponse = await authModule.login({ email, password });
        console.log(loginResponse);

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

        const payResponse = await neucron.pay.txSpend(options);
        console.log(payResponse);

        return { success: true, payresponse: payResponse.data.txid };
    }
};