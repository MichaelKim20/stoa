/*******************************************************************************

    The class that defines and parses the BitField of a block.

    Copyright:
        Copyright (c) 2020 BOS Platform Foundation Korea
        All rights reserved.

    License:
        MIT License. See LICENSE for details.

*******************************************************************************/

import { validateJSON } from '../utils';

/**
 * The class that defines and parses the BitField of a block.
 * Convert JSON object to TypeScript's instance.
 * An exception occurs if the required property are not present.
 */
export class BitField
{
    _storage: number[];

    /**
     * Constructor
     * @param storage
     */
    constructor (storage?: number[])
    {
        if (storage != undefined)
            this._storage = storage;
        else
            this._storage = [];
    }

    /**
     * Reads from JSON.
     * @param json - The JSON data
     */
    public fromJSON (json: any)
    {
        validateJSON(this, json);

        for (let elem of json._storage)
            this._storage.push(Number(elem));
    }
}
