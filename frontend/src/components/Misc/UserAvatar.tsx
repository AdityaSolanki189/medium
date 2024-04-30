export function UserAvatar({ name, size = 8 }: { name: string, size?: number }) {
    return (
        <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-600 rounded-full dark:bg-gray-600`}>
            <span className="text-xs text-gray-600 dark:text-gray-300">
                {name[0].toUpperCase()}
            </span>
        </div>
    )
}
