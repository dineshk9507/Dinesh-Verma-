import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Heart,
  CheckCircle2,
  Activity,
  Award,
  Sun,
  Coffee,
  Users,
  Utensils,
  Flame,
  Moon,
  BedDouble,
  Shield,
  HelpCircle,
  ChevronRight,
  BookOpen,
  Calendar,
  Send,
  Sparkles,
  Search,
  Lock,
  ListTodo,
  ExternalLink,
  Info
} from 'lucide-react';
import { quizQuestions, routineItems, testimonials, treatmentSteps, galleryItems } from './data/websiteData';
import { AddictionType, Inquiry } from './types';

export default function App() {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  
  // Gallery & Lightbox State
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'sleeping' | 'yoga' | 'lounge' | 'counseling'>('all');

  // Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScores, setQuizScores] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<{ score: number; level: string; recHi: string; recEn: string } | null>(null);

  // Routine Filter State
  const [activeRoutineTab, setActiveRoutineTab] = useState<'all' | 'morning' | 'afternoon' | 'evening' | 'night'>('all');

  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addictionType: 'alcohol' as AddictionType,
    message: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');

  // Floating back-to-top/quick contact
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load local storage inquiries
    const savedInquiries = localStorage.getItem('koshish_inquiries');
    if (savedInquiries) {
      try {
        setInquiries(JSON.parse(savedInquiries));
      } catch (e) {
        console.error(e);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuizAnswer = (score: number) => {
    const newScores = [...quizScores, score];
    setQuizScores(newScores);

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate total score
      const totalScore = newScores.reduce((sum, s) => sum + s, 0);
      let level = '';
      let recHi = '';
      let recEn = '';

      if (totalScore <= 3) {
        level = 'Low / प्रारंभिक स्तर';
        recHi = 'नशे का स्तर अभी बहुत कम है। प्रारंभिक परामर्श, योग और स्वस्थ जीवनशैली से इसे आसानी से पूर्णतः नियंत्रित किया जा सकता है। आप हमारे मार्गदर्शन केंद्र से संपर्क कर सकते हैं।';
        recEn = 'Low levels of addiction indicator. Can be easily guided back to full sobriety through primary counseling, yoga, and routine tweaks. Feel free to contact us for a friendly counseling chat.';
      } else if (totalScore <= 7) {
        level = 'Moderate / मध्यम स्तर';
        recHi = 'लत मध्यम स्तर पर पहुँच चुकी है। भविष्य में गंभीर नुकसान से बचने के लिए अभी उचित मार्गदर्शन, नियमित थेरेपी और डिटॉक्सिफिकेशन की आवश्यकता है। कृपया तुरंत हमारे हेल्पलाइन नंबर 9521475766 पर बात करें।';
        recEn = 'Moderate level of addiction. Requires structured rehabilitation, counselor advice, and physical detox to avoid escalation. We strongly suggest calling our expert helpline at 9521475766.';
      } else {
        level = 'Severe / गंभीर स्तर';
        recHi = 'स्थिति अत्यंत गंभीर एवं चिंताजनक है। मरीज के स्वास्थ्य और भविष्य की सुरक्षा के लिए तत्काल सुरक्षित वातावरण, चिकित्सा निगरानी और आवासीय पुनरुद्धार (Rehabilitation) की सख्त जरूरत है। कृपया बिना देरी किए कोशिश नशा मुक्ति केंद्र हनुमानगढ़ में दिनेश वर्मा जी से तुरंत संपर्क करें।';
        recEn = 'Severe level of addiction detected. Urgent professional medical intervention, safe detox environment, and residential rehabilitation are strictly recommended for physical and emotional well-being. Contact Dinesh Verma ji directly without delay.';
      }

      setQuizResult({ score: totalScore, level, recHi, recEn });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuizScores([]);
    setQuizResult(null);
    setQuizActive(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    const newInquiry: Inquiry = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      addictionType: formData.addictionType,
      message: formData.message.trim(),
      status: 'pending',
      createdAt: new Date().toLocaleString('en-IN')
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('koshish_inquiries', JSON.stringify(updated));

    setFormSuccess(true);
    setFormData({ name: '', phone: '', addictionType: 'alcohol', message: '' });

    setTimeout(() => {
      setFormSuccess(false);
    }, 6000);
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: 'pending' | 'contacted' | 'resolved') => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq);
    setInquiries(updated);
    localStorage.setItem('koshish_inquiries', JSON.stringify(updated));
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('क्या आप इस लीड/पूछताछ को हटाना चाहते हैं?')) {
      const updated = inquiries.filter(inq => inq.id !== id);
      setInquiries(updated);
      localStorage.setItem('koshish_inquiries', JSON.stringify(updated));
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master testing passcode is "9521"
    if (adminPassword === '9521' || adminPassword === '9521475766') {
      setAdminAuthenticated(true);
    } else {
      alert('गलत पासवर्ड! कृपया कोशिश करें। (संकेत: दिनेश जी का नंबर शुरू के 4 अंक या पूरा नंबर)');
    }
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    inq.phone.includes(adminSearch) ||
    inq.addictionType.includes(adminSearch)
  );

  const filteredGallery = galleryItems.filter(
    item => galleryFilter === 'all' || item.category === galleryFilter
  );


  // Return icons based on name
  const getRoutineIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-teal-500" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-yellow-600" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-500" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-emerald-500" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case 'Dribbble': return <Award className="w-5 h-5 text-rose-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'Award': return <Award className="w-5 h-5 text-indigo-500" />;
      case 'Moon': return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'BedDouble': return <BedDouble className="w-5 h-5 text-violet-400" />;
      default: return <Activity className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-600 selection:text-white antialiased">
      {/* Upper Announcement Bar */}
      <div className="bg-emerald-800 text-emerald-50 py-2.5 px-4 text-xs sm:text-sm font-medium border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
            <span>
              {lang === 'hi' 
                ? 'नया जीवन शुरू करें - शराब, स्मैक, अफीम व चिट्टे की लत से पाएँ सुरक्षित मुक्ति।' 
                : 'Start a New Life - Safe & Effective treatment for alcohol, drug, & opium addiction.'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              id="lang-toggle-btn"
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')} 
              className="bg-emerald-700/60 hover:bg-emerald-700 hover:text-white px-3 py-1 rounded-md transition-all text-xs border border-emerald-600 font-semibold cursor-pointer"
            >
              {lang === 'hi' ? 'English Website' : 'हिन्दी वेबसाइट'}
            </button>
            <a href="tel:9521475766" className="font-bold text-yellow-300 hover:text-yellow-400 flex items-center gap-1.5 transition-colors">
              <Phone className="w-3.5 h-3.5" /> 9521475766
            </a>
          </div>
        </div>
      </div>

      {/* Primary Header Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-5 h-5 fill-current text-white animate-pulse" />
            </div>
            <div>
              <span className="block font-display font-bold text-lg sm:text-xl text-slate-900 leading-tight">
                {lang === 'hi' ? 'कोशिश नशा मुक्ति केंद्र' : 'Koshish Rehab'}
              </span>
              <span className="block text-[10px] sm:text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                {lang === 'hi' ? 'हनुमानगढ़ • दिनेश वर्मा (BNS)' : 'Hanumangarh • Dinesh Verma (BNS)'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">
              {lang === 'hi' ? 'हमारे बारे में' : 'About Us'}
            </a>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">
              {lang === 'hi' ? 'सुविधाएं' : 'Services'}
            </a>
            <a href="#gallery" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">
              {lang === 'hi' ? 'गैलरी' : 'Gallery Tour'}
            </a>
            <a href="#routine" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">
              {lang === 'hi' ? 'दैनिक दिनचर्या' : 'Daily Routine'}
            </a>
            <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">
              {lang === 'hi' ? 'सफलता की कहानियाँ' : 'Testimonials'}
            </a>
            <a href="#quiz" className="bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all">
              {lang === 'hi' ? 'नशा जांच टेस्ट' : 'Addiction Assessment'}
            </a>
            <button 
              onClick={() => setShowAdminPanel(!showAdminPanel)} 
              className="text-slate-400 hover:text-slate-600 transition-colors"
              title="Staff Dashboard"
            >
              <Lock className="w-4 h-4" />
            </button>
          </nav>

          {/* Call Helpline Button */}
          <div className="flex items-center gap-2">
            <a 
              id="header-call-btn"
              href="tel:9521475766" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-600/10 hover:shadow-lg flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>{lang === 'hi' ? 'हेल्पलाइन' : 'Helpline'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white py-16 sm:py-24 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs sm:text-sm font-semibold"
              >
                <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                <span>{lang === 'hi' ? 'विश्वास और नई उम्मीद का नाम' : 'A Trusted Home for Rehabilitation'}</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              >
                {lang === 'hi' ? (
                  <>
                    कोशिश <span className="text-yellow-400 font-bold underline decoration-yellow-400/30">नशा मुक्ति</span> केंद्र
                  </>
                ) : (
                  <>
                    Koshish <span className="text-yellow-400 font-bold underline decoration-yellow-400/30">Rehabilitation</span> Center
                  </>
                )}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
              >
                {lang === 'hi' ? (
                  'शराब, स्मैक (चिट्टा), अफीम, डोडा, कैप्सूल व हर प्रकार के जानलेवा नशे से सम्मानजनक व पूर्णतः सुरक्षित मुक्ति पाएँ। घरेलू माहौल और बेहतरीन उपचार।'
                ) : (
                  'Break free from alcohol, smack (chitta), opium, synthetic drugs, and pharmaceutical addictions. We offer a safe, respectful, and fully monitored homely healing environment.'
                )}
              </motion.p>

              {/* Main Call to Action buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
              >
                <a 
                  id="hero-call-now"
                  href="tel:9521475766" 
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-lg shadow-xl shadow-yellow-400/20 hover:scale-102 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Phone className="w-5 h-5 fill-current" />
                  <span>{lang === 'hi' ? 'अभी कॉल करें: 9521475766' : 'Call Helpline: 9521475766'}</span>
                </a>

                <a 
                  id="hero-whatsapp-chat"
                  href="https://wa.me/919521475766?text=नमस्ते%20कोशिश%20नशा%20मुक्ति%20केंद्र।%20मुझे%20इलाज%20के%20बारे%20में%20जानकारी%20चाहिए।" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span>{lang === 'hi' ? 'व्हाट्सएप चैट करें' : 'WhatsApp Us'}</span>
                </a>
              </motion.div>

              {/* Badges / Trust points */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-emerald-800/60 max-w-lg mx-auto lg:mx-0"
              >
                <div>
                  <h4 className="text-yellow-400 font-bold text-2xl">100%</h4>
                  <p className="text-xs text-emerald-200 mt-1">{lang === 'hi' ? 'गोपनीयता और सुरक्षा' : 'Confidentiality'}</p>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-bold text-2xl">{lang === 'hi' ? 'घरेलू' : 'Homely'}</h4>
                  <p className="text-xs text-emerald-200 mt-1">{lang === 'hi' ? 'वातावरण और स्वादिष्ट भोजन' : 'Environment & Pure Food'}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="text-yellow-400 font-bold text-2xl">24/7</h4>
                  <p className="text-xs text-emerald-200 mt-1">{lang === 'hi' ? 'देखभाल एवं परामर्श' : 'Staff Assistance'}</p>
                </div>
              </motion.div>

              <div className="text-emerald-300 text-xs font-semibold pt-4 italic">
                {lang === 'hi' ? 'संचालक: दिनेश वर्मा (BNS) - हनुमानगढ़ का सबसे विश्वसनीय पुनर्वास केंद्र' : 'Director: Dinesh Verma (BNS) - Hanumangarh\'s premium rehab home'}
              </div>
            </div>

            {/* Quick Assessment Form / Interactive Banner */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-100">
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider animate-bounce shadow-md">
                {lang === 'hi' ? 'गोपनीय पूछताछ' : 'Confidential'}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'hi' ? 'मुफ्त परामर्श व एडमिशन फॉर्म' : 'Free Advice & Admission Enquiry'}</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {lang === 'hi' 
                  ? 'अपना या अपने प्रियजन का विवरण भरें। हम पूर्ण गोपनीयता के साथ आपकी मदद करेंगे।' 
                  : 'Enter details of yourself or your loved one. All submissions remain strictly confidential.'}
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    {lang === 'hi' ? 'मरीज या परिजन का नाम' : 'Name of Patient/Relative'}
                  </label>
                  <input 
                    id="inquiry-name"
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'hi' ? 'जैसे: राजेश कुमार' : 'e.g. Rajesh Kumar'} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      {lang === 'hi' ? 'मोबाईल नंबर (Phone)' : 'Mobile Phone Number'}
                    </label>
                    <input 
                      id="inquiry-phone"
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={lang === 'hi' ? '95214XXXXX' : '95214XXXXX'} 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-addiction" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      {lang === 'hi' ? 'लत/नशे का प्रकार' : 'Type of Addiction'}
                    </label>
                    <select 
                      id="inquiry-addiction"
                      value={formData.addictionType}
                      onChange={(e) => setFormData({ ...formData, addictionType: e.target.value as AddictionType })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all bg-white"
                    >
                      <option value="alcohol">{lang === 'hi' ? 'शराब (Alcohol)' : 'Alcohol'}</option>
                      <option value="drugs">{lang === 'hi' ? 'स्मैक / चिट्टा (Heroin)' : 'Smack / Drugs'}</option>
                      <option value="tobacco">{lang === 'hi' ? 'अफीम / डोडा (Opium)' : 'Opium / Tobacco'}</option>
                      <option value="others">{lang === 'hi' ? 'कैप्सूल / अन्य नशा' : 'Others'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-msg" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    {lang === 'hi' ? 'मरीज की स्थिति या सवाल' : 'Brief Patient Condition / Question'}
                  </label>
                  <textarea 
                    id="inquiry-msg"
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'hi' ? 'जैसे: मरीज कितने समय से नशा कर रहा है...' : 'How long is the patient addicted...'} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all"
                  ></textarea>
                </div>

                <button 
                  id="submit-inquiry-btn"
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-600/10 hover:scale-101 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'सहायता के लिए सबमिट करें' : 'Submit Confidential Inquiry'}</span>
                </button>

                <AnimatePresence>
                  {formSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium text-center space-y-1"
                    >
                      <p className="font-bold flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'hi' ? 'पूछताछ दर्ज कर ली गई है!' : 'Inquiry Submitted Successfully!'}</span>
                      </p>
                      <p className="text-[10px] text-emerald-600">
                        {lang === 'hi' 
                          ? 'दिनेश वर्मा जी का स्टाफ आपसे जल्द ही 9521475766 से संपर्क करेगा।' 
                          : 'Our counselors will call you soon.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Direct call hint */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{lang === 'hi' ? 'त्वरित सहायता के लिए डायरेक्ट कॉल:' : 'Or Call Directly:'}</span>
                <a href="tel:9521475766" className="font-bold text-emerald-700 hover:underline">
                  9521475766
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Dynamic Addiction Test Tool (Quiz) */}
        <section id="quiz" className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {lang === 'hi' ? 'निःशुल्क आत्म-परीक्षण' : 'Free Addiction Self-Test'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
                {lang === 'hi' ? 'नशा स्तर आत्म-मूल्यांकन (Self-Assessment)' : 'Addiction Severity Diagnostic Check'}
              </h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {lang === 'hi' 
                  ? 'यह ५ सवालों का आसान वैज्ञानिक परीक्षण है, जिससे आप जान सकते हैं कि आपके या आपके प्रियजन को तत्काल चिकित्सकीय सहायता की आवश्यकता है या नहीं।'
                  : 'A simple 5-question scientific test to evaluate if immediate clinical rehabilitation or therapeutic counseling is required.'}
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
              
              {!quizActive && !quizResult ? (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {lang === 'hi' ? 'क्या आप या आपका कोई मित्र नशे की गिरफ्त में है?' : 'Is someone you care about struggling?'}
                    </h3>
                    <p className="text-sm text-slate-600 max-w-lg mx-auto">
                      {lang === 'hi' 
                        ? 'यह टेस्ट पूरी तरह से गोपनीय है और इसके नतीजे केवल आपको दिखाई देंगे। कृपया सभी सवालों का ईमानदारी से उत्तर दें।' 
                        : 'This self-test is completely confidential. No data is stored anywhere. Answer honestly to find out recommended next steps.'}
                    </p>
                  </div>
                  <button 
                    id="start-quiz-btn"
                    onClick={() => setQuizActive(true)}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md cursor-pointer transition-all hover:scale-102"
                  >
                    {lang === 'hi' ? 'परीक्षण शुरू करें' : 'Start Assessment'}
                  </button>
                </div>
              ) : quizActive && !quizResult ? (
                <div>
                  {/* Progress Header */}
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-6 font-bold uppercase tracking-wider">
                    <span>
                      {lang === 'hi' ? `प्रश्न ${currentQuestionIndex + 1} / ${quizQuestions.length}` : `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
                    </span>
                    <span className="text-emerald-700">
                      {Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}% {lang === 'hi' ? 'पूर्ण' : 'Completed'}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1 bg-slate-200 rounded-full mb-8 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question Title */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                      {lang === 'hi' ? quizQuestions[currentQuestionIndex].questionHi : quizQuestions[currentQuestionIndex].questionEn}
                    </h3>
                  </div>

                  {/* Options List */}
                  <div className="space-y-3">
                    {quizQuestions[currentQuestionIndex].options.map((opt, idx) => (
                      <button
                        key={idx}
                        id={`quiz-option-${currentQuestionIndex}-${idx}`}
                        onClick={() => handleQuizAnswer(opt.score)}
                        className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-sm font-medium text-slate-700 hover:text-slate-900 flex justify-between items-center group cursor-pointer"
                      >
                        <span>{lang === 'hi' ? opt.textHi : opt.textEn}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 text-emerald-700 mb-2">
                      <Award className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {lang === 'hi' ? 'आपका परीक्षण परिणाम' : 'Your Assessment Result'}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {lang === 'hi' ? `कुल स्कोर: ${quizResult?.score} / १५` : `Total Score: ${quizResult?.score} / 15`}
                    </p>
                  </div>

                  {/* Severity Badge */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">{lang === 'hi' ? 'लत की तीव्रता स्तर' : 'Severity Category'}</p>
                      <p className="text-lg font-bold text-slate-950 mt-1">{quizResult?.level}</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-100 rounded-full text-xs font-bold">
                      <Info className="w-4 h-4" />
                      <span>{lang === 'hi' ? 'तत्काल विचार आवश्यक' : 'Attention Recommended'}</span>
                    </div>
                  </div>

                  {/* Recommendation Text */}
                  <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-100 space-y-2">
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                      {lang === 'hi' ? 'विशेषज्ञों की सलाह (Our Expert Recommendation)' : 'Our Expert Advice'}
                    </p>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {lang === 'hi' ? quizResult?.recHi : quizResult?.recEn}
                    </p>
                  </div>

                  {/* Actions for results */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <a 
                      id="result-call-now"
                      href="tel:9521475766" 
                      className="flex-1 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center shadow-lg shadow-emerald-600/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 fill-current" />
                      <span>{lang === 'hi' ? 'दिनेश वर्मा जी से तुरंत बात करें' : 'Call Dinesh Verma Now'}</span>
                    </a>
                    
                    <button 
                      id="retry-quiz-btn"
                      onClick={restartQuiz}
                      className="px-6 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-center transition-all cursor-pointer"
                    >
                      {lang === 'hi' ? 'दोबारा जांचें' : 'Retake Test'}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Services & Facilities Overview */}
        <section id="services" className="py-16 bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-100/50 px-3 py-1 rounded-full border border-emerald-100">
                {lang === 'hi' ? 'उत्कृष्ट व्यवस्थाएं' : 'High Quality Treatment & Care'}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
                {lang === 'hi' ? 'कोशिश केंद्र की प्रमुख सुविधाएं' : 'Our Facilities & Structural Care'}
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto leading-relaxed">
                {lang === 'hi' 
                  ? 'हम एक पारिवारिक माहौल प्रदान करते हैं जो मरीज के शरीर और मन दोनों को मजबूत करता है ताकि वे पूरी तरह स्वस्थ हो सकें।'
                  : 'We design complete physical and mental rehabilitation programs to heal patients internally and socially.'}
              </p>
            </div>

            {/* Grid of Facilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xl">
                  🧘
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  {lang === 'hi' ? 'योग एवं प्राणायाम' : 'Yoga & Meditation'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'hi' 
                    ? 'रोजाना सुबह अनुभवी शिक्षकों द्वारा प्राणायाम और ध्यान सत्र। यह मन को शांत कर इच्छाशक्ति बढ़ाता है।' 
                    : 'Morning sessions to refresh the soul, balance neural stability, and build solid willpower.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xl">
                  🍎
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  {lang === 'hi' ? 'पौष्टिक एवं शुद्ध भोजन' : 'Nutritious Veg Diet'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'hi' 
                    ? 'ताजा और शुद्ध शाकाहारी सुपाच्य भोजन (दूध, फल, सलाद के साथ)। शारीरिक कमजोरी दूर करने में सहायक।' 
                    : 'Nutrient-rich, purely vegetarian food cooked hygienically to support physical recovery.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                  👥
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  {lang === 'hi' ? 'अनुभवी डॉक्टरों की टीम' : 'Doctor Team & Staff'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'hi' 
                    ? '24 घंटे चिकित्सा स्टाफ और समय-समय पर अनुभवी डॉक्टरों द्वारा स्वास्थ्य परीक्षण और परामर्श।' 
                    : 'Highly trained professionals checking vitals, psychiatric evaluation, and monitoring.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                  🔒
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  {lang === 'hi' ? 'गोपनीय और सुरक्षित' : 'Safe & Confidential'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'hi' 
                    ? 'मरीज की जानकारी पूरी तरह गुप्त रखी जाती है। शांत और तनावमुक्त वातावरण में बिना किसी दबाव के इलाज।' 
                    : 'We guarantee 100% confidential files and an abuse-free, non-violent, home-like environment.'}
                </p>
              </div>

            </div>

            {/* Helpline CTA inside facilities */}
            <div className="mt-12 bg-emerald-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <h3 className="text-lg sm:text-xl font-bold">
                  {lang === 'hi' ? 'नशे की लत का पक्का समाधान हमारे पास है।' : 'Do you want to know about our low-cost pricing?'}
                </h3>
                <p className="text-xs text-emerald-200">
                  {lang === 'hi' 
                    ? 'आज ही दिनेश वर्मा जी (संचालक) से सीधी बात करें और सही मार्ग चुनें।' 
                    : 'Get direct advice from Dinesh Verma and restore family happiness.'}
                </p>
              </div>
              <a 
                href="tel:9521475766" 
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-yellow-400/20 whitespace-nowrap"
              >
                {lang === 'hi' ? '📞 9521475766 पर कॉल करें' : '📞 Call +91 9521475766'}
              </a>
            </div>

          </div>
        </section>

        {/* Facility Photo Gallery / Carousel Section */}
        <section id="gallery" className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {lang === 'hi' ? 'वर्चुअल टूर / झलकियां' : 'Virtual Gallery Tour'}
              </span>
              <h2 className="text-3xl font-display font-bold text-slate-900 mt-2">
                {lang === 'hi' ? 'हमारा नशा मुक्ति केंद्र और अत्याधुनिक सुविधाएं' : 'Explore Our Healing Environment'}
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                {lang === 'hi' 
                  ? 'देखें कोशिश केंद्र हनुमानगढ़ का वास्तविक, शांत और स्वच्छ घरेलू वातावरण जहाँ मरीज सम्मानपूर्वक नई ऊर्जा प्राप्त करते हैं।' 
                  : 'Take a virtual tour of Koshish Rehab Hanumangarh. We provide clean, safe, and positive residential facilities.'}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
              {(['all', 'sleeping', 'yoga', 'lounge', 'counseling'] as const).map((cat) => (
                <button
                  key={cat}
                  id={`gallery-tab-${cat}`}
                  onClick={() => {
                    setGalleryFilter(cat);
                    setActiveGalleryIndex(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                    galleryFilter === cat
                      ? 'bg-emerald-700 border-emerald-700 text-white shadow-md shadow-emerald-700/10'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'all' && (lang === 'hi' ? 'सभी तस्वीरें (All)' : 'All Photos')}
                  {cat === 'sleeping' && (lang === 'hi' ? 'शयनकक्ष (Sleeping Area)' : 'Sleeping Area')}
                  {cat === 'yoga' && (lang === 'hi' ? 'योग हॉल (Yoga Studio)' : 'Yoga Hall')}
                  {cat === 'lounge' && (lang === 'hi' ? 'मनोरंजन लाउंज (Lounge)' : 'Common Lounge')}
                  {cat === 'counseling' && (lang === 'hi' ? 'परामर्श कक्ष (Counseling Room)' : 'Counseling Room')}
                </button>
              ))}
            </div>

            {/* Main Interactive Carousel/Gallery display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Side: Active image carousel display with slider controls */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-100 shadow-lg group">
                  
                  {/* Slide Container */}
                  <div className="w-full h-full relative">
                    <AnimatePresence mode="wait">
                      {filteredGallery.length > 0 && (
                        <motion.img
                          key={filteredGallery[activeGalleryIndex].id}
                          src={filteredGallery[activeGalleryIndex].image}
                          alt={lang === 'hi' ? filteredGallery[activeGalleryIndex].titleHi : filteredGallery[activeGalleryIndex].titleEn}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-cover cursor-zoom-in"
                          onClick={() => {
                            const originalIdx = galleryItems.findIndex(item => item.id === filteredGallery[activeGalleryIndex].id);
                            setLightboxIndex(originalIdx >= 0 ? originalIdx : 0);
                            setLightboxOpen(true);
                          }}
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </AnimatePresence>

                    {/* Image Category/Tag overlay */}
                    {filteredGallery.length > 0 && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                          {lang === 'hi' ? filteredGallery[activeGalleryIndex].tagHi : filteredGallery[activeGalleryIndex].tagEn}
                        </span>
                      </div>
                    )}

                    {/* Zoom icon hint overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 backdrop-blur-md p-3 rounded-full text-slate-800 shadow-md">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>

                    {/* Left arrow navigation */}
                    <button
                      id="carousel-prev-btn"
                      onClick={() => {
                        setActiveGalleryIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-slate-800 shadow-md flex items-center justify-center hover:scale-105 transition-all cursor-pointer z-10"
                      title="Previous"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>

                    {/* Right arrow navigation */}
                    <button
                      id="carousel-next-btn"
                      onClick={() => {
                        setActiveGalleryIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-slate-800 shadow-md flex items-center justify-center hover:scale-105 transition-all cursor-pointer z-10"
                      title="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex gap-1.5">
                      {filteredGallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveGalleryIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                            activeGalleryIndex === idx ? 'bg-emerald-400 w-5' : 'bg-white/60 hover:bg-white'
                          }`}
                        />
                      ))}
                    </div>

                  </div>

                </div>
              </div>

              {/* Right Side: Active description and quick-select thumbnails */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                
                {/* Information Card for the active image */}
                {filteredGallery.length > 0 && (
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                          {filteredGallery[activeGalleryIndex].category === 'sleeping' && <BedDouble className="w-5 h-5" />}
                          {filteredGallery[activeGalleryIndex].category === 'yoga' && <Activity className="w-5 h-5" />}
                          {filteredGallery[activeGalleryIndex].category === 'lounge' && <Users className="w-5 h-5" />}
                          {filteredGallery[activeGalleryIndex].category === 'counseling' && <MessageSquare className="w-5 h-5" />}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">
                          {lang === 'hi' ? filteredGallery[activeGalleryIndex].titleHi : filteredGallery[activeGalleryIndex].titleEn}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {lang === 'hi' ? filteredGallery[activeGalleryIndex].descHi : filteredGallery[activeGalleryIndex].descEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/60 mt-6 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        {lang === 'hi' ? `तस्वीर ${activeGalleryIndex + 1} / ${filteredGallery.length}` : `Photo ${activeGalleryIndex + 1} of ${filteredGallery.length}`}
                      </span>
                      <button
                        onClick={() => {
                          const originalIdx = galleryItems.findIndex(item => item.id === filteredGallery[activeGalleryIndex].id);
                          setLightboxIndex(originalIdx >= 0 ? originalIdx : 0);
                          setLightboxOpen(true);
                        }}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{lang === 'hi' ? 'बड़ा देखें 🔍' : 'Enlarge 🔍'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Grid of thumbnails for fast switching */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    {lang === 'hi' ? 'त्वरित चयन / गैलरी थंबनेल:' : 'Quick Select Thumbnails:'}
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {filteredGallery.map((item, idx) => (
                      <button
                        key={item.id}
                        id={`gallery-thumb-${idx}`}
                        onClick={() => setActiveGalleryIndex(idx)}
                        className={`aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative group ${
                          activeGalleryIndex === idx
                            ? 'border-emerald-600 ring-2 ring-emerald-500/20 scale-102'
                            : 'border-transparent hover:border-slate-300 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Step-by-Step Treatment Journey */}

        <section id="journey" className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {lang === 'hi' ? 'उपचार प्रक्रिया' : 'Our Healing Blueprint'}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {lang === 'hi' ? 'नशा मुक्ति की ६-चरण यात्रा' : '6 Steps to Complete Freedom'}
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                {lang === 'hi' 
                  ? 'कोशिश नशा मुक्ति केंद्र में मरीज की रिकवरी के लिए वैज्ञानिक व आध्यात्मिक तरीकों का समन्वय किया जाता है।' 
                  : 'How we systematically restore physiological strength and mental wellness.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treatmentSteps.map((s, idx) => (
                <div key={idx} className="relative bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between hover:scale-101 transition-all">
                  <div className="absolute top-4 right-4 text-emerald-200/50 font-mono text-3xl font-bold select-none">
                    {s.step}
                  </div>
                  <div className="space-y-2 mt-4">
                    <h3 className="text-lg font-bold text-slate-900">
                      {lang === 'hi' ? s.titleHi : s.titleEn}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === 'hi' ? s.descHi : s.descEn}
                    </p>
                  </div>
                  <div className="w-8 h-1 bg-emerald-600 mt-6 rounded-full" />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Interactive Daily Routine Table */}
        <section id="routine" className="py-16 bg-slate-50 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-100/50 px-3 py-1 rounded-full border border-emerald-100">
                {lang === 'hi' ? 'सकारात्मक दिनचर्या' : 'Structured Daily Routine'}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {lang === 'hi' ? 'कोशिश केंद्र की दैनिक समय सारिणी' : 'Typical Daily Healing Schedule'}
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                {lang === 'hi' 
                  ? 'नियमित दिनचर्या ही मरीज को भटकाव से बचाती है। देखें हमारे केंद्र में मरीज का पूरा दिन कैसे बीतता है:' 
                  : 'An organized daily life leaves no room for substance craving and instills permanent life discipline.'}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
              {(['all', 'morning', 'afternoon', 'evening', 'night'] as const).map((tab) => (
                <button
                  key={tab}
                  id={`routine-tab-${tab}`}
                  onClick={() => setActiveRoutineTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                    activeRoutineTab === tab
                      ? 'bg-emerald-700 border-emerald-700 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {tab === 'all' && (lang === 'hi' ? 'पूर्ण सूची (All)' : 'Complete Schedule')}
                  {tab === 'morning' && (lang === 'hi' ? 'सुबह (Morning)' : 'Morning')}
                  {tab === 'afternoon' && (lang === 'hi' ? 'दोपहर (Afternoon)' : 'Afternoon')}
                  {tab === 'evening' && (lang === 'hi' ? 'शाम (Evening)' : 'Evening')}
                  {tab === 'night' && (lang === 'hi' ? 'रात (Night)' : 'Night')}
                </button>
              ))}
            </div>

            {/* Routine List Container */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
              <div className="divide-y divide-slate-100">
                {routineItems
                  .filter((item) => activeRoutineTab === 'all' || item.category === activeRoutineTab)
                  .map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                          {getRoutineIcon(item.icon)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                            {item.time}
                          </p>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                            {lang === 'hi' ? item.activityHi : item.activityEn}
                          </h4>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          item.category === 'morning' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          item.category === 'afternoon' ? 'bg-teal-50 text-teal-700 border border-teal-100' :
                          item.category === 'evening' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                          'bg-indigo-50 text-indigo-700 border border-indigo-100'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        </section>

        {/* Heart-Touching Testimonials (Success Stories) */}
        <section id="testimonials" className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {lang === 'hi' ? 'सफलता की सच्ची कहानियाँ' : 'Inspirational Success Journeys'}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {lang === 'hi' ? 'उम्मीद की वापसी: नया जीवन पाने वालों की ज़ुबानी' : 'Stories of Hope and Recovery'}
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                {lang === 'hi' 
                  ? 'हमारे कोशिश केंद्र से ठीक होकर खुशहाल जिंदगी जी रहे लोगों और उनके परिवारों के अनुभव।' 
                  : 'Real recoveries from real residents who fought and regained control over their futures.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow relative">
                  <div className="absolute top-6 right-6 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {lang === 'hi' ? t.recoveryHi : t.recoveryEn}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      " {lang === 'hi' ? t.storyHi : t.storyEn} "
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-200/60 mt-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        {lang === 'hi' ? t.nameHi : t.nameEn}, {t.age} वर्ष
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {lang === 'hi' ? t.locationHi : t.locationEn}
                      </p>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold">Verified ✅</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Contact Us, Operational Details & Interactive Maps */}
        <section id="contact" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Detailed contact text & helper info */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-100/50 px-3 py-1 rounded-full border border-emerald-100">
                    {lang === 'hi' ? 'सीधा संपर्क' : 'Direct Helpline'}
                  </span>
                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {lang === 'hi' ? 'हमसे बात करें - दिनेश वर्मा (BNS)' : 'Contact Dinesh Verma Directly'}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {lang === 'hi' 
                      ? 'नशा मुक्ति की राह में हिचकिचाएं नहीं। एक सही फैसला पूरा जीवन बदल सकता है। आप किसी भी समय कॉल या व्हाट्सएप कर सकते हैं।' 
                      : 'Do not hesitate. A single call can protect your family from lifelong grievance. We are here to support.'}
                  </p>
                </div>

                {/* Specific details */}
                <div className="space-y-4">
                  
                  <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{lang === 'hi' ? 'हेल्पलाइन मोबाइल नंबर' : 'Helpline Contacts'}</h4>
                      <p className="text-lg font-bold text-emerald-800 mt-0.5">
                        <a href="tel:9521475766">9521475766</a>
                      </p>
                      <p className="text-xs text-slate-500">
                        {lang === 'hi' ? '२४ घंटे सलाहकारों द्वारा परामर्श हेतु उपलब्ध।' : 'Available 24x7 for quick clinical guidance.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{lang === 'hi' ? 'केन्द्र का पूरा पता' : 'Physical Landmark Address'}</h4>
                      <p className="text-sm text-slate-700 mt-0.5 font-medium leading-relaxed">
                        {lang === 'hi' 
                          ? 'पॉवर हाउस रोड, नजदीक चुना फाटक, हनुमानगढ़ पिन - 335512' 
                          : 'Power House Road, near Chuna Phatak, Hanumangarh Pin-335512'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {lang === 'hi' ? 'आस-पास के जिले: श्रीगंगानगर, बीकानेर, सिरसा, भटिंडा।' : 'Nearby cities: Sriganganagar, Bikaner, Sirsa, Bhatinda.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{lang === 'hi' ? 'एडमिशन एवं मुलाकात का समय' : 'Visiting & OPD Timings'}</h4>
                      <p className="text-sm text-slate-700 mt-0.5 font-semibold">
                        09:00 AM - 08:00 PM ({lang === 'hi' ? 'सोमवार से रविवार' : 'Monday to Sunday'})
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === 'hi' ? 'आपातकालीन एडमिशन २४ घंटे चालू।' : 'Emergency admissions are accepted 24 hours a day.'}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Quick WhatsApp Action banner */}
                <div className="p-5 rounded-2xl bg-emerald-800 text-white flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm">{lang === 'hi' ? 'व्हाट्सएप चैट सपोर्ट' : 'Chat support available'}</h4>
                    <p className="text-xs text-emerald-100 mt-1">{lang === 'hi' ? 'मरीज की रिपोर्ट भेजकर सलाह लें।' : 'Send reports or query directly.'}</p>
                  </div>
                  <a 
                    href="https://wa.me/919521475766" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-2 bg-white text-emerald-800 hover:bg-slate-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>

              {/* Visual Maps guidance & landmark view */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-5 h-5 text-emerald-700" />
                    <span>{lang === 'hi' ? 'हनुमानगढ़ केंद्र का लोकेशन मार्गदर्शक' : 'Location Route Map Guide'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'hi' 
                      ? 'हमारा केंद्र पॉवर हाउस रोड पर चुना फाटक के बहुत समीप स्थित है, जहाँ आप बस या रेल द्वारा आसानी से पहुँच सकते हैं।' 
                      : 'Easily accessible from Hanumangarh Junction and Town railway stations/bus terminals.'}
                  </p>
                </div>

                {/* Graphical map representation */}
                <div className="w-full bg-slate-100 rounded-2xl h-56 relative overflow-hidden border border-slate-200/60 flex flex-col items-center justify-center p-4 text-center">
                  <div className="absolute inset-0 bg-radial-gradient(circle,rgba(16,185,129,0.03)_10%,transparent_10%) bg-[size:16px_16px]" />
                  
                  {/* Road layouts */}
                  <div className="absolute top-1/2 left-0 w-full h-4 bg-slate-200 -translate-y-1/2" />
                  <div className="absolute left-1/3 top-0 w-4 h-full bg-slate-200" />
                  
                  {/* Hanumangarh Marker */}
                  <div className="absolute left-[38%] top-[45%] z-10 animate-bounce">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                      <Heart className="w-5 h-5 fill-current" />
                    </div>
                  </div>

                  {/* Landmarks tags */}
                  <div className="absolute left-6 top-8 bg-white/90 border border-slate-200 px-2 py-1 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    {lang === 'hi' ? 'पॉवर हाउस रोड' : 'Power House Road'}
                  </div>
                  <div className="absolute right-6 bottom-10 bg-white/90 border border-slate-200 px-2 py-1 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    {lang === 'hi' ? 'चुना फाटक' : 'Chuna Phatak'}
                  </div>
                  <div className="absolute left-[44%] top-[34%] bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-xs">
                    {lang === 'hi' ? 'कोशिश केंद्र 🏥' : 'Koshish Rehab 🏥'}
                  </div>

                  <div className="z-10 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-slate-100 max-w-sm shadow-xs mt-20">
                    <p className="text-xs font-bold text-slate-950">
                      {lang === 'hi' ? 'पॉवर हाउस रोड, नजदीक चुना फाटक, हनुमानगढ़' : 'Power House Road, Near Chuna Phatak'}
                    </p>
                    <a 
                      id="google-maps-navigation-btn"
                      href="https://maps.google.com/?q=Power+House+Road+Chuna+Phatak+Hanumangarh" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-2 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                    >
                      <span>{lang === 'hi' ? 'गूगल मैप्स पर रास्ता देखें' : 'Open in Google Maps'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Transportation hints */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <h5 className="text-xs font-bold text-slate-900">🚉 {lang === 'hi' ? 'रेलवे स्टेशन से दूरी:' : 'From Railway Station:'}</h5>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'hi' ? 'हनुमानगढ़ जंक्शन और टाउन स्टेशन से केवल १०-१५ मिनट की दूरी।' : '10-15 mins from Junction/Town stations.'}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <h5 className="text-xs font-bold text-slate-900">🚌 {lang === 'hi' ? 'बस स्टैंड से दूरी:' : 'From Bus Terminal:'}</h5>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'hi' ? 'मुख्य हनुमानगढ़ बस स्टैंड से ऑटो/साधन सीधे चुना फाटक के लिए उपलब्ध।' : 'Direct autos/vehicles available to Chuna Phatak.'}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Dynamic Admin/Staff Leads Panel (Simulated Backend database for tests) */}
        <AnimatePresence>
          {showAdminPanel && (
            <motion.section 
              id="admin-dashboard-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900 text-white border-t-2 border-emerald-500 py-12 px-4"
            >
              <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Admin Panel Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      {lang === 'hi' ? 'स्टाफ वर्कस्पेस' : 'Internal Staff Workspace'}
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight mt-1.5 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-emerald-500" />
                      <span>{lang === 'hi' ? 'कोशिश लीड एवं एडमिशन रिकॉर्ड्स' : 'Lead & Admission Manager'}</span>
                    </h2>
                  </div>
                  <button 
                    onClick={() => {
                      setShowAdminPanel(false);
                      setAdminAuthenticated(false);
                      setAdminPassword('');
                    }}
                    className="text-xs font-semibold px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors cursor-pointer"
                  >
                    {lang === 'hi' ? 'पैनल बंद करें' : 'Close Workspace'}
                  </button>
                </div>

                {!adminAuthenticated ? (
                  /* Password Protection login */
                  <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                    <p className="text-xs text-slate-300 leading-relaxed text-center">
                      {lang === 'hi' 
                        ? 'यह केवल कोशिश केंद्र के स्टाफ के लिए है। परीक्षण के लिए ' 
                        : 'Confidential staff dashboard. For testing, use code: '} 
                      <strong className="text-yellow-400">9521</strong>
                    </p>

                    <form onSubmit={handleAdminLogin} className="space-y-4">
                      <div>
                        <label htmlFor="admin-pass" className="block text-xs font-bold text-slate-400 uppercase mb-2">
                          {lang === 'hi' ? 'स्टाफ पिन कोड (Password/PIN)' : 'Enter Staff PIN Code'}
                        </label>
                        <input 
                          id="admin-pass"
                          type="password"
                          required
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="••••"
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-center text-lg font-mono focus:outline-hidden focus:ring-1 focus:ring-emerald-500 text-white"
                        />
                      </div>
                      <button 
                        id="admin-login-submit"
                        type="submit"
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all cursor-pointer"
                      >
                        {lang === 'hi' ? 'सुरक्षित प्रवेश करें' : 'Unlock Dashboard'}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Live Inquiries List */
                  <div className="space-y-6">
                    
                    {/* Filters & statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-slate-800 border border-slate-700/60">
                        <span className="text-xs text-slate-400 font-bold uppercase">{lang === 'hi' ? 'कुल प्राप्त लीड्स' : 'Total Inquiries'}</span>
                        <p className="text-2xl font-bold text-yellow-400 mt-1">{inquiries.length}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-800 border border-slate-700/60">
                        <span className="text-xs text-slate-400 font-bold uppercase">{lang === 'hi' ? 'पेंडिंग संपर्क' : 'Pending Calls'}</span>
                        <p className="text-2xl font-bold text-red-400 mt-1">
                          {inquiries.filter(inq => inq.status === 'pending').length}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-800 border border-slate-700/60">
                        <span className="text-xs text-slate-400 font-bold uppercase">{lang === 'hi' ? 'समाधान / एडमिशन' : 'Admitted / Solved'}</span>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">
                          {inquiries.filter(inq => inq.status === 'resolved').length}
                        </p>
                      </div>
                    </div>

                    {/* Search bar */}
                    <div className="flex gap-2 bg-slate-800 rounded-xl p-2 border border-slate-700 max-w-md">
                      <Search className="w-5 h-5 text-slate-400 m-2" />
                      <input 
                        type="text"
                        placeholder={lang === 'hi' ? 'नाम, फोन या नशा प्रकार खोजें...' : 'Search inquiries...'}
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        className="bg-transparent border-0 focus:outline-hidden text-sm text-white w-full"
                      />
                    </div>

                    {/* Inquiries table/list */}
                    {filteredInquiries.length === 0 ? (
                      <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 text-slate-400 text-sm">
                        {lang === 'hi' ? 'कोई रिकॉर्ड नहीं मिला।' : 'No records found.'}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredInquiries.map((inq) => (
                          <div 
                            key={inq.id} 
                            className="bg-slate-800 border border-slate-700/80 rounded-2xl p-5 space-y-4 hover:border-slate-600 transition-all"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-slate-100 text-base">{inq.name}</h4>
                                <p className="text-xs text-slate-400 mt-0.5">{inq.createdAt}</p>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize border ${
                                inq.status === 'pending' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                inq.status === 'contacted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              }`}>
                                {inq.status}
                              </span>
                            </div>

                            <div className="space-y-1.5 text-xs">
                              <p className="flex items-center gap-1.5 text-slate-300">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                <a href={`tel:${inq.phone}`} className="hover:underline font-bold text-yellow-400">
                                  {inq.phone}
                                </a>
                              </p>
                              <p className="text-slate-300 flex items-center gap-1.5">
                                <ListTodo className="w-3.5 h-3.5 text-slate-400" />
                                <span>लत: <strong className="uppercase text-emerald-400">{inq.addictionType}</strong></span>
                              </p>
                              {inq.message && (
                                <p className="p-2.5 bg-slate-900 rounded-lg text-slate-400 text-xs mt-2 italic leading-relaxed">
                                  "{inq.message}"
                                </p>
                              )}
                            </div>

                            <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between gap-2">
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => handleUpdateInquiryStatus(inq.id, 'contacted')}
                                  className="text-[10px] font-bold px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors cursor-pointer"
                                >
                                  {lang === 'hi' ? 'बात हो गई' : 'Contacted'}
                                </button>
                                <button 
                                  onClick={() => handleUpdateInquiryStatus(inq.id, 'resolved')}
                                  className="text-[10px] font-bold px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer"
                                >
                                  {lang === 'hi' ? 'एडमिशन हुआ' : 'Resolved'}
                                </button>
                              </div>
                              <button 
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="text-xs text-red-400 hover:text-red-500 font-bold px-2 py-1 hover:bg-red-500/10 rounded-lg transition-all"
                              >
                                {lang === 'hi' ? 'हटाएं' : 'Delete'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                )}

              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </main>

      {/* Primary Footer with operational declarations */}
      <footer className="bg-emerald-950 text-white border-t border-emerald-900 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-lg tracking-tight">
              {lang === 'hi' ? 'कोशिश नशा मुक्ति केंद्र' : 'Koshish Rehabilitation Home'}
            </h3>
            <p className="text-xs text-emerald-100/70 leading-relaxed max-w-sm">
              {lang === 'hi' 
                ? 'हनुमानगढ़ जिले का सर्वश्रेष्ठ नशा मुक्ति एवं पुनर्वास संस्थान। हम हर प्रकार की मानसिक एवं शारीरिक लत से सुरक्षित मुक्ति दिलाने के लिए प्रतिबद्ध हैं।' 
                : 'Hanumangarh\'s premium wellness de-addiction facility. Bringing hope, confidence, and physical restoration back to homes.'}
            </p>
            <div className="text-xs font-semibold text-yellow-400">
              {lang === 'hi' ? 'संचालक: दिनेश वर्मा (BNS)' : 'Director: Dinesh Verma (BNS)'}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-emerald-400">{lang === 'hi' ? 'त्वरित लिंक (Quick Links)' : 'Quick Actions'}</h4>
            <ul className="text-xs space-y-2.5 text-emerald-100/70">
              <li><a href="#about" className="hover:text-white transition-colors">→ {lang === 'hi' ? 'हमारे उद्देश्य एवं विचार' : 'Our Mission'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">→ {lang === 'hi' ? 'भोजन एवं चिकित्सा व्यवस्था' : 'Diet & Medical Care'}</a></li>
              <li><a href="#routine" className="hover:text-white transition-colors">→ {lang === 'hi' ? 'मरीज की दैनिक समय सारिणी' : 'Patient Daily Timetable'}</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">→ {lang === 'hi' ? 'सफलतापूर्वक ठीक हुए मरीज' : 'Real Recovery Stories'}</a></li>
              <li><a href="#quiz" className="hover:text-white transition-colors">→ {lang === 'hi' ? 'लत जांच टेस्ट (Diagnostic Test)' : 'Addiction Diagnostics'}</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-emerald-400">{lang === 'hi' ? 'आधिकारिक संपर्क सूत्र' : 'Official Helpline Address'}</h4>
            <div className="text-xs space-y-3 text-emerald-100/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>{lang === 'hi' ? 'पॉवर हाउस रोड, नजदीक चुना फाटक, हनुमानगढ़ (राज.) ३३५५१२' : 'Power House Road, near Chuna Phatak, Hanumangarh, Rajasthan 335512'}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0 fill-current" />
                <span className="font-bold text-yellow-300">
                  <a href="tel:9521475766">9521475766</a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>{lang === 'hi' ? 'व्हाट्सएप चैट उपलब्ध: +91 9521475766' : 'WhatsApp Support: +91 9521475766'}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Regulatory footer bar */}
        <div className="max-w-7xl mx-auto border-t border-emerald-900/60 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-[11px] text-emerald-200/50">
          <p>© {new Date().getFullYear()} कोशिश नशा मुक्ति एवं पुनर्वास केंद्र. सर्वाधिकार सुरक्षित | दिनेश वर्मा</p>
          <p>{lang === 'hi' ? 'हनुमानगढ़ • राजस्थान • भारत' : 'Hanumangarh • Rajasthan • India'}</p>
        </div>
      </footer>

      {/* WhatsApp Floating Sticky Action Button */}
      <a 
        id="floating-whatsapp-trigger"
        href="https://wa.me/919521475766?text=नमस्ते%20कोशिश%20केंद्र।%20मुझे%20एडमिशन%20की%20जानकारी%20चाहिए।" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
        title="WhatsApp Hotline"
      >
        <MessageSquare className="w-7 h-7 fill-current" />
        <span className="absolute right-16 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
          {lang === 'hi' ? 'व्हाट्सएप चैट करें' : 'WhatsApp Helpline'}
        </span>
      </a>

      {/* Photo Lightbox Modal Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 select-none"
          >
            {/* Topbar */}
            <div className="flex justify-between items-center text-white">
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  {lang === 'hi' ? galleryItems[lightboxIndex].titleHi : galleryItems[lightboxIndex].titleEn}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'hi' ? galleryItems[lightboxIndex].tagHi : galleryItems[lightboxIndex].tagEn} • {lightboxIndex + 1} / {galleryItems.length}
                </p>
              </div>
              <button
                id="lightbox-close-btn"
                onClick={() => setLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                title="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Central image display area */}
            <div className="flex-1 flex items-center justify-center relative my-4">
              {/* Prev image button */}
              <button
                id="lightbox-prev-btn"
                onClick={() => setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1))}
                className="absolute left-2 sm:left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 text-white flex items-center justify-center transition-all cursor-pointer z-10"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>

              {/* Main Lightbox Image */}
              <motion.img
                key={galleryItems[lightboxIndex].id}
                src={galleryItems[lightboxIndex].image}
                alt=""
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />

              {/* Next image button */}
              <button
                id="lightbox-next-btn"
                onClick={() => setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 sm:right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 text-white flex items-center justify-center transition-all cursor-pointer z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom bar with active caption */}
            <div className="max-w-3xl mx-auto w-full text-center text-slate-300 pb-4">
              <p className="text-sm leading-relaxed">
                {lang === 'hi' ? galleryItems[lightboxIndex].descHi : galleryItems[lightboxIndex].descEn}
              </p>
              
              {/* Image thumbnail list inside lightbox for quick navigation */}
              <div className="flex justify-center gap-2 mt-4 overflow-x-auto py-1 px-4 max-w-full">
                {galleryItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setLightboxIndex(idx)}
                    className={`h-12 aspect-video rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      lightboxIndex === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-50 hover:opacity-85'
                    }`}
                  >
                    <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
