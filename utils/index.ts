import { Platform } from "react-native";

export const stringifyParams = (params: any) => {
  return Object.keys(params)
    .filter((key) => params[key])
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");
};

export const marginMap: { [key: string]: string } = {
  m: "margin",
  mx: "marginHorizontal",
  my: "marginVertical",
  mt: "marginTop",
  mb: "marginBottom",
  ml: "marginLeft",
  mr: "marginRight",
};

export const paddingMap: { [key: string]: string } = {
  p: "padding",
  px: "paddingHorizontal",
  py: "paddingVertical",
  pt: "paddingTop",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight",
};

export const shadowProps = {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.17,
  shadowRadius: 3.05,
  background: "white",
  elevation: 4,
};

export const lightShadowProps = {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
};

export const getSpacing = (num?: number | string) =>
  typeof num !== "number" ? num : num * 8;

export const capitalize = (str?: string) => {
  if (!str) return str;
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const validationRules = (DATA: { [key: string]: any }) =>
  Object.keys(DATA).reduce((acc: any, c) => {
    acc[c] = (val: any) => !val;
    return acc;
  }, {});

export const isAndroid = Platform.OS === "android";

export const AllItems = [
  {
    id: "iron-trunk",
    title: "Iron trunk",
    category: "storage",
  },
  {
    id: "suitcases-large",
    title: "Suitcases (large)",
    category: "storage",
  },
  {
    id: "suitcases-medium",
    title: "Suitcases (medium)",
    category: "storage",
  },
  {
    id: "suitcases-small",
    title: "Suitcases (small)",
    category: "storage",
  },
  {
    id: "trunkpeti-medium",
    title: "Trunk/Peti (Medium)",
    category: "storage",
  },
  {
    id: "trunkpeti-small",
    title: "Trunk/Peti (Small)",
    category: "storage",
  },
  {
    id: "trunksandook-large",
    title: "Trunk/Sandook (Large)",
    category: "storage",
  },
  {
    id: "blanketscomforters-double",
    title: "Blankets/Comforters (Double)",
    category: "storage",
  },
  {
    id: "blanketscomforters-single",
    title: "Blankets/Comforters (Single)",
    category: "storage",
  },
  {
    id: "carton-large",
    title: "Carton Large",
    category: "storage",
  },
  {
    id: "carton-medium",
    title: "Carton Medium",
    category: "storage",
  },
  {
    id: "cartons-small",
    title: "Cartons Small",
    category: "storage",
  },
  {
    id: "charpai",
    title: "Charpai",
    category: "storage",
  },
  {
    id: "painting-large",
    title: "Painting Large",
    category: "storage",
  },
  {
    id: "painting-medium",
    title: "Painting Medium",
    category: "storage",
  },
  // --Electronics--
  {
    id: "air-cooler-large",
    title: "Air Cooler (Large)",
    category: "electronics",
    fragile: true,
  },
  {
    id: "air-cooler-small",
    title: "Air Cooler (Small)",
    category: "electronics",
    fragile: true,
  },
  {
    id: "dryer",
    title: "Dryer",
    category: "electronics",
  },
  {
    id: "washing-machine",
    title: "Washing Machine",
    category: "electronics",
  },
  {
    id: "ac-split",
    title: "AC Split",
    category: "electronics",
  },
  {
    id: "ac-window",
    title: "AC window",
    category: "electronics",
  },
  {
    id: "big-speaker",
    title: "Big Speaker",
    category: "electronics",
  },

  {
    id: "deep-freezer-double",
    title: "Deep Freezer (Double)",
    category: "electronics",
  },
  {
    id: "deep-freezer-single",
    title: "Deep Freezer (Single)",
    category: "electronics",
  },
  {
    id: "fridge-double-door",
    title: "Fridge (Double Door)",
    category: "electronics",
    fragile: true,
  },
  {
    id: "fridge-large",
    title: "Fridge Large",
    category: "electronics",
    fragile: true,
  },
  {
    id: "fridge-medium",
    title: "Fridge Medium",
    category: "electronics",
    fragile: true,
  },
  {
    id: "fridge-small",
    title: "Fridge Small",
    category: "electronics",
    fragile: true,
  },
  {
    id: "led-29-43",
    title: `LED 29" to 43"`,
    category: "electronics",
    fragile: true,
  },
  {
    id: "led-49-55",
    title: `LED 49" to 55"`,
    category: "electronics",
    fragile: true,
  },
  {
    id: "led-28",
    title: `LED/TV upto 28"`,
    category: "electronics",
    fragile: true,
  },
  {
    id: "oven",
    title: `Oven`,
    category: "electronics",
  },
  {
    id: "vacuum-cleaner",
    title: `Vacuum Cleaner`,
    category: "electronics",
  },
  // --Garden
  {
    id: "plants-small",
    title: "Plants (Small)",
    category: "garden",
  },
  {
    id: "plants-medium",
    title: "Plants (Medium)",
    category: "garden",
  },
  {
    id: "plants-large",
    title: "Plants (Large)",
    category: "garden",
  },
  {
    id: "bicycle",
    title: "Bicycle",
    category: "garden",
  },
  {
    id: "dog-house-large",
    title: "Dog House (Large)",
    category: "garden",
  },
  {
    id: "dog-house-medium",
    title: "Dog House (Medium)",
    category: "garden",
  },
  {
    id: "foosball",
    title: "Foosball",
    category: "garden",
  },
  {
    id: "generator-ups",
    title: "Generator/ups",
    category: "garden",
  },
  {
    id: "ladder",
    title: "Ladder",
    category: "garden",
  },
  {
    id: "motor-bike",
    title: "Motor Bike",
    category: "garden",
  },
  {
    id: "pet-crate-large",
    title: "Pet crate (Large)",
    category: "garden",
  },
  {
    id: "pet-crate-medium",
    title: "Pet crate (Medium)",
    category: "garden",
  },
  {
    id: "3-seater-sofa",
    title: "3 Seater Sofa",
    category: "furniture",
  },
  {
    id: "coffee-table",
    title: "Coffee Table",
    category: "furniture",
    fragile: true,
  },
  {
    id: "2-seater-sofa",
    title: "2 Seater Sofa",
    category: "furniture",
  },
  {
    id: "almari-0-3-ft-wide",
    title: "Almari (0-3 ft wide)",
    category: "furniture",
  },
  {
    id: "almari-3-6-ft-wide",
    title: "Almari (3-6 ft wide)",
    category: "furniture",
  },
  {
    id: "almari-6-9-ft-wide",
    title: "Almari (6-9 ft wide)",
    category: "furniture",
  },
  {
    id: "armchair",
    title: "Armchair",
    category: "furniture",
  },
  {
    id: "bean-bag",
    title: "Bean bag",
    category: "furniture",
  },
  {
    id: "book-shelf",
    title: "Book shelf",
    category: "furniture",
  },
  {
    id: "center-table-square",
    title: "Center table (Square)",
    category: "furniture",
    fragile: true,
  },
  {
    id: "office-chair",
    title: "Office chair",
    category: "furniture",
  },
  {
    id: "office-file-cabinet-3-drawers",
    title: "Office File Cabinet 3 Drawers",
    category: "furniture",
  },
  {
    id: "recliner",
    title: "Recliner",
    category: "furniture",
  },
  {
    id: "rocking-chair",
    title: "Rocking chair",
    category: "furniture",
  },
  {
    id: "tea-table",
    title: "Tea Table",
    category: "furniture",
    fragile: true,
  },
  {
    id: "1-seater-sofa",
    title: "1 Seater Sofa",
    category: "furniture",
  },
  {
    id: "conference-table",
    title: "Conference Table",
    category: "furniture",
  },
  {
    id: "conference-chair",
    title: "Conference Chair",
    category: "furniture",
  },
  {
    id: "round-meeting-table",
    title: "Round Meeting Table",
    category: "furniture",
  },
  {
    id: "round-meeting-chair",
    title: "Round Meeting Chair",
    category: "furniture",
  },
  {
    id: "single-bed",
    title: "Single Bed",
    category: "furniture",
  },
  {
    id: "single-mattress",
    title: "Single Mattress",
    category: "furniture",
  },
  {
    id: "double-bed",
    title: "Double Bed",
    category: "furniture",
  },
  {
    id: "double-mattress",
    title: "Double Mattress",
    category: "furniture",
  },
  {
    id: "bedside-tables",
    title: "Bedside Tables",
    category: "furniture",
  },
  {
    id: "dressing-table",
    title: "Dressing Table",
    category: "furniture",
  },
  {
    id: "file-rack-3-sets",
    title: "File Rack 3 Sets",
    category: "furniture",
  },
  {
    id: "file-rack-5-sets",
    title: "File Rack 5 Sets",
    category: "furniture",
  },
  {
    id: "work-desk",
    title: "Work Desk",
    category: "furniture",
  },
  {
    id: "executive-desk",
    title: "Executive Desk",
    category: "furniture",
  },
  {
    id: "drawer-box-3-sets",
    title: "Drawer Box 3 Sets",
    category: "furniture",
  },
  {
    id: "conference-table-large",
    title: "Conference Table (Large)",
    category: "furniture",
  },
  {
    id: "safe-30-kg",
    title: "Safe 30 Kg",
    category: "furniture",
  },
  {
    id: "safe-50-kg",
    title: "Safe 50 Kg",
    category: "furniture",
  },
  {
    id: "bedside-table",
    title: "Bedside table",
    category: "furniture",
  },
  {
    id: "double-mattress-foldable",
    title: "Double mattress foldable",
    category: "furniture",
  },
  {
    id: "single-mattress-foldable",
    title: "Single mattress foldable",
    category: "furniture",
  },
  {
    id: "center-table-round",
    title: "Center Table Round",
    category: "furniture",
    fragile: true,
  },
  {
    id: "exective-desk",
    title: "Exective Desk",
    category: "furniture",
  },
  {
    id: "3-drawer-box",
    title: "3 Drawer Box",
    category: "furniture",
  },
  {
    id: "large-conference-table",
    title: "Large Conference Table",
    category: "furniture",
  },
  {
    id: "treadmill",
    title: "Treadmill",
    category: "gym",
    fragile: true,
  },
  {
    id: "exercise-bikes",
    title: "Exercise Bikes",
    category: "gym",
  },
  {
    id: "crockery-cartons",
    title: "Crockery Cartons",
    category: "crockery",
    fragile: true,
  },
];

export const AllItemsMap = AllItems.reduce((acc: any, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {});

export const ItemCategories = [
  {
    label: "Storage",
    value: "storage",
    description: "Cartons of all sizes & more",
    image: require("@/assets/images/boxes.webp"),
    items: AllItems.filter((allItem) => allItem.category === "storage"),
  },
  {
    label: "Electronics",
    value: "electronics",
    description: "Appliances & more",
    image: require("@/assets/images/electronics.webp"),
    items: AllItems.filter((allItem) => allItem.category === "electronics"),
  },
  {
    label: "Garden",
    value: "garden",
    description: "Gardening materials",
    image: require("@/assets/images/garden.webp"),
    items: AllItems.filter((allItem) => allItem.category === "garden"),
  },
  {
    label: "Furniture",
    value: "furniture",
    description: "Tables, chairs, office desks & more",
    image: require("@/assets/images/furniture.webp"),
    items: AllItems.filter((allItem) => allItem.category === "furniture"),
  },
  {
    label: "Gym",
    value: "gym",
    description: "Move gym equipment & more",
    image: require("@/assets/images/gym.webp"),
    items: AllItems.filter((allItem) => allItem.category === "gym"),
  },
  {
    label: "Crockery",
    value: "crockery",
    description: "Plates, pots & more",
    image: require("@/assets/images/crockery.webp"),
    items: AllItems.filter((allItem) => allItem.category === "crockery"),
  },
];

export const ItemCategoriesMap = ItemCategories.reduce((acc: any, curr) => {
  acc[curr.value] = curr;
  return acc;
}, {});

export const PickupTypes = [
  {
    label: "Moving/Relocation",
    value: "relocation",
    description:
      "All in one service that includes packing, labor & transportation.",
  },
  {
    label: "Deliveries",
    value: "delivery",
    description: "Deliver anything, big or small, quickly and reliably.",
  },
];

export const PickupTypesMap = PickupTypes.reduce((acc: any, curr) => {
  acc[curr.value] = curr;
  return acc;
}, {});

export const HouseTypes = [
  { label: "Full House", value: "full-house" },
  { label: "Apartment", value: "apartment" },
];

export const HouseTypesMap = HouseTypes.reduce((acc: any, curr) => {
  acc[curr.value] = curr;
  return acc;
}, {});

export const PropertyTypes = [
  {
    label: "House",
    value: "house",
  },
  {
    label: "Office",
    value: "office",
  },
  {
    label: "Warehouse",
    value: "warehouse",
  },
];

export const PropertyTypesMap = PropertyTypes.reduce((acc: any, curr) => {
  acc[curr.value] = curr;
  return acc;
}, {});

export const SpaceOptions = [
  {
    label: "Bedroom",
    value: "bedroom",
    image: require("@/assets/images/bedroom.png"),
  },
  {
    label: "Lounge",
    value: "lounge",
    image: require("@/assets/images/lounge.png"),
  },
  {
    label: "Kitchen",
    value: "kitchen",
    image: require("@/assets/images/kitchen.png"),
  },
  {
    label: "Drawing Room",
    value: "drawing-room",
    image: require("@/assets/images/drawing.png"),
  },
  {
    label: "Dining Room",
    value: "dining-room",
    image: require("@/assets/images/dining.png"),
  },
];

export const SpaceOptionsMap = SpaceOptions.reduce((acc: any, curr) => {
  acc[curr.value] = curr;
  return acc;
}, {});
