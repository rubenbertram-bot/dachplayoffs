export interface ApiResponse {
    status: string;
    data: {
        lastId: number;
        type: number;
        status: string;
        time: number;
        players: Player[];
        spectators: Spectator[];
        timelines: Timeline[];
        completions: Completion[];
        data: Record<string, unknown>;
    };
}

export interface Player {
    uuid: string;
    nickname: string;
    roleType: number;
    eloRate: number | null;
    eloRank: number | null;
    country: string | null;
}

export type Spectator = unknown;

export interface Timeline {
    uuid: string;
    time: number;
    type: string;
}

export interface Completion {
    uuid: string;
    time: number;
}
