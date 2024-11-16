// src/utils/categoryUtils.js
export const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  };
  
  export const denormalizeText = (text) => {
    // Convert from storage format to display format
    const categoryMap = {
      'sofas_and_sectionals': 'Sofas & Sectionals',
      'side_tables_and_nightstands': 'Side Tables & Nightstands',
      // Add more mappings as needed
    };
    
    return categoryMap[text] || text.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Function to get storage key from display name
  export const getCategoryKey = (displayName) => {
    const reverseMap = {
      'Sofas & Sectionals': 'sofas_and_sectionals',
      'Side Tables & Nightstands': 'side_tables_and_nightstands',
      // Add more mappings as needed
    };
    
    return reverseMap[displayName] || normalizeText(displayName);
  };
  
  // Function to get normalized category and type for API calls
  export const getNormalizedParams = (category, type) => {
    return {
      category: normalizeText(category),
      type: normalizeText(type)
    };
  };
  
  // Function to get display names for UI
  export const getDisplayNames = (category, type) => {
    return {
      category: denormalizeText(category),
      type: denormalizeText(type)
    };
  };