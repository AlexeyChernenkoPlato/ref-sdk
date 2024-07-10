import {
  keyStores,
  InMemorySigner,
  providers,
  transactions as nearTransactions,
  utils,
  KeyPair,
} from 'near-api-js';
import BN from 'bn.js';
import { getConfig } from './constant';
import { NoPuiblicKeyError, InValidAccessKeyError } from './error';
import type { AccessKeyView } from 'near-api-js/lib/providers/provider';
import type { Transaction, TransformedTransaction } from './types';
import { transformTransactions } from './utils';

export const getKeyStore = () => {
  return new keyStores.InMemoryKeyStore();
};

export const getProvider = () =>
  new providers.JsonRpcProvider({
    url: getConfig().nodeUrl,
  });

export const getMemorySigner = async ({
  AccountId,
  keyPair,
}: {
  AccountId: string;
  keyPair: KeyPair;
}) => {
  try {
    const myKeyStore = new keyStores.InMemoryKeyStore();
    myKeyStore.setKey(getConfig().networkId, AccountId, keyPair);

    const signer = new InMemorySigner(myKeyStore);

    return signer;
  } catch (error) {
    throw error;
  }
};

const validateAccessKey = (
  transaction: TransformedTransaction,
  accessKey: AccessKeyView
) => {
  if (accessKey.permission === 'FullAccess') {
    return accessKey;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { receiver_id, method_names } = accessKey.permission.FunctionCall;

  if (transaction.receiverId !== receiver_id) {
    return null;
  }

  return transaction.actions.every(action => {
    if (action.type !== 'FunctionCall') {
      return false;
    }

    const { methodName, deposit } = action.params;

    if (method_names.length && method_names.includes(methodName)) {
      return false;
    }

    return parseFloat(deposit) <= 0;
  });
};

export const getSignedTransactionsByMemoryKey = async ({
  transactionsRef,
  AccountId,
  keyPair,
}: {
  transactionsRef: Transaction[];
  AccountId: string;
  keyPair: KeyPair;
}) => {
  const transactions = transformTransactions(transactionsRef, AccountId);

  const provider = getProvider();
  const block = await provider.block({ finality: 'final' });

  const signedTransactions: Array<nearTransactions.SignedTransaction> = [];
  const signer = await getMemorySigner({ AccountId, keyPair });

  for (let i = 0; i < transactions.length; i += 1) {
    const transaction = transactions[i];

    const publicKey = await signer.getPublicKey(
      AccountId,
      getConfig().networkId
    );
    if (!publicKey) {
      throw NoPuiblicKeyError;
    }

    const accessKey = await provider.query<AccessKeyView>({
      request_type: 'view_access_key',
      finality: 'final',
      account_id: AccountId,
      public_key: publicKey.toString(),
    });

    if (!validateAccessKey(transaction, accessKey)) {
      throw InValidAccessKeyError;
    }

    const tx = nearTransactions.createTransaction(
      AccountId,
      utils.PublicKey.from(publicKey.toString()),
      transactions[i].receiverId,
      accessKey.nonce + i + 1,
      transaction.actions.map(action => {
        const { methodName, args, gas, deposit } = action.params;
        return nearTransactions.functionCall(
          methodName,
          args,
          new BN(gas),
          new BN(deposit)
        );
      }),
      utils.serialize.base_decode(block.header.hash)
    );

    const [, signedTx] = await nearTransactions.signTransaction(
      tx,
      signer,
      transactions[i].signerId,
      getConfig().networkId
    );
    signedTransactions.push(signedTx);
  }

  return signedTransactions;
};

export const sendTransactionsByMemoryKey = async ({
  signedTransactions,
}: {
  signedTransactions: nearTransactions.SignedTransaction[];
}) => {
  try {
    const provider = getProvider();
    const results: Array<providers.FinalExecutionOutcome> = [];

    for (let i = 0; i < signedTransactions.length; i += 1) {
      results.push(await provider.sendTransaction(signedTransactions[i]));
    }

    return results;
  } catch (err) {
    throw err;
  }
};
