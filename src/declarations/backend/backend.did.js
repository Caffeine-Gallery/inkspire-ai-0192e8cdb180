export const idlFactory = ({ IDL }) => {
  const DesignParams = IDL.Record({
    'stylePreset' : IDL.Text,
    'description' : IDL.Text,
    'colorPalette' : IDL.Text,
    'detailLevel' : IDL.Nat,
    'styleIntensity' : IDL.Nat,
  });
  return IDL.Service({
    'generateDesign' : IDL.Func([DesignParams], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
