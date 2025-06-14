import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ParticleBackground from '../components/effects/ParticleBackground';
import SimpleParticleBackground from '../components/effects/SimpleParticleBackground';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from '../components/ui/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import contactConfig from '../config/contactConfig.json';
import emailjs from '@emailjs/browser';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const iconMap = {
  Mail,
  Phone,
  MapPin,
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // SEO config for contact page
  const seoConfig = {
    title: "Contact Jeeva V - Get In Touch for Backend Development",
    description: "Contact Jeeva V for backend development projects, collaboration opportunities, or technical consultations. Expert in Node.js, Express.js, and PostgreSQL.",
    keywords: "contact jeeva v, hire backend developer, Node.js developer contact, backend development services",
    url: "https://jeevacodes.web.app/contact"
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.message}`,
        },
        publicKey
      );

      toast({
        title: contactConfig.toastMessages.success.title,
        description: contactConfig.toastMessages.success.description,
      });

      reset();
    } catch (error) {
      console.error("Email sending error:", error);
      toast({
        title: contactConfig.toastMessages.error.title,
        description: contactConfig.toastMessages.error.description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden"
    >
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        url={seoConfig.url}
      />

      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-30">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/20 to-transparent dark:from-blue-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 -right-1/4 w-2/3 h-2/3 bg-gradient-to-tl from-purple-400/20 to-transparent dark:from-purple-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-gradient-to-bl from-cyan-400/20 to-transparent dark:from-cyan-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '10s' }}></div>
      </div>

      <ParticleBackground />
      <SimpleParticleBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {contactConfig.hero.title.replace(contactConfig.hero.titleHighlight, '')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {contactConfig.hero.titleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {contactConfig.hero.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 border-white/20 dark:border-gray-700/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {contactConfig.form.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {contactConfig.form.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{contactConfig.form.fields.name.label}</Label>
                      <Input
                        id="name"
                        placeholder={contactConfig.form.fields.name.placeholder}
                        {...register('name')}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{contactConfig.form.fields.email.label}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={contactConfig.form.fields.email.placeholder}
                        {...register('email')}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">{contactConfig.form.fields.subject.label}</Label>
                    <Input
                      id="subject"
                      placeholder={contactConfig.form.fields.subject.placeholder}
                      {...register('subject')}
                      className="bg-white/50 dark:bg-gray-800/50"
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{contactConfig.form.fields.message.label}</Label>
                    <Textarea
                      id="message"
                      placeholder={contactConfig.form.fields.message.placeholder}
                      rows={5}
                      {...register('message')}
                      className="bg-white/50 dark:bg-gray-800/50"
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {isSubmitting ? contactConfig.form.submitButton.loading : contactConfig.form.submitButton.default}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 border-white/20 dark:border-gray-700/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {contactConfig.contactInfo.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {contactConfig.contactInfo.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactConfig.contactInfo.items.map((item, index) => {
                  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-12 h-12 ${item.bgColor} rounded-lg`}>
                        <IconComponent className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 border-white/20 dark:border-gray-700/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {contactConfig.responseTime.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {contactConfig.responseTime.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20 pointer-events-none" />
    </motion.div>
  );
};

export default Contact;