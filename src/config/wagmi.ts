import { http, createConfig } from 'wagmi'
import { mainnet, polygon, bsc } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, polygon, bsc],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
  },
}) 