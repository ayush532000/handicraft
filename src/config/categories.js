// src/config/categories.js
export const categories = {
  tables: {
    name: "tables",
    displayName: "Tables",
    items: [
      "coffee_tables",
      "dining_tables",
      "side_tables",
      "console_tables", 
      "end_tables",
      "study_tables",
      "work_desks",
      "occasional_tables",
      "console_and_entryway_tables"
    ],
    displayItems: {
      coffee_tables: "Coffee Tables",
      dining_tables: "Dining Tables",
      side_tables: "Side Tables",
      console_tables: "Console Tables",
      end_tables: "End Tables",
      study_tables: "Study Tables",
      work_desks: "Work Desks",
      occasional_tables: "Occasional Tables",
      console_and_entryway_tables: "Console & Entryway Tables"
    }
  },
  chairs: {
    name: "chairs",
    displayName: "Chairs",
    items: [
      "dining_chairs",
      "accent_chairs",
      "lounge_chairs",
      "office_chairs",
      "armchairs",
      "rocking_chairs",
      "folding_chairs",
      "bar_and_counter_stools",
      "lounge_and_lounge_chairs"
    ],
    displayItems: {
      dining_chairs: "Dining Chairs",
      accent_chairs: "Accent Chairs",
      lounge_chairs: "Lounge Chairs",
      office_chairs: "Office Chairs",
      armchairs: "Armchairs",
      rocking_chairs: "Rocking Chairs",
      folding_chairs: "Folding Chairs",
      bar_and_counter_stools: "Bar & Counter Stools",
      lounge_and_lounge_chairs: "Lounge & Lounge Chairs"
    }
  },
  sofas: {
    name: "sofas",
    displayName: "Sofas & Sectionals",
    items: [
      "two_seater_sofa",
      "three_seater_sofa",
      "sectional_sofa",
      "sleeper_sofa",
      "chaise_lounge",
      "loveseat",
      "modular_sofa",
      "sofa_set"
    ],
    displayItems: {
      two_seater_sofa: "2-Seater Sofa",
      three_seater_sofa: "3-Seater Sofa",
      sectional_sofa: "Sectional Sofa",
      sleeper_sofa: "Sleeper Sofa",
      chaise_lounge: "Chaise Lounge",
      loveseat: "Loveseat",
      modular_sofa: "Modular Sofa",
      sofa_set: "Sofa Set"
    }
  },
  storage: {
    name: "storage",
    displayName: "Storage Furniture",
    items: [
      "wardrobes",
      "dressers_and_drawers",
      "bookcases_and_shelves",
      "sideboards_and_buffets",
      "cabinets",
      "storage_ottomans",
      "filing_cabinets",
      "shoe_racks"
    ],
    displayItems: {
      wardrobes: "Wardrobes",
      dressers_and_drawers: "Dressers & Chest of Drawers",
      bookcases_and_shelves: "Bookcases & Shelves",
      sideboards_and_buffets: "Sideboards & Buffets",
      cabinets: "Cabinets",
      storage_ottomans: "Storage Ottomans",
      filing_cabinets: "Filing Cabinets",
      shoe_racks: "Shoe Racks"
    }
  },
  beds: {
    name: "beds",
    displayName: "Beds",
    items: [
      "single_beds",
      "double_beds",
      "queen_and_king_beds",
      "bed_frames",
      "bunk_beds",
      "loft_beds",
      "storage_beds"
    ],
    displayItems: {
      single_beds: "Single Beds",
      double_beds: "Double Beds",
      queen_and_king_beds: "Queen & King-size Beds",
      bed_frames: "Bed Frames",
      bunk_beds: "Bunk Beds",
      loft_beds: "Loft Beds",
      storage_beds: "Storage Beds"
    }
  },
  sidetables: {
    name: "sidetables",
    displayName: "Side Tables & Nightstands",
    items: [
      "nightstands",
      "bedside_tables",
      "accent_side_tables",
      "pedestal_tables",
      "small_end_tables"
    ],
    displayItems: {
      nightstands: "Nightstands",
      bedside_tables: "Bedside Tables",
      accent_side_tables: "Accent Side Tables",
      pedestal_tables: "Pedestal Tables",
      small_end_tables: "Small End Tables"
    }
  },
  decorative: {
    name: "decorative",
    displayName: "Decorative Furniture",
    items: [
      "mirrors_and_frames",
      "room_dividers",
      "display_cabinets",
      "decorative_stands",
      "sculptures_and_statues",
      "wall_art_and_panels"
    ],
    displayItems: {
      mirrors_and_frames: "Mirrors & Mirror Frames",
      room_dividers: "Room Dividers & Partitions",
      display_cabinets: "Display Cabinets",
      decorative_stands: "Decorative Stands",
      sculptures_and_statues: "Sculptures & Statues",
      wall_art_and_panels: "Wall Art & Decorative Wall Panels"
    }
  },
  outdoor: {
    name: "outdoor",
    displayName: "Outdoor Furniture",
    items: [
      "patio_chairs",
      "outdoor_dining_tables",
      "garden_benches",
      "outdoor_lounge_chairs",
      "outdoor_sofas",
      "hammocks",
      "outdoor_coffee_tables",
      "outdoor_sectionals"
    ],
    displayItems: {
      patio_chairs: "Patio Chairs",
      outdoor_dining_tables: "Outdoor Dining Tables",
      garden_benches: "Garden Benches",
      outdoor_lounge_chairs: "Lounge Chairs",
      outdoor_sofas: "Outdoor Sofas",
      hammocks: "Hammocks",
      outdoor_coffee_tables: "Outdoor Coffee Tables",
      outdoor_sectionals: "Outdoor Sectionals"
    }
  },
  lighting: {
    name: "lighting",
    displayName: "Lighting & Lamps",
    items: [
      "floor_lamps",
      "table_lamps",
      "pendant_lights",
      "chandeliers",
      "wall_sconces",
      "desk_lamps"
    ],
    displayItems: {
      floor_lamps: "Floor Lamps",
      table_lamps: "Table Lamps",
      pendant_lights: "Pendant Lights",
      chandeliers: "Chandeliers",
      wall_sconces: "Wall Sconces",
      desk_lamps: "Desk Lamps"
    }
  }
};

// Helper functions for consistent category and type handling
export const getDisplayName = (categoryKey) => {
  return categories[categoryKey]?.displayName || categoryKey;
};

export const getDisplayType = (categoryKey, typeKey) => {
  return categories[categoryKey]?.displayItems[typeKey] || typeKey;
};