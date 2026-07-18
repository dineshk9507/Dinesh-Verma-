import { QuizQuestion, RoutineItem, Testimonial, GalleryItem } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionHi: 'क्या आपको लगता है कि आपको सामान्य रूप से काम करने के लिए नशे की आवश्यकता होती है?',
    questionEn: 'Do you feel you need the substance/alcohol to function normally in daily life?',
    options: [
      { textHi: 'कभी नहीं', textEn: 'Never', score: 0 },
      { textHi: 'कभी-कभी', textEn: 'Sometimes', score: 1 },
      { textHi: 'अक्सर / हमेशा', textEn: 'Frequently / Always', score: 3 },
    ],
  },
  {
    id: 2,
    questionHi: 'क्या नशे की आदत के कारण आपके परिवार या मित्रों के साथ वाद-विवाद होते हैं?',
    questionEn: 'Does your substance use lead to arguments or issues with family or friends?',
    options: [
      { textHi: 'नहीं, कभी नहीं', textEn: 'No, never', score: 0 },
      { textHi: 'हाँ, कभी-कभी', textEn: 'Yes, sometimes', score: 2 },
      { textHi: 'हाँ, बहुत अधिक', textEn: 'Yes, very frequently', score: 4 },
    ],
  },
  {
    id: 3,
    questionHi: 'क्या आपने कभी नशा कम करने या छोड़ने की कोशिश की है, लेकिन असफल रहे?',
    questionEn: 'Have you ever tried to cut down or stop using but were unsuccessful?',
    options: [
      { textHi: 'कभी कोशिश नहीं की (कोई नशा नहीं है)', textEn: 'Never tried (or no substance issue)', score: 0 },
      { textHi: 'हाँ, मैंने कोशिश की और सफल रहा', textEn: 'Yes, I tried and succeeded', score: 1 },
      { textHi: 'हाँ, मैंने कई बार कोशिश की पर छोड़ नहीं पाया', textEn: 'Yes, tried multiple times but failed', score: 4 },
    ],
  },
  {
    id: 4,
    questionHi: 'क्या नशे के प्रभाव के कारण आपके काम, स्कूल या घरेलू जिम्मेदारियों पर असर पड़ रहा है?',
    questionEn: 'Is your substance use affecting your work, education, or household duties?',
    options: [
      { textHi: 'बिल्कुल नहीं', textEn: 'Not at all', score: 0 },
      { textHi: 'थोड़ा बहुत असर पड़ रहा है', textEn: 'Slightly / Moderate impact', score: 2 },
      { textHi: 'बहुत गंभीर असर पड़ रहा है', textEn: 'Severe impact', score: 4 },
    ],
  },
  {
    id: 5,
    questionHi: 'क्या आपको सुबह उठते ही सबसे पहले नशे की तीव्र इच्छा महसूस होती है?',
    questionEn: 'Do you feel a strong craving to use first thing in the morning?',
    options: [
      { textHi: 'कभी नहीं', textEn: 'Never', score: 0 },
      { textHi: 'कभी-कभी', textEn: 'Sometimes', score: 2 },
      { textHi: 'लगभग हर रोज', textEn: 'Almost every day', score: 4 },
    ],
  }
];

export const routineItems: RoutineItem[] = [
  {
    time: '05:30 AM',
    activityHi: 'जागरण (उठना) और सुबह का ताजा वातावरण',
    activityEn: 'Wake Up & Fresh Morning Routine',
    category: 'morning',
    icon: 'Sun',
  },
  {
    time: '06:00 AM - 07:30 AM',
    activityHi: 'हर्बल चाय के साथ योग, प्राणायाम और ध्यान सत्र',
    activityEn: 'Yoga, Pranayama, and Meditation session with Herbal Tea',
    category: 'morning',
    icon: 'Activity',
  },
  {
    time: '08:15 AM - 09:00 AM',
    activityHi: 'पौष्टिक एवं शुद्ध नाश्ता (दूध, फल, दलिया)',
    activityEn: 'Nutritious & Pure Breakfast (Milk, Fruits, Porridge)',
    category: 'morning',
    icon: 'Coffee',
  },
  {
    time: '09:30 AM - 11:30 AM',
    activityHi: 'सामूहिक विचार-विमर्श और नैतिक शिक्षा कक्षा',
    activityEn: 'Group Discussion & Moral Education Class',
    category: 'morning',
    icon: 'Users',
  },
  {
    time: '12:30 PM - 01:30 PM',
    activityHi: 'शुद्ध शाकाहारी स्वादिष्ट दोपहर का भोजन और विश्राम',
    activityEn: 'Delicious Pure Vegetarian Lunch & Rest Period',
    category: 'afternoon',
    icon: 'Utensils',
  },
  {
    time: '02:00 PM - 03:30 PM',
    activityHi: 'व्यक्तिगत काउंसलिंग और वन-टू-वन थेरेपी सत्र',
    activityEn: 'Individual Counseling & One-to-One Therapy Session',
    category: 'afternoon',
    icon: 'MessageSquare',
  },
  {
    time: '04:00 PM - 05:30 PM',
    activityHi: 'शाम के खेल, इनडोर गेम्स और मनोरंजन समय',
    activityEn: 'Evening Sports, Indoor Games, and Recreational Time',
    category: 'afternoon',
    icon: 'Dribbble',
  },
  {
    time: '06:00 PM - 07:00 PM',
    activityHi: 'आरती, भजन और आध्यात्मिक सभा',
    activityEn: 'Aarti, Devotional Songs, and Spiritual Gathering',
    category: 'evening',
    icon: 'Flame',
  },
  {
    time: '07:30 PM - 08:30 PM',
    activityHi: 'शाम की सामूहिक बैठक (आत्म-विश्लेषण सत्र)',
    activityEn: 'Evening Group Assembly (Self-analysis session)',
    category: 'evening',
    icon: 'Award',
  },
  {
    time: '08:30 PM - 09:15 PM',
    activityHi: 'हल्का और सुपाच्य रात्रि का भोजन',
    activityEn: 'Light and Easily Digestible Dinner',
    category: 'night',
    icon: 'Moon',
  },
  {
    time: '09:30 PM',
    activityHi: 'शांतिपूर्ण नींद के लिए प्रस्थान',
    activityEn: 'Retire to Bed for Peaceful Sleep',
    category: 'night',
    icon: 'BedDouble',
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    nameHi: 'अमित कुमार',
    nameEn: 'Amit Kumar',
    age: 32,
    locationHi: 'हनुमानगढ़ टाउन',
    locationEn: 'Hanumangarh Town',
    storyHi: 'मैं पिछले 8 वर्षों से शराब की गंभीर लत से पीड़ित था। घर बिखर चुका था। कोशिश केंद्र में 3 महीने के इलाज और दिनेश जी की काउंसलिंग के बाद, आज मैं पूरी तरह से स्वस्थ हूँ और अपनी दुकान संभाल रहा हूँ। यहाँ का माहौल सचमुच घरेलू है।',
    storyEn: 'I suffered from severe alcohol addiction for 8 years. My family was falling apart. After 3 months at Koshish and counselor Dinesh ji\'s guidance, I am completely sober and running my shop. The atmosphere here is truly family-like.',
    recoveryHi: '14 महीने से पूरी तरह नशा मुक्त',
    recoveryEn: 'Sober for 14 Months',
  },
  {
    id: 't2',
    nameHi: 'राजेश सिंह',
    nameEn: 'Rajesh Singh',
    age: 26,
    locationHi: 'जंक्शन, हनुमानगढ़',
    locationEn: 'Junction, Hanumangarh',
    storyHi: 'गलत संगति के कारण मुझे स्मैक (चिट्टे) की लत लग गई थी। मुझे लगा था कि मैं कभी सामान्य नहीं हो पाऊंगा। लेकिन कोशिश केंद्र के डॉक्टरों, योग सत्रों और सुधारात्मक दिनचर्या ने मुझे नया जीवन दिया है। अब मैं नौकरी कर रहा हूँ।',
    storyEn: 'Due to bad company, I fell into smack addiction. I thought I would never recover. But the doctors, yoga sessions, and structured routine at Koshish center gave me a new life. Today I am happily employed.',
    recoveryHi: '2 वर्ष से नशा मुक्त',
    recoveryEn: 'Sober for 2 Years',
  },
  {
    id: 't3',
    nameHi: 'संदीप बिश्नोई',
    nameEn: 'Sandeep Bishnoi',
    age: 38,
    locationHi: 'पीलीबंगा',
    locationEn: 'Pilibanga',
    storyHi: 'अफीम की लत ने मेरा शरीर और दिमाग दोनों खराब कर दिया था। यहाँ के पौष्टिक भोजन, दैनिक योग अभ्यास और निरंतर प्रेरणा ने मेरे भीतर आत्मबल जगाया। दिनेश वर्मा जी और पूरे स्टाफ का बहुत-बहुत धन्यवाद।',
    storyEn: 'Opium addiction ruined both my health and mind. The nutritious food, daily yoga, and constant motivation here awakened my inner strength. Infinite thanks to Dinesh Verma ji and the entire staff.',
    recoveryHi: '18 महीने से नया जीवन',
    recoveryEn: 'New Life for 18 Months',
  }
];

export const treatmentSteps = [
  {
    step: '०१',
    titleHi: 'पंजीकरण और प्रारंभिक स्वास्थ्य जांच',
    titleEn: 'Registration & Medical Assessment',
    descHi: 'मरीज के शारीरिक और मानसिक स्वास्थ्य की गहराई से जांच की जाती है ताकि उनकी लत के स्तर के अनुसार विशिष्ट योजना बनाई जा सके।',
    descEn: 'A deep assessment of physical and mental health is conducted to tailor a recovery plan suited to the patient\'s level of addiction.'
  },
  {
    step: '०२',
    titleHi: 'सुरक्षित डिटॉक्सिफिकेशन (Detox)',
    titleEn: 'Safe Detoxification Process',
    descHi: 'अनुभवी चिकित्सकों की देखरेख में शरीर से जहरीले पदार्थों को बिना किसी दर्द या अत्यधिक परेशानी के सुरक्षित रूप से बाहर निकाला जाता है।',
    descEn: 'Under medical supervision, toxins are safely eliminated from the body with minimal discomfort and utmost care.'
  },
  {
    step: '०३',
    titleHi: 'व्यक्तिगत काउंसलिंग और थेरेपी',
    titleEn: 'Individual Counseling & Therapy',
    descHi: 'दिनेश वर्मा जी और विशेषज्ञों द्वारा प्रतिदिन विचार-विमर्श सत्र आयोजित किए जाते हैं जो मरीज के मानसिक तनाव को दूर कर उन्हें मजबूती देते हैं।',
    descEn: 'Daily counseling sessions by Dinesh Verma and specialists help address triggers, mental stress, and build psychological resilience.'
  },
  {
    step: '०४',
    titleHi: 'योग, ध्यान और आत्मिक सुधार',
    titleEn: 'Yoga, Meditation & Spiritual Healing',
    descHi: 'सुबह का योग और ध्यान सत्र मन को एकाग्र करने, इच्छाशक्ति को मजबूत करने और नकारात्मक विचारों को दूर करने में सहायता करता है।',
    descEn: 'Morning yoga and breathing exercises strengthen willpower, improve physical stamina, and clear negative thoughts.'
  },
  {
    step: '०५',
    titleHi: 'पुनर्वास और सामाजिक मुख्यधारा',
    titleEn: 'Rehabilitation & Re-integration',
    descHi: 'मरीजों को विभिन्न कलाओं, इनडोर खेलों और सामूहिक गतिविधियों में शामिल किया जाता है ताकि वे समाज में वापस सम्मानजनक स्थान पा सकें।',
    descEn: 'Engaging in creative activities, indoor sports, and community discussions restores confidence to re-enter society with dignity.'
  },
  {
    step: '०६',
    titleHi: 'इलाज के बाद सहायता (Aftercare)',
    titleEn: 'Aftercare Support Program',
    descHi: 'केंद्र से डिस्चार्ज होने के बाद भी मरीज की प्रगति पर नजर रखी जाती है और नियमित फॉलो-अप काउंसलिंग प्रदान की जाती है ताकि वे दोबारा नशा न छुएं।',
    descEn: 'Continuous support and follow-ups post-discharge ensure the individual stays strong on their sober path forever.'
  }
];

import sleepingAreaImg from '../assets/images/sleeping_dormitory_real_1784402653408.jpg';
import yogaSpaceImg from '../assets/images/yoga_meditation_real_1784402667426.jpg';
import counselingRoomImg from '../assets/images/counseling_room_real_1784402695464.jpg';
import receptionOfficeImg from '../assets/images/reception_office_real_1784402682245.jpg';
import kitchenAreaImg from '../assets/images/kitchen_area_real_1784402710165.jpg';
import centerEntranceImg from '../assets/images/center_entrance_real_1784402727411.jpg';
import assemblyHallImg from '../assets/images/assembly_hall_real_1784402743449.jpg';

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    image: sleepingAreaImg,
    titleHi: 'स्वच्छ एवं व्यवस्थित शयनकक्ष (आवासीय हॉल)',
    titleEn: 'Hygienic & Organized Sleeping Hall',
    descHi: 'हरी चादरों से सुसज्जित आरामदायक सिंगल बेड की पंक्तियाँ, जहाँ प्रत्येक मरीज को स्वच्छ वातावरण, व्यक्तिगत अलमारी और घरेलू आराम प्रदान किया जाता है।',
    descEn: 'Row of comfortable single beds with clean green bedspreads. Each resident is provided with a tidy, ventilated, and peaceful rest space with personal lockers.',
    category: 'sleeping',
    tagHi: 'शयनकक्ष',
    tagEn: 'Sleeping Area'
  },
  {
    id: 'g2',
    image: yogaSpaceImg,
    titleHi: 'योग, प्राणायाम एवं ध्यान सत्र हॉल',
    titleEn: 'Morning Yoga & Meditation Hall',
    descHi: 'सभी मरीज सामूहिक रूप से सुबह चटाई पर बैठकर ध्यान लगाते हैं और योग अभ्यास करते हैं, जिससे उनके मानसिक स्वास्थ्य और संकल्प शक्ति को अभूतपूर्व बढ़ावा मिलता है।',
    descEn: 'Residents sitting in neat rows practicing deep meditation, pranayama, and physical yoga to build mental resilience, focus, and clean energy.',
    category: 'yoga',
    tagHi: 'योग क्षेत्र',
    tagEn: 'Yoga & Meditation'
  },
  {
    id: 'g3',
    image: assemblyHallImg,
    titleHi: 'दैनिक व्याख्यान एवं सामूहिक थेरेपी कक्ष',
    titleEn: 'Motivational Assembly & Lecture Hall',
    descHi: 'प्रशिक्षण और सामूहिक परामर्श के लिए आरामदायक कुर्सियों से सुसज्जित वह मुख्य हॉल, जहाँ प्रेरणादायक कक्षाएं, व्हाइटबोर्ड पर प्रशिक्षण और सुधार नीतियां सिखाई जाती हैं।',
    descEn: 'A lecture-style hall equipped with comfortable high-back chairs where daily motivational seminars, group therapies, and educational classes are conducted.',
    category: 'yoga',
    tagHi: 'व्याख्यान हॉल',
    tagEn: 'Assembly Hall'
  },
  {
    id: 'g4',
    image: centerEntranceImg,
    titleHi: 'मुख्य प्रवेश द्वार एवं प्रेरणादायक परिसर मार्ग',
    titleEn: 'Main Entrance & Inspirational Pathway',
    descHi: 'कोशिश केंद्र का मुख्य बाहरी कॉरिडोर जहाँ प्रवेश द्वार पर ही "नशे को ना कहो जिंदगी को हां कहो" का विशाल प्रेरणादायक बैनर और लाइब्रेरी, डॉक्टर कक्ष के बोर्ड लगे हैं।',
    descEn: 'The beautiful entrance path featuring our encouraging main slogan banner "Say No to Drugs, Yes to Life" and clear directions to our Library and Consultation rooms.',
    category: 'lounge',
    tagHi: 'प्रवेश मार्ग',
    tagEn: 'Entrance Corridor'
  },
  {
    id: 'g5',
    image: receptionOfficeImg,
    titleHi: 'दिनेश वर्मा जी का प्रशासनिक परामर्श कार्यालय',
    titleEn: 'Administrative Reception & Consultation Office',
    descHi: 'सुंदर लकड़ी के पैनल वाली दीवारों से सुसज्जित दिनेश वर्मा जी का मुख्य कार्यालय जहाँ मरीजों का दाखिला, प्राथमिक मार्गदर्शन, दस्तावेजीकरण और आवश्यक बैठकें आयोजित होती हैं।',
    descEn: 'The warm, wood-paneled main administration and reception office where initial enrollment, guide discussions, and family meets are hosted by Dinesh Verma.',
    category: 'counseling',
    tagHi: 'मुख्य कार्यालय',
    tagEn: 'Admin Office'
  },
  {
    id: 'g6',
    image: counselingRoomImg,
    titleHi: 'गोपनीय व्यक्तिगत काउंसलिंग कक्ष',
    titleEn: 'Confidential Individual Counseling Room',
    descHi: 'अनुभवी डॉक्टरों और काउंसलर्स के साथ सुरक्षित वन-टू-वन थेरेपी के लिए शांत कमरा, जहाँ "Disease Concept" जैसे ज्ञानवर्धक रिकवरी चार्ट और शांत वातावरण उपलब्ध है।',
    descEn: 'A quiet and dedicated desk space with client chairs for high-trust confidential counseling, equipped with recovery progress charts and positive motivational frames.',
    category: 'counseling',
    tagHi: 'काउंसलिंग कक्ष',
    tagEn: 'Counseling Room'
  },
  {
    id: 'g7',
    image: kitchenAreaImg,
    titleHi: 'पूरी तरह स्वच्छ एवं शुद्ध रसोई घर (किचन)',
    titleEn: 'Hygienic & Clean Kitchen Facility',
    descHi: 'कंक्रीट काउंटर स्लैब और गैस स्टोव से सुसज्जित स्वच्छ और सुव्यवस्थित रसोई, जहाँ मरीजों के लिए शुद्ध, पोष्टिक और घर जैसा स्वादिष्ट भोजन प्रतिदिन तैयार किया जाता है।',
    descEn: 'An exceptionally clean, tiled kitchen space where fresh, nutritious, and balanced home-style meals are prepared daily in hygienic stainless steel utensils.',
    category: 'lounge',
    tagHi: 'रसोई घर',
    tagEn: 'Kitchen & Dining'
  }
];

