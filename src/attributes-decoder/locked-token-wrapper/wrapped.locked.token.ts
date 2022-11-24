import {
    BinaryCodec,
    FieldDefinition,
    StructType,
    U64Type,
} from '@elrondnetwork/erdjs/out';
import { WrappedLockedTokenType } from './wrapped.lock.token.types';

export class WrappedLockedTokenAttributes {
    lockedTokenNonce: number | undefined;

    constructor(init?: Partial<WrappedLockedTokenAttributes>) {
        Object.assign(this, init);
    }

    toJSON(): WrappedLockedTokenType {
        return {
            lockedTokenNonce: this.lockedTokenNonce,
        };
    }

    static fromDecodedAttributes(
        decodedAttributes: any,
    ): WrappedLockedTokenAttributes {
        return new WrappedLockedTokenAttributes({
            lockedTokenNonce: decodedAttributes.lockedTokenNonce.toNumber(),
        });
    }

    static fromAttributes(attributes: string): WrappedLockedTokenAttributes {
        const attributesBuffer = Buffer.from(attributes, 'base64');
        const codec = new BinaryCodec();

        const structType = WrappedLockedTokenAttributes.getStructure();
        const [decoded] = codec.decodeNested(attributesBuffer, structType);
        return WrappedLockedTokenAttributes.fromDecodedAttributes(decoded.valueOf());
    }

    static getStructure(): StructType {
        return new StructType('LockedTokenAttributes', [
            new FieldDefinition('lockedTokenNonce', '', new U64Type()),
        ]);
    }
}
