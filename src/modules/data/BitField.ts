/*******************************************************************************

    The class that defines the BitField of a block.

    Copyright:
        Copyright (c) 2020 BOS Platform Foundation Korea
        All rights reserved.

    License:
        MIT License. See LICENSE for details.

*******************************************************************************/

import { Validator, IBitField } from "./validator";

/**
 * The class that defines the BitField of a block.
 * Convert JSON object to TypeScript's instance.
 * An exception occurs if the required property are not present.
 */
export class BitField
{
    /**
     * The storage with bit data
     */
    public _storage: number[];

    /**
     * Constructor
     * @param storage - The source storage with bit data
     */
    constructor (storage?: number[])
    {
        if (storage !== undefined)
            this._storage = storage;
        else
            this._storage = [];
    }

    /**
     * This parses JSON.
     * @param json - The JSON data
     * @returns The instance of BitField
     */
    public parseJSON (json: any): BitField
    {
        Validator.isValidOtherwiseThrow<IBitField>('BitField', json);

        this._storage = json._storage.slice();

        return this;
    }
}
