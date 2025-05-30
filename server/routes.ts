import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateScenarioSchema, insertScenarioSchema } from "@shared/schema";
import { generateScenario } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate a new scenario using OpenAI
  app.post("/api/scenarios/generate", async (req, res) => {
    try {
      const { question, category } = generateScenarioSchema.parse(req.body);
      
      const scenarioResponse = await generateScenario(question, category);
      
      // Format content from sections
      const formattedContent = `${scenarioResponse.content}\n\n${scenarioResponse.sections
        .map(section => `## ${section.title}\n\n${section.content}`)
        .join('\n\n')}`;
      
      // Save to storage
      const scenario = await storage.createScenario({
        title: scenarioResponse.title,
        question,
        category,
        content: formattedContent,
      });
      
      res.json({ 
        scenario: {
          ...scenario,
          sections: scenarioResponse.sections
        }
      });
    } catch (error) {
      console.error("Generate scenario error:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to generate scenario" 
      });
    }
  });

  // Get all scenarios
  app.get("/api/scenarios", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const scenarios = await storage.getAllScenarios(limit, offset);
      res.json({ scenarios });
    } catch (error) {
      console.error("Get scenarios error:", error);
      res.status(500).json({ message: "Failed to fetch scenarios" });
    }
  });

  // Get a specific scenario
  app.get("/api/scenarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const scenario = await storage.getScenario(id);
      
      if (!scenario) {
        return res.status(404).json({ message: "Scenario not found" });
      }
      
      // Increment views
      await storage.incrementViews(id);
      
      res.json({ scenario });
    } catch (error) {
      console.error("Get scenario error:", error);
      res.status(500).json({ message: "Failed to fetch scenario" });
    }
  });

  // Like a scenario
  app.post("/api/scenarios/:id/like", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const scenario = await storage.getScenario(id);
      
      if (!scenario) {
        return res.status(404).json({ message: "Scenario not found" });
      }
      
      await storage.incrementLikes(id);
      const updatedScenario = await storage.getScenario(id);
      
      res.json({ scenario: updatedScenario });
    } catch (error) {
      console.error("Like scenario error:", error);
      res.status(500).json({ message: "Failed to like scenario" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
