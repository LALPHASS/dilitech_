import type { LucideIcon } from "lucide-react";
import {
  Gamepad2,
  Briefcase,
  Film,
  Palette,
  Monitor,
  Wrench,
  Headphones,
  ShieldCheck,
} from "lucide-react";

// ── Interfaces ──────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface StoryPhase {
  id: string;
  heading: string;
  description: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
}

export interface BrandCard {
  name: string;
  image: string;
  description: string;
  tags: string[];
  models: string[];
}

export interface UsageCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  image: string;
  review: string;
}

// ── Data ────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "#accueil" },
  { label: "Produits", href: "#produits" },
  { label: "Services", href: "#services" },
  { label: "À Propos", href: "#a-propos" },
  { label: "Témoignages", href: "#temoignages" },
];

export const STORY_PHASES: StoryPhase[] = [
  {
    id: "intro",
    heading: "Une machine exceptionnelle pour un client d'exception",
    description: "",
    cameraPosition: [0, 1, 5],
    cameraTarget: [0, 0, 0],
  },
  {
    id: "performance",
    heading: "Performance",
    description:
      "Des processeurs de dernière génération pour une puissance sans compromis.",
    cameraPosition: [3, 1, 3],
    cameraTarget: [0, 0, 0],
  },
  {
    id: "design",
    heading: "Design",
    description:
      "Un design raffiné qui allie élégance et fonctionnalité.",
    cameraPosition: [-2, 2, 4],
    cameraTarget: [0, 0, 0],
  },
  {
    id: "power",
    heading: "Puissance",
    description: "La puissance au service de votre créativité.",
    cameraPosition: [0, 3, 3],
    cameraTarget: [0, 0, 0],
  },
];

export const BRAND_CARDS: BrandCard[] = [
  {
    name: "HP",
    image: "/hp.jpg",
    description:
      "Des ordinateurs professionnels conçus pour la performance et la fiabilité au quotidien.",
    tags: ["Professionnel", "Performance"],
    models: ["EliteBook", "Envy", "Pavilion", "ProBook", "Spectre"],
  },
  {
    name: "Lenovo",
    image: "/lenevo.jpg",
    description:
      "L'innovation au service de la productivité avec des machines robustes et polyvalentes.",
    tags: ["Innovation", "Fiabilité"],
    models: ["ThinkPad", "IdeaPad", "Legion", "Yoga", "ThinkBook"],
  },
  {
    name: "Mac",
    image: "/mac.jpg",
    description:
      "L'excellence créative avec un écosystème premium et un design inégalé.",
    tags: ["Créativité", "Premium"],
    models: ["MacBook Air", "MacBook Pro", "iMac", "Mac Mini", "Mac Studio"],
  },
];

export const USAGE_CATEGORIES: UsageCategory[] = [
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "travail", label: "Travail", icon: Briefcase },
  { id: "montage", label: "Montage vidéo", icon: Film },
  { id: "design", label: "Design", icon: Palette },
  { id: "bureautique", label: "Bureautique", icon: Monitor },
];

export const SERVICES: ServiceCard[] = [
  {
    icon: Wrench,
    title: "Réparation & Maintenance",
    description:
      "Diagnostic rapide et réparation de tous types de pannes : écran, batterie, clavier, carte mère. Votre machine entre de bonnes mains.",
  },
  {
    icon: Headphones,
    title: "Support Technique",
    description:
      "Une équipe disponible pour vous accompagner : installation de logiciels, configuration, mise à jour et résolution de problèmes.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie & Suivi",
    description:
      "Garantie sur toutes nos machines et un suivi personnalisé après achat. Nous restons à vos côtés tout au long de la vie de votre appareil.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aminata Diallo",
    image: "/testimonial/testimonial_female_1.jpg",
    review:
      "Dilitech m'a aidée à trouver l'ordinateur parfait pour mon travail de graphiste. Le service est impeccable et l'équipe très professionnelle.",
  },
  {
    name: "Fatoumata Traoré",
    image: "/testimonial/testimonial_female_2.jpg",
    review:
      "Je recommande Dilitech à tous mes collègues. Leur expertise et leur service après-vente sont vraiment exceptionnels.",
  },
  {
    name: "Moussa Konaté",
    image: "/testimonial/testimonial_man_1.jpg",
    review:
      "Grâce à Dilitech, j'ai pu équiper toute mon entreprise avec des machines performantes à un excellent rapport qualité-prix.",
  },
  {
    name: "Ibrahim Coulibaly",
    image: "/testimonial/testimonial_man_2.jpg",
    review:
      "Le meilleur fournisseur informatique de Bamako. Leur conseil personnalisé fait toute la différence.",
  },
];
