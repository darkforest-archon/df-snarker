import { 
    ContractCaller,
    createContract, 
    createEthConnection, 
    EthConnection 
} from '@darkforest_eth/network';
import { address } from '@darkforest_eth/serde';
import { DarkForest } from '@darkforest_eth/contracts/typechain';
import diamondContractAbiUrl from '@darkforest_eth/contracts/abis/DarkForest.json';
import { BigNumber as EthersBN } from 'ethers';
import type { Contract, providers, Wallet } from 'ethers';

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
 * Loads the game contract, which is responsible for updating the state of the game.
 */
 export async function loadDiamondContract<T extends Contract>(
    address: string,
    provider: providers.JsonRpcProvider,
    signer?: Wallet
  ): Promise<T> {
    return createContract<T>(address, diamondContractAbiUrl, provider, signer);
}

const contractAddress = address('0x5da117b8aB8b739346F5EdC166789E5aFb1a7145')

async function getConstants(): Promise<Constants> {
    const ethConnection = await getEthConnection();
    await ethConnection.loadContract(contractAddress, loadDiamondContract);
    const contractCaller = new ContractCaller();
    const contract = ethConnection.getContract<DarkForest>(contractAddress);
    const {
        DISABLE_ZK_CHECKS,
        PLANETHASH_KEY,
        SPACETYPE_KEY,
        BIOMEBASE_KEY,
        PERLIN_LENGTH_SCALE,
        PERLIN_MIRROR_X,
        PERLIN_MIRROR_Y,
    } = await contractCaller.makeCall(contract.getSnarkConstants);

    const {
        ADMIN_CAN_ADD_PLANETS,
        WORLD_RADIUS_LOCKED,
        WORLD_RADIUS_MIN,
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
        SILVER_SCORE_VALUE,
        PLANET_LEVEL_THRESHOLDS,
        PLANET_RARITY,
        PLANET_TRANSFER_ENABLED,
        PHOTOID_ACTIVATION_DELAY,
        LOCATION_REVEAL_COOLDOWN,
        SPACE_JUNK_ENABLED,
        SPACE_JUNK_LIMIT,
        PLANET_LEVEL_JUNK,
        ABANDON_SPEED_CHANGE_PERCENT,
        ABANDON_RANGE_CHANGE_PERCENT,
        // Capture Zones
        GAME_START_BLOCK,
        CAPTURE_ZONES_ENABLED,
        CAPTURE_ZONE_COUNT,
        CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL,
        CAPTURE_ZONE_RADIUS,
        CAPTURE_ZONE_PLANET_LEVEL_SCORE,
        CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED,
        CAPTURE_ZONES_PER_5000_WORLD_RADIUS,
    } = await contractCaller.makeCall(contract.getGameConstants);

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