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
    gs4: '#727272',
    gs5: '#bfbfbf',
    gs6: '#fafafa',
    gs7: '#ffffff',
  };

  onBoarding = {
    progressBarPos: this.theme.pa2,
    progressBarBg: this.theme.gs7,
    header: this.theme.gs7,
    text: this.theme.gs7,
    welcomeTxt: this.theme.gs7,
    icon: this.theme.gs7,
    signupBtn: this.theme.pa1,
    signupBtnTxt: this.theme.gs7,
    loginBtn: this.theme.pa1,
    loginBtnTxt: this.theme.gs7,
    signupLoginDividerBar: this.theme.gs7,
    alternativeBtn: this.theme.gs0,
    alternativeBtnTxt: this.theme.gs7,
    seeCatalogTxt: this.theme.gs7,
    formBackground: this.theme.gs7,
    textInputPrimary: this.theme.pa2,
    textInputActive: this.theme.pa2,
    textInputPlaceholder: this.theme.gs4,
    textInputTxt: this.theme.gs0,
    textInputUnderline: this.theme.gs4,
    inputIcon: this.theme.gs4,
    submitBtn: this.theme.pa2,
    submitBtnText: this.theme.gs7,
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
