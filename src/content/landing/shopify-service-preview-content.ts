import type { ShopifyServiceCategory } from "@/interfaces/shopify-service-preview-interface";

export const shopifyServiceCategories: readonly ShopifyServiceCategory[] = [
  {
    id: "professional-services", label: "Professional services", brand: "Fieldwork Advisory",
    headline: "A clear next step for your business.",
    introduction: "Practical conversations, thoughtful planning and support shaped around the work ahead.",
    offers: [
      { id: "consultation", title: "Discovery consultation", group: "Consultations", format: "One-to-one conversation", description: "Talk through your priorities, current challenges and the decisions you need to make.", includes: ["Review of your priorities", "Questions about your current situation", "Agreed next steps"] },
      { id: "roadmap", title: "Project roadmap", group: "Projects", format: "Defined project scope", description: "Turn a business priority into a practical plan with clear stages and responsibilities.", includes: ["Project scope discussion", "A staged action plan", "Milestones to review together"] },
      { id: "support", title: "Ongoing advisory", group: "Ongoing support", format: "Agreed support schedule", description: "Keep important work moving with regular conversations and a shared view of priorities.", includes: ["Scheduled check-ins", "Review of current priorities", "Support within an agreed scope"] },
    ],
  },
  {
    id: "creative-digital", label: "Creative & digital", brand: "Form & Field Studio",
    headline: "Thoughtful ideas. Carefully made.",
    introduction: "Brand, website and content services that bring your next creative project into focus.",
    offers: [
      { id: "brand", title: "Brand direction", group: "Brand", format: "Creative discovery session", description: "Define the visual direction, message and references for your brand’s next chapter.", includes: ["Brand discovery conversation", "Visual references and direction", "A brief for the next stage"] },
      { id: "website", title: "Website planning", group: "Digital", format: "Project consultation", description: "Map the pages, content and visitor journey before your website project begins.", includes: ["Goals and audience discussion", "Page and content outline", "Project scope and next steps"] },
      { id: "content", title: "Content support", group: "Content", format: "Agreed creative scope", description: "Plan a consistent collection of content around your business, audience and channels.", includes: ["Content priorities", "Agreed deliverables", "A review and feedback stage"] },
    ],
  },
  {
    id: "coaching-education", label: "Coaching & education", brand: "Next Chapter",
    headline: "Make room for your next chapter.",
    introduction: "Focused sessions and learning programmes built around what you want to explore next.",
    offers: [
      { id: "session", title: "One-to-one session", group: "Individual", format: "Personal session", description: "Explore a specific goal, question or skill in a focused conversation.", includes: ["Your goals and questions", "A focused session agenda", "Practical next steps"] },
      { id: "programme", title: "Learning programme", group: "Programmes", format: "Structured learning", description: "Work through an agreed subject or goal with a sequence of guided sessions.", includes: ["A learning plan", "An agreed session schedule", "Resources for the programme"] },
      { id: "review", title: "Progress review", group: "Follow-up", format: "Review conversation", description: "Reflect on what you have tried and decide where to focus your next steps.", includes: ["Review of your recent work", "Questions and feedback", "An updated action plan"] },
    ],
  },
  {
    id: "home-local-services", label: "Home & local services", brand: "Good Neighbour",
    headline: "A little help. A better everyday.",
    introduction: "Clear service options for the projects, upkeep and practical jobs around your home.",
    offers: [
      { id: "assessment", title: "Home assessment", group: "Assessments", format: "Initial service discussion", description: "Describe the work you need and help the team understand your space and priorities.", includes: ["Your project details", "Access and timing discussion", "Scope for an estimate"] },
      { id: "maintenance", title: "Maintenance visit", group: "Maintenance", format: "Agreed list of tasks", description: "Plan a visit around the upkeep tasks you would like help with.", includes: ["Review of requested tasks", "Materials and access check", "An agreed service scope"] },
      { id: "project", title: "Project estimate", group: "Projects", format: "Project-specific quote", description: "Discuss a larger job and the information needed to prepare a clear estimate.", includes: ["Project requirements", "Scope and schedule discussion", "A quote before work begins"] },
    ],
  },
  {
    id: "beauty-services", label: "Beauty services", brand: "Sunday Studio",
    headline: "Time for a little personal attention.",
    introduction: "Explore our service menu and find a starting point that feels right for you.",
    offers: [
      { id: "consultation", title: "Style consultation", group: "Consultations", format: "Personal consultation", description: "Discuss the look you have in mind and the service options available.", includes: ["Your preferences and references", "A conversation about suitable options", "Service and pricing confirmation"] },
      { id: "appointment", title: "Signature appointment", group: "Appointments", format: "Service by arrangement", description: "Explore the details of a service before requesting a suitable appointment.", includes: ["A service discussion", "An agreed appointment scope", "Preparation and care information"] },
      { id: "follow-up", title: "Care follow-up", group: "Follow-up", format: "Aftercare conversation", description: "Ask questions about your recent service and discuss your next visit.", includes: ["Your questions", "Relevant care guidance", "Options for a future visit"] },
    ],
  },
  {
    id: "fitness-services", label: "Fitness services", brand: "Everyday Movement",
    headline: "Find a rhythm that works for you.",
    introduction: "Personal training and thoughtful support for the way you want to move.",
    offers: [
      { id: "consultation", title: "Movement consultation", group: "Consultations", format: "Introductory conversation", description: "Discuss your experience, preferences and the support you are looking for.", includes: ["Your goals and preferences", "Relevant activity considerations", "An agreed starting point"] },
      { id: "training", title: "Personal training", group: "Training", format: "One-to-one sessions", description: "Explore a session format and schedule tailored to your agreed training goals.", includes: ["A session plan", "Guided training time", "A review of your next steps"] },
      { id: "review", title: "Training plan review", group: "Follow-up", format: "Progress discussion", description: "Review your current routine and discuss practical adjustments with your trainer.", includes: ["Your current routine", "Questions and feedback", "An updated plan to discuss"] },
    ],
  },
  {
    id: "spas", label: "Spas", brand: "Stillwater Spa",
    headline: "Make a little space for yourself.",
    introduction: "Explore relaxing treatments, thoughtful rituals and a service menu made for your next moment of calm.",
    offers: [
      { id: "massage", title: "Massage treatments", group: "Body", format: "Treatment by appointment", description: "Explore massage options and discuss the treatment and duration that suit your preferences.", includes: ["Treatment preferences", "Duration and availability", "Preparation information"] },
      { id: "facials", title: "Facial treatments", group: "Skin", format: "Personal treatment consultation", description: "Discuss your preferences before choosing from the available facial treatments.", includes: ["A consultation before treatment", "Service and pricing details", "Aftercare information"] },
      { id: "rituals", title: "Spa rituals", group: "Experiences", format: "A tailored spa visit", description: "Plan a combination of treatments for a visit shaped around your time and preferences.", includes: ["Your preferred treatments", "Availability and timings", "A clear package quote"] },
    ],
  },
  {
    id: "salons", label: "Salons", brand: "The Edit Salon",
    headline: "Your next look starts here.",
    introduction: "Cuts, colour and styling with a clear service menu and time to talk through the look you want.",
    offers: [
      { id: "cut", title: "Cut & finish", group: "Cuts", format: "Salon appointment", description: "Discuss the shape, length and finish you have in mind with your stylist.", includes: ["Style consultation", "Agreed cut and finish", "Care and styling advice"] },
      { id: "colour", title: "Colour consultation", group: "Colour", format: "Consultation before colour", description: "Explore colour options, preparation and the steps involved before booking a service.", includes: ["Your colour references", "Suitability and preparation discussion", "Service quote and timing"] },
      { id: "styling", title: "Occasion styling", group: "Styling", format: "Styling by arrangement", description: "Plan a finished look for an event or occasion, with references and timings agreed in advance.", includes: ["Your event and style brief", "Appointment planning", "Agreed styling service"] },
    ],
  },
  {
    id: "plumbing", label: "Plumbing", brand: "Clearflow Plumbing",
    headline: "Get your home flowing again.",
    introduction: "Describe the issue, explore the service and get a clear estimate for the plumbing work you need.",
    offers: [
      { id: "repairs", title: "Leak & fixture repairs", group: "Repairs", format: "Inspection and estimate", description: "Share the symptoms and location of a leak or faulty fixture so the work can be assessed.", includes: ["Issue and access details", "Inspection scope", "An estimate before repairs"] },
      { id: "drains", title: "Drain services", group: "Drains", format: "Drain assessment", description: "Discuss a slow or blocked drain and the information needed to arrange an assessment.", includes: ["Affected areas and symptoms", "Access and timing discussion", "Recommended work and pricing"] },
      { id: "installation", title: "Fixture installation", group: "Installation", format: "Project-specific quote", description: "Plan the installation or replacement of taps, sinks and other plumbing fixtures.", includes: ["Fixture requirements", "Materials and site review", "Agreed installation scope"] },
    ],
  },
  {
    id: "home-cleaning", label: "Home cleaning", brand: "Fresh Space",
    headline: "A cleaner home. A lighter day.",
    introduction: "Find the right cleaning service for your space, from regular upkeep to a thorough move-out clean.",
    offers: [
      { id: "regular", title: "Regular home cleaning", group: "Regular", format: "One-off or recurring visits", description: "Build a cleaning checklist around the rooms and routines that matter to you.", includes: ["Your room and task list", "Preferred visit frequency", "An agreed cleaning quote"] },
      { id: "deep", title: "Deep cleaning", group: "Deep clean", format: "Detailed cleaning scope", description: "Discuss the areas that need extra attention and agree a detailed cleaning plan.", includes: ["Priority areas", "Access and supplies discussion", "A confirmed task checklist"] },
      { id: "moving", title: "Move-in & move-out", group: "Moving", format: "Property-specific estimate", description: "Prepare a property for its next chapter with cleaning arranged around your moving date.", includes: ["Property size and condition", "Moving date and access", "Agreed cleaning scope"] },
    ],
  },
  {
    id: "truck-dispatching", label: "Truck dispatching", brand: "Routewise Dispatch",
    headline: "Keep your next move organized.",
    introduction: "Dispatch support for owner-operators and fleets, built around your equipment, preferred lanes and operating needs.",
    offers: [
      { id: "owner-operator", title: "Owner-operator dispatch", group: "Owner-operators", format: "Dispatch scope consultation", description: "Discuss your truck, lane preferences and the dispatch support you need.", includes: ["Equipment and lane preferences", "Availability discussion", "Agreed support scope and fees"] },
      { id: "fleet", title: "Fleet coordination", group: "Fleets", format: "Fleet-specific support", description: "Plan communication and dispatch coordination around the size and operation of your fleet.", includes: ["Fleet requirements", "Communication workflow", "A tailored service proposal"] },
      { id: "admin", title: "Dispatch administration", group: "Support", format: "Agreed administrative scope", description: "Explore support for load documentation, scheduling and day-to-day coordination.", includes: ["Document workflow review", "Scheduling requirements", "Defined responsibilities"] },
    ],
  },
  {
    id: "expert-consulting", label: "Expert & consulting services", brand: "Clarity Partners",
    headline: "The right expertise. A clearer direction.",
    introduction: "Connect your business question with focused consultations, practical reviews and specialist project support.",
    offers: [
      { id: "consultation", title: "Expert consultation", group: "Consultations", format: "Focused expert session", description: "Bring a specific challenge and discuss suitable next steps with a relevant specialist.", includes: ["Your question and context", "A defined session focus", "Next-step recommendations"] },
      { id: "review", title: "Business review", group: "Reviews", format: "Agreed review scope", description: "Explore an independent review of a process, project or area of your business.", includes: ["Scope and objectives", "Information review", "Findings and recommendations"] },
      { id: "project", title: "Specialist project support", group: "Projects", format: "Project-specific engagement", description: "Plan specialist input for an agreed project, with deliverables and responsibilities made clear.", includes: ["Project requirements", "Defined deliverables", "Agreed milestones"] },
    ],
  },
  {
    id: "hvac", label: "HVAC", brand: "ComfortWorks",
    headline: "Comfort for every season.",
    introduction: "Heating, cooling and maintenance services with clear options for your home or business.",
    offers: [
      { id: "cooling", title: "Air conditioning service", group: "Cooling", format: "System assessment", description: "Describe your cooling issue and arrange an assessment of the system and required work.", includes: ["System and issue details", "Inspection scope", "A service estimate"] },
      { id: "heating", title: "Heating repair & installation", group: "Heating", format: "Property-specific quote", description: "Explore repair or replacement options for your heating system with a clear project scope.", includes: ["Your property and system needs", "Repair or installation options", "Agreed quote and timing"] },
      { id: "maintenance", title: "Seasonal maintenance", group: "Maintenance", format: "Planned service visit", description: "Discuss routine system checks and maintenance arranged around the equipment you use.", includes: ["Equipment details", "An agreed maintenance checklist", "Visit schedule and pricing"] },
    ],
  },
  {
    id: "legal-services", label: "Legal services", brand: "Hartwell Legal",
    headline: "Clear legal advice, when it matters.",
    introduction: "Explain your situation, understand your options and book a consultation with the right lawyer.",
    offers: [
      { id: "consultation", title: "Initial consultation", group: "Consultations", format: "Fixed-fee consultation", description: "Discuss your matter, the documents involved and the options available to you.", includes: ["Review of your situation", "Your options explained", "A recommended next step"] },
      { id: "documents", title: "Contracts & documents", group: "Documents", format: "Scoped document review", description: "Have agreements, leases or business documents drafted or reviewed before you sign.", includes: ["Document review or drafting", "Plain-language summary", "Agreed turnaround"] },
      { id: "representation", title: "Ongoing representation", group: "Representation", format: "Engagement letter", description: "Arrange continuing support for a dispute, transaction or business matter.", includes: ["Defined engagement scope", "Regular updates", "Transparent fee structure"] },
    ],
  },
  {
    id: "real-estate", label: "Real estate", brand: "Northgate Realty",
    headline: "Find the place you’ll call home.",
    introduction: "Browse listings, book viewings and get a free valuation from a local agent.",
    offers: [
      { id: "buy", title: "Buy a home", group: "Buying", format: "Viewing appointment", description: "Tell us your budget and must-haves and we’ll line up viewings that fit.", includes: ["Shortlist of matching homes", "Booked viewings", "Offer guidance"] },
      { id: "sell", title: "Sell your property", group: "Selling", format: "Free valuation", description: "Get a market valuation and a plan to sell at the right price.", includes: ["Property valuation", "Photography and listing", "Viewing management"] },
      { id: "rent", title: "Rentals & management", group: "Rentals", format: "Management plan", description: "Find tenants and keep your rental running smoothly.", includes: ["Tenant search and checks", "Rent collection", "Maintenance coordination"] },
    ],
  },
  {
    id: "medical-dental", label: "Medical & dental clinics", brand: "Brightside Dental",
    headline: "Care that makes you smile.",
    introduction: "Book an appointment online, meet the team and see what to expect at your visit.",
    offers: [
      { id: "checkup", title: "Check-up & clean", group: "General care", format: "Bookable appointment", description: "Routine examination and hygiene clean for the whole family.", includes: ["Full examination", "Professional clean", "Personal care plan"] },
      { id: "cosmetic", title: "Whitening & cosmetic", group: "Cosmetic", format: "Consultation first", description: "Explore whitening, veneers and treatments to improve your smile.", includes: ["Cosmetic consultation", "Treatment options and pricing", "Before-and-after planning"] },
      { id: "emergency", title: "Emergency appointments", group: "Urgent care", format: "Same-week slots", description: "Fast help for pain, chips and broken fillings.", includes: ["Priority booking", "Assessment and relief", "Follow-up plan"] },
    ],
  },
  {
    id: "restaurants-catering", label: "Restaurants & catering", brand: "Saffron Table",
    headline: "Good food, beautifully served.",
    introduction: "See the menu, reserve a table or plan catering for your next event.",
    offers: [
      { id: "reserve", title: "Reserve a table", group: "Dining", format: "Online booking", description: "Choose a date, time and party size and we’ll have your table ready.", includes: ["Live availability", "Special requests", "Instant confirmation"] },
      { id: "catering", title: "Event catering", group: "Catering", format: "Custom menu quote", description: "Menus for weddings, offices and private parties, delivered or served.", includes: ["Menu planning", "Dietary options", "Staff and setup"] },
      { id: "private", title: "Private dining", group: "Private events", format: "Enquiry", description: "Book the private room for celebrations and business dinners.", includes: ["Set or tasting menus", "Wine pairing", "Dedicated host"] },
    ],
  },
  {
    id: "events-photography", label: "Events & photography", brand: "Golden Hour Studio",
    headline: "Moments worth keeping.",
    introduction: "Explore our portfolio, compare packages and check availability for your date.",
    offers: [
      { id: "weddings", title: "Wedding photography", group: "Weddings", format: "Full-day package", description: "Story-driven coverage from getting ready to the last dance.", includes: ["Full-day coverage", "Online gallery", "Printed album option"] },
      { id: "events", title: "Event coverage", group: "Events", format: "Hourly booking", description: "Corporate events, launches and parties captured with care.", includes: ["Agreed shot list", "Fast turnaround", "Usage rights"] },
      { id: "portraits", title: "Portrait sessions", group: "Portraits", format: "Studio or location", description: "Personal, family and brand portraits in a relaxed session.", includes: ["Styling guidance", "Edited selection", "High-resolution files"] },
    ],
  },
  {
    id: "travel-tourism", label: "Travel & tourism", brand: "Azure Escapes",
    headline: "Your next escape starts here.",
    introduction: "Browse curated trips, compare packages and plan a holiday around you.",
    offers: [
      { id: "packages", title: "Holiday packages", group: "Holidays", format: "Bookable package", description: "Flights, stays and transfers bundled into one simple price.", includes: ["Curated itinerary", "Hand-picked hotels", "Airport transfers"] },
      { id: "tailor", title: "Tailor-made trips", group: "Custom trips", format: "Planning call", description: "Tell us where you dream of going and we’ll build the trip.", includes: ["Personal travel planner", "Flexible itinerary", "24/7 support while away"] },
      { id: "tours", title: "Tours & experiences", group: "Experiences", format: "Day bookings", description: "Guided tours, adventures and local experiences at your destination.", includes: ["Local guides", "Small groups", "Easy cancellation"] },
    ],
  },
  {
    id: "auto-repair", label: "Auto repair", brand: "Precision Auto Care",
    headline: "Back on the road, fast.",
    introduction: "Book a service, get an upfront quote and track your car while it’s in the workshop.",
    offers: [
      { id: "service", title: "Servicing & MOT", group: "Servicing", format: "Bookable slot", description: "Scheduled servicing and inspections to keep your car running well.", includes: ["Multi-point check", "Fluids and filters", "Digital service record"] },
      { id: "repairs", title: "Repairs & diagnostics", group: "Repairs", format: "Diagnostic first", description: "Find the fault and fix it with an upfront, itemised quote.", includes: ["Diagnostic scan", "Itemised quote", "Warranty on parts"] },
      { id: "tyres", title: "Tyres & brakes", group: "Tyres & brakes", format: "Same-day fitting", description: "Tyre fitting, alignment and brake replacement while you wait.", includes: ["Price-matched tyres", "Wheel alignment", "Brake safety check"] },
    ],
  },
  {
    id: "services", label: "Services", brand: "Your Service Studio",
    headline: "Good work starts with a conversation.",
    introduction: "Explore the services, understand the process and tell us what you have in mind.",
    offers: [
      { id: "consultation", title: "Introductory consultation", group: "Consultations", format: "One-to-one conversation", description: "Talk through what you need and explore a sensible starting point.", includes: ["Your goals and priorities", "A discussion of suitable options", "Clear next steps"] },
      { id: "project", title: "Tailored project", group: "Projects", format: "Defined project scope", description: "Shape a service around the specific work, support and outcome you are looking for.", includes: ["An agreed brief", "Defined deliverables", "A review and feedback stage"] },
      { id: "support", title: "Ongoing support", group: "Ongoing support", format: "Agreed support schedule", description: "Arrange continuing support around a clear scope and a schedule that suits the work.", includes: ["A shared list of priorities", "Scheduled check-ins", "Support within your agreed scope"] },
    ],
  },
];

export function getShopifyServiceCategory(category: string): ShopifyServiceCategory {
  const normalized = category.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return shopifyServiceCategories.find(item =>
    item.id.replace(/[^a-z0-9]+/g, "") === normalized
    || item.label.toLowerCase().replace(/[^a-z0-9]+/g, "") === normalized,
  ) ?? shopifyServiceCategories[shopifyServiceCategories.length - 1];
}

export const shopifyServicePreviewCopy = {
  eyebrow: "SERVICES, WITH A PERSONAL APPROACH",
  navigation: "Sample service website",
  services: "Our services",
  process: "How it works",
  questions: "Useful answers",
  enquire: "Request a consultation",
  explore: "Explore services",
  serviceListTitle: "A starting point for what you need.",
  serviceListBody: "Explore each service to see the scope and start a conversation.",
  viewService: "View service",
  allServices: "All services",
  filterLabel: "Filter sample services",
  results: "{count} services to explore",
  oneResult: "1 service to explore",
  storyEyebrow: "THE WAY WE WORK",
  storyTitle: "Personal attention. A clear plan.",
  storyBody: "We start by listening. Then we agree what is needed, explain the process and keep the next step clear.",
  storyDetail: "A service shaped around the work.",
  storyDetailBody: "Share the details that matter to you. Scope, timing and pricing are discussed before any work is arranged.",
  processTitle: "From first conversation to a plan.",
  processSteps: [
    { title: "Explore your options", body: "Choose a service that sounds like a useful starting point.", detail: "Read the scope and bring your questions. You can discuss a tailored request before deciding." },
    { title: "Tell us what you need", body: "Share your priorities and the details of your request.", detail: "Include the context, preferred timing and any practical requirements the team should consider." },
    { title: "Agree the next step", body: "Confirm the scope, pricing and availability with the team.", detail: "A request starts a conversation. An appointment or project is arranged only after the details are agreed." },
  ],
  faq: [
    { question: "Can I ask about a service before arranging it?", answer: "Yes. Start with a consultation request and explain what you need. The service scope and next steps can be discussed before you decide." },
    { question: "How is service pricing confirmed?", answer: "Pricing follows the agreed service and scope. Ask for the details of what is included before arranging any work." },
    { question: "Can the service be tailored?", answer: "Share your requirements with the team. They will review your request and confirm which options are available." },
    { question: "Does sending a request reserve an appointment?", answer: "A request does not reserve a time. Availability and the appointment details need to be confirmed separately." },
  ],
  back: "Back to services",
  includes: "What we can discuss",
  detailLabel: "SERVICE OVERVIEW",
  request: "Enquire about this service",
  related: "Other ways we can help",
  enquiryTitle: "Tell us a little about your request.",
  enquiryLabel: "What would you like to discuss?",
  enquiryPlaceholder: "For example, the service you are interested in and what you need help with.",
  sendSample: "Try sample enquiry",
  demoNote: "This is a local sample. No enquiry will be sent or appointment reserved.",
  sent: "Sample enquiry complete. Nothing was sent and no appointment was booked.",
  serviceImageAlt: "Service business visual supplied for this preview",
  sample: "ILLUSTRATIVE SERVICE EXAMPLE",
  bookingScope: "Live availability, appointment booking and payment tools require a separately confirmed setup within your agreed scope.",
  footer: "Services shaped around your needs.",
};
