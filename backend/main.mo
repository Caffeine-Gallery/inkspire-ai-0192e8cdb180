import Int "mo:base/Int";

import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Float "mo:base/Float";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Random "mo:base/Random";
import Blob "mo:base/Blob";

actor {
  type DesignParams = {
    description: Text;
    lineThickness: Nat;
    contrast: Nat;
    brightness: Nat;
    colorPalette: Text;
    stylePreset: Text;
  };

  let tattooImages = [
    "https://example.com/tattoo1.jpg",
    "https://example.com/tattoo2.jpg",
    "https://example.com/tattoo3.jpg",
    "https://example.com/tattoo4.jpg",
    "https://example.com/tattoo5.jpg",
    "https://example.com/tattoo6.jpg",
    "https://example.com/tattoo7.jpg",
    "https://example.com/tattoo8.jpg",
    "https://example.com/tattoo9.jpg",
    "https://example.com/tattoo10.jpg"
  ];

  public func generateDesign(params: DesignParams) : async Text {
    let seed = await Random.blob();
    let seedArray = Blob.toArray(seed);
    let seedNat = if (seedArray.size() > 0) { Nat8.toNat(seedArray[0]) } else { 0 };
    let imageIndex = seedNat % Array.size(tattooImages);
    let baseUrl = tattooImages[imageIndex];
    
    let lineThickness = Float.toText(Float.fromInt(params.lineThickness) / 100);
    let contrast = Float.toText(Float.fromInt(params.contrast) / 100);
    let brightness = Float.toText(Float.fromInt(params.brightness) / 100);
    
    let url = baseUrl # "?line=" # lineThickness #
              "&contrast=" # contrast #
              "&brightness=" # brightness #
              "&color=" # params.colorPalette #
              "&style=" # params.stylePreset;
    
    return url;
  };
};
