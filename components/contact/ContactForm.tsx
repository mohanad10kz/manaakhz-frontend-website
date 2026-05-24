"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3 font-sans">تم الإرسال بنجاح!</h3>
        <p className="text-[#6B6B67]">شكراً لتواصلك، سأقوم بالرد عليك في أقرب وقت ممكن.</p>
        <Button 
          onClick={() => setIsSuccess(false)}
          variant="outline" 
          className="mt-8 border-primary text-primary hover:bg-primary hover:text-white"
        >
          إرسال رسالة أخرى
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-bold text-foreground">الاسم</label>
          <Input 
            id="name" 
            placeholder="الاسم الكريم" 
            required
            className="bg-[#F7F4EF] border-transparent focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary rounded-lg" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-bold text-foreground">البريد الإلكتروني</label>
          <Input 
            id="email" 
            type="email" 
            placeholder="example@domain.com" 
            required
            className="bg-[#F7F4EF] border-transparent focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary rounded-lg text-right" 
            dir="rtl"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-bold text-foreground">الموضوع</label>
          <Input 
            id="subject" 
            placeholder="موضوع الرسالة" 
            required
            className="bg-[#F7F4EF] border-transparent focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary rounded-lg" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-bold text-foreground">الرسالة</label>
          <Textarea 
            id="message" 
            placeholder="اكتب رسالتك هنا..." 
            rows={5}
            required
            className="bg-[#F7F4EF] border-transparent focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary rounded-lg resize-none" 
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-lg mt-2"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
        </Button>
      </form>
    </div>
  );
}
