import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ScrollAnimation, StaggerAnimation } from './scroll-animations';
import { PageTransition } from './page-transitions';

const blogPosts = [
  {
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt: "Discover best practices for creating scalable, maintainable applications using React and TypeScript. Learn about advanced patterns and techniques.",
    image: "https://images.unsplash.com/photo-1512504002392-f3cd887140de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwd3JpdGluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTgwMTYyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Tutorial",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    featured: true
  },
  {
    title: "Advanced JavaScript Techniques Every Developer Should Know",
    excerpt: "Explore advanced JavaScript concepts including closures, prototypes, async patterns, and modern ES6+ features that will level up your coding skills.",
    image: "https://images.unsplash.com/photo-1696834137451-f52f471a58bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwdHV0b3JpYWwlMjBjb2Rpbmd8ZW58MXx8fHwxNzU4MDE2MjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Guide",
    date: "Dec 10, 2024",
    readTime: "12 min read",
    featured: false
  },
  {
    title: "Optimizing Web Performance: Tips and Best Practices",
    excerpt: "Learn how to optimize your web applications for better performance, including code splitting, lazy loading, and efficient state management.",
    image: "https://images.unsplash.com/photo-1517309561013-16f6e4020305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHRpcHN8ZW58MXx8fHwxNzU4MDE2MjU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Performance",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    featured: false
  }
];

export function BlogSection() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <PageTransition id="blog" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation className="text-center mb-16">
          <h2 className="mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts on web development, technology trends, and best practices
          </p>
        </ScrollAnimation>

        {featuredPost && (
          <ScrollAnimation className="mb-16">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 border-primary/20">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto overflow-hidden">
                  <ImageWithFallback
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Featured
                    </Badge>
                    <Badge variant="outline">
                      {featuredPost.category}
                    </Badge>
                  </div>
                  
                  <h3 className="mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    
                    <Button className="group/btn">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollAnimation>
        )}

        <StaggerAnimation className="grid md:grid-cols-2 gap-8 mb-12" staggerDelay={0.15}>
          {regularPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all hover:scale-[1.02] duration-300">
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                  <Button variant="ghost" size="sm" className="group/btn p-0">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggerAnimation>

        <ScrollAnimation className="text-center" delay={0.6}>
          <Button variant="outline" size="lg">
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </ScrollAnimation>
      </div>
    </PageTransition>
  );
}