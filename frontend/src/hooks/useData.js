import { useState, useEffect } from "react";

const LS_KEY = "siyathemba_data";

const SEED = {
  posts: [
    { id: "p1", title: "Water Supply Interruption – Prieska North", content: "Residents of Prieska North are advised that water supply will be interrupted on 15 April 2026 from 08:00–17:00 for scheduled infrastructure maintenance. Water tankers will be available at the civic centre.", category: "Infrastructure", author: "Technical Services", created_at: "2026-04-10" }, // 1 day ago
    { id: "p2", title: "Mayor's Report: Q1 Service Delivery Update", content: "The Executive Mayor presents the Q1 2026 service delivery report highlighting achievements in road rehabilitation, housing projects, and community facilities expansion across all wards.", category: "Council", author: "Office of the Mayor", created_at: "2026-04-09" }, // 2 days ago
    { id: "p3", title: "Free Basic Services Programme Extended", content: "The municipality has approved the extension of the Free Basic Services Programme to an additional 1,200 indigent households. Applications open at all ward offices from 1 May 2026.", category: "Community", author: "Community Services", created_at: "2026-04-02" },
    { id: "p4", title: "Road Rehabilitation: Main Street Prieska", content: "The Technical Services Department announces the commencement of Main Street rehabilitation works starting 20 April. Motorists are advised to use alternative routes.", category: "Infrastructure", author: "Technical Services", created_at: "2026-03-28" },
    { id: "p5", title: "Youth Skills Development Programme – Enroll Now", content: "Siyathemba Municipality in partnership with the SETA is offering free skills training in construction, plumbing and electrical. Youth aged 18–35 are encouraged to apply.", category: "Community", author: "Community Services", created_at: "2026-03-20" },
    { id: "p6", title: "Infrastructure Grant: R12.3m Awarded for Bulk Water", content: "The Department of CoGTA has approved a R12.3 million infrastructure grant for Siyathemba. Funds will be used for bulk water infrastructure in Niekerkshoop.", category: "Finance", author: "Finance Department", created_at: "2026-03-15" },
  ],
  events: [
    { id: "e1", title: "Community Imbizo – Ward 3", description: "The Executive Mayor will host a community imbizo to discuss service delivery challenges and municipal plans for Ward 3.", date: "2026-04-18", time: "10:00", location: "Ward 3 Community Hall, Prieska", category: "Council Engagement", created_at: "2026-04-10" },
    { id: "e2", title: "Budget 2026/27 Public Participation", description: "Citizens are invited to participate in the municipal budget process.", date: "2026-04-22", time: "09:00", location: "Civic Centre, Prieska", category: "Finance", created_at: "2026-04-09" },
    { id: "e3", title: "Freedom Day Commemoration", description: "The municipality invites all residents to the official Freedom Day commemoration ceremony.", date: "2026-04-27", time: "08:00", location: "Prieska Stadium", category: "Civic", created_at: "2026-04-05" },
    { id: "e4", title: "Indigent Register Update Drive", description: "Municipal officials will visit all wards to update the indigent register.", date: "2026-05-05", time: "08:00", location: "All Wards – Mobile Units", category: "Community", created_at: "2026-04-01" },
    { id: "e5", title: "Youth Day Sports Festival", description: "Annual Youth Day sports festival hosted by Community Services.", date: "2026-06-16", time: "08:00", location: "Prieska Sports Grounds", category: "Civic", created_at: "2026-03-20" },
  ],
  documents: [
    { id: "d1", title: "Draft Budget 2026/27", description: "Siyathemba Local Municipality Draft Budget and Tariffs for the 2026/27 financial year.", file_url: "#", category: "Budget & Tariffs", file_size: "2.4 MB", file_type: "PDF", downloads: 312, created_at: "2026-04-10" },
    { id: "d2", title: "Annual Financial Statements 2024/25", description: "Audited Annual Financial Statements as required by the MFMA.", file_url: "#", category: "Annual Reports", file_size: "5.1 MB", file_type: "PDF", downloads: 189, created_at: "2026-02-15" },
    { id: "d3", title: "Integrated Development Plan (IDP) 2022–2027", description: "Five-year Integrated Development Plan guiding municipal service delivery.", file_url: "#", category: "IDP", file_size: "8.7 MB", file_type: "PDF", downloads: 445, created_at: "2022-07-01" },
    { id: "d4", title: "SCM Policy – Supply Chain Management", description: "Municipal Supply Chain Management Policy in compliance with MFMA regulations.", file_url: "#", category: "Policies", file_size: "1.2 MB", file_type: "PDF", downloads: 98, created_at: "2024-01-10" },
    { id: "d5", title: "Spatial Development Framework 2023", description: "Land use planning and spatial development framework for Siyathemba.", file_url: "#", category: "Planning", file_size: "14.3 MB", file_type: "PDF", downloads: 76, created_at: "2023-05-20" },
    { id: "d6", title: "Draft Tariffs 2026/27 – Schedule A", description: "Draft tariff schedule for water, electricity, refuse removal and other municipal services.", file_url: "#", category: "Budget & Tariffs", file_size: "0.8 MB", file_type: "PDF", downloads: 201, created_at: "2026-04-09" },
  ],
  notices: [
    { id: "n1", title: "Chief Traffic Officer: Law Enforcement & Licensing", content: "Applications are invited for the post of Chief Traffic Officer. Closing date: 20 April 2026.", category: "vacancy", urgency: "normal", created_at: "2026-04-10" },
    { id: "n2", title: "Accountant Revenue – 1 Post", content: "Applications for Accountant Revenue (1 Post). Minimum BCom Accounting. Closing date 30 April 2026.", category: "vacancy", urgency: "normal", created_at: "2026-03-28" },
    { id: "n3", title: "Public Notice: Proposed Tariff Increases 2026/27", content: "The municipality hereby gives notice of proposed tariff increases for water, electricity and refuse removal for public comment.", category: "public", urgency: "urgent", created_at: "2026-04-05" },
    { id: "n4", title: "Media Release: Infrastructure Grant Awarded", content: "The Department of CoGTA has approved a R12.3 million infrastructure grant for Siyathemba.", category: "media", urgency: "normal", created_at: "2026-03-20" },
    { id: "n5", title: "Traffic Officer – DLTC: 1 Post", content: "Siyathemba Municipality invites applications for Traffic Officer at the Driving Licence Testing Centre.", category: "vacancy", urgency: "normal", created_at: "2026-03-15" },
  ],
  tenders: [
    { id: "t1", reference: "SLM-T-2026-001", title: "Supply and Installation of Solar Street Lights – Phase 2", description: "Supply, delivery and installation of 120 solar-powered street lights across Prieska and Marydale.", category: "tender", closing_date: "2026-05-02", status: "open", created_at: "2026-04-10" },
    { id: "t2", reference: "SLM-Q-2026-014", title: "Provision of Catering Services – Imbizo Events", description: "Quotations invited for catering services for municipal imbizo events.", category: "quotation", closing_date: "2026-04-18", status: "open", created_at: "2026-04-09" },
    { id: "t3", reference: "SLM-T-2025-019", title: "Rehabilitation of Gravel Roads – Ward 1 & 2", description: "Rehabilitation of approximately 12 km of gravel roads in Ward 1 and Ward 2.", category: "tender", closing_date: "2025-11-30", status: "awarded", created_at: "2025-10-01" },
    { id: "t4", reference: "SLM-T-2026-002", title: "Construction of Multi-Purpose Community Centre – Niekerkshoop", description: "Design and construction of a multi-purpose community facility.", category: "tender", closing_date: "2026-05-15", status: "open", created_at: "2026-04-02" },
    { id: "t5", reference: "SLM-Q-2026-015", title: "Maintenance of Municipal Vehicle Fleet", description: "Quotations for servicing and maintenance of 18 municipal vehicles for 12 months.", category: "quotation", closing_date: "2026-04-25", status: "open", created_at: "2026-04-08" },
  ],
  // Council data (unchanged)
  mayor: {
    name: "Hon. Mayor Johan Andrew Phillips",
    role: "PR Councillor",
    photo: "/council/mayor1.png",
    phone: "060 732 3405",
    email: "andrewwestp@gmail.com",
    address: "3826 Mandela Square, Prieska, 8940",
  },
  councillors: [
    { id: "c1", name: "Hon. Speaker Giel Macdonald", role: "Ward 6 Councillor", photo: "/council/Giel_Macdonald_Ward_6_Councillor.png", phone: "060 453 7672", email: "macdonaldgiel0@gmail.com", address: "12 Bloubos Street, Extension 15, Prieska, 8940" },
    { id: "c2", name: "Jacobus Platvoet", role: "Ward 1 Councillor", photo: "/council/Jacobus_Platvoet_Ward1_Councillor.png", phone: "060 789 8178 / 079 297 1511", email: "platvoet2on@gmail.com", address: "D50 Kodwa Street, E'thembeni, Prieska, 8940" },
    { id: "c3", name: "Ronald John Februarie", role: "Ward 2 Councillor", photo: "/council/placeholder.png", phone: "083 212 4164 / 081 785 3331", email: "ronaldfeb@gmail.com", address: "55 Ou Upington Street, Prieska, 8940" },
    { id: "c4", name: "Willon Henzel Pieterse", role: "Ward 3 Councillor", photo: "/council/Willon_Pieterse_Ward_3_Councillor.png", phone: "081 818 2602", email: "willonpieterse@gmail.com", address: "25 Flamink Street, Niekerkshoop, 8930" },
    { id: "c5", name: "Shandy Bridget Ivitta", role: "Ward 4 Councillor", photo: "/council/Shandy_Ivitta_Ward_4_Councillor.png", phone: "078 139 2088", email: "mdale8910@gmail.com", address: "06 Garant Street, Marydale, 8910" },
    { id: "c6", name: "Lazarus Mzwandile Zenani", role: "Ward 5 Councillor", photo: "/council/Lazarus_Zenani_Ward_5_Councillor.png", phone: "061 215 1795", email: "lazarusc36@gmail.com", address: "Town, Prieska, 8940" },
    { id: "c7", name: "Sarah Saaiman", role: "PR Councillor", photo: "/council/Sarah_Saaiman_PR_Councillor.png", phone: "082 843 0848", email: "sarahsaaiman08@gmail.com", address: "1138 Ou Upington Street, Prieska, 8940" },
    { id: "c8", name: "Wiida Pelster", role: "PR Councillor", photo: "/council/Wiida_Pelster_PR_Councillor.png", phone: "082 937 5051", email: "wiidapelster@gmail.com", address: "05 De Laan 24, Prieska" },
    { id: "c9", name: "Mauricia Estel Nimmerhoudt", role: "PR Councillor", photo: "/council/Mauricia_Nimmerhoud_PR_Councillor.png", phone: "074 509 1215", email: "mauriciaestell@gmail.com", address: "15 Buitekant Street, Niekerkshoop, 8930" },
    { id: "c10", name: "Siziwe Patricia Mooi", role: "PR Councillor", photo: "/council/Siziwe_Mooi_PR_Councillor.png", phone: "078 816 1843", email: "chumisamooi@gmail.com", address: "G9 Polinyana Street, Prieska, 8940" },
  ],
};

function loadData() {
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem(LS_KEY, JSON.stringify(SEED));
  return SEED;
}

function saveData(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function useData() {
  const [data, setData] = useState(() => loadData());

  useEffect(() => {
    saveData(data);
  }, [data]);

  return { data, setData };
}