import Int "mo:base/Int";

import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Random "mo:base/Random";
import Blob "mo:base/Blob";

actor {
  type DesignParams = {
    description: Text;
    styleIntensity: Nat;
    detailLevel: Nat;
    colorPalette: Text;
    stylePreset: Text;
  };

  public func generateDesign(params: DesignParams) : async Text {
    // In a real-world scenario, this function would use AI to generate a design
    // For this example, we'll return a placeholder image with parameters encoded in the URL
    let baseUrl = "https://picsum.photos/seed/";
    let seed = await Random.blob();
    let seedArray = Blob.toArray(seed);
    let seedText = Text.join("", Iter.fromArray(Array.map<Nat8, Text>(seedArray, func (n) { Nat.toText(Nat8.toNat(n)) })));
    let url = baseUrl # seedText # "/400/400?";
    
    // Explicitly use the params record fields
    let queryParams = "intensity=" # Nat.toText(params.styleIntensity) #
                      "&detail=" # Nat.toText(params.detailLevel) #
                      "&palette=" # params.colorPalette #
                      "&style=" # params.stylePreset;
    
    return url # queryParams;
  };
};
