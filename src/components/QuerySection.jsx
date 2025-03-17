import React, { useState } from 'react';
import { MessageSquare, Phone, Globe } from 'lucide-react';

export default function QuerySection() {
  const [language, setLanguage] = useState('english');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    query: ''
  });

  const translations = {
    english: {
      title: 'Need Help?',
      subtitle: 'Submit your query and we\'ll get back to you',
      name: 'Full Name',
      mobile: 'Mobile Number',
      query: 'Your Query',
      submit: 'Submit Query',
      namePlaceholder: 'Enter your name',
      mobilePlaceholder: 'Enter mobile number',
      queryPlaceholder: 'Type your question here...'
    },
    tamil: {
      title: 'உதவி தேவையா?',
      subtitle: 'உங்கள் கேள்வியை சமர்ப்பிக்கவும், நாங்கள் உங்களுக்கு பதிலளிப்போம்',
      name: 'முழு பெயர்',
      mobile: 'கைபேசி எண்',
      query: 'உங்கள் கேள்வி',
      submit: 'கேள்வியை சமர்ப்பிக்கவும்',
      namePlaceholder: 'உங்கள் பெயரை உள்ளிடவும்',
      mobilePlaceholder: 'கைபேசி எண்ணை உள்ளிடவும்',
      queryPlaceholder: 'உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...'
    },
    hindi: {
      title: 'मदद चाहिए?',
      subtitle: 'अपना प्रश्न जमा करें और हम आपसे संपर्क करेंगे',
      name: 'पूरा नाम',
      mobile: 'मोबाइल नंबर',
      query: 'आपका प्रश्न',
      submit: 'प्रश्न जमा करें',
      namePlaceholder: 'अपना नाम दर्ज करें',
      mobilePlaceholder: 'मोबाइल नंबर दर्ज करें',
      queryPlaceholder: 'अपना प्रश्न यहां टाइप करें...'
    },
    telugu: {
      title: 'సహాయం కావాలా?',
      subtitle: 'మీ ప్రశ్నను సమర్పించండి, మేము మీకు తిరిగి వస్తాము',
      name: 'పూర్తి పేరు',
      mobile: 'మొబైల్ నంబర్',
      query: 'మీ ప్రశ్న',
      submit: 'ప్రశ్నను సమర్పించండి',
      namePlaceholder: 'మీ పేరును నమోదు చేయండి',
      mobilePlaceholder: 'మొబైల్ నంబర్ను నమోదు చేయండి',
      queryPlaceholder: 'మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి...'
    },
    malayalam: {
      title: 'സഹായം വേണോ?',
      subtitle: 'നിങ്ങളുടെ ചോദ്യം സമർപ്പിക്കുക, ഞങ്ങൾ നിങ്ങളെ ബന്ധപ്പെടും',
      name: 'പൂർണ്ണ നാമം',
      mobile: 'മൊബൈൽ നമ്പർ',
      query: 'നിങ്ങളുടെ ചോദ്യം',
      submit: 'ചോദ്യം സമർപ്പിക്കുക',
      namePlaceholder: 'നിങ്ങളുടെ പേര് നൽകുക',
      mobilePlaceholder: 'മൊബൈൽ നമ്പർ നൽകുക',
      queryPlaceholder: 'നിങ്ങളുടെ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക...'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the query
    console.log('Query submitted:', formData);
    alert('Query submitted successfully!');
    setFormData({ name: '', mobile: '', query: '' });
  };

  const t = translations[language];

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">{t.title}</h2>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-secondary px-3 py-1 rounded-lg text-sm"
        >
          <option value="english">English</option>
          <option value="tamil">தமிழ்</option>
          <option value="hindi">हिंदी</option>
          <option value="telugu">తెలుగు</option>
          <option value="malayalam">മലയാളം</option>
        </select>
      </div>
      
      <p className="text-muted-foreground mb-6">{t.subtitle}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t.name}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder={t.namePlaceholder}
            className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t.mobile}
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
              placeholder={t.mobilePlaceholder}
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t.query}
          </label>
          <textarea
            value={formData.query}
            onChange={(e) => setFormData(prev => ({ ...prev, query: e.target.value }))}
            placeholder={t.queryPlaceholder}
            className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground min-h-[100px]"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          {t.submit}
        </button>
      </form>
    </div>
  );
}