export type ListItemId = string | number;

export interface ListItem<T extends ListItemId = number> {
    id: T;
    value: string;
};

