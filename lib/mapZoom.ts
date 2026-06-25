export function getZoomForPlace(type: string) {

  switch (type) {

    case "country":
      return 6;

    case "state":
      return 8;

    case "city":
    case "municipality":
    case "town":
      return 13;

    case "suburb":
    case "borough":
    case "quarter":
      return 15;

    case "road":
    case "street":
      return 17;

    case "house":
    case "building":
    case "residential":
      return 19;

    default:
      return 16;
  }
}