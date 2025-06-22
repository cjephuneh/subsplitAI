import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Target, Lightbulb, Heart, Award, Globe, Zap, Shield } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former VP of Product at OpenAI. Passionate about democratizing AI access.',
      image: '👩‍💼',
      linkedin: '#'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Google engineer with 10+ years in distributed systems and security.',
      image: '👨‍💻',
      linkedin: '#'
    },
    {
      name: 'Emily Watson',
      role: 'Head of Product',
      bio: 'Former Stripe PM. Expert in marketplace dynamics and user experience.',
      image: '👩‍🎨',
      linkedin: '#'
    },
    {
      name: 'David Kim',
      role: 'Head of Engineering',
      bio: 'Previously at Uber and Airbnb. Specialist in platform scalability.',
      image: '👨‍🔬',
      linkedin: '#'
    }
  ];

  const values = [
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making premium AI tools accessible to everyone, regardless of budget or location.'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Protecting user data and ensuring safe, secure access to shared subscriptions.'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Building a supportive community where users help each other access better tools.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously pushing the boundaries of what\'s possible in the sharing economy.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'SubSplit was born from the idea that AI tools should be accessible to everyone.'
    },
    {
      year: '2024 Q1',
      title: 'Seed Funding',
      description: 'Raised $2.5M in seed funding from top-tier VCs and AI industry leaders.'
    },
    {
      year: '2024 Q2',
      title: 'Beta Launch',
      description: 'Launched private beta with 1,000+ early adopters and 25+ AI tools.'
    },
    {
      year: '2024 Q3',
      title: 'Public Launch',
      description: 'Opening to the public with enhanced security and 50+ premium AI tools.'
    }
  ];

  const stats = [
    { number: '50+', label: 'AI Tools Available' },
    { number: '10K+', label: 'Active Users' },
    { number: '85%', label: 'Average Savings' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-16 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Democratizing AI Access
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto">
              We believe everyone should have access to the world's most powerful AI tools, 
              regardless of their budget or subscription status.
            </p>
            <div className="flex items-center justify-center space-x-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
                  <div className="text-slate-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <Card className="border-2 border-purple-200 shadow-xl bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center justify-center mb-6">
                  <Target className="h-12 w-12 text-purple-600" />
                </div>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  To create a world where access to cutting-edge AI technology isn't limited by 
                  subscription costs, making innovation and productivity tools available to 
                  creators, entrepreneurs, and businesses of all sizes.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  SubSplit was born from a simple observation: most people only need premium AI tools 
                  occasionally, yet they're forced to pay for full monthly subscriptions.
                </p>
                <p>
                  Our founders, Sarah and Marcus, experienced this firsthand while building their previous 
                  startup. They needed access to multiple AI tools for different projects but couldn't 
                  justify the $200+ monthly cost for tools they'd use sporadically.
                </p>
                <p>
                  The solution was obvious - create a platform where people could share subscription 
                  access safely and securely, making premium AI tools accessible to everyone while 
                  helping subscription owners monetize their unused credits.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="border-2 border-slate-200 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Lightbulb className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-4">The Lightbulb Moment</h3>
                    <p className="text-gray-600">
                      "What if we could create an Airbnb for AI subscriptions? A place where people 
                      could rent access to premium tools when they need them, and subscription owners 
                      could earn money from their unused credits."
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      - Sarah Chen, CEO
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-2 border-slate-200 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="border-2 border-slate-200 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <Button variant="outline" size="sm">
                      Connect on LinkedIn
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-200"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <Card className="border-2 border-slate-200 shadow-lg">
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-purple-100 text-purple-800">{milestone.year}</Badge>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Investors Section */}
          <Card className="mb-16 border-2 border-slate-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Backed by Industry Leaders</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
                <div className="text-2xl font-bold text-gray-400">Sequoia Capital</div>
                <div className="text-2xl font-bold text-gray-400">a16z</div>
                <div className="text-2xl font-bold text-gray-400">First Round</div>
                <div className="text-2xl font-bold text-gray-400">Founders Fund</div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Join Our Mission</h3>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Whether you're looking to access premium AI tools affordably or want to monetize 
                your unused subscriptions, we'd love to have you as part of our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="neon-green font-semibold px-8 py-3 text-lg">
                  Get Started Today
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                  Join Our Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;