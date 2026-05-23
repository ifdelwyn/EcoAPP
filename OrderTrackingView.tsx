import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, MapPin, Leaf, Phone, MessageSquare, ArrowLeft, Send, CheckCircle2, Navigation2, X, Package } from 'lucide-react';

interface OrderTrackingViewProps {
  orderDetails: {
    deliveryMode: 'Deliver' | 'Pick Up';
    address: string;
    total: number;
    paymentMethod: string;
  };
  onBackToHome: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'driver';
  text: string;
  timestamp: string;
}

export default function OrderTrackingView({ orderDetails, onBackToHome }: OrderTrackingViewProps) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Confirmed, 2: Eco-Packing, 3: EV-Transit, 4: Delivered
  const [eta, setEta] = useState(25); // in minutes
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'driver', text: 'Hi! I am Minh, your EcoShop courier. I am completing the final eco-auditing and preparing your recycled paper packages.', timestamp: 'Just now' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-progress order stages for high-fidelity interactive preview
  useEffect(() => {
    const stage1 = setTimeout(() => {
      setCurrentStep(2);
      setEta(18);
    }, 8000); // 8 seconds to start packing

    const stage2 = setTimeout(() => {
      setCurrentStep(3);
      setEta(10);
      setMessages(prev => [
        ...prev,
        { id: '2', sender: 'driver', text: 'Awesome news! All items are safely boxed in 100% compostable packs. I am loading them onto our electric delivery scooter now.', timestamp: 'Just now' }
      ]);
    }, 20000); // 20 seconds to head out

    const stage3 = setTimeout(() => {
      setCurrentStep(4);
      setEta(0);
      setMessages(prev => [
        ...prev,
        { id: '3', sender: 'driver', text: 'I have arrived! Your organic and green goods are delivered with zero-carbon logistics. Thank you for protecting the Earth!', timestamp: 'Just now' }
      ]);
    }, 45000); // 45 seconds to deliver

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
    };
  }, []);

  // Scroll to bottom on updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatOpen]);

  const handleSendMessage = () => {
    if (!inputVal.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputVal,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Trigger funny automated responses based on milestones
    setTimeout(() => {
      let driverReplyText = "Got it! Be there in a couple of minutes.";
      if (currentStep === 1) {
        driverReplyText = "I will ensure everything is completely plastic-free and safely cushioned in natural starch wraps!";
      } else if (currentStep === 2) {
        driverReplyText = "Yes, hanging tight! The hub is wrapping it securely with paper-tape as we speak.";
      } else if (currentStep === 4) {
        driverReplyText = "You’re very welcome! Feel free to review us and recycle the shipping cardboard package!";
      }
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'driver',
        text: driverReplyText,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 15000);
  };

  const steps = [
    { num: 1, name: 'Confirmed', desc: 'Eco audit approved', icon: CheckCircle2 },
    { num: 2, name: 'Packaging', desc: 'Zero-plastic starch wraps', icon: Package },
    { num: 3, name: 'Clean Transit', desc: 'Electric dispatch partner', icon: Truck },
    { num: 4, name: 'Arrived Greener', desc: 'Securely delivered', icon: MapPin }
  ];

  return (
    <div id="tracking-container" className="min-h-screen bg-[#0E1511] text-white pb-24 font-sans">
      {/* Top Navigation */}
      <div className="sticky top-0 z-30 bg-[#0E1511]/90 backdrop-blur-md flex items-center justify-between px-6 py-4 border-b border-[#232F27]/30">
        <button
          id="btn-track-back"
          onClick={onBackToHome}
          className="p-2.5 bg-[#171E19] hover:bg-[#232F27] rounded-xl text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-bold">Carbon-Neutral Delivery</span>
        <div className="w-5" />
      </div>

      <div className="max-w-xl mx-auto px-6 mt-6">
        
        {/* Estimated Status Notice */}
        <div className="bg-[#171E19] rounded-3xl p-6 mb-6 border border-[#232F27]/40 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-[#4CAF50]/10 rounded-full blur-3xl" />
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <span className="text-xs text-[#98A39C] uppercase font-bold tracking-wider">Estimated Delivery Time</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {eta > 0 ? `${eta} Minutes` : 'Delivered!'}
              </h2>
            </div>
            <div className="bg-[#2E7D32] p-3 rounded-2xl shadow-md shadow-[#2E7D32]/20 text-white animate-bounce">
              <Truck className="w-6 h-6" />
            </div>
          </div>

          <p className="text-xs text-[#98A39C] leading-relaxed relative z-10">
            {currentStep === 1 && 'Our warehouse team is completing sustainability verification on your items.'}
            {currentStep === 2 && 'Products are wrapping inside 100% biodegradable kraft packs with starch lining.'}
            {currentStep === 3 && `Your active courier scooter is riding down ${orderDetails.address.split(',')[0]} under zero tailpipe emissions.`}
            {currentStep === 4 && 'Your organic packages have successfully arrived! Enjoy your circular items.'}
          </p>

          {/* Micro-scale visual indicators for steps progress bar */}
          <div className="w-full bg-[#0E1511] h-2.5 rounded-full overflow-hidden mt-5 relative z-10 flex border border-[#171E19]">
            <div 
              className="bg-[#2E7D32] h-full transition-all duration-1000 rounded-full shadow-inner"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Vector Simulated Live Path Navigation Map */}
        {orderDetails.deliveryMode === 'Deliver' && (
          <div className="bg-[#171E19] rounded-3xl p-5 mb-6 border border-[#232F27]/40 overflow-hidden relative shadow-md">
            <span className="block text-xs font-bold text-white mb-3 uppercase tracking-wider">Green Logistics Route</span>
            
            <div className="relative h-44 bg-[#0E1511] border border-[#232F27]/60 rounded-2xl overflow-hidden flex items-center justify-center">
              {/* Map visual background lines representation */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,20 H400 M0,70 H400 M0,120 H400 M0,170 H400" stroke="#888" strokeWidth="2" />
                <path d="M50,0 V200 M150,0 V200 M250,0 V200 M350,0 V200" stroke="#888" strokeWidth="2" />
                <path d="M20,20 L380,180" stroke="#4CAF50" strokeWidth="3" strokeDasharray="6 4" />
              </svg>

              {/* Eco Hub Node */}
              <div className="absolute left-6 bottom-12 flex flex-col items-center gap-1.5 z-10">
                <div className="bg-[#171E19] p-2 rounded-xl border border-[#232F27] shadow-md flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-[#4CAF50]" />
                </div>
                <span className="text-[9px] bg-[#0E1511]/90 px-2 py-0.5 rounded text-[#98A39C] font-bold">Eco Hub</span>
              </div>

              {/* Customer Node */}
              <div className="absolute right-6 top-10 flex flex-col items-center gap-1.5 z-10">
                <div className="bg-[#2E7D32] p-2 rounded-xl text-white shadow-md shadow-[#2E7D32]/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[9px] bg-[#0E1511]/90 px-2 py-0.5 rounded text-white font-bold">You</span>
              </div>

              {/* Scooter animation along route */}
              {currentStep < 4 ? (
                <motion.div 
                  animate={{ 
                    x: currentStep === 1 ? [-120, -120] : currentStep === 2 ? [-90, -90] : [-120, 100],
                    y: currentStep === 1 ? [40, 40] : currentStep === 2 ? [30, 30] : [40, -40]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 6,
                    ease: "easeInOut"
                  }}
                  className="absolute z-20 bg-[#171E19] border border-[#2E7D32] text-[#4CAF50] p-2 rounded-full shadow-lg"
                >
                  <Navigation2 className="w-4 h-4 rotate-45" />
                </motion.div>
              ) : (
                <div className="absolute top-10 right-14 z-20 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}

              <span className="absolute bottom-2.5 text-[10px] text-[#425246] italic">Simulated EV GPS Coordinate Tracking</span>
            </div>
          </div>
        )}

        {/* Milestone Steps Timeline */}
        <div className="bg-[#171E19] rounded-3xl p-5 mb-6 border border-[#232F27]/40 shadow-sm">
          <span className="block text-xs font-bold text-white mb-4 uppercase tracking-wider">Eco Milestone Progress</span>

          <div className="flex flex-col gap-5">
            {steps.map(step => {
              const StepIcon = step.icon;
              const active = currentStep >= step.num;
              const completed = currentStep > step.num;

              return (
                <div key={step.num} className="flex items-start gap-3.5 relative">
                  {/* Visual Timeline connector line */}
                  {step.num < 4 && (
                    <div 
                      className={`absolute left-4.5 top-9 w-0.5 h-8 z-0 ${
                        currentStep > step.num ? 'bg-[#2E7D32]' : 'bg-[#232F27]'
                      }`}
                    />
                  )}

                  {/* Icon Circle */}
                  <div 
                    className={`w-9.5 h-9.5 rounded-full flex items-center justify-center z-10 transition-colors ${
                      completed
                        ? 'bg-[#2E7D32] text-white'
                        : active
                        ? 'bg-[#2E7D32]/20 text-[#4CAF50] border-2 border-[#2E7D32]'
                        : 'bg-[#0E1511] text-[#5D6B60] border border-[#232F27]'
                    }`}
                  >
                    <StepIcon className="w-4.5 h-4.5" />
                  </div>

                  {/* Text descriptions */}
                  <div>
                    <h4 className={`text-sm font-bold ${active ? 'text-white' : 'text-[#5D6B60]'}`}>
                      {step.name}
                    </h4>
                    <p className={`text-xs mt-0.5 ${active ? 'text-[#98A39C]' : 'text-[#232F27]'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Client-to-Courier live contact panel */}
        {orderDetails.deliveryMode === 'Deliver' && (
          <div className="bg-[#171E19] rounded-3xl p-4 mb-6 border border-[#232F27]/40 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#232F27] flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
                  alt="Courier Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-sans">
                <h4 className="text-sm font-bold text-white">Minh Green</h4>
                <p className="text-[11px] text-[#98A39C] mt-0.5">EcoShop Electric Courier</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href="tel:0901234567"
                onClick={(e) => e.preventDefault()} // Keep contained inside preview
                className="p-3 bg-[#0E1511] border border-[#232F27]/50 hover:border-[#303F34] rounded-2xl text-[#8F9A92] hover:text-[#4CAF50] transition-colors"
              >
                <Phone className="w-4.5 h-4.5" />
              </a>
              <button
                id="btn-open-chat"
                onClick={() => setChatOpen(true)}
                className="p-3 bg-[#0E1511] border border-[#232F27]/50 hover:border-[#303F34] rounded-2xl text-[#8F9A92] hover:text-[#4CAF50] transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        )}

        {/* Back to Home Navigator link */}
        <button
          id="btn-return-home"
          onClick={onBackToHome}
          className="w-full py-4 bg-[#171E19] hover:bg-[#232F27] text-white border border-[#232F27]/60 rounded-2xl font-bold text-sm transition-colors cursor-pointer mb-8"
        >
          Return to EcoShop Home
        </button>
      </div>

      {/* Floating Messenger Chat Overlay */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            id="chat-overlay"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-[#0E1511] border-t border-[#232F27] px-6 py-4 flex flex-col h-[500px] shadow-2xl rounded-t-[32px]"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-[#232F27]/40 pb-3 mb-4 font-sans">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
                    alt="Courier portrait mini"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Minh Green</h4>
                  <span className="text-[10px] text-emerald-400">● Carbon-Neutral Online</span>
                </div>
              </div>

              <button
                id="btn-close-chat"
                onClick={() => setChatOpen(false)}
                className="p-2 bg-[#171E19] hover:bg-[#232F27] rounded-xl text-white transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-grow overflow-y-auto mb-4 flex flex-col gap-3.5 pr-1 font-sans">
              {messages.map((message) => {
                const isUser = message.sender === 'user';
                return (
                  <div
                    key={message.id}
                    className={`flex flex-col max-w-[80%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <div 
                      className={`p-3.5 rounded-2xl text-xs font-sans leading-relaxed ${
                        isUser 
                          ? 'bg-[#2E7D32] text-white rounded-tr-none' 
                          : 'bg-[#171E19] text-[#EFEFEF] rounded-tl-none border border-[#232F27]/30'
                      }`}
                    >
                      {message.text}
                    </div>
                    <span className="text-[9px] text-[#5D6B60] mt-1 font-mono">{message.timestamp}</span>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Inputs section */}
            <div className="flex gap-2.5 items-center mt-auto pb-4">
              <input
                id="inp-chat-msg"
                type="text"
                placeholder="Write your message here..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-[#171E19] border border-[#232F27] focus:border-[#4CAF50] text-white text-xs px-4 py-3.5 outline-none rounded-xl font-sans"
              />
              <button
                id="btn-send-chat"
                onClick={handleSendMessage}
                className="p-3.5 bg-[#2E7D32] text-white hover:bg-[#388E3C] rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
