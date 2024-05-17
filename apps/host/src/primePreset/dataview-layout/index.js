export default {
    root: {
        content: {
            class: [
                "p-0",
                "border-0",
                "text-surface-700 dark:text-white/80",
                "bg-surface-0 dark:bg-surface-800",
            ],
        },
        grid: {
            class: ["flex flex-wrap", "ml-0 mr-0 mt-0", "bg-surface-0 dark:bg-surface-800"],
        },
        header: {
            class: [
                "font-bold",
                "p-4",
                "text-surface-800 dark:text-white/80",
                "bg-surface-50 dark:bg-surface-800",
                "border-surface-200 dark:border-surface-700 border-y",
            ],
        },
    },

    listButton: ({ props }) => ({
        class: [
            // Font
            "leading-none",
            // Flex Alignment
            "inline-flex items-center align-bottom text-center",
            // Shape
            "border rounded-md rounded-r-none",
            // Spacing
            "px-4 py-3",
            // Color
            props.modelValue === "list"
                ? "bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400 text-white dark:text-surface-900"
                : "bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-white/80",
            // States
            "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
            props.modelValue === "list"
                ? "hover:bg-primary-600 dark:hover:bg-primary-300"
                : "hover:bg-surface-50 dark:hover:bg-surface-800/80",
            // Transition
            "transition duration-200",
            // Misc
            "cursor-pointer select-none overflow-hidden",
        ],
    }),
    gridButton: ({ props }) => ({
        class: [
            // Font
            "leading-none",
            // Flex Alignment
            "inline-flex items-center align-bottom text-center",
            // Shape
            "border rounded-md rounded-l-none",
            // Spacing
            "px-4 py-3",
            // Color
            props.modelValue === "grid"
                ? "bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400 text-white dark:text-surface-900"
                : "bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-white/80",
            // States
            "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
            props.modelValue === "grid"
                ? "hover:bg-primary-600 dark:hover:bg-primary-300"
                : "hover:bg-surface-50 dark:hover:bg-surface-800/80",
            // Transition
            "transition duration-200",
            // Misc
            "cursor-pointer select-none overflow-hidden",
        ],
    }),
};
