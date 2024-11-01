import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface DesignParams {
  'stylePreset' : string,
  'contrast' : bigint,
  'description' : string,
  'brightness' : bigint,
  'colorPalette' : string,
  'lineThickness' : bigint,
}
export interface _SERVICE {
  'generateDesign' : ActorMethod<[DesignParams], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
