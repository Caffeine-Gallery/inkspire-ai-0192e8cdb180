export const idlFactory = ({ IDL }) => {
  const DesignParams = IDL.Record({
    'stylePreset' : IDL.Text,
    'contrast' : IDL.Nat,
    'description' : IDL.Text,
    'brightness' : IDL.Nat,
    'colorPalette' : IDL.Text,
    'lineThickness' : IDL.Nat,
  });
  return IDL.Service({
    'generateDesign' : IDL.Func([DesignParams], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
