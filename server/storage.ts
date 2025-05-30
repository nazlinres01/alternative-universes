import { scenarios, type Scenario, type InsertScenario } from "@shared/schema";

export interface IStorage {
  getScenario(id: number): Promise<Scenario | undefined>;
  getAllScenarios(limit?: number, offset?: number): Promise<Scenario[]>;
  createScenario(scenario: InsertScenario): Promise<Scenario>;
  incrementViews(id: number): Promise<void>;
  incrementLikes(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private scenarios: Map<number, Scenario>;
  private currentId: number;

  constructor() {
    this.scenarios = new Map();
    this.currentId = 1;
  }

  async getScenario(id: number): Promise<Scenario | undefined> {
    return this.scenarios.get(id);
  }

  async getAllScenarios(limit = 10, offset = 0): Promise<Scenario[]> {
    const allScenarios = Array.from(this.scenarios.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return allScenarios.slice(offset, offset + limit);
  }

  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const id = this.currentId++;
    const scenario: Scenario = {
      ...insertScenario,
      id,
      createdAt: new Date(),
      views: 0,
      likes: 0,
    };
    
    this.scenarios.set(id, scenario);
    return scenario;
  }

  async incrementViews(id: number): Promise<void> {
    const scenario = this.scenarios.get(id);
    if (scenario) {
      scenario.views += 1;
      this.scenarios.set(id, scenario);
    }
  }

  async incrementLikes(id: number): Promise<void> {
    const scenario = this.scenarios.get(id);
    if (scenario) {
      scenario.likes += 1;
      this.scenarios.set(id, scenario);
    }
  }
}

export const storage = new MemStorage();
