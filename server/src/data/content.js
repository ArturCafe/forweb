export const projects = [
  [1, "Modern Urban Residence", "Architecture"],
  [2, "Concrete Gallery", "Interior"],
  [3, "Coastal Retreat", "Residential"],
  [4, "Natural House", "Architecture"],
  [5, "Minimal Interior", "Interior"],
  [6, "City Museum", "Public"],
  [7, "Mountain Residence", "Residential"],
  [8, "Green Pavilion", "Concept"],
].map(([id, title, category]) => ({ id, title, category }));

export const posts = [
  "Architecture and the city of tomorrow",
  "Natural materials in contemporary homes",
  "The art of building with light",
  "A calm space starts with simple forms",
  "Designing for people, not trends",
  "Why texture changes everything",
  "Small spaces with big ideas",
  "Inside a modern creative studio",
  "The future of sustainable architecture",
].map((title, index) => ({
  id: index + 1,
  title,
  date: `May ${8 + index}, 2026`,
  excerpt: "Thoughtful architecture balances material, light and human experience. Discover ideas, inspiration and practical perspectives from our studio.",
}));
