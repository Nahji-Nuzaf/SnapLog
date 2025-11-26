export type RootStackParamList = {
  Splash: undefined;
  WizardRoute: { step: 1 | 2 | 3; nextRoute: keyof RootStackParamList };
  Details: undefined;
  Showcase: undefined;
  Home: undefined;
};