import { Prisma, Team, UserPermissionRole } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";

@Injectable()
export class TeamService {
  constructor(private db: DatabaseService) {}

  async create(userId: string, data: Pick<Prisma.TeamCreateInput, "name">): Promise<Team> {
    return this.db.team.create({
      data: {
        ...data,
        members: {
          create: {
            userId,
            role: UserPermissionRole.ADMIN,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<Team> {
    return this.db.team.delete({
      where: {
        id,
      },
    });
  }
}
