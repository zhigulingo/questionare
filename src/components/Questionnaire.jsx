import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, FlagIcon, ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const translations = {
  en: {
    previousQuestion: "Previous question",
    closeQuestionnaire: "Close questionnaire",
    of: "of",
    contactTitle: "Contact Information",
    contactSubtitle: "We're almost done! Please provide your contact details.",
    emailLabel: "Email Address *",
    emailPlaceholder: "your@email.com",
    additionalLabel: "Additional Information",
    additionalPlaceholder: "Any additional details you'd like to share...",
    agreementText: "I agree to the storage and processing of my personal information for the purpose of this consultation.",
    submitBtn: "Submit",
    selectAnswers: "Select answers",
    selectAnswer: "Select an answer",
    nextBtn: "Next",
    continueBtn: "Continue",
    thankYou: "Thank you!",
    successMsg: "Your responses have been submitted successfully.",
    questions: [
      {
        id: 1,
        question: "What is your desired format of communication?",
        type: "multiple",
        options: [
          { id: 'a', text: "Video(s)", description: "Great for promotion and entertainment" },
          { id: 'b', text: "Website(s)", description: "An integral part in digital world" },
          { id: 'c', text: "Application(s)", description: "Be closer to your clients" }
        ]
      },
      {
        id: 2,
        question: "What is a result you want to achieve?",
        type: "multiple",
        options: [
          { id: 'a', text: "More clients" },
          { id: 'b', text: "More deals" },
          { id: 'c', text: "Explanation of a service" },
          { id: 'd', text: "Highlight a new feature" },
          { id: 'e', text: "Tell a story" }
        ]
      },
      {
        id: 3,
        question: "What is a field of your business?",
        type: "single",
        options: [
          { id: 'a', text: "Finance" },
          { id: 'b', text: "Technology" },
          { id: 'c', text: "Medicine" },
          { id: 'd', text: "FMCG" },
          { id: 'e', text: "Logistics" },
          { id: 'f', text: "Gambling" }
        ]
      },
      {
        id: 'transition',
        type: 'transition',
        title: "Almost there!",
        subtitle: "3 final questions"
      },
      {
        id: 4,
        question: "What is the time you need your result till?",
        type: "single",
        options: [
          { id: 'a', text: "Less than a month" },
          { id: 'b', text: "1-2 months" },
          { id: 'c', text: "No tight timing" }
        ]
      },
      {
        id: 5,
        question: "Will you provide marketing materials?",
        type: "single",
        options: [
          { id: 'a', text: "No, I don't have any" },
          { id: 'b', text: "Marketing materials needs to be created" },
          { id: 'c', text: "Everything will be provided" }
        ]
      },
      {
        id: 6,
        question: "Lastly, do you have a budget in mind?",
        type: "single",
        options: [
          { id: 'a', text: "Up to $2000" },
          { id: 'b', text: "Up to $5000" },
          { id: 'c', text: "Up to $10 000" }
        ]
      },
      {
        id: 'final-transition',
        type: 'transition',
        title: "Perfect!",
        subtitle: "Let's get in touch"
      }
    ]
  },
  ru: {
    previousQuestion: "Предыдущий вопрос",
    closeQuestionnaire: "Закрыть опрос",
    of: "из",
    contactTitle: "Контактная информация",
    contactSubtitle: "Почти готово! Укажи свои контактные данные.",
    emailLabel: "Email адрес *",
    emailPlaceholder: "твой@email.com",
    additionalLabel: "Дополнительная информация",
    additionalPlaceholder: "Любые детали, которые хочешь добавить...",
    agreementText: "Я соглашаюсь на хранение и обработку моих персональных данных в целях данной консультации.",
    submitBtn: "Отправить",
    selectAnswers: "Выбери варианты",
    selectAnswer: "Выбери вариант",
    nextBtn: "Далее",
    continueBtn: "Продолжить",
    thankYou: "Спасибо!",
    successMsg: "Твои ответы успешно отправлены.",
    questions: [
      {
        id: 1,
        question: "Какой формат взаимодействия тебе нужен?",
        type: "multiple",
        options: [
          { id: 'a', text: "Видео", description: "Отлично для продвижения и развлечения" },
          { id: 'b', text: "Сайт", description: "Неотъемлемая часть цифрового мира" },
          { id: 'c', text: "Приложение", description: "Стань ближе к своим клиентам" }
        ]
      },
      {
        id: 2,
        question: "Какой результат ты хочешь получить?",
        type: "multiple",
        options: [
          { id: 'a', text: "Больше клиентов" },
          { id: 'b', text: "Больше сделок" },
          { id: 'c', text: "Объяснить услугу" },
          { id: 'd', text: "Рассказать о новой функции" },
          { id: 'e', text: "Рассказать историю" }
        ]
      },
      {
        id: 3,
        question: "В какой сфере твой бизнес?",
        type: "single",
        options: [
          { id: 'a', text: "Финансы" },
          { id: 'b', text: "Технологии" },
          { id: 'c', text: "Медицина" },
          { id: 'd', text: "FMCG" },
          { id: 'e', text: "Логистика" },
          { id: 'f', text: "Гемблинг" }
        ]
      },
      {
        id: 'transition',
        type: 'transition',
        title: "Почти готово!",
        subtitle: "Осталось 3 вопроса"
      },
      {
        id: 4,
        question: "В какой срок нужен результат?",
        type: "single",
        options: [
          { id: 'a', text: "Менее месяца" },
          { id: 'b', text: "1–2 месяца" },
          { id: 'c', text: "Без жёсткого дедлайна" }
        ]
      },
      {
        id: 5,
        question: "Предоставишь маркетинговые материалы?",
        type: "single",
        options: [
          { id: 'a', text: "Нет, у меня ничего нет" },
          { id: 'b', text: "Нужно создать материалы" },
          { id: 'c', text: "Всё предоставлю" }
        ]
      },
      {
        id: 6,
        question: "Есть ли у тебя бюджет в уме?",
        type: "single",
        options: [
          { id: 'a', text: "До $2000" },
          { id: 'b', text: "До $5000" },
          { id: 'c', text: "До $10 000" }
        ]
      },
      {
        id: 'final-transition',
        type: 'transition',
        title: "Отлично!",
        subtitle: "Давай свяжемся"
      }
    ]
  }
};

// Icons map (shared between languages)
const icons = {
  video: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
  ),
  website: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
  ),
  app: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 4V3h10v1H7zm0 14V6h10v12H7z"/></svg>
  ),
  clients: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
  ),
  deals: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
  ),
  explain: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
  ),
  feature: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  ),
  story: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
  ),
  finance: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5 8h2v8H5zm7-5h2v13h-2zm-4 9h2v4H8zm6-5h2v9h-2z"/></svg>
  ),
  tech: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/></svg>
  ),
  medicine: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h5v2h2V6h1V4H4v2zm0 5h3v2h2v-2h3V9H4v2zm0 5h5v2h2v-2h1v-2H4v2z"/></svg>
  ),
  fmcg: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
  ),
  logistics: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
  ),
  gambling: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z"/></svg>
  ),
  clock: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
  ),
  check: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
  ),
  noMaterials: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
  ),
  plus: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
  ),
  money: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
  ),
};

const iconMap = [
  // q1
  [icons.video, icons.website, icons.app],
  // q2
  [icons.clients, icons.deals, icons.explain, icons.feature, icons.story],
  // q3
  [icons.finance, icons.tech, icons.medicine, icons.fmcg, icons.logistics, icons.gambling],
  // q4 (transition at index 3, so q4 is index 4)
  null, // transition
  [icons.clock, icons.calendar, icons.check],
  // q5
  [icons.noMaterials, icons.plus, icons.check],
  // q6
  [icons.money, icons.money, icons.money],
];

export default function Questionnaire() {
  // Detect lang from URL param
  const [lang, setLang] = useState('en');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const l = params.get('lang');
    if (l === 'ru') setLang('ru');
  }, []);

  const t = translations[lang];
  const questions = t.questions;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({ email: '', additional: '' });
  const [agreed, setAgreed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showBackTooltip, setShowBackTooltip] = useState(false);
  const [showCloseTooltip, setShowCloseTooltip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const closeQuestionnaire = () => {
    setCurrentStep(0);
    setAnswers({});
    setContactInfo({ email: '', additional: '' });
    setAgreed(false);
    setIsCompleted(false);
    setIsSubmitting(false);
    setShowContactForm(false);
  };

  const handleBack = () => {
    if (showContactForm) {
      setShowContactForm(false);
      return;
    }
    if (currentStep > 0) {
      let prevStep = currentStep - 1;
      while (prevStep >= 0 && questions[prevStep].type === 'transition') {
        prevStep--;
      }
      if (prevStep >= 0) setCurrentStep(prevStep);
    }
  };

  const isAnswerValid = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || question.type === 'transition') return true;
    if (question.type === 'multiple') {
      return answers[questionId] && Object.values(answers[questionId]).some(val => val === true);
    }
    return answers[questionId] !== undefined;
  };

  const handleAnswer = (questionId, answerId) => {
    if (questions[currentStep].type === "multiple") {
      setAnswers(prev => ({
        ...prev,
        [questionId]: {
          ...(prev[questionId] || {}),
          [answerId]: !(prev[questionId]?.[answerId] || false)
        }
      }));
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    }
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    if (currentQuestion.type !== 'transition' && !isAnswerValid(currentQuestion.id)) return;
    setIsSubmitting(true);
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setShowContactForm(true);
      }
      setIsSubmitting(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getSelected = (qId) => {
      const ans = answers[qId];
      if (!ans) return null;
      if (typeof ans === 'object') {
        return Object.entries(ans).filter(([,v]) => v).map(([k]) => {
          const q = questions.find(q => q.id === qId);
          const opt = q?.options?.find(o => o.id === k);
          return opt?.text || k;
        });
      }
      const q = questions.find(q => q.id === qId);
      const opt = q?.options?.find(o => o.id === ans);
      return opt?.text || ans;
    };

    const payload = {
      email: contactInfo.email,
      additional: contactInfo.additional || null,
      format: getSelected(1),
      goal: getSelected(2),
      field: getSelected(3),
      deadline: getSelected(4),
      materials: getSelected(5),
      budget: getSelected(6),
      lang,
    };

    const { error } = await supabase.from('portfolio_contacts').insert([payload]);
    if (error) console.error('Supabase error:', error);

    setIsCompleted(true);
    setTimeout(() => {
      setCurrentStep(0);
      setAnswers({});
      setContactInfo({ email: '', additional: '' });
      setAgreed(false);
      setIsCompleted(false);
      setShowContactForm(false);
    }, 2000);
  };

  const totalSteps = 6;
  const currentQuestionStep = Math.min(
    questions.slice(0, currentStep + 1).filter(q => q.type !== 'transition').length,
    totalSteps
  );
  const progress = (currentQuestionStep / totalSteps) * 100;

  const getNextButtonText = () => {
    const currentQuestion = questions[currentStep];
    if (currentQuestion.type === 'transition') return t.continueBtn;
    if (!isAnswerValid(currentQuestion.id)) {
      return currentQuestion.type === 'multiple' ? t.selectAnswers : t.selectAnswer;
    }
    return t.nextBtn;
  };

  // Get icon for current option
  const getIcon = (stepIndex, optionIndex) => {
    // Map step index to iconMap index (skip transitions)
    const nonTransitionSteps = questions
      .map((q, i) => ({ q, i }))
      .filter(({ q }) => q.type !== 'transition');
    const stepInfo = nonTransitionSteps.find(({ i }) => i === stepIndex);
    if (!stepInfo) return null;
    const questionIdx = nonTransitionSteps.indexOf(stepInfo);
    return iconMap[questionIdx]?.[optionIndex] || null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {(currentStep > 0 || showContactForm) && !isCompleted && (
                <div className="relative">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleBack}
                    onMouseEnter={() => setShowBackTooltip(true)}
                    onMouseLeave={() => setShowBackTooltip(false)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <AnimatePresence>
                    {showBackTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
                      >
                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap">
                          {t.previousQuestion}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            <div className="relative">
              <motion.button
                onClick={closeQuestionnaire}
                onMouseEnter={() => setShowCloseTooltip(true)}
                onMouseLeave={() => setShowCloseTooltip(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </motion.button>
              <AnimatePresence>
                {showCloseTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="absolute top-full right-1/2 transform translate-x-1/2 mt-2 z-50"
                  >
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap">
                      {t.closeQuestionnaire}
                      <div className="absolute bottom-full right-1/2 transform translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {!showContactForm && !isCompleted && (
            <div className="mt-6 relative">
              <motion.div
                className="cursor-pointer relative"
                onMouseEnter={() => setShowProgress(true)}
                onMouseLeave={() => setShowProgress(false)}
              >
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-black rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <AnimatePresence>
                  {showProgress && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
                    >
                      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                        {currentQuestionStep} {t.of} {totalSteps}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-8 py-8 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {isCompleted ? (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircleIcon className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-semibold mb-2">{t.thankYou}</h2>
                <p className="text-gray-600">{t.successMsg}</p>
              </motion.div>
            ) : showContactForm ? (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-semibold mb-2">{t.contactTitle}</h2>
                <p className="text-gray-600 mb-8">{t.contactSubtitle}</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.emailLabel}</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      placeholder={t.emailPlaceholder}
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.additionalLabel}</label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none"
                      rows="4"
                      placeholder={t.additionalPlaceholder}
                      value={contactInfo.additional}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, additional: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreement"
                      className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="agreement" className="text-sm text-gray-600 leading-relaxed">
                      {t.agreementText}
                    </label>
                  </div>
                </form>
              </motion.div>
            ) : questions[currentStep].type === 'transition' ? (
              <motion.div
                key="transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <FlagIcon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-semibold mb-2"
                >
                  {questions[currentStep].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-gray-600 mb-8"
                >
                  {questions[currentStep].subtitle}
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-semibold mb-8 leading-tight">
                  {questions[currentStep].question}
                </h2>
                <div className="space-y-3">
                  {questions[currentStep].options.map((option, index) => {
                    const icon = getIcon(currentStep, index);
                    const isSelected = answers[questions[currentStep].id]?.[option.id] ||
                      answers[questions[currentStep].id] === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(questions[currentStep].id, option.id)}
                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-black bg-gray-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            {icon && (
                              <div className={`flex-shrink-0 p-2 rounded-lg ${
                                isSelected ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {icon}
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-lg mb-1">{option.text}</p>
                              {option.description && (
                                <p className="text-gray-500 text-sm">{option.description}</p>
                              )}
                            </div>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-4 flex-shrink-0"
                            >
                              <CheckCircleIcon className="h-6 w-6 text-black" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        {!isCompleted && (
          <div className="px-8 py-6 border-t border-gray-100 bg-white">
            <div className="flex justify-end">
              {showContactForm ? (
                <motion.button
                  type="submit"
                  disabled={!agreed}
                  whileHover={{ scale: agreed ? 1.02 : 1 }}
                  whileTap={{ scale: agreed ? 0.98 : 1 }}
                  onClick={handleSubmit}
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                    agreed ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {t.submitBtn}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: (questions[currentStep].type === 'transition' || isAnswerValid(questions[currentStep].id)) ? 1.02 : 1 }}
                  whileTap={{ scale: (questions[currentStep].type === 'transition' || isAnswerValid(questions[currentStep].id)) ? 0.98 : 1 }}
                  onClick={handleNext}
                  disabled={questions[currentStep].type !== 'transition' && !isAnswerValid(questions[currentStep].id)}
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center min-w-[140px] h-12 ${
                    questions[currentStep].type === 'transition' || isAnswerValid(questions[currentStep].id)
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="checkmark"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircleIcon className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {getNextButtonText()}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
