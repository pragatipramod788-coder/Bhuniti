'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'hi' | 'mr';

export interface Translations {
  [key: string]: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Shared / Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Command Center',
    'nav.repository': 'Central Repository',
    'nav.search': 'AI Research Search',
    'nav.recommendations': 'Policy Recommendations',
    'nav.copilot': 'Research Copilot',
    'nav.gis': 'GIS Intelligence',
    'nav.analytics': 'Analytics',
    'nav.simulation': 'Policy Simulation',
    'nav.projects': 'Collaboration',
    'nav.earlyWarning': 'Dispute Early-Warning',
    'nav.knowledgeGraph': 'Knowledge Graph',
    'nav.timeMachine': 'Impact Time Machine',
    'nav.permissions': 'Permissions & DPDP',
    'nav.apiDocs': 'Developer APIs',
    'nav.back': 'Back',
    'nav.searchAnything': 'Search anything',
    'nav.network': 'National Land Intelligence Network',
    'nav.activeRole': 'ACTIVE ROLE',
    'nav.commandPalette': 'Command palette',
    'nav.palettePlaceholder': 'Search pages, datasets, policies…',
    'nav.goTo': 'Go to',
    'nav.language': 'Language',

    // Roles
    'role.official': 'Government Official',
    'role.researcher': 'Researcher',
    'role.student': 'Student',
    'role.admin': 'Institution Admin',
    'role.public': 'Public User',
    'role.super': 'Super Admin',

    // Home Page
    'home.solution': 'Solution',
    'home.innovation': 'Innovation',
    'home.developers': 'Developers',
    'home.enterWorkspace': 'Enter workspace',
    'home.eyebrow': 'National land intelligence platform · SIH 26019',
    'home.heroTitle1': 'Evidence for ',
    'home.heroTitle2': 'every acre.',
    'home.heroDesc': 'BhuNiti connects land records, research, GIS and policy action — so India can move from fragmented data to decisions that hold up in the real world.',
    'home.exploreCommand': 'Explore the command center',
    'home.seeSolution': 'See the solution',
    'home.liveLayers': 'live layers',
    'home.recordsIndexed': 'records indexed',
    'home.evidenceScore': 'evidence score',
    'home.liveSignal': 'Live signal map · 08:42 IST',
    'home.systemsNominal': 'Systems nominal',
    'home.pillarsEyebrow': 'One platform, seven pillars',
    'home.pillarsTitle1': 'Turn land complexity into a ',
    'home.pillarsTitle2': 'shared advantage.',
    'home.pillar1.title': 'Evidence repository',
    'home.pillar1.desc': 'Research, data and policy in one trusted provenance layer.',
    'home.pillar2.title': 'AI policy intelligence',
    'home.pillar2.desc': 'Ask grounded questions and see the evidence trail behind every answer.',
    'home.pillar3.title': 'Geospatial command',
    'home.pillar3.desc': 'Move from India to district-level signals with time-aware maps.',
    'home.pillar4.title': 'Policy simulation',
    'home.pillar4.desc': 'Model trade-offs before implementation — disputes, revenue and resilience.',
    'home.collabEyebrow': 'Built for collaboration',
    'home.collabTitle': 'Government + research + citizen insight',
    'home.collabDesc': 'Secure workspaces, explainable AI and evidence trails that keep policy accountable.',
    'home.viewCollab': 'View collaboration spaces',
    'home.copyright': '© 2026 BhuNiti · National Land Intelligence Network',
    'home.dpdp': 'DPDP-aligned by design',

    // Dashboard
    'dash.kicker': 'Command center · live',
    'dash.title': 'Good morning, Aarav.',
    'dash.desc': 'A national view of land governance signals, evidence quality and the decisions that need attention today.',
    'dash.export': 'Export insight report',
    'dash.stat1': 'Land records indexed',
    'dash.stat2': 'Dispute risk monitored',
    'dash.stat3': 'Evidence score',
    'dash.stat4': 'Active workspaces',
    'dash.vsLast': 'vs last period',
    'dash.disputeSignals': 'Dispute signals',
    'dash.caseTrajectory': 'Monthly case trajectory',
    'dash.sinceJan': '−36% since Jan',
    'dash.needsAttention': 'Needs attention',
    'dash.earlyWarning': 'Early-warning districts',
    'dash.landUse': 'Land use transition',
    'dash.urbanFootprint': 'Urban footprint is accelerating',
    'dash.activityFeed': 'Activity feed',
    'dash.acrossNetwork': 'Across your network',

    // Repository
    'repo.kicker': 'Central repository · provenance first',
    'repo.title': 'Research, data, policy — together.',
    'repo.desc': 'A trusted evidence layer for land governance, with source, date, version and uploader visible at every step.',
    'repo.upload': 'Upload asset',
    'repo.searchPlaceholder': 'Search titles, abstracts and tags with relevance scoring…',
    'repo.preview': 'Preview dataset',
    'repo.evidence': 'Evidence',
    'repo.allFormats': 'All formats',
    'repo.papers': 'Papers',
    'repo.datasets': 'Datasets',
    'repo.policies': 'Policies',
    'repo.legal': 'Legal',
    'repo.readyToShare': 'Ready to share',
    'repo.previewTitle': 'Dataset preview · evidence record',
    'repo.sourceSchema': 'Source, schema and provenance',

    // GIS
    'gis.kicker': 'GIS visualization · MapLibre + deck.gl',
    'gis.title': 'See the system in space.',
    'gis.desc': 'Explore land use, climate exposure, urban growth and dispute signals from the national view down to district-level decisions.',
    'gis.stateBoundaries': 'State boundaries',
    'gis.districtBoundaries': 'District boundaries',
    'gis.swipeMode': 'Swipe mode',
    'gis.swipeOn': 'Swipe on',
    'gis.compare': 'Compare before / after',
    'gis.exitCompare': 'Exit compare',
    'gis.beforeAfter': 'BEFORE / AFTER',
    'gis.yearSlider': 'Urban growth year slider · click a boundary to drill down',

    // AI & Copilot
    'ai.copilotKicker': 'RAG research copilot',
    'ai.recomKicker': 'Evidence-ranked policy engine',
    'ai.searchKicker': 'Semantic evidence search',
    'ai.copilotTitle': 'Ask the repository.',
    'ai.engineTitle': 'Make the next move with evidence.',
    'ai.desc': 'Grounded answers over the BhuNiti repository, with citations, relevance signals and a transparent fallback when no model quota is available.',
    'ai.q1': 'Compare Maharashtra and Assam',
    'ai.q2': 'Draft a policy brief',
    'ai.q3': 'What reduces disputes?',
    'ai.inputPlaceholder': 'Ask about land governance…',
    'ai.howItWorks': 'How it works',
    'ai.transparent': 'Transparent by default',
    'ai.step1Title': 'Retrieve',
    'ai.step1Desc': 'Find the strongest title, abstract and tag matches.',
    'ai.step2Title': 'Reason',
    'ai.step2Desc': 'Use a real LLM call when the managed runtime is available.',
    'ai.step3Title': 'Cite',
    'ai.step3Desc': 'Show the returned source IDs that shaped the response.',
    'ai.step4Title': 'Fallback',
    'ai.step4Desc': 'Keep a deterministic evidence-grounded answer if quota is unavailable.',
    'ai.startQuestion': 'Start with a policy question',
    'ai.modelContext': 'The model receives repository context before it answers.',

    // Simulation
    'sim.kicker': 'Policy simulation · confidence ranges',
    'sim.title': 'Model the trade-off before you act.',
    'sim.desc': 'Adjust policy levers and see the projected effect on disputes, conversion, revenue and climate resilience.',
    'sim.save': 'Save scenario',
    'sim.saved': 'Scenario saved',
    'sim.controls': 'Scenario controls',
    'sim.digitalTransition': 'Digital land transition',
    'sim.digitisationRate': 'Record digitisation rate',
    'sim.boundaryStrictness': 'Urban boundary strictness',
    'sim.confidenceRange': 'Confidence range:',
    'sim.basedOn': 'Based on 18 comparable district interventions.',
    'sim.projectedOutcomes': 'Projected outcomes · 2024–2030',
    'sim.disputePressure': 'Dispute pressure',
    'sim.revenueIndex': 'Revenue index',
    'sim.conversionRisk': 'Conversion risk',
    'sim.resilience': 'Resilience',
    'sim.lowerBetter': 'lower is better',
    'sim.apiProjected': 'API projected',

    // Projects / Collaboration
    'proj.kicker': 'Collaboration workspaces',
    'proj.title': 'Build the evidence together.',
    'proj.desc': 'Shared research projects for officials, researchers and students — with work, review and feedback in one place.',
    'proj.new': 'New workspace',
    'proj.activeWorkspace': 'Active workspace',
    'proj.ledBy': 'Led by',
    'proj.evidenceSprint': 'evidence sprint for district-level policy adoption',
    'proj.taskBoard': 'Task board',
    'proj.threadedNotes': 'Threaded notes',
    'proj.addNote': 'Add a note…',
    'proj.members': 'members',
    'proj.complete': 'complete',
    'proj.done': 'Done',
    'proj.open': 'Open',

    // Login
    'login.kicker': 'Demo workspace access',
    'login.title': 'Choose a role. See the system.',
    'login.desc': 'Use any role below to explore how permissions, navigation and insight views adapt to the people who govern, research and live on land.',

    // Common Generic
    'generic.exploreModule': 'Explore module'
  },

  hi: {
    // Shared / Navigation
    'nav.home': 'मुख्य पृष्ठ',
    'nav.dashboard': 'कमांड सेंटर',
    'nav.repository': 'केंद्रीय भंडार',
    'nav.search': 'एआई शोध खोज',
    'nav.recommendations': 'नीति सिफारिशें',
    'nav.copilot': 'रिसर्च कोपायलट',
    'nav.gis': 'जीआईएस आसूचना',
    'nav.analytics': 'विश्लेषण',
    'nav.simulation': 'नीति सिमुलेशन',
    'nav.projects': 'सहयोग कार्यक्षेत्र',
    'nav.earlyWarning': 'विवाद पूर्व-चेतावनी',
    'nav.knowledgeGraph': 'ज्ञान ग्राफ',
    'nav.timeMachine': 'प्रभाव टाइम मशीन',
    'nav.permissions': 'अनुमतियां और डीपीडीपी',
    'nav.apiDocs': 'डेवलपर एपीआई',
    'nav.back': 'पीछे',
    'nav.searchAnything': 'कुछ भी खोजें',
    'nav.network': 'राष्ट्रीय भूमि आसूचना नेटवर्क',
    'nav.activeRole': 'सक्रिय भूमिका',
    'nav.commandPalette': 'कमांड पैलेट',
    'nav.palettePlaceholder': 'पृष्ठ, डेटासेट, नीतियां खोजें…',
    'nav.goTo': 'जाएं',
    'nav.language': 'भाषा',

    // Roles
    'role.official': 'सरकारी अधिकारी',
    'role.researcher': 'शोधकर्ता',
    'role.student': 'छात्र',
    'role.admin': 'संस्थान प्रशासक',
    'role.public': 'सार्वजनिक नागरिक',
    'role.super': 'सुपर एडमिन',

    // Home Page
    'home.solution': 'समाधान',
    'home.innovation': 'नवाचार',
    'home.developers': 'डेवलपर्स',
    'home.enterWorkspace': 'कार्यक्षेत्र में प्रवेश करें',
    'home.eyebrow': 'राष्ट्रीय भूमि आसूचना मंच · एसआईएच 26019',
    'home.heroTitle1': 'हर एकड़ के लिए ',
    'home.heroTitle2': 'ठोस साक्ष्य।',
    'home.heroDesc': 'भुनीति भूमि रिकॉर्ड, अनुसंधान, जीआईएस और नीतिगत कार्यवाही को जोड़ता है — ताकि भारत खंडित डेटा से ठोस निर्णयों की ओर बढ़ सके।',
    'home.exploreCommand': 'कमांड सेंटर का अन्वेषण करें',
    'home.seeSolution': 'समाधान देखें',
    'home.liveLayers': 'लाइव परतें',
    'home.recordsIndexed': 'अनुक्रमित रिकॉर्ड',
    'home.evidenceScore': 'साक्ष्य स्कोर',
    'home.liveSignal': 'लाइव सिग्नल मानचित्र · 08:42 भारतीय मानक समय',
    'home.systemsNominal': 'सिस्टम सामान्य',
    'home.pillarsEyebrow': 'एक मंच, सात स्तंभ',
    'home.pillarsTitle1': 'भूमि जटिलता को ',
    'home.pillarsTitle2': 'साझा लाभ में बदलें।',
    'home.pillar1.title': 'साक्ष्य भंडार',
    'home.pillar1.desc': 'एक विश्वसनीय स्रोत परत में अनुसंधान, डेटा और नीति।',
    'home.pillar2.title': 'एआई नीति आसूचना',
    'home.pillar2.desc': 'तथ्यपरक प्रश्न पूछें और हर उत्तर के पीछे साक्ष्य की श्रृंखला देखें।',
    'home.pillar3.title': 'भू-स्थानिक नियंत्रण',
    'home.pillar3.desc': 'समय-सजग मानचित्रों के साथ राष्ट्रीय से जिला-स्तरीय संकेतों की ओर बढ़ें।',
    'home.pillar4.title': 'नीति सिमुलेशन',
    'home.pillar4.desc': 'लागू करने से पहले परिणामों का आकलन करें — विवाद, राजस्व और लचीलापन।',
    'home.collabEyebrow': 'सहयोग के लिए निर्मित',
    'home.collabTitle': 'सरकार + अनुसंधान + नागरिक अंतर्दृष्टि',
    'home.collabDesc': 'सुरक्षित कार्यक्षेत्र, व्याख्या योग्य एआई और साक्ष्य पथ जो नीति को जवाबदेह बनाते हैं।',
    'home.viewCollab': 'सहयोग कार्यक्षेत्र देखें',
    'home.copyright': '© 2026 भुनीति · राष्ट्रीय भूमि आसूचना नेटवर्क',
    'home.dpdp': 'डीपीडीपी-संरेखित संरचित',

    // Dashboard
    'dash.kicker': 'कमांड सेंटर · लाइव',
    'dash.title': 'सुप्रभात, आरव।',
    'dash.desc': 'भूमि प्रशासन संकेतों, साक्ष्य गुणवत्ता और ध्यान देने योग्य निर्णयों का राष्ट्रीय दृश्य।',
    'dash.export': 'अंतर्दृष्टि रिपोर्ट निर्यात करें',
    'dash.stat1': 'अनुक्रमित भूमि रिकॉर्ड',
    'dash.stat2': 'निगरानी योग्य विवाद जोखिम',
    'dash.stat3': 'साक्ष्य स्कोर',
    'dash.stat4': 'सक्रिय कार्यक्षेत्र',
    'dash.vsLast': 'पिछली अवधि की तुलना में',
    'dash.disputeSignals': 'विवाद संकेत',
    'dash.caseTrajectory': 'मासिक मामला प्रक्षेपवक्र',
    'dash.sinceJan': 'जनवरी से −36%',
    'dash.needsAttention': 'ध्यानाकर्षण आवश्यक',
    'dash.earlyWarning': 'पूर्व-चेतावनी जिले',
    'dash.landUse': 'भूमि उपयोग संक्रमण',
    'dash.urbanFootprint': 'शहरी विस्तार तीव्र हो रहा है',
    'dash.activityFeed': 'गतिविधि फ़ीड',
    'dash.acrossNetwork': 'आपके संपूर्ण नेटवर्क में',

    // Repository
    'repo.kicker': 'केंद्रीय भंडार · स्रोत और प्रमाणिकता प्रथम',
    'repo.title': 'अनुसंधान, डेटा, नीति — एक साथ।',
    'repo.desc': 'भूमि प्रशासन के लिए एक विश्वसनीय साक्ष्य परत, जिसमें हर कदम पर स्रोत, तिथि, संस्करण और अपलोडर स्पष्ट दिखाई देता है।',
    'repo.upload': 'एसेट अपलोड करें',
    'repo.searchPlaceholder': 'प्रासंगिकता स्कोरिंग के साथ शीर्षक, सार और टैग खोजें…',
    'repo.preview': 'डेटासेट पूर्वावलोकन',
    'repo.evidence': 'साक्ष्य',
    'repo.allFormats': 'सभी प्रारूप',
    'repo.papers': 'शोध पत्र',
    'repo.datasets': 'डेटासेट',
    'repo.policies': 'नीतियां',
    'repo.legal': 'कानूनी',
    'repo.readyToShare': 'साझा करने के लिए तैयार',
    'repo.previewTitle': 'डेटासेट पूर्वावलोकन · साक्ष्य रिकॉर्ड',
    'repo.sourceSchema': 'स्रोत, स्कीमा और प्रामाणिकता',

    // GIS
    'gis.kicker': 'जीआईएस विज़ुअलाइज़ेशन · MapLibre + deck.gl',
    'gis.title': 'भौगोलिक अंतरिक्ष में प्रणाली देखें।',
    'gis.desc': 'राष्ट्रीय परिप्रेक्ष्य से लेकर जिला स्तर के निर्णयों तक भूमि उपयोग, जलवायु प्रभाव, शहरी विकास और विवाद संकेतों का अन्वेषण करें।',
    'gis.stateBoundaries': 'राज्य सीमाएं',
    'gis.districtBoundaries': 'जिला सीमाएं',
    'gis.swipeMode': 'स्वाइप मोड',
    'gis.swipeOn': 'स्वाइप चालू',
    'gis.compare': 'तुलना (पहले / बाद)',
    'gis.exitCompare': 'तुलना समाप्त करें',
    'gis.beforeAfter': 'पहले / बाद में',
    'gis.yearSlider': 'शहरी विकास वर्ष स्लाइडर · विवरण के लिए सीमा पर क्लिक करें',

    // AI & Copilot
    'ai.copilotKicker': 'आरएजी शोध कोपायलट',
    'ai.recomKicker': 'साक्ष्य-आधारित नीति इंजन',
    'ai.searchKicker': 'अर्थपूर्ण साक्ष्य खोज',
    'ai.copilotTitle': 'भंडार से प्रश्न पूछें।',
    'ai.engineTitle': 'साक्ष्य के साथ अगला कदम उठाएं।',
    'ai.desc': 'भुनीति भंडार पर आधारित सटीक उत्तर, उद्धरणों और प्रासंगिकता संकेतों के साथ।',
    'ai.q1': 'महाराष्ट्र और असम की तुलना करें',
    'ai.q2': 'नीति संक्षिप्त विवरण तैयार करें',
    'ai.q3': 'विवादों को क्या कम करता है?',
    'ai.inputPlaceholder': 'भूमि प्रशासन के बारे में पूछें…',
    'ai.howItWorks': 'यह कैसे काम करता है',
    'ai.transparent': 'मूलतः पारदर्शी',
    'ai.step1Title': 'पुनर्प्राप्ति',
    'ai.step1Desc': 'शीर्षक, सार और टैग से सबसे मजबूत मिलान खोजें।',
    'ai.step2Title': 'तर्क',
    'ai.step2Desc': 'विश्वसनीय मॉडल के साथ सटीक विश्लेषण तैयार करें।',
    'ai.step3Title': 'उद्धरण',
    'ai.step3Desc': 'प्रतिक्रिया को आकार देने वाले स्रोत आईडी प्रदर्शित करें।',
    'ai.step4Title': 'फ़ॉलबैक',
    'ai.step4Desc': 'कोटा उपलब्ध न होने पर भी ठोस साक्ष्य-आधारित उत्तर बनाए रखें।',
    'ai.startQuestion': 'एक नीतिगत प्रश्न से शुरुआत करें',
    'ai.modelContext': 'उत्तर देने से पहले मॉडल भंडार का प्रासंगिक संदर्भ प्राप्त करता है।',

    // Simulation
    'sim.kicker': 'नीति सिमुलेशन · विश्वसनीयता सीमाएं',
    'sim.title': 'कदम उठाने से पहले व्यापार-बंद (ट्रेड-ऑफ) का आकलन करें।',
    'sim.desc': 'नीति नियंत्रणों को समायोजित करें और विवादों, रूपांतरण, राजस्व और जलवायु अनुकूलन पर प्रभाव देखें।',
    'sim.save': 'परिदृश्य सहेजें',
    'sim.saved': 'परिदृश्य सहेजा गया',
    'sim.controls': 'परिदृश्य नियंत्रण',
    'sim.digitalTransition': 'डिजिटल भूमि संक्रमण',
    'sim.digitisationRate': 'अभिलेख डिजिटलीकरण दर',
    'sim.boundaryStrictness': 'शहरी सीमा कठोरता',
    'sim.confidenceRange': 'विश्वसनीयता दायरा:',
    'sim.basedOn': '18 तुलनीय जिला हस्तक्षेपों पर आधारित।',
    'sim.projectedOutcomes': 'अनुमानित परिणाम · 2024–2030',
    'sim.disputePressure': 'विवाद दबाव',
    'sim.revenueIndex': 'राजस्व सूचकांक',
    'sim.conversionRisk': 'रूपांतरण जोखिम',
    'sim.resilience': 'अनुकूलन क्षमता',
    'sim.lowerBetter': 'कम होना बेहतर है',
    'sim.apiProjected': 'एपीआई अनुमानित',

    // Projects / Collaboration
    'proj.kicker': 'सहयोग कार्यक्षेत्र',
    'proj.title': 'साक्ष्य का निर्माण मिलकर करें।',
    'proj.desc': 'अधिकारियों, शोधकर्ताओं और छात्रों के लिए साझा अनुसंधान परियोजनाएं — कार्य, समीक्षा और फीडबैक एक स्थान पर।',
    'proj.new': 'नया कार्यक्षेत्र',
    'proj.activeWorkspace': 'सक्रिय कार्यक्षेत्र',
    'proj.ledBy': 'नेतृत्वकर्ता',
    'proj.evidenceSprint': 'जिला-स्तरीय नीति अपनाने के लिए साक्ष्य स्प्रिंट',
    'proj.taskBoard': 'कार्य बोर्ड',
    'proj.threadedNotes': 'टिप्पणी धागे',
    'proj.addNote': 'एक टिप्पणी जोड़ें…',
    'proj.members': 'सदस्य',
    'proj.complete': 'पूर्ण',
    'proj.done': 'संपन्न',
    'proj.open': 'प्रगति पर',

    // Login
    'login.kicker': 'डेमो कार्यक्षेत्र प्रवेश',
    'login.title': 'भूमिका चुनें। प्रणाली को समझें।',
    'login.desc': 'अनुमतियों, नेविगेशन और अंतर्दृष्टि दृश्यों का अनुभव करने के लिए नीचे दी गई किसी भी भूमिका का उपयोग करें।',

    // Common Generic
    'generic.exploreModule': 'मॉड्यूल देखें'
  },

  mr: {
    // Shared / Navigation
    'nav.home': 'मुख्यपृष्ठ',
    'nav.dashboard': 'कमांड सेंटर',
    'nav.repository': 'मध्यवर्ती भांडार',
    'nav.search': 'एआय संशोधन शोध',
    'nav.recommendations': 'धोरण शिफारशी',
    'nav.copilot': 'संशोधन सह-मार्गदर्शक',
    'nav.gis': 'जीआयएस गुप्तवार्ता',
    'nav.analytics': 'विश्लेषण',
    'nav.simulation': 'धोरण सिम्युलेशन',
    'nav.projects': 'सहकार्य कार्यक्षेत्र',
    'nav.earlyWarning': 'वाद पूर्व-सूचना',
    'nav.knowledgeGraph': 'ज्ञान आलेख',
    'nav.timeMachine': 'प्रभाव टाइम मशीन',
    'nav.permissions': 'परवानग्या व डीपीडीपी',
    'nav.apiDocs': 'डेव्हलपर एपीआय',
    'nav.back': 'मागे',
    'nav.searchAnything': 'काहीही शोधा',
    'nav.network': 'राष्ट्रीय जमीन गुप्तवार्ता नेटवर्क',
    'nav.activeRole': 'सक्रिय भूमिका',
    'nav.commandPalette': 'कमांड पॅलेट',
    'nav.palettePlaceholder': 'पृष्ठे, डेटासेट, धोरणे शोधा…',
    'nav.goTo': 'जा',
    'nav.language': 'भाषा',

    // Roles
    'role.official': 'शासकीय अधिकारी',
    'role.researcher': 'संशोधक',
    'role.student': 'विद्यार्थी',
    'role.admin': 'संस्था प्रशासक',
    'role.public': 'सर्वसामान्य नागरिक',
    'role.super': 'सुपर ॲडमिन',

    // Home Page
    'home.solution': 'उपाययोजना',
    'home.innovation': 'नवकल्पना',
    'home.developers': 'डेव्हलपर्स',
    'home.enterWorkspace': 'कार्यक्षेत्रात प्रवेश करा',
    'home.eyebrow': 'राष्ट्रीय जमीन गुप्तवार्ता मंच · एसआयएच 26019',
    'home.heroTitle1': 'प्रत्येक एकरासाठी ',
    'home.heroTitle2': 'भक्कम पुरावा.',
    'home.heroDesc': 'भुनीती जमिनीच्या नोंदी, संशोधन, जीआयएस आणि धोरणात्मक कृतींना जोडते — जेणेकरून भारत खंडित माहितीकडून वास्तववादी व विश्वासार्ह निर्णयांकडे वाटचाल करू शकेल.',
    'home.exploreCommand': 'कमांड सेंटर एक्सप्लोर करा',
    'home.seeSolution': 'उपाय पाहा',
    'home.liveLayers': 'थेट स्तर',
    'home.recordsIndexed': 'अनुक्रमित नोंदी',
    'home.evidenceScore': 'पुरावा स्कोअर',
    'home.liveSignal': 'थेट सिग्नल नकाशा · 08:42 आयएसटी',
    'home.systemsNominal': 'प्रणाली सुरळीत',
    'home.pillarsEyebrow': 'एक मंच, सात खांब',
    'home.pillarsTitle1': 'जमिनीची गुंतागुंत ',
    'home.pillarsTitle2': 'सामायिक फायद्यात बदला.',
    'home.pillar1.title': 'पुरावा भांडार',
    'home.pillar1.desc': 'एका विश्वासार्ह स्रोत स्तरामध्ये संशोधन, डेटा आणि धोरण.',
    'home.pillar2.title': 'एआय धोरण बुद्धिमत्ता',
    'home.pillar2.desc': 'तथ्यपूर्ण प्रश्न विचारा आणि प्रत्येक उत्तरामागील पुराव्याची साखळी पाहा.',
    'home.pillar3.title': 'भू-स्थानिक नियंत्रण',
    'home.pillar3.desc': 'वेळेची जाणीव ठेवणाऱ्या नकाशांसह राष्ट्रीय ते जिल्हा स्तरावरील संकेत पाहा.',
    'home.pillar4.title': 'धोरण सिम्युलेशन',
    'home.pillar4.desc': 'अंमलबजावणीपूर्वी परिणामांचे मॉडेल तयार करा — वाद, महसूल आणि लवचिकता.',
    'home.collabEyebrow': 'सहकार्यासाठी निर्मित',
    'home.collabTitle': 'शासन + संशोधन + नागरिक दृष्टिकोन',
    'home.collabDesc': 'सुरक्षित कार्यक्षेत्रे, स्पष्टीकरणात्मक एआय आणि पुरावा साखळी जी धोरणाला उत्तरदायी ठेवते.',
    'home.viewCollab': 'सहकार्य क्षेत्र पाहा',
    'home.copyright': '© 2026 भुनीती · राष्ट्रीय जमीन गुप्तवार्ता नेटवर्क',
    'home.dpdp': 'डीपीडीपी-सुसंगत रचना',

    // Dashboard
    'dash.kicker': 'कमांड सेंटर · थेट',
    'dash.title': 'शुभ सकाळ, आरव.',
    'dash.desc': 'जमीन प्रशासन संकेत, पुरावा गुणवत्ता आणि आज लक्ष देणे आवश्यक असलेल्या निर्णयांचे राष्ट्रीय विहंगावलोकन.',
    'dash.export': 'माहिती अहवाल निर्यात करा',
    'dash.stat1': 'अनुक्रमित जमीन नोंदी',
    'dash.stat2': 'निरीक्षणाखालील वाद जोखीम',
    'dash.stat3': 'पुरावा स्कोअर',
    'dash.stat4': 'सक्रिय कार्यक्षेत्रे',
    'dash.vsLast': 'मागील कालावधीच्या तुलनेत',
    'dash.disputeSignals': 'वाद संकेत',
    'dash.caseTrajectory': 'मासिक खटल्यांचा आलेख',
    'dash.sinceJan': 'जानेवारीपासून −36%',
    'dash.needsAttention': 'लक्ष देणे आवश्यक',
    'dash.earlyWarning': 'पूर्व-सूचना जिल्हे',
    'dash.landUse': 'जमीन वापर स्थित्यंतर',
    'dash.urbanFootprint': 'शहरी विस्तार वेगाने वाढतो आहे',
    'dash.activityFeed': 'हालचालींचा ओघ',
    'dash.acrossNetwork': 'तुमच्या संपूर्ण नेटवर्कमध्ये',

    // Repository
    'repo.kicker': 'मध्यवर्ती भांडार · मूळ स्रोत प्रथम',
    'repo.title': 'संशोधन, डेटा, धोरण — एकत्र.',
    'repo.desc': 'जमीन प्रशासनासाठी एक विश्वासार्ह पुरावा स्तर, ज्यामध्ये प्रत्येक टप्प्यावर स्रोत, तारीख, आवृत्ती आणि अपलोड करणारा दृश्यमान आहे.',
    'repo.upload': 'मालमत्ता अपलोड करा',
    'repo.searchPlaceholder': 'शीर्षक, सारांश आणि टॅग्ज प्रासंगिकतेनुसार शोधा…',
    'repo.preview': 'डेटासेट पूर्वदृश्य',
    'repo.evidence': 'पुरावा',
    'repo.allFormats': 'सर्व स्वरूपे',
    'repo.papers': 'शोधनिबंध',
    'repo.datasets': 'डेटासेट',
    'repo.policies': 'धोरणे',
    'repo.legal': 'कायदेशीर',
    'repo.readyToShare': 'सामायिक करण्यास तयार',
    'repo.previewTitle': 'डेटासेट पूर्वदृश्य · पुरावा नोंद',
    'repo.sourceSchema': 'स्रोत, स्कीमा आणि विश्वासार्हता',

    // GIS
    'gis.kicker': 'जीआयएस दृश्यीकरण · MapLibre + deck.gl',
    'gis.title': 'भौगोलिक अवकाशात प्रणाली पाहा.',
    'gis.desc': 'राष्ट्रीय पातळीपासून ते जिल्हा पातळीवरील निर्णयांपर्यंत जमीन वापर, हवामान प्रभाव, शहरी वाढ आणि वाद संकेत तपासा.',
    'gis.stateBoundaries': 'राज्य सीमा',
    'gis.districtBoundaries': 'जिल्हा सीमा',
    'gis.swipeMode': 'स्वाइप पद्धत',
    'gis.swipeOn': 'स्वाइप चालू',
    'gis.compare': 'आधी / नंतर तुलना',
    'gis.exitCompare': 'तुलना बंद करा',
    'gis.beforeAfter': 'आधी / नंतर',
    'gis.yearSlider': 'शहरी वाढ वर्ष स्लायडर · अधिक माहितीसाठी सीमेवर क्लिक करा',

    // AI & Copilot
    'ai.copilotKicker': 'आरएजी संशोधन सह-मार्गदर्शक',
    'ai.recomKicker': 'पुरावा-आधारित धोरण इंजिन',
    'ai.searchKicker': 'अर्थपूर्ण पुरावा शोध',
    'ai.copilotTitle': 'भांडाराला प्रश्न विचारा.',
    'ai.engineTitle': 'पुराव्यासह पुढील पाऊल उचला.',
    'ai.desc': 'भुनीती भांडारावर आधारित नेमकी उत्तरे, संदर्भ आणि प्रासंगिकता निर्देशांकांसह.',
    'ai.q1': 'महाराष्ट्र आणि आसामची तुलना करा',
    'ai.q2': 'धोरण सारांश तयार करा',
    'ai.q3': 'वाद कशामुळे कमी होतात?',
    'ai.inputPlaceholder': 'जमीन प्रशासनाबद्दल विचारा…',
    'ai.howItWorks': 'हे कसे कार्य करते',
    'ai.transparent': 'बाय डीफॉल्ट पारदर्शक',
    'ai.step1Title': 'शोधणे',
    'ai.step1Desc': 'शीर्षक, सारांश आणि टॅग्जमधून अचूक जुळणारे घटक शोधा.',
    'ai.step2Title': 'विचार',
    'ai.step2Desc': 'विश्वासार्ह मॉडेलसह योग्य विश्लेषण मिळवा.',
    'ai.step3Title': 'संदर्भ',
    'ai.step3Desc': 'उत्तराला आकार देणारे मूळ स्रोत आयडी दाखवा.',
    'ai.step4Title': 'पर्यायी व्यवस्था',
    'ai.step4Desc': 'कोटा उपलब्ध नसला तरीही पुराव्यांवर आधारित उत्तर मिळवा.',
    'ai.startQuestion': 'एका धोरणात्मक प्रश्नाने सुरुवात करा',
    'ai.modelContext': 'उत्तर देण्यापूर्वी मॉडेलला भांडाराचा संदर्भ दिला जातो.',

    // Simulation
    'sim.kicker': 'धोरण सिम्युलेशन · विश्वासार्हता मर्यादा',
    'sim.title': 'कृती करण्यापूर्वी परिणामांचे मॉडेल तयार करा.',
    'sim.desc': 'धोरण नियंत्रणे जुळवा आणि वाद, रूपांतरण, महसूल आणि हवामान लवचिकतेवरील परिणाम पाहा.',
    'sim.save': 'परिदृश्य जतन करा',
    'sim.saved': 'परिदृश्य जतन झाले',
    'sim.controls': 'परिदृश्य नियंत्रणे',
    'sim.digitalTransition': 'डिजिटल जमीन स्थित्यंतर',
    'sim.digitisationRate': 'नोंदणी डिजिटलीकरण दर',
    'sim.boundaryStrictness': 'शहरी सीमा कडकपणा',
    'sim.confidenceRange': 'विश्वासार्हता मर्यादा:',
    'sim.basedOn': '18 तुलनेयोग्य जिल्हा हस्तक्षेपांवर आधारित.',
    'sim.projectedOutcomes': 'प्रक्षेपित परिणाम · 2024–2030',
    'sim.disputePressure': 'वाद दबाव',
    'sim.revenueIndex': 'महसूल निर्देशांक',
    'sim.conversionRisk': 'रूपांतरण जोखीम',
    'sim.resilience': 'लवचिकता',
    'sim.lowerBetter': 'कमी असणे चांगले',
    'sim.apiProjected': 'एपीआय प्रक्षेपित',

    // Projects / Collaboration
    'proj.kicker': 'सहकार्य कार्यक्षेत्रे',
    'proj.title': 'पुराव्यांची निर्मिती एकत्र करा.',
    'proj.desc': 'अधिकारी, संशोधक आणि विद्यार्थ्यांसाठी सामायिक संशोधन प्रकल्प — काम, पुनरावलोकन आणि अभिप्राय एकाच ठिकाणी.',
    'proj.new': 'नवीन कार्यक्षेत्र',
    'proj.activeWorkspace': 'सक्रिय कार्यक्षेत्र',
    'proj.ledBy': 'प्रमुख',
    'proj.evidenceSprint': 'जिल्हा पातळीवर धोरण स्वीकारण्यासाठी पुरावा स्प्रिंट',
    'proj.taskBoard': 'कार्य फलक',
    'proj.threadedNotes': 'टिप्पणी साखळी',
    'proj.addNote': 'नोंद जोडा…',
    'proj.members': 'सदस्य',
    'proj.complete': 'पूर्ण',
    'proj.done': 'झाले',
    'proj.open': 'प्रलंबित',

    // Login
    'login.kicker': 'डेमो कार्यक्षेत्र प्रवेश',
    'login.title': 'भूमिका निवडा. प्रणाली समजून घ्या.',
    'login.desc': 'परवानग्या, नेव्हिगेशन आणि विहंगावलोकन अनुभवण्यासाठी खालीलपैकी कोणतीही भूमिका वापरा.',

    // Common Generic
    'generic.exploreModule': 'मॉड्यूल पाहा'
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bhuniti-lang') as Language;
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'mr')) {
        setLangState(saved);
        document.documentElement.lang = saved;
        document.documentElement.setAttribute('data-lang', saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('bhuniti-lang', newLang);
      document.documentElement.lang = newLang;
      document.documentElement.setAttribute('data-lang', newLang);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    const langDict = translations[lang] || translations.en;
    if (langDict[key]) return langDict[key];
    if (translations.en[key]) return translations.en[key];
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
