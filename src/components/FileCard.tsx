
import { FileProps } from "@/types/files";
import { getFileIcon } from "@/utils/fileIcons";

interface FileCardProps {
    file: FileProps;
    onClick?: () => void;
    isLoading?: boolean;
}

export const FileCard = ({ file, onClick, isLoading }: FileCardProps) => (
    <div
        onClick={onClick}
        className="relative bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all duration-300 cursor-pointer group"
    >
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
                {isLoading ? (
                    <div className="border-2 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin" />
                ) : (
                    getFileIcon(file.type)
                )}
                <div>
                    <h3 className="group-hover:text-blue-400 font-medium text-white transition-colors">{file.name}</h3>
                    <p className="text-gray-400 text-sm">
                        {file.size && `${(file.size / 1024 / 1024).toFixed(2)} MB • `}
                        {new Date(file.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>
            {file.shared && (
                <div className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>
            )}
        </div>
        <div className="absolute inset-0 border-white/10 border group-hover:border-blue-500/50 rounded-lg transition-colors pointer-events-none" />
    </div>
);