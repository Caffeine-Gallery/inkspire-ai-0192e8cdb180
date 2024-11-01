import Int "mo:base/Int";
import Nat8 "mo:base/Nat8";

import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
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
    let baseUrl = "https://dummyimage.com/";
    let seed = await Random.blob();
    let seedArray = Blob.toArray(seed);
    let seedText = Text.join("", Iter.fromArray(Array.map<Nat8, Text>(seedArray, func (n) { Nat.toText(Nat8.toNat(n)) })));
    
    let size = "400x400";
    let bgColor = switch (params.colorPalette) {
      case "purple" "8A2BE2";
      case "blue" "4169E1";
      case "pink" "FF69B4";
      case "green" "32CD32";
      case "yellow" "FFD700";
      case _ "808080";
    };
    
    let fgColor = "FFFFFF";
    
    let intensity = Float.toText(Float.fromInt(params.styleIntensity) / 100);
    let detail = Float.toText(Float.fromInt(params.detailLevel) / 100);
    
    let text = Text.join("+", Text.split(params.description, #text(" ")));
    
    let url = baseUrl # size # "/" # bgColor # "/" # fgColor # "?text=" # text # 
              "&seed=" # seedText #
              "&intensity=" # intensity #
              "&detail=" # detail #
              "&style=" # params.stylePreset;
    
    return url;
  };
};
