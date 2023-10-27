interface TableCellData {
    content: string;
    bold: boolean;
    italic: boolean;
}

type TableAlign = "left" | "center" | "right" | null;

type UserJSONContent = string[][] | { [key: string]: any }[];
