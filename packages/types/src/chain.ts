import { TokenType } from "./tx";

export type Currency = {
  token: string;
  symbol: TokenType;
  gasPriceStep?: {
    low: number;
    average: number;
    high: number;
  };
};

export enum BridgeType {
  IBC = "ibc",
  Ethereum = "ethereum-bridge",
}

// Define keys for supported extensions
export type ExtensionKey = "namada" | "keplr" | "metamask";

export type ExtensionInfo = {
  alias: string;
  id: ExtensionKey;
  url: string;
};

// Define constant with extension properties
export const Extensions: Record<ExtensionKey, ExtensionInfo> = {
  namada: {
    alias: "Namada",
    id: "namada",
    // TODO: Update to most recent release
    url: "https://github.com/anoma/namada-interface/releases/tag/v0.1.0-48adf43",
  },
  keplr: {
    alias: "Keplr",
    id: "keplr",
    url: "https://www.keplr.app/",
  },
  metamask: {
    alias: "Metamask",
    id: "metamask",
    url: "https://metamask.io/",
  },
};

export type Chain = {
  alias: string;
  bech32Prefix: string;
  bip44: {
    coinType: number;
  };
  bridgeType: BridgeType[];
  chainId: string;
  currency: Currency;
  extension: ExtensionInfo;
  rpc: string;
  ibc?: {
    portId: string;
  };
};
