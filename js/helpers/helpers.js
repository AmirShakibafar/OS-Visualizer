const generate_random_color = () => {
  const minColorValue = 20;
  const r = Math.floor(Math.random() * (256 - minColorValue) + minColorValue);
  const g = Math.floor(Math.random() * (256 - minColorValue) + minColorValue);
  const b = Math.floor(Math.random() * (256 - minColorValue) + minColorValue);
  return `rgb(${r}, ${g}, ${b})`;
};

const generateAccentColor = (
  backgroundColor = "rgb(255, 255, 255)",
  minContrast = 4.5
) => {
  // Function to parse RGB from a string
  const parseRGB = (rgbString) => {
    const [r, g, b] = rgbString.match(/\d+/g).map(Number);
    return { r, g, b };
  };

  // Function to calculate relative luminance
  const getLuminance = (r, g, b) => {
    const rgb = [r, g, b].map((value) => {
      value /= 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const getContrastRatio = (lum1, lum2) => {
    const brighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (brighter + 0.05) / (darker + 0.05);
  };

  const bg = parseRGB(backgroundColor);
  const bgLuminance = getLuminance(bg.r, bg.g, bg.b);

  const calculateColor = () => {
    const isLightBackground = bgLuminance > 0.5;

    const targetLuminance = isLightBackground
      ? bgLuminance / (minContrast - 0.05) - 0.05
      : bgLuminance * (minContrast - 0.05) + 0.05;

    const adjustedLuminance = Math.max(0, Math.min(1, targetLuminance));

    const approximateValue =
      adjustedLuminance > 0.03928
        ? Math.pow((adjustedLuminance + 0.055) / 1.055, 1 / 2.4) * 255
        : adjustedLuminance * 12.92 * 255;

    const r = Math.min(
      255,
      Math.max(0, approximateValue + Math.random() * 50 - 25)
    );
    const g = Math.min(
      255,
      Math.max(0, approximateValue + Math.random() * 50 - 25)
    );
    const b = Math.min(
      255,
      Math.max(0, approximateValue + Math.random() * 50 - 25)
    );

    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  };

  let accentColor;
  let contrast = 0;

  for (let i = 0; i < 5; i++) {
    const { r, g, b } = calculateColor();
    const accentLuminance = getLuminance(r, g, b);
    contrast = getContrastRatio(bgLuminance, accentLuminance);

    if (contrast >= minContrast) {
      accentColor = `rgb(${r}, ${g}, ${b})`;
      break;
    }
  }

  return (
    accentColor || (bgLuminance > 0.5 ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)")
  );
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export { generate_random_color, generateAccentColor, sleep };
