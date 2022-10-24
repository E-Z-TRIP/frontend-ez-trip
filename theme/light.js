export default class LightTheme {
  dark = false;

  // Suffix C = contrast color
  // Preffix pa = Palette
  // Preffix bg = Background
  // Preffix gs = Greyscale

  theme = {
    pa1: '#C46B4D',
    pa2: '#177861',
    pa1C: '#ffffff',
    pa2C: '#ffffff',

    bg1: '#ffffff',
    bg1C: '#000000',

    gs0: '#000000',
    gs1: '#0d0d0d',
    gs2: '#1a1a1a',
    gs3: '#333333',
    gs4: '#4d4d4d',
    gs5: '#bfbfbf',
    gs6: '#fafafa',
    gs7: '#ffffff',
  };

  onBoarding = {
    header: this.theme.gs7,
    icon: this.theme.gs7,
    progressBar: this.theme.pa2,
  };

  // @react-navigation/native
  // NavigationContainer theme propertys
  colors = {
    primary: this.theme.gs0,
    background: this.theme.bg1,
    card: this.theme.gs1,
    text: this.theme.gs0,
    border: this.theme.gs0,
    notification: this.theme.gs0,
  };
}
