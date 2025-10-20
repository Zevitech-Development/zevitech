export interface SubLink {
  label: string;
  href: string;
}

export interface ServiceLink {
  id: string;
  label: string;
  href?: string;
  children: SubLink[];
}

export interface ServiceGroup {
  heading: string;
  text: string;
  items: ServiceLink[];
}
