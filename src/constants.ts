export interface FinancialYear {
  year: string;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  rdExpense: number;
  sgaExpense: number;
  ebit: number;
  ebitMargin: number;
  revenueGrowth: number;
  interestExpense: number;
  ebt: number;
  tax: number;
  netIncome: number;
  eps: number;
  cash: number;
  receivables: number;
  inventory: number;
  nfa: number;
  totalAssets: number;
  totalDebt: number;
  totalEquity: number;
  cfo: number;
  capex: number;
  fcff: number;
}

export interface CompanyData {
  id: string;
  name: string;
  ticker: string;
  analyst: string;
  currency: 'USD' | 'INR';
  sector: string;
  description: string;
  financials: FinancialYear[];
  wacc: any;
  valuation: any;
  risks: any[];
  segments: any[];
  industryData: any[];
  industryTrends: any[];
  strategy: any;
}

const generateMockFinancials = (baseRev: number, growth: number, margin: number, currency: string): FinancialYear[] => {
  return ["2025A", "2026E", "2027E", "2028E", "2029E", "2030E"].map((year, i) => {
    const rev = baseRev * Math.pow(1 + growth, i);
    const ebit = rev * margin;
    return {
      year,
      revenue: Math.round(rev),
      costOfRevenue: Math.round(rev * (1 - margin - 0.1)),
      grossProfit: Math.round(rev * (margin + 0.1)),
      rdExpense: Math.round(rev * 0.05),
      sgaExpense: Math.round(rev * 0.05),
      ebit: Math.round(ebit),
      ebitMargin: margin * 100,
      revenueGrowth: growth * 100,
      interestExpense: Math.round(rev * 0.01),
      ebt: Math.round(ebit * 0.9),
      tax: Math.round(ebit * 0.2),
      netIncome: Math.round(ebit * 0.7),
      eps: currency === 'INR' ? (ebit * 0.7) / 100 : (ebit * 0.7) / 1000,
      cash: Math.round(rev * 0.15),
      receivables: Math.round(rev * 0.12),
      inventory: Math.round(rev * 0.08),
      nfa: Math.round(rev * 0.4),
      totalAssets: Math.round(rev * 1.5),
      totalDebt: Math.round(rev * 0.25),
      totalEquity: Math.round(rev * 0.6),
      cfo: Math.round(ebit * 1.2),
      capex: Math.round(rev * 0.06),
      fcff: Math.round(ebit * 0.9)
    };
  });
};

export const COMPANIES: Record<string, CompanyData> = {
  "qualcomm": {
    id: "qualcomm",
    name: "Qualcomm",
    ticker: "QCOM.NAS",
    analyst: "Arpit Sharma",
    currency: "USD",
    sector: "Semiconductors",
    description: "Qualcomm is a global leader in the development and commercialization of foundational technologies for the wireless industry.",
    financials: generateMockFinancials(44284, 0.08, 0.28, "USD"),
    wacc: { wacc: 10.2, costOfEquity: 10.83, afterTaxCostOfDebt: 4.3 },
    valuation: { intrinsicValue: 187.91, marketPrice: 135.20, enterpriseValue: 208779, marginOfSafety: 28.1 },
    risks: [
      { title: "China Concentration", impact: "High", detail: "~60% revenue linked to China." },
      { title: "Apple In-House Modem", impact: "High", detail: "Apple developing own 5G modem." }
    ],
    segments: [
      { name: 'Handsets', value: 27793, color: '#10b981', growth: 7 },
      { name: 'Automotive', value: 3957, color: '#3b82f6', growth: 36 },
      { name: 'IoT', value: 6617, color: '#8b5cf6', growth: 22 },
      { name: 'Licensing', value: 5582, color: '#f59e0b', growth: 3 }
    ],
    industryData: [
      { segment: 'Mobile Handsets', growth: 5, tam: 280 },
      { segment: 'Automotive', growth: 25, tam: 22 },
      { segment: 'IoT / Edge AI', growth: 18, tam: 45 },
      { segment: 'Data Center', growth: 35, tam: 120 },
      { segment: 'Licensing', growth: 3, tam: 15 }
    ],
    industryTrends: [
      { title: "AI Edge Computing", desc: "Shift from cloud-based AI to on-device inference.", impact: "High", icon: "Zap" },
      { title: "Automotive Electrification", desc: "Digital chassis becoming standard in next-gen EVs.", impact: "High", icon: "Cpu" },
      { title: "5G Advanced / 6G", desc: "Next-gen connectivity standards.", impact: "Medium", icon: "Globe" },
      { title: "Supply Chain Resilience", desc: "Diversification of foundry partnerships.", impact: "Medium", icon: "ShieldCheck" }
    ],
    strategy: {
      ansoff: [{ quadrant: "Market Development", priority: "High", assessment: "Expanding into Automotive and PC." }],
      competitivePositioning: [
        { name: "Qualcomm", performance: 95, price: 90, position: "Premium Integrated Leader" },
        { name: "MediaTek", performance: 80, price: 70, position: "Value Leader" },
        { name: "Apple (Internal)", performance: 98, price: 100, position: "Vertical Giant" }
      ]
    }
  }
};

// Add all requested companies with mock data structure
const requestedCompanies = [
  { name: "Apollo", analyst: "Anirudh Agarwal", currency: "INR" as const, ticker: "APOLLOHOSP.NSE", sector: "Healthcare" },
  { name: "MRF", analyst: "Shrisai Hari", currency: "INR" as const, ticker: "MRF.NSE", sector: "Automotive Tyres" },
  { name: "JK Tyres", analyst: "Swayam Panigrahi", currency: "INR" as const, ticker: "JKTYRE.NSE", sector: "Automotive Tyres" },
  { name: "CEAT", analyst: "Harshini Venkat", currency: "INR" as const, ticker: "CEAT.NSE", sector: "Automotive Tyres" },
  { name: "SBI", analyst: "Anoushka Gadhwal", currency: "INR" as const, ticker: "SBIN.NSE", sector: "Banking" },
  { name: "HDFC", analyst: "Ryan Kidangan", currency: "INR" as const, ticker: "HDFCBANK.NSE", sector: "Banking" },
  { name: "ICICI", analyst: "Himangshi Bose", currency: "INR" as const, ticker: "ICICIBANK.NSE", sector: "Banking" },
  { name: "Axis", analyst: "Bismaya Nayak", currency: "INR" as const, ticker: "AXISBANK.NSE", sector: "Banking" },
  { name: "Warner Bros", analyst: "Dhairya Vanker", currency: "USD" as const, ticker: "WBD.NAS", sector: "Media & Entertainment" },
  { name: "Netflix", analyst: "Hiya Phatnani", currency: "USD" as const, ticker: "NFLX.NAS", sector: "Media & Entertainment" },
  { name: "Disney Entertainment", analyst: "Siya Sharma", currency: "USD" as const, ticker: "DIS.NYS", sector: "Media & Entertainment" },
  { name: "Paramount", analyst: "Tanvi Gujarathi", currency: "USD" as const, ticker: "PARA.NAS", sector: "Media & Entertainment" },
  { name: "Laurus Labs", analyst: "Satvik Sharma", currency: "INR" as const, ticker: "LAURUSLABS.NSE", sector: "Pharmaceuticals" },
  { name: "AuroBindo", analyst: "Arya Mukharjee", currency: "INR" as const, ticker: "AUROPHARMA.NSE", sector: "Pharmaceuticals" },
  { name: "Sun Pharma", analyst: "Yogesh Bolkotagi", currency: "INR" as const, ticker: "SUNPHARMA.NSE", sector: "Pharmaceuticals" },
  { name: "Divis Labs", analyst: "Bhavansh Madan", currency: "INR" as const, ticker: "DIVISLAB.NSE", sector: "Pharmaceuticals" },
  { name: "Procter & Gamble", analyst: "Nayan Kanchan", currency: "USD" as const, ticker: "PG.NYS", sector: "FMCG" },
  { name: "ITC", analyst: "Gajanan Kudva", currency: "INR" as const, ticker: "ITC.NSE", sector: "FMCG" },
  { name: "HUL", analyst: "Suhina Sarkar", currency: "INR" as const, ticker: "HINDUNILVR.NSE", sector: "FMCG" },
  { name: "Nestle", analyst: "Saaraansh Razdan", currency: "INR" as const, ticker: "NESTLEIND.NSE", sector: "FMCG" },
  { name: "Palantir Technologies", analyst: "Krrish Bahuguna", currency: "USD" as const, ticker: "PLTR.NYS", sector: "Software/AI" },
  { name: "Salesforce", analyst: "Rishit Hotchandani", currency: "USD" as const, ticker: "CRM.NYS", sector: "Software/SaaS" },
  { name: "Oracle", analyst: "Ruchita Gowri", currency: "USD" as const, ticker: "ORCL.NYS", sector: "Software/Cloud" },
  { name: "CrowdStrike", analyst: "Ashi Beniwal", currency: "USD" as const, ticker: "CRWD.NAS", sector: "Cybersecurity" },
  { name: "Aditya Birla Sunlife AMC", analyst: "Pallewar Pranav", currency: "INR" as const, ticker: "ABSLAMC.NSE", sector: "Asset Management" },
  { name: "HDFC AMC", analyst: "Rittika Saraswat", currency: "INR" as const, ticker: "HDFCAMC.NSE", sector: "Asset Management" },
  { name: "Nippon Life India AMC", analyst: "Sam Phillips", currency: "INR" as const, ticker: "NAM-INDIA.NSE", sector: "Asset Management" },
  { name: "UTI AMC", analyst: "Abhinav Singh", currency: "INR" as const, ticker: "UTIAMC.NSE", sector: "Asset Management" },
  { name: "Shree Cements Ltd", analyst: "Anjor Singh", currency: "INR" as const, ticker: "SHREECEM.NSE", sector: "Cement" },
  { name: "Ultratech", analyst: "Rahul Gowda", currency: "INR" as const, ticker: "ULTRACEMCO.NSE", sector: "Cement" },
  { name: "Dalmia", analyst: "Kushagra Shukla", currency: "INR" as const, ticker: "DALBHARAT.NSE", sector: "Cement" },
  { name: "Ramco", analyst: "Grace Rebecca David", currency: "INR" as const, ticker: "RAMCOCEM.NSE", sector: "Cement" },
  { name: "Microsoft", analyst: "Gurleen Kaur", currency: "USD" as const, ticker: "MSFT.NAS", sector: "Technology" },
  { name: "Alphabet", analyst: "Anugraha AB", currency: "USD" as const, ticker: "GOOGL.NAS", sector: "Technology" },
  { name: "Meta", analyst: "Senjuti Pal", currency: "USD" as const, ticker: "META.NAS", sector: "Technology" },
  { name: "IBM", analyst: "Biba Pattnaik", currency: "USD" as const, ticker: "IBM.NYS", sector: "Technology" },
  { name: "Porsche", analyst: "Gautam Poturaju", currency: "USD" as const, ticker: "P911.DE", sector: "Automotive" },
  { name: "Ford", analyst: "Archana V", currency: "USD" as const, ticker: "F.NYS", sector: "Automotive" },
  { name: "Volkswagen", analyst: "Sunidhi Datar", currency: "USD" as const, ticker: "VOW3.DE", sector: "Automotive" },
  { name: "Tata Motors", analyst: "Rithin Reji", currency: "INR" as const, ticker: "TATAMOTORS.NSE", sector: "Automotive" },
  { name: "Lockheed Martin", analyst: "Siddhant Mehta", currency: "USD" as const, ticker: "LMT.NYS", sector: "Defense" },
  { name: "General Dynamics", analyst: "Shlok Pratap Singh", currency: "USD" as const, ticker: "GD.NYS", sector: "Defense" },
  { name: "Northrop Grumman", analyst: "Harshdeep Roshan", currency: "USD" as const, ticker: "NOC.NYS", sector: "Defense" },
  { name: "RTX Corporation", analyst: "Prandeep Poddar", currency: "USD" as const, ticker: "RTX.NYS", sector: "Defense" },
  { name: "Mahindra & Mahindra", analyst: "Vinamra Gupta", currency: "INR" as const, ticker: "M&M.NSE", sector: "Automotive" },
  { name: "Hyundai", analyst: "Samarth Rao", currency: "USD" as const, ticker: "HYMTF.OTC", sector: "Automotive" },
  { name: "Olectra", analyst: "Aryan Jha", currency: "INR" as const, ticker: "OLECTRA.NSE", sector: "Automotive/EV" },
  { name: "Ather Energy", analyst: "N/A", currency: "INR" as const, ticker: "ATHER.PRIVATE", sector: "Automotive/EV" },
  { name: "ASML", analyst: "Adaa Gujral", currency: "USD" as const, ticker: "ASML.NAS", sector: "Semiconductors" },
  { name: "Intel", analyst: "Aditi Ranjan", currency: "USD" as const, ticker: "INTC.NAS", sector: "Semiconductors" },
  { name: "Nvidia", analyst: "Sijal Verma", currency: "USD" as const, ticker: "NVDA.NAS", sector: "Semiconductors" },
  { name: "Chalet Hotels", analyst: "Shreya Joshi", currency: "INR" as const, ticker: "CHALET.NSE", sector: "Hospitality" },
  { name: "Mahindra Holidays", analyst: "Gowri Shetty", currency: "INR" as const, ticker: "MHRIL.NSE", sector: "Hospitality" },
  { name: "Indian Hotels co.", analyst: "Aarohi Jain", currency: "INR" as const, ticker: "INDHOTEL.NSE", sector: "Hospitality" }
];

requestedCompanies.forEach(c => {
  const id = c.name.toLowerCase().replace(/\s+/g, '-');
  if (!COMPANIES[id]) {
    const isINR = c.currency === 'INR';
    const baseRev = isINR ? 150000 : 15000;
    const growth = 0.08 + Math.random() * 0.1;
    const margin = 0.15 + Math.random() * 0.15;
    const marketPrice = isINR ? 1500 + Math.random() * 2000 : 150 + Math.random() * 200;
    const intrinsicValue = marketPrice * (1.1 + Math.random() * 0.4);
    
    COMPANIES[id] = {
      id,
      name: c.name,
      ticker: c.ticker,
      analyst: c.analyst,
      currency: c.currency,
      sector: c.sector,
      description: `${c.name} is a leading player in the ${c.sector} industry, recognized for its market presence and strategic initiatives.`,
      financials: generateMockFinancials(baseRev, growth, margin, c.currency),
      wacc: { wacc: 9.5 + Math.random() * 3, costOfEquity: 11 + Math.random() * 4, afterTaxCostOfDebt: 5 + Math.random() * 3 },
      valuation: { 
        intrinsicValue: Math.round(intrinsicValue * 100) / 100, 
        marketPrice: Math.round(marketPrice * 100) / 100, 
        enterpriseValue: Math.round(baseRev * 12),
        marginOfSafety: Math.round(((intrinsicValue - marketPrice) / intrinsicValue) * 1000) / 10
      },
      risks: [
        { title: "Market Competition", impact: "High", detail: "Increasing competition from domestic and international players." },
        { title: "Regulatory Changes", impact: "Medium", detail: "Potential impact from changing government policies and regulations." },
        { title: "Macroeconomic Headwinds", impact: "Medium", detail: "Sensitivity to interest rate changes and inflation." }
      ],
      segments: [
        { name: 'Core Operations', value: baseRev * 0.6, color: '#10b981', growth: Math.round(growth * 100) },
        { name: 'Emerging Tech', value: baseRev * 0.25, color: '#3b82f6', growth: Math.round(growth * 150) },
        { name: 'Services', value: baseRev * 0.15, color: '#8b5cf6', growth: Math.round(growth * 80) }
      ],
      industryData: [
        { segment: 'Core Market', growth: Math.round(growth * 80), tam: baseRev * 5 },
        { segment: 'Digital Transformation', growth: Math.round(growth * 120), tam: baseRev * 3 },
        { segment: 'Sustainability', growth: Math.round(growth * 200), tam: baseRev * 2 }
      ],
      industryTrends: [
        { title: "Digital Acceleration", desc: "Rapid adoption of digital tools across the sector.", impact: "High", icon: "Zap" },
        { title: "Sustainability Focus", desc: "Increasing pressure for green operations.", impact: "High", icon: "Globe" },
        { title: "Supply Chain Resilience", desc: "Diversification of supply sources.", impact: "Medium", icon: "ShieldCheck" }
      ],
      strategy: {
        ansoff: [
          { quadrant: "Market Penetration", priority: "High", assessment: "Deepening presence in existing core markets through better service." },
          { quadrant: "Product Development", priority: "Medium", assessment: "Investing in R&D to launch next-generation offerings." }
        ],
        competitivePositioning: [
          { name: c.name, performance: 85, price: 80, position: "Market Leader" },
          { name: "Competitor A", performance: 70, price: 60, position: "Value Challenger" },
          { name: "Competitor B", performance: 90, price: 95, position: "Premium Niche" }
        ]
      }
    };
  }
});

export const VALUATION_SUMMARY = COMPANIES["qualcomm"].valuation;
export const QCOM_FULL_DATA = COMPANIES["qualcomm"].financials;
export const RISKS = COMPANIES["qualcomm"].risks;
export const STRATEGY_METRICS = COMPANIES["qualcomm"].strategy;
export const WACC_COMPONENTS = COMPANIES["qualcomm"].wacc;
