/**
 * ProjectsSection Component Tests
 * 
 * Note: These tests require the following dev dependencies to be installed:
 * - @testing-library/react
 * - @testing-library/jest-dom
 * - @testing-library/user-event
 * - vitest (or jest)
 * - jsdom (for vitest)
 * 
 * Install with:
 * npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ProjectsSection from "../ProjectsSection";
import { projects } from "@/data/projects";

describe("ProjectsSection", () => {
  describe("Basic Rendering", () => {
    it("renders the projects section with heading", () => {
      render(<ProjectsSection />);
      const heading = screen.getByRole("heading", { name: /projects & tools/i });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAttribute("id", "projects-heading");
    });

    it("renders all projects from data", () => {
      render(<ProjectsSection />);
      const articles = screen.getAllByRole("article");
      expect(articles).toHaveLength(projects.length);
    });

    it("has proper ARIA landmarks", () => {
      render(<ProjectsSection />);
      const section = screen.getByRole("region", { name: /projects & tools/i });
      expect(section).toHaveAttribute("aria-labelledby", "projects-heading");
    });
  });

  describe("Tag Organization & Semantics", () => {
    it("renders tags grouped by category for each project", () => {
      render(<ProjectsSection />);
      
      // Check first project with tags
      const firstProject = projects.find((p) => p.tags);
      if (firstProject && firstProject.tags) {
        // Technology tags
        firstProject.tags.technology?.forEach((tag) => {
          const displayTag = tag.replace(/-/g, " ");
          expect(screen.getByText(displayTag)).toBeInTheDocument();
        });
        
        // Domain tags
        firstProject.tags.domain?.forEach((tag) => {
          const displayTag = tag.replace(/-/g, " ");
          expect(screen.getByText(displayTag)).toBeInTheDocument();
        });
      }
    });

    it("formats kebab-case tags with spaces", () => {
      render(<ProjectsSection />);
      
      // Check for multi-word tags
      expect(screen.getByText("regression analysis")).toBeInTheDocument();
      expect(screen.getByText("public policy")).toBeInTheDocument();
      expect(screen.getByText("time series forecasting")).toBeInTheDocument();
    });

    it("applies correct color classes to tag categories", () => {
      const { container } = render(<ProjectsSection />);
      
      // Check for category-specific color classes
      const badges = container.querySelectorAll(".bg-blue-100, .bg-green-100, .bg-purple-100, .bg-orange-100");
      expect(badges.length).toBeGreaterThan(0);
    });

    it("renders tags with proper accessibility attributes", () => {
      render(<ProjectsSection />);
      
      // Check for tag list containers with aria-label
      const tagLists = screen.getAllByRole("list");
      tagLists.forEach((list) => {
        expect(list).toHaveAttribute("aria-label");
      });
    });

    it("renders tags as list items", () => {
      render(<ProjectsSection />);
      
      const listItems = screen.getAllByRole("listitem");
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  describe("Card Composition", () => {
    it("renders images with correct alt text", () => {
      render(<ProjectsSection />);
      
      projects.forEach((project) => {
        const img = screen.getByAltText(project.imageAlt ?? project.title);
        expect(img).toBeInTheDocument();
        expect(img).toHaveClass("object-cover", "w-full", "h-full");
      });
    });

    it("applies line-clamp-3 to descriptions", () => {
      const { container } = render(<ProjectsSection />);
      
      const descriptions = container.querySelectorAll("p.line-clamp-3");
      expect(descriptions.length).toBeGreaterThan(0);
    });

    it("applies shadow classes for hover effects", () => {
      const { container } = render(<ProjectsSection />);
      
      const cards = container.querySelectorAll(".shadow-sm");
      expect(cards.length).toBe(projects.length);
    });

    it("renders coming soon ribbon for appropriate projects", () => {
      render(<ProjectsSection />);
      
      const comingSoonProjects = projects.filter((p) => p.status === "coming-soon");
      const ribbons = screen.getAllByRole("status", { name: /coming soon/i });
      expect(ribbons).toHaveLength(comingSoonProjects.length);
    });

    it("coming soon ribbon has proper aria-label", () => {
      render(<ProjectsSection />);
      
      const comingSoonProject = projects.find((p) => p.status === "coming-soon");
      if (comingSoonProject) {
        const ribbon = screen.getByRole("status", { name: /coming soon/i });
        expect(ribbon).toHaveAttribute("aria-label", "Status: Coming Soon");
      }
    });
  });

  describe("Accessibility & Readability", () => {
    it("cards are keyboard focusable", () => {
      render(<ProjectsSection />);
      
      const cards = screen.getAllByRole("article");
      cards.forEach((card) => {
        expect(card).toHaveAttribute("tabIndex", "0");
      });
    });

    it("cards have focus-visible ring classes", () => {
      const { container } = render(<ProjectsSection />);
      
      const cards = container.querySelectorAll(".focus-visible\\:ring-2");
      expect(cards.length).toBe(projects.length);
    });

    it("cards have descriptive aria-labels", () => {
      render(<ProjectsSection />);
      
      const cards = screen.getAllByRole("article");
      cards.forEach((card) => {
        expect(card).toHaveAttribute("aria-label");
        const label = card.getAttribute("aria-label");
        expect(label).toContain("project card");
      });
    });

    it("images have meaningful alt text", () => {
      render(<ProjectsSection />);
      
      projects.forEach((project) => {
        const img = screen.getByAltText(project.imageAlt ?? project.title);
        expect(img).toHaveAttribute("alt");
        const altText = img.getAttribute("alt");
        expect(altText).toBeTruthy();
        expect(altText?.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Project Modal", () => {
    it("opens modal when View Details button is clicked", async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      const detailsButtons = screen.getAllByRole("button", { name: /view details/i });
      await user.click(detailsButtons[0]);
      
      // Modal should now be open
      const dialog = await screen.findByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("opens modal when card is clicked", async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      const cards = screen.getAllByRole("article");
      await user.click(cards[0]);
      
      const dialog = await screen.findByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("opens modal with Enter key on card", async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      const cards = screen.getAllByRole("article");
      cards[0].focus();
      await user.keyboard("{Enter}");
      
      const dialog = await screen.findByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("modal displays project title and description", async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      const detailsButtons = screen.getAllByRole("button", { name: /view details/i });
      await user.click(detailsButtons[0]);
      
      const project = projects[0];
      const dialog = await screen.findByRole("dialog");
      
      expect(within(dialog).getByText(project.title)).toBeInTheDocument();
      expect(within(dialog).getByText(project.description)).toBeInTheDocument();
    });

    it("modal can be closed with Escape key", async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      const detailsButtons = screen.getAllByRole("button", { name: /view details/i });
      await user.click(detailsButtons[0]);
      
      let dialog = await screen.findByRole("dialog");
      expect(dialog).toBeInTheDocument();
      
      await user.keyboard("{Escape}");
      
      // Dialog should no longer be in the document
      await new Promise(resolve => setTimeout(resolve, 300)); // Wait for animation
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("modal renders Open Project button for projects with external links", async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      // Find a project with a real link (not "#")
      const projectWithLink = projects.findIndex((p) => p.link && p.link !== "#");
      
      if (projectWithLink !== -1) {
        const detailsButtons = screen.getAllByRole("button", { name: /view details/i });
        await user.click(detailsButtons[projectWithLink]);
        
        const dialog = await screen.findByRole("dialog");
        const openButton = within(dialog).getByRole("button", { name: /open project/i });
        expect(openButton).toBeInTheDocument();
      }
    });

    it("modal displays coming soon message for coming-soon projects", async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      const comingSoonIndex = projects.findIndex((p) => p.status === "coming-soon");
      
      if (comingSoonIndex !== -1) {
        const detailsButtons = screen.getAllByRole("button", { name: /view details/i });
        await user.click(detailsButtons[comingSoonIndex]);
        
        const dialog = await screen.findByRole("dialog");
        expect(within(dialog).getByText(/coming soon/i)).toBeInTheDocument();
      }
    });
  });

  describe("External Link Behavior", () => {
    it("renders Open Project button for available projects with links", () => {
      render(<ProjectsSection />);
      
      const availableWithLinks = projects.filter(
        (p) => p.status === "available" && p.link && p.link !== "#"
      );
      
      const openButtons = screen.getAllByRole("button", { name: /open project/i });
      expect(openButtons.length).toBe(availableWithLinks.length);
    });

    it("Open Project button opens external link in new tab", async () => {
      const user = userEvent.setup();
      const windowOpen = vi.spyOn(window, "open").mockImplementation(() => null);
      
      render(<ProjectsSection />);
      
      const openButtons = screen.getAllByRole("button", { name: /open project/i });
      if (openButtons.length > 0) {
        await user.click(openButtons[0]);
        
        const projectWithLink = projects.find((p) => p.link && p.link !== "#");
        expect(windowOpen).toHaveBeenCalledWith(projectWithLink?.link, "_blank");
      }
      
      windowOpen.mockRestore();
    });
  });

  describe("Data Integrity", () => {
    it("exports projects array", () => {
      expect(projects).toBeDefined();
      expect(Array.isArray(projects)).toBe(true);
    });

    it("all projects have required fields", () => {
      projects.forEach((project) => {
        expect(project.id).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.description).toBeDefined();
        expect(project.image).toBeDefined();
      });
    });

    it("all projects have unique IDs", () => {
      const ids = projects.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(projects.length);
    });

    it("all tag values are in kebab-case", () => {
      projects.forEach((project) => {
        if (project.tags) {
          Object.values(project.tags).forEach((categoryTags) => {
            categoryTags?.forEach((tag) => {
              // Should not have spaces
              expect(tag).not.toMatch(/\s/);
              // Should be lowercase
              expect(tag).toBe(tag.toLowerCase());
            });
          });
        }
      });
    });
  });
});
