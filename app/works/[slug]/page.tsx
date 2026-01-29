import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/projects";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Api Al Rahman`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32">
      {/* Back Link */}
      <section className="container px-6 md:px-12">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Works
        </Link>
      </section>

      {/* Hero */}
      <section className="section pb-0">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <div>
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Project
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>

              {/* Links */}
              <div className="flex flex-wrap gap-4 mt-8">
                {project.liveUrl && (
                  <Button href={project.liveUrl} variant="primary" icon>
                    Live Website
                  </Button>
                )}
                {project.githubUrl && (
                  <Button href={project.githubUrl} variant="outline">
                    <Github size={18} />
                    View Code
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Industry
                </p>
                <p className="font-medium">{project.industry}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Year
                </p>
                <p className="font-medium">{project.year}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-muted rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="section">
        <div className="container">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-card">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.images.length > 0 && (
        <section className="section pt-0">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[16/10] overflow-hidden rounded-xl bg-card"
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project CTA */}
      <section className="section bg-background">
        <div className="container text-center space-y-6">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">
            Let&apos;s Talk
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;m always open to discussing new opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/#contact" className="inline-flex items-center gap-2">
              <span className="btn-lime">Get in Touch</span>
              <span className="btn-lime-circle">
                <ArrowUpRight size={16} />
              </span>
            </Link>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full hover:bg-foreground hover:text-background transition-all"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
