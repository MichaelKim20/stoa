/*******************************************************************************

    The class that defines and parses the transaction's outputs of a block.

    Copyright:
        Copyright (c) 2020 BOS Platform Foundation Korea
        All rights reserved.

    License:
        MIT License. See LICENSE for details.

*******************************************************************************/

import { validateJSON } from '../utils';
import {PublicKey} from "./PublicKey";

/**
 * The class that defines and parses the transaction's outputs of a block.
 * Convert JSON object to TypeScript's instance.
 * An exception occurs if the required property is not present.
 */
export class TxOutputs
{
    /**
     * The monetary value of this output, in 1/10^7
     */
    public value: bigint;

    /**
     * The public key that can spend this output
     */
    public address: PublicKey;

    /**
     * Constructor
     * @param val - The monetary value
     * @param address - The public key
     */
    constructor (val?: bigint, address?: PublicKey)
    {
        if (val != undefined)
            this.value = val;
        else
            this.value = BigInt(0);

        if (address != undefined)
            this.address = address;
        else
            this.address = new PublicKey();
    }

    /**
     * Reads form JSON.
     * @param json - The JSON data
     */
    public fromJSON (json: any)
    {
        validateJSON(this, json);

        this.value = BigInt(json.value);
        this.address.fromString(json.address);
    }
}
