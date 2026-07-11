const fs = require('fs');
const path = require('path');

const statesAndCities = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Amravati", "Nanded", "Kolhapur", "Navi Mumbai", "Vasai", "Virar", "Nalasopara", "Bhayandar", "Naigaon", "Kalyan", "Dombivli", "Mira Road", "Ulhasnagar", "Bhiwandi", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Jalna", "Panvel", "Bhusawal", "Satara", "Beed", "Yavatmal", "Kamptee", "Gondia", "Barshi", "Achalpur", "Osmanabad", "Nandurbar", "Wardha", "Udgir", "Hinganghat", "Baramati", "Shirpur", "Kharghar", "Badlapur", "Ambernath", "Malegaon", "Ichalkaranji", "Palghar", "Karad", "Bhandara", "Buldhana", "Washim", "Hingoli", "Ratnagiri", "Sindhudurg", "Gadchiroli"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Dharwad", "Mangalore", "Belgaum", "Gulbarga", "Davangere", "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", "Bidar", "Hospet", "Gadag", "Robertson Pet", "Hassan", "Bhadravati", "Chitradurga", "Udupi", "Kolar", "Mandya", "Chikmagalur", "Gangavati", "Bagalkot", "Ranebennur", "Karwar", "Gokak", "Yadgir", "Rabkavi Banhatti", "Shahabad", "Sirsi", "Sindhnur", "Tiptur", "Nipani", "Nanjangud", "Chamarajanagar", "Sira", "Puttur", "Athni", "Dandeli", "Mudhol", "Gauribidanur", "Haveri", "Koppal", "Ramanagara"],
  "Delhi": ["Delhi", "New Delhi", "Delhi NCR", "Dwarka", "Rohini", "Janakpuri", "Vasant Kunj", "Karol Bagh", "Lajpat Nagar", "Pitampura", "Saket", "Mayur Vihar", "Paschim Vihar", "Shahdara", "Okhla"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Jagtial", "Nirmal", "Kamareddy", "Kothagudem", "Bodhan", "Palwancha", "Mandamarri", "Koratla", "Sircilla", "Tandur", "Siddipet", "Wanaparthy", "Kagaznagar", "Gadwal", "Vikarabad"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Nadiad", "Gandhidham", "Anand", "Morbi", "Surendranagar", "Bharuch", "Vapi", "Navsari", "Veraval", "Porbandar", "Godhra", "Bhuj", "Ankleshwar", "Botad", "Palanpur", "Deesa", "Gondal", "Mahuva", "Amreli", "Mehsana", "Patan", "Dahod", "Valsad", "Viramgam", "Borsad", "Kalol", "Keshod", "Wadhwan", "Savarkundla", "Palitana", "Visnagar", "Dhoraji", "Khambhat", "Mansa", "Una", "Halol", "Kadi", "Visavadar", "Songadh", "Umbergaon"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukkudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Ooty", "Hosur", "Nagercoil", "Kanchipuram", "Kumarapalayam", "Karaikkudi", "Neyveli", "Cuddalore", "Kumbakonam", "Tiruvannamalai", "Pollachi", "Rajapalayam", "Pudukkottai", "Vaniyambadi", "Ambur", "Nagapattinam", "Namakkal", "Arakkonam", "Virudhunagar", "Paramakudi", "Tenkasi", "Dharmapuri", "Viluppuram", "Tiruvarur", "Tirupathur", "Ramanathapuram", "Paramakudi", "Kovilpatti", "Kadayanallur", "Krishnagiri"],
  "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Shantipur", "Ranaghat", "Haldia", "Krishnanagar", "Jalpaiguri", "Balurghat", "Bankura", "Medinipur", "Kharagpur", "Darjeeling", "Naihati", "Habra", "Basirhat", "Kalyani", "Barasat", "Barrackpore", "Bhatpara", "Howrah", "Bidhannagar", "Raiganj", "Purulia", "Alipurduar", "Arambagh", "Tamluk", "Jhargram", "Contai", "Bishnupur", "Bongaon", "Chinsurah", "Serampore", "Bally", "Uluberia"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sri Ganganagar", "Sikar", "Pali", "Tonk", "Kishangarh", "Beawar", "Hanumangarh", "Dholpur", "Sawai Madhopur", "Churu", "Gangapur City", "Jhunjhunu", "Baran", "Chittorgarh", "Makrana", "Nagaur", "Hindaun", "Banswara", "Bundi", "Sujangarh", "Sardarshahar", "Fatehpur", "Karauli", "Pratapgarh", "Nawalgarh", "Rajsamand", "Dausa", "Barmer", "Jaisalmer", "Bhinmal", "Balotra", "Kuchaman", "Phalodi", "Abu Road"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur", "Farrukhabad", "Maunath Bhanjan", "Hapur", "Etawah", "Mirzapur", "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli", "Orai", "Sitapur", "Bahraich", "Modinagar", "Unnao", "Jaunpur", "Lakhimpur", "Hathras", "Banda", "Pilibhit", "Mughalsarai", "Barabanki", "Khurja", "Gonda", "Mainpuri", "Lalitpur", "Etah", "Deoria", "Ujhani", "Ghazipur", "Sultanpur", "Azamgarh", "Bijnor", "Basti", "Chandausi", "Akbarpur", "Ballia", "Tanda", "Greater Noida", "Shikohabad", "Shamli", "Awagarh", "Kasia", "Nagina", "Bhadohi"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara", "Singrauli", "Burhanpur", "Khandwa", "Morena", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur", "Damoh", "Mandsaur", "Khargone", "Neemuch", "Pithampur", "Hoshangabad", "Itarsi", "Sehore", "Betul", "Seoni", "Datia", "Nagda", "Dhar", "Balaghat", "Harda", "Pithampur", "Mhow", "Harda", "Mandla", "Tikamgarh", "Shajapur", "Ashoknagar", "Narsinghpur", "Sheopur", "Panna", "Alirajpur", "Barwani", "Anuppur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Kapurthala", "Rajpura", "Muktsar", "Firozpur", "Faridkot", "Sunam", "Barnala", "Nabha", "Fazilka", "Gurdaspur", "Mansa", "Tarn Taran", "Zirakpur", "Kharar", "Ropar", "Sangrur", "Patti", "Dhuri"],
  "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Palwal", "Hansı", "Narnaul", "Fatehabad", "Gohana", "Tohana", "Narwana", "Mandi Dabwali", "Charkhi Dadri", "Pehowa", "Sohna", "Cheeka", "Safidon", "Kalka"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad", "Kottayam", "Malappuram", "Kannur", "Manjeri", "Thalassery", "Ponnani", "Vatakara", "Kanhangad", "Payyanur", "Koyilandy", "Neyyattinkara", "Taliparamba", "Aluva", "Tirur", "Kayamkulam", "Pathanamthitta", "Muvattupuzha", "Ernakulam", "Idukki", "Wayanad", "Kasargod"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Kadapa", "Anantapur", "Vizianagaram", "Eluru", "Ongole", "Nandyal", "Machilipatnam", "Adoni", "Tenali", "Chittoor", "Hindupur", "Proddatur", "Bhimavaram", "Madanapalle", "Guntakal", "Dharmavaram", "Gudivada", "Srikakulam", "Narasaraopet", "Tadipatri", "Tadepalligudem", "Chilakaluripet", "Yemmiganur", "Guntakal", "Markapur", "Kavali", "Mangalagiri", "Bapatla", "Ponnur"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Saharsa", "Hajipur", "Sasaram", "Dehri", "Siwan", "Motihari", "Nawada", "Bagaha", "Buxar", "Kishanganj", "Sitamarhi", "Jamalpur", "Jehanabad", "Aurangabad", "Lakhisarai", "Bettiah", "Samastipur", "Saharsa", "Banka", "Araria", "Supaul", "Gopalganj", "Madhubani", "Sheohar"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Diphu", "Dhubri", "Karimganj", "Sivasagar", "Goalpara", "Barpeta", "Lanka", "Hojai", "Haflong", "Dergaon"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Ramnagar", "Pithoragarh", "Manglaur", "Nainital", "Almora", "Mussoorie", "Kotdwar", "Tehri", "Pauri", "Uttarkashi"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Bargarh", "Rayagada", "Jeypore", "Koraput", "Angul", "Dhenkanal", "Paradip", "Kendujhar", "Bawanipatna"],
  "Jharkhand": ["Ranchi", "Dhanbad", "Jamshedpur", "Bokaro", "Deoghar", "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Chirkunda", "Dumka", "Chaibasa", "Jhumri Telaiya", "Sahibganj", "Pakur", "Godda", "Gumia"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Chirmiri", "Dhamtari", "Mahasamund", "Bhatapara", "Kanker", "Kondagaon", "Durg", "Janjgir", "Kawardha"],
  "Chandigarh": ["Chandigarh"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Solan", "Dharamshala", "Baddi", "Nahan", "Kullu", "Chamba", "Hamirpur", "Una", "Bilaspur"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore", "Kathua", "Udhampur", "Bandipora", "Poonch", "Kupwara"],
  "Tripura": ["Agartala", "Dharmanagar", "Udaipur", "Kailasahar", "Belonia"],
  "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
  "Nagaland": ["Dimapur", "Kohima", "Mokokchung", "Tuensang"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Sikkim": ["Gangtok", "Namchi", "Geyzing"]
};

let configContent = `// Supported cities config dynamically generated for best SEO
export interface CityConfig {
  name: string;
  state: string;
  description: string;
  keywords: string;
}

export const CITIES_CONFIG: Record<string, CityConfig> = {
`;

const seenSlugs = new Set();

Object.keys(statesAndCities).forEach(state => {
  const uniqueCities = [...new Set(statesAndCities[state])];
  uniqueCities.forEach(city => {
    const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    if (seenSlugs.has(slug)) return;
    seenSlugs.add(slug);

    const description = "Looking for a top web development company in " + city + "? WebXCrafting builds high-performance, responsive business websites, e-commerce stores, and custom software for startups and enterprises in " + city + ", " + state + ".";
    const keywords = "web development company in " + city.toLowerCase() + ", website design agency " + city.toLowerCase() + ", web developers " + city.toLowerCase() + ", ecommerce development " + city.toLowerCase() + ", " + city.toLowerCase() + " it companies";
    
    configContent += "  '" + slug + "': {\n" +
      "    name: '" + city + "',\n" +
      "    state: '" + state + "',\n" +
      "    description: '" + description.replace(/'/g, "\\'") + "',\n" +
      "    keywords: '" + keywords.replace(/'/g, "\\'") + "'\n" +
      "  },\n";
  });
});

configContent += `};\n`;

fs.writeFileSync(path.join(__dirname, '..', 'lib', 'citiesConfig.ts'), configContent);
console.log('Successfully generated lib/citiesConfig.ts with over 250 cities.');
