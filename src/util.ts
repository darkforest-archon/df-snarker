import { 
    ContractCaller,
    createContract, 
    createEthConnection, 
    EthConnection 
} from '@darkforest_eth/network';
import type {
    DarkForestCore,
    DarkForestGetters,
    DarkForestTokens,
    Whitelist,
} from '@dfdao/contracts/typechain';
import {
    CORE_CONTRACT_ADDRESS,
    GETTERS_CONTRACT_ADDRESS,
    TOKENS_CONTRACT_ADDRESS,
    WHITELIST_CONTRACT_ADDRESS,
} from '@dfdao/contracts';
import { BigNumber as EthersBN } from 'ethers';
import type { providers, Wallet } from 'ethers';
import coreContractAbiUrl from '@dfdao/contracts/abis/DarkForestCore.json';

export interface Constants {
    DISABLE_ZK_CHECKS: boolean;
  
    PLANETHASH_KEY: number;
    SPACETYPE_KEY: number;
    BIOMEBASE_KEY: number;
    PERLIN_LENGTH_SCALE: number;
    PERLIN_MIRROR_X: boolean;
    PERLIN_MIRROR_Y: boolean;
  
    MAX_NATURAL_PLANET_LEVEL: number;
    TIME_FACTOR_HUNDREDTHS: number;
    
    PERLIN_THRESHOLD_1: number;
    PERLIN_THRESHOLD_2: number;
    PERLIN_THRESHOLD_3: number;
    INIT_PERLIN_MIN: number;
    INIT_PERLIN_MAX: number;
    BIOME_THRESHOLD_1: number;
    BIOME_THRESHOLD_2: number;
    PLANET_RARITY: number;
  
    PHOTOID_ACTIVATION_DELAY: number;
    LOCATION_REVEAL_COOLDOWN: number;
}
let constants: Constants;

function getEthConnection(): Promise<EthConnection> {
    const isProd = process.env.NODE_ENV === 'production';
    const defaultUrl = 'https://rpc-df.xdaichain.com/';
  
    return createEthConnection(defaultUrl);
}

/**
 * Loads the Core game contract, which is responsible for updating the state of the game.
 * @see https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestCore.sol
 */
 export async function loadCoreContract(
    address: string,
    provider: providers.JsonRpcProvider,
    signer?: Wallet
): Promise<DarkForestCore> {
    return createContract<DarkForestCore>(address, coreContractAbiUrl, provider, signer);
}

async function getConstants(): Promise<Constants> {
    const ethConnection = await getEthConnection();
    await ethConnection.loadContract(CORE_CONTRACT_ADDRESS, loadCoreContract);
    const contractCaller = new ContractCaller();
    const coreContract = ethConnection.getContract<DarkForestCore>(CORE_CONTRACT_ADDRESS);
    const {
        DISABLE_ZK_CHECKS,
        PLANETHASH_KEY,
        SPACETYPE_KEY,
        BIOMEBASE_KEY,
        PERLIN_LENGTH_SCALE,
        PERLIN_MIRROR_X,
        PERLIN_MIRROR_Y,
    } = await contractCaller.makeCall(coreContract.snarkConstants);

    const {
        SHRINK,
        SHRINK_START,
        ROUND_END,
        DISC_UPPER_BOUND,
        DISC_LOWER_BOUND,
        MIN_RADIUS,
        DESTROY_THRESHOLD,
        INITIAL_WORLD_RADIUS,
        MAX_NATURAL_PLANET_LEVEL,
        TIME_FACTOR_HUNDREDTHS,
        PERLIN_THRESHOLD_1,
        PERLIN_THRESHOLD_2,
        PERLIN_THRESHOLD_3,
        INIT_PERLIN_MIN,
        INIT_PERLIN_MAX,
        SPAWN_RIM_AREA,
        BIOME_THRESHOLD_1,
        BIOME_THRESHOLD_2,
        PLANET_RARITY,
        PHOTOID_ACTIVATION_DELAY,
        LOCATION_REVEAL_COOLDOWN
    } = await contractCaller.makeCall(coreContract.gameConstants);

    constants = {
        BIOMEBASE_KEY: BIOMEBASE_KEY.toNumber(),
        BIOME_THRESHOLD_1: BIOME_THRESHOLD_1.toNumber(),
        BIOME_THRESHOLD_2: BIOME_THRESHOLD_2.toNumber(),
        DISABLE_ZK_CHECKS: DISABLE_ZK_CHECKS,
        INIT_PERLIN_MAX: INIT_PERLIN_MAX.toNumber(),
        INIT_PERLIN_MIN: INIT_PERLIN_MIN.toNumber(),
        LOCATION_REVEAL_COOLDOWN: LOCATION_REVEAL_COOLDOWN.toNumber(),
        MAX_NATURAL_PLANET_LEVEL: MAX_NATURAL_PLANET_LEVEL.toNumber(),
        PERLIN_LENGTH_SCALE: PERLIN_LENGTH_SCALE.toNumber(),
        PERLIN_MIRROR_X: PERLIN_MIRROR_X,
        PERLIN_MIRROR_Y: PERLIN_MIRROR_Y,
        PERLIN_THRESHOLD_1: PERLIN_THRESHOLD_1.toNumber(),
        PERLIN_THRESHOLD_2: PERLIN_THRESHOLD_2.toNumber(),
        PERLIN_THRESHOLD_3: PERLIN_THRESHOLD_3.toNumber(),
        PHOTOID_ACTIVATION_DELAY: PHOTOID_ACTIVATION_DELAY.toNumber(),
        PLANETHASH_KEY: PLANETHASH_KEY.toNumber(),
        PLANET_RARITY: PLANET_RARITY.toNumber(),
        SPACETYPE_KEY: SPACETYPE_KEY.toNumber(),
        TIME_FACTOR_HUNDREDTHS: TIME_FACTOR_HUNDREDTHS.toNumber(),
    };
    console.log("constants: ", constants);
    return constants;
}

getConstants();

export { constants };