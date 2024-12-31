export interface FileProps {
    id: string;
    name: string;
    type: "image" | "document" | "video" | "folder";
    size?: number;
    createdAt: string;
    shared?: boolean;
    key?: string;
}