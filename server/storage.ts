import { scenarios, type Scenario, type InsertScenario } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getScenario(id: number): Promise<Scenario | undefined>;
  getAllScenarios(limit?: number, offset?: number): Promise<Scenario[]>;
  createScenario(scenario: InsertScenario): Promise<Scenario>;
  incrementViews(id: number): Promise<void>;
  incrementLikes(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getScenario(id: number): Promise<Scenario | undefined> {
    const [scenario] = await db.select().from(scenarios).where(eq(scenarios.id, id));
    return scenario || undefined;
  }

  async getAllScenarios(limit = 10, offset = 0): Promise<Scenario[]> {
    try {
      const result = await db.select().from(scenarios)
        .orderBy(desc(scenarios.createdAt))
        .limit(limit)
        .offset(offset);
      return result;
    } catch (error) {
      console.error('Database query error:', error);
      return [];
    }
  }

  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const [scenario] = await db
      .insert(scenarios)
      .values(insertScenario)
      .returning();
    return scenario;
  }

  async incrementViews(id: number): Promise<void> {
    const [current] = await db.select().from(scenarios).where(eq(scenarios.id, id));
    if (current) {
      await db
        .update(scenarios)
        .set({ views: current.views + 1 })
        .where(eq(scenarios.id, id));
    }
  }

  async incrementLikes(id: number): Promise<void> {
    const [current] = await db.select().from(scenarios).where(eq(scenarios.id, id));
    if (current) {
      await db
        .update(scenarios)
        .set({ likes: current.likes + 1 })
        .where(eq(scenarios.id, id));
    }
  }
}

export const storage = new DatabaseStorage();
