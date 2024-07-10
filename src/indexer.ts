import { config } from './constant';
import { REPLACE_TOKENS } from './ref';
import metaIconDefaults from './metaIcons';

export const getTokenPriceList = async (): Promise<any> => {
  return await fetch(config.indexerUrl + '/list-token-price', {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then(res => res.json())
    .then(list => {
      return list;
    });
};

export const getTokens = async (reload?: boolean) => {
  return fetch(config.indexerUrl + '/list-token', {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then(res => res.json())
    .then(tokens => {
      const newTokens = Object.values(tokens).reduce(
        (acc: any, cur: any, i) => {
          const id = Object.keys(tokens)[i];
          return {
            ...acc,
            [id]: {
              ...cur,
              id,
              icon:
                !cur.icon || REPLACE_TOKENS.includes(id)
                  ? metaIconDefaults[id]
                  : cur.icon,
            },
          };
        },
        {}
      );

      return newTokens;
    });
};
export const getTokensTiny = async (reload?: boolean) => {
  return fetch(config.indexerUrl + '/list-token-v2', {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then(res => res.json())
    .then(tokens => {
      const newTokens = Object.values(tokens).reduce(
        (acc: any, cur: any, i) => {
          const id = Object.keys(tokens)[i];
          return {
            ...acc,
            [id]: {
              ...cur,
              id,
            },
          };
        },
        {}
      );

      return newTokens;
    });
};

export const getWhiteListTokensIndexer = async (whiteListIds: string[]) => {
  return await fetch(config.indexerUrl + '/list-token', {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then(res => res.json())
    .then(res => {
      return whiteListIds.reduce((acc, cur, i) => {
        if (
          !res[cur] ||
          !Object.values(res[cur]) ||
          Object.values(res[cur]).length === 0
        )
          return acc;

        return {
          ...acc,
          [cur]: { ...res[cur], id: cur },
        };
      }, {});
    })
    .then(res => {
      return Object.values(res);
    });
};
