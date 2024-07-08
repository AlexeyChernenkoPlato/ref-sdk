import { TokenMetadata } from './types';

export const FEE_DIVISOR = 10000;

export const STABLE_LP_TOKEN_DECIMALS = 18;
export const RATED_POOL_LP_TOKEN_DECIMALS = 24;
export const STORAGE_TO_REGISTER_WITH_MFT = '0.1';
export const ONE_YOCTO_NEAR = '0.000000000000000000000001';
let ENV: string | undefined = '';
let INDEXER_URL: string | undefined = '';
export function getConfig(
  params?: Partial<{
    env: string;
    indexerUrl: string;
    nodeUrl: string;
  }>
) {
  const {
    env = ENV || process.env.NEAR_ENV,
    indexerUrl = INDEXER_URL,
    nodeUrl,
  } = params || {};
  ENV = env;
  INDEXER_URL = indexerUrl;
  switch (env) {
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: nodeUrl || 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        WRAP_NEAR_CONTRACT_ID: 'wrap.near',
        REF_FI_CONTRACT_ID: 'v2.ref-finance.near',
        REF_TOKEN_ID: 'token.v2.ref-finance.near',
        indexerUrl: indexerUrl || 'https://indexer.ref.finance',
        explorerUrl: 'https://testnet.nearblocks.io',
        REF_DCL_SWAP_CONTRACT_ID: 'dclv2.ref-labs.near',
      };
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: nodeUrl || 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        indexerUrl: indexerUrl || 'https://testnet-indexer.ref-finance.com',
        WRAP_NEAR_CONTRACT_ID: 'wrap.testnet',
        REF_FI_CONTRACT_ID: 'ref-finance-101.testnet',
        REF_TOKEN_ID: 'ref.fakes.testnet',
        explorerUrl: 'https://testnet.nearblocks.io',
        REF_DCL_SWAP_CONTRACT_ID: 'dclv2.ref-dev.testnet',
      };
    case 'dev':
      return {
        networkId: 'testnet',
        nodeUrl: nodeUrl || 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        indexerUrl: indexerUrl || 'https://dev-indexer.ref-finance.com',
        WRAP_NEAR_CONTRACT_ID: 'wrap.testnet',
        REF_FI_CONTRACT_ID: 'exchange.ref-dev.testnet',
        REF_TOKEN_ID: 'ref.fakes.testnet',
        explorerUrl: 'https://testnet.nearblocks.io',
        REF_DCL_SWAP_CONTRACT_ID: 'refv2-dev.ref-dev.testnet',
      };
    default:
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        REF_FI_CONTRACT_ID: 'v2.ref-finance.near',
        WRAP_NEAR_CONTRACT_ID: 'wrap.near',
        REF_TOKEN_ID: 'token.v2.ref-finance.near',
        indexerUrl: indexerUrl || 'https://indexer.ref.finance',
        explorerUrl: 'https://nearblocks.io',
        REF_DCL_SWAP_CONTRACT_ID: 'dclv2.ref-labs.near',
      };
  }
}

export let config = getConfig({});

export let REF_FI_CONTRACT_ID = config.REF_FI_CONTRACT_ID;

export let WRAP_NEAR_CONTRACT_ID = config.WRAP_NEAR_CONTRACT_ID;

export let REF_TOKEN_ID = config.REF_TOKEN_ID;

export let WNEAR_META_DATA: TokenMetadata = {
  id: WRAP_NEAR_CONTRACT_ID,
  name: 'wNEAR',
  symbol: 'wNEAR',
  decimals: 24,
  icon: 'https://assets.ref.finance/images/w-NEAR-no-border.png',
};

export let REF_META_DATA = {
  decimals: 18,
  icon:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
  id: REF_TOKEN_ID,
  name: 'Ref Finance Token',
  symbol: 'REF',
};

export const NEAR_META_DATA: TokenMetadata = {
  id: 'NEAR',
  name: 'NEAR',
  symbol: 'NEAR',
  decimals: 24,
  icon:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2AAAANgCAIAAADF8JzzAAAACXBIWXMAABYlAAAWJQFJUiTwAAAgAElEQVR4nO3d7VXb2rqw4eQd57/cgZ0KLCqwVwWIChAVYCrAqQBTgUUFERVEVBBTwTYdmArWO/by3uzMfBA+bHlK87r+nTP2WBFSjO/o8SN//Pvvvz8AAMB//T9nAgCA7wlEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAAC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ICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAID/+fDhw/8H0I0VimXUJpsAAAAASUVORK5CYII=',
};

export const TokenLinks = {
  NEAR: 'https://awesomenear.com/near-protocol',
  wNEAR: 'https://awesomenear.com/near-protocol',
  REF: 'https://awesomenear.com/ref-finance',
  OCT: 'https://awesomenear.com/octopus-network',
  PARAS: 'https://awesomenear.com/paras',
  SKYWARD: 'https://awesomenear.com/skyward-finance',
  FLX: 'https://awesomenear.com/flux',
  PULSE: 'https://awesomenear.com/pulse',
  DBIO: 'https://awesomenear.com/debio-network',
  MYRIA: 'https://awesomenear.com/myriad-social',
  PXT: 'https://awesomenear.com/cryptoheroes',
  HAPI: 'https://awesomenear.com/hapi',
  OIN: 'https://awesomenear.com/oin-finance',
  ABR: 'https://awesomenear.com/allbridge',
  '1MIL': 'https://awesomenear.com/1millionnfts',
  MARMAJ: 'https://awesomenear.com/marmaj-foundation',
  marmaj: 'https://awesomenear.com/marmaj-foundation',
  USN: 'https://awesomenear.com/decentral-bank',
  '1INCH': 'https://awesomenear.com/1inch-network',
  GRT: 'https://awesomenear.com/the-graph',
  LINK: 'https://awesomenear.com/chainlink',
  Cheddar: 'https://awesomenear.com/cheddar-farm',
  AURORA: 'https://awesomenear.com/aurora-dev',
  $META: 'https://awesomenear.com/meta-pool',
  UMINT: 'https://awesomenear.com/youminter',
  UTO: 'https://awesomenear.com/secret-skellies-society',
  DEIP: 'https://awesomenear.com/deip',
  WOO: 'https://awesomenear.com/woo-dex',
  LINEAR: 'https://awesomenear.com/linear-protocol',
  PEM: 'https://awesomenear.com/pembrock-finance',
  ATO: 'https://awesomenear.com/atocha-protocol',
  SEAT: 'https://awesomenear.com/seatlab-nft',
  FAR: 'https://awesomenear.com/few-and-far',
  BSTN: 'https://awesomenear.com/bastion',
  BRRR: 'https://awesomenear.com/burrow',
  XNL: 'https://awesomenear.com/chronicle',
  KSW: 'https://awesomenear.com/killswitch-finance',
  STNEAR: 'https://awesomenear.com/meta-pool',
  NearX: 'https://awesomenear.com/stader',
  SD: 'https://awesomenear.com/stader',
  DISC: 'https://awesomenear.com/discovol',
} as Record<string, string>;

export const CONSTANT_D = 1.0001;

export const POINTLEFTRANGE = -800000;
export const POINTRIGHTRANGE = 800000;

export const switchEnv = () => {
  config = getConfig({});
  REF_FI_CONTRACT_ID = config.REF_FI_CONTRACT_ID;
  WRAP_NEAR_CONTRACT_ID = config.WRAP_NEAR_CONTRACT_ID;
  REF_TOKEN_ID = config.REF_TOKEN_ID;
  REF_META_DATA = {
    decimals: 18,
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
    id: REF_TOKEN_ID,
    name: 'Ref Finance Token',
    symbol: 'REF',
  };
  WNEAR_META_DATA = {
    id: WRAP_NEAR_CONTRACT_ID,
    name: 'wNEAR',
    symbol: 'wNEAR',
    decimals: 24,
    icon: 'https://assets.ref.finance/images/w-NEAR-no-border.png',
  };
  return {
    config,
    REF_FI_CONTRACT_ID,
    WRAP_NEAR_CONTRACT_ID,
    REF_TOKEN_ID,
    REF_META_DATA,
    WNEAR_META_DATA,
  };
};
