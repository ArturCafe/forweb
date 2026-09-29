import p1 from "../assets/images/projects/project_1.jpg";
import p2 from "../assets/images/projects/project_2.jpg";
import p3 from "../assets/images/projects/project_3.jpg";
import p4 from "../assets/images/projects/project_4.jpg";
import p5 from "../assets/images/projects/project_5.jpg";
import p6 from "../assets/images/projects/project_6.jpg";
import p7 from "../assets/images/projects/project_7.jpg";
import p8 from "../assets/images/projects/project_8.jpg";
import b1 from "../assets/images/blog/blog-1.jpg";
import b2 from "../assets/images/blog/blog-2.jpg";
import b3 from "../assets/images/blog/blog-3.jpg";
import b4 from "../assets/images/blog/blog-4.jpg";
import b5 from "../assets/images/blog/blog-5.jpg";
import b6 from "../assets/images/blog/blog-6.jpg";
import b7 from "../assets/images/blog/blog-7.jpg";
import b8 from "../assets/images/blog/blog-8.jpg";
import b9 from "../assets/images/blog/blog-defolt.png";
export const projects = [p1, p2, p3, p4, p5, p6, p7, p8].map((image, i) => ({
  id: i + 1,
  image,
  title: [
    "Modern Urban Residence",
    "Concrete Gallery",
    "Coastal Retreat",
    "Natural House",
    "Minimal Interior",
    "City Museum",
    "Mountain Residence",
    "Green Pavilion",
  ][i],
  category: [
    "Architecture",
    "Interior",
    "Residential",
    "Architecture",
    "Interior",
    "Public",
    "Residential",
    "Concept",
  ][i],
}));
export const posts = [b1, b2, b3, b4, b5, b6, b7, b8, b9].map((image, i) => ({
  id: i + 1,
  image,
  title: [
    "Architecture and the city of tomorrow",
    "Natural materials in contemporary homes",
    "The art of building with light",
    "A calm space starts with simple forms",
    "Designing for people, not trends",
    "Why texture changes everything",
    "Small spaces with big ideas",
    "Inside a modern creative studio",
    "The future of sustainable architecture",
  ][i],
  date: `May ${8 + i}, 2026`,
  excerpt:
    "Thoughtful architecture balances material, light and human experience. Discover ideas, inspiration and practical perspectives from our studio.",
}));
