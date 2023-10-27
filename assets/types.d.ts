interface TableCellData {
    content: string;
    bold: boolean;
    italic: boolean;
}

type UserJSONContent = string[][] | { [key: string]: any }[];
