const steps = [
  {
    id: 1,
    icon: (
      <div className="w-24 h-24 bg-orange-500 rounded-lg flex items-center justify-center">
        <div className="text-white">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
              <div className="w-8 h-0.5 bg-white"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
              <div className="w-8 h-0.5 bg-white"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white border-2 border-white"></div>
              <div className="w-8 h-0.5 bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    title: "CONDUCT A CHECKUP",
    description:
      "Conduct a checkup and identify the malocclusion and note the same on the ODONTO prescription form. Note all the details that you want us to stay informed. More details we get better is the Product.",
  },
  {
    id: 2,
    icon: (
      <div className="w-24 h-24 bg-orange-500 rounded-lg flex items-center justify-center border-4 border-orange-500">
        <div className="w-16 h-12 bg-white rounded flex items-center justify-center">
          <svg viewBox="0 0 40 20" className="w-10 h-6 text-orange-500">
            <path d="M2 18 Q8 2 15 10 T35 8" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M5 15 Q10 8 18 12 T38 10" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
    ),
    title: "DENTIST WILL TAKE AN IMPRESSION",
    description:
      "To plan out your treatment, we need an impression of your teeth which we will scan and digitize and use the same to create a Computer Aided Design (CAD) File. We use the latest technologies in digital dentistry to design the most suitable treatment plan for you.",
  },
  {
    id: 3,
    icon: (
      <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
        <div className="text-white">
          <svg viewBox="0 0 60 30" className="w-14 h-8">
            <path d="M5 25 Q15 5 25 15 Q35 5 55 25" stroke="white" strokeWidth="3" fill="none" />
            <circle cx="8" cy="22" r="2" fill="white" />
            <circle cx="15" cy="12" r="2" fill="white" />
            <circle cx="25" cy="15" r="2" fill="white" />
            <circle cx="35" cy="12" r="2" fill="white" />
            <circle cx="45" cy="18" r="2" fill="white" />
            <circle cx="52" cy="22" r="2" fill="white" />
          </svg>
        </div>
      </div>
    ),
    title: "CHECK YOUR TREATMENT PLAN",
    description:
      "Our orthodontists will use the digital model of your teeth to create a virtual treatment plan and simulate the using digital dentistry systems. A simulation of your treatment is sent to you for your approval. Once you approve, we proceed to manufacturing your aligners.",
  },
  {
    id: 4,
    icon: (
      <div className="w-24 h-24 bg-orange-500 rounded-lg flex items-center justify-center">
        <div className="text-white">
          <svg viewBox="0 0 50 30" className="w-12 h-7">
            <path d="M5 15 Q15 5 25 15 T45 15" stroke="white" strokeWidth="2" fill="none" />
            <path d="M10 20 Q20 10 30 20 T50 20" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
    ),
    title: "GET YOUR ALIGNERS & PREPARE FOR THAT HOLLYWOOD SMILE!",
    description:
      "Once everything is approved, your specialized team will work in manufacturing your Aligner and every so that. Each Aligner moves your tooth by approximately 0.25mm and sitting your teen a step closer to perfect positions.",
  },
];

export default steps;