import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";
import { FullMembership } from "./membership.types";

@Injectable()
export class MembershipService {
  constructor(private db: DatabaseService) {}

  async findAllForUser(userId: string): Promise<FullMembership[]> {
    return this.db.membership.findMany({
      where: {
        userId,
      },
      include: {
        team: {
          include: {
            projects: {
              include: {
                environments: true,
              },
            },
          },
        },
      },
    });
  }
}
