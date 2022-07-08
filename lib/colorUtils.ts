class ValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValueError";
  }
}

/**
 * Adds a decimal alpha component to a hex code.
 *
 * @param hexCode "#rrggbb" or "#rrggbbaa" (shorthands are not supported).
 * @param opacity Decimal between 0-1 if the hex code doesn't already have the
 * alpha component. If it does, the value can also be negative to subtract from
 * the original alpha. (The result will be clamped, so passing other values will
 * still produce a valid hex code.)
 *
 * @return The given hex code with the added opacity.
 * */
export function addOpacityToHexColor(hexCode: string, opacity: number) {
  if (![7, 9].includes(hexCode.length)) {
    throw new ValueError(
      `hexCode has a length of ${hexCode.length}, expected 7 or 9.`
    );
  }

  let newOpacity;

  if (hexCode.length === 7) {
    newOpacity = opacity * 255;
  } else {
    newOpacity = parseInt(hexCode.slice(7), 16) + opacity * 255;
  }

  const newOpacityRounded = Math.round(newOpacity);
  const newOpacityClamped = Math.max(Math.min(newOpacityRounded, 255), 0);
  return hexCode.slice(0, 7) + newOpacityClamped.toString(16);
}
