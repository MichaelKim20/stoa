/*******************************************************************************

    The class that defines and parses the BitField of a block.

    Copyright:
        Copyright (c) 2020 BOS Platform Foundation Korea
        All rights reserved.

    License:
        MIT License. See LICENSE for details.

*******************************************************************************/

/**
 * The class that defines and parses the BitField of a block.
 * Convert JSON object to TypeScript's instance.
 * An exception occurs if the required property are not present.
 */
export class BitField
{
    /**
     * The array of bit field
     */
    public _storage: number[];

    /**
     * The number of byte
     */
    private readonly BitsPerElement: number = 32;

    /**
     * Constructor
     * @param storage - The array of bit field
     * @param size - The length of array
     * @param bytesPerElement - The bytes of element
     */
    constructor (storage?: number[], size?: number, bytesPerElement?: number)
    {
        if (bytesPerElement === undefined)
            bytesPerElement = 4;

        this.BitsPerElement = bytesPerElement + 8;

        if (storage != undefined)
        {
            this._storage = storage;
        }
        else
        {
            if (size !== undefined)
            {
                this._storage = new Array<number>(Math.ceil(size / this.BitsPerElement));
                this.wipe();
            }
            else
            {
                this._storage = [];
            }
        }
    }

    public grow (size: number)
    {
        let length = Math.ceil(size / this.BitsPerElement);
        while (this._storage.length < length)
            this._storage.push(0);
    }

    public clone ()
    {
        return new BitField(this._storage.slice());
    }

    public set (value: boolean, index: number)
    {
        if ((index < 0) || (index >= this.length()))
            throw new Error("Out of range");

        if (value)
            this._storage[index / this.BitsPerElement] |= this.mask(index);
        else
            this._storage[index / this.BitsPerElement] &= ~this.mask(index);
    }

    public get (index: number): boolean
    {
        if ((index < 0) || (index >= this.length()))
            throw new Error("Out of range");

        return !!(this._storage[index / this.BitsPerElement] & this.mask(index));
    }

    public wipe ()
    {
        for (let elem of this._storage)
            elem = 0;
    }

    public length (): number
    {
        return this._storage.length * this.BitsPerElement;
    }

    /**
     * Reads from JSON.
     * @param json - The JSON data
     */
    public fromJSON (json: any)
    {
        if (json._storage === undefined)
            throw new Error('Parse error: BitField._storage');

        this._storage = json._storage.slice();
    }

    private mask (index: number): number
    {
        return (1 << (this.BitsPerElement - 1 - (index % this.BitsPerElement)));
    }
}
