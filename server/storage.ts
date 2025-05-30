import { scenarios, type Scenario, type InsertScenario } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

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
    const result = await db.select().from(scenarios)
      .orderBy(sql`${scenarios.createdAt} DESC`)
      .limit(limit)
      .offset(offset);
    return result;
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
